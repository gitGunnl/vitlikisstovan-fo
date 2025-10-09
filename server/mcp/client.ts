import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { WebSocketTransport } from '@modelcontextprotocol/sdk/client/websocket.js';
import WebSocket from 'ws';

interface MCPToolResponse {
  content?: Array<{
    type: string;
    text?: string;
    data?: any;
  }>;
  error?: string;
}

interface MemoryFragment {
  id: string;
  title: string;
  content?: string;
  snippet?: string;
  metadata?: any;
  type?: string;
  workspaceId?: string;
}

class MCPClient {
  private client: Client | null = null;
  private isConnected = false;
  private reconnectTimer: NodeJS.Timeout | null = null;
  private readonly maxReconnectAttempts = 5;
  private reconnectAttempts = 0;

  constructor() {
    this.connect();
  }

  private async connect() {
    try {
      const token = process.env.USABLE_API_TOKEN;
      if (!token) {
        console.error('USABLE_API_TOKEN not configured');
        this.scheduleReconnect();
        return;
      }

      const wsUrl = 'wss://usable.dev/api/mcp';
      console.log('Connecting to MCP server at:', wsUrl);

      const ws = new WebSocket(wsUrl, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      const transport = new WebSocketTransport(ws as any);
      this.client = new Client({
        name: 'usable-gateway',
        version: '1.0.0'
      }, {
        capabilities: {}
      });

      await this.client.connect(transport);
      this.isConnected = true;
      this.reconnectAttempts = 0;
      console.log('Successfully connected to MCP server');

      // List available tools for debugging
      const tools = await this.client.listTools();
      console.log('Available MCP tools:', tools.tools?.map(t => t.name));

    } catch (error) {
      console.error('Failed to connect to MCP server:', error);
      this.isConnected = false;
      this.scheduleReconnect();
    }
  }

  private scheduleReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error('Max reconnection attempts reached');
      return;
    }

    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
    }

    const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
    this.reconnectAttempts++;
    
    console.log(`Scheduling reconnect attempt ${this.reconnectAttempts} in ${delay}ms`);
    this.reconnectTimer = setTimeout(() => {
      this.connect();
    }, delay);
  }

  private async ensureConnected() {
    if (!this.isConnected || !this.client) {
      throw new Error('MCP client not connected');
    }
  }

  private getToolName(preferred: string, fallback: string): string {
    // This would ideally check available tools, but for now we'll use the preferred names
    return preferred;
  }

  async searchFragments(query: string, limit: number = 10): Promise<MemoryFragment[]> {
    await this.ensureConnected();
    
    const toolName = this.getToolName('search_memory_fragments', 'agentic-search-fragments');
    
    try {
      const response = await this.client!.callTool({
        name: toolName,
        arguments: {
          query,
          limit
        }
      }) as MCPToolResponse;

      if (response.error) {
        throw new Error(response.error);
      }

      // Parse the response and normalize to our format
      const fragments: MemoryFragment[] = [];
      
      if (response.content) {
        for (const item of response.content) {
          if (item.type === 'text' && item.text) {
            try {
              const data = JSON.parse(item.text);
              if (Array.isArray(data)) {
                fragments.push(...data.map(this.normalizeFragment));
              } else if (data.results) {
                fragments.push(...data.results.map(this.normalizeFragment));
              } else if (data.id) {
                fragments.push(this.normalizeFragment(data));
              }
            } catch (e) {
              console.error('Failed to parse search response:', e);
            }
          } else if (item.data) {
            if (Array.isArray(item.data)) {
              fragments.push(...item.data.map(this.normalizeFragment));
            } else if (item.data.results) {
              fragments.push(...item.data.results.map(this.normalizeFragment));
            }
          }
        }
      }

      return fragments;
    } catch (error) {
      console.error('Search fragments error:', error);
      throw error;
    }
  }

  async getFragment(id: string): Promise<MemoryFragment | null> {
    await this.ensureConnected();
    
    const toolName = this.getToolName('get_memory_fragment_content', 'get-memory-fragment-content');
    
    try {
      const response = await this.client!.callTool({
        name: toolName,
        arguments: { id }
      }) as MCPToolResponse;

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.content) {
        for (const item of response.content) {
          if (item.type === 'text' && item.text) {
            try {
              const data = JSON.parse(item.text);
              return this.normalizeFragment(data);
            } catch (e) {
              console.error('Failed to parse get response:', e);
            }
          } else if (item.data) {
            return this.normalizeFragment(item.data);
          }
        }
      }

      return null;
    } catch (error) {
      console.error('Get fragment error:', error);
      throw error;
    }
  }

  async createFragment(data: {
    title: string;
    content: string;
    type?: string;
    workspaceId?: string;
  }): Promise<MemoryFragment> {
    await this.ensureConnected();
    
    const toolName = this.getToolName('create_memory_fragment', 'create-memory-fragment');
    
    try {
      const args: any = {
        title: data.title,
        content: data.content,
        type: data.type || 'markdown'
      };

      // Add workspace ID if provided
      const workspaceId = data.workspaceId || process.env.USABLE_WORKSPACE_ID;
      if (workspaceId) {
        args.workspaceId = workspaceId;
      }

      const response = await this.client!.callTool({
        name: toolName,
        arguments: args
      }) as MCPToolResponse;

      if (response.error) {
        throw new Error(response.error);
      }

      if (response.content) {
        for (const item of response.content) {
          if (item.type === 'text' && item.text) {
            try {
              const data = JSON.parse(item.text);
              return this.normalizeFragment(data);
            } catch (e) {
              console.error('Failed to parse create response:', e);
            }
          } else if (item.data) {
            return this.normalizeFragment(item.data);
          }
        }
      }

      throw new Error('Failed to create fragment');
    } catch (error) {
      console.error('Create fragment error:', error);
      throw error;
    }
  }

  private normalizeFragment(data: any): MemoryFragment {
    return {
      id: data.id || data.fragment_id || '',
      title: data.title || data.name || '',
      content: data.content || data.text || '',
      snippet: data.snippet || data.preview || data.content?.substring(0, 200),
      metadata: data.metadata || {},
      type: data.type,
      workspaceId: data.workspaceId || data.workspace_id
    };
  }

  disconnect() {
    if (this.reconnectTimer) {
      clearTimeout(this.reconnectTimer);
      this.reconnectTimer = null;
    }
    
    if (this.client) {
      this.client.close();
      this.client = null;
    }
    
    this.isConnected = false;
  }
}

// Create a singleton instance
export const mcpClient = new MCPClient();

// Graceful shutdown
process.on('SIGINT', () => {
  console.log('Shutting down MCP client...');
  mcpClient.disconnect();
  process.exit(0);
});

process.on('SIGTERM', () => {
  console.log('Shutting down MCP client...');
  mcpClient.disconnect();
  process.exit(0);
});