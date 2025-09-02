# Overview

This is a full-stack web application for Vitlíkisstovan, an AI and coding education platform with a Faroese-first approach. The application is built as a modern single-page application with a React frontend and Express backend, featuring a landing page that showcases educational programs, consulting services, and resources. The platform is designed to provide professional AI and coding education through a comprehensive 12-week flagship program and various consulting services.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Client-side routing with Wouter library for lightweight navigation
- **UI Framework**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation through @hookform/resolvers

## Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ES modules
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Development**: Hot module replacement via Vite middleware integration
- **API Design**: RESTful API structure with /api prefix routing
- **Storage Interface**: Abstract storage layer with in-memory implementation for development

## Database Architecture
- **Database**: PostgreSQL (configured via Drizzle)
- **Schema Management**: Drizzle Kit for migrations and schema generation
- **Connection**: Neon Database serverless driver for production
- **Models**: User entity with username/password authentication structure

## Build System
- **Frontend Build**: Vite with React plugin for fast development and optimized production builds
- **Backend Build**: ESBuild for server-side bundling with external package handling
- **TypeScript**: Strict mode enabled with path mapping for clean imports
- **Development**: Concurrent frontend and backend development with proxy setup

## Authentication & Session Management
- **Session Storage**: PostgreSQL-based session store using connect-pg-simple
- **User Management**: Basic user model with unique username constraints
- **Validation**: Zod schemas for runtime type validation

## UI/UX Design System
- **Component Library**: Comprehensive shadcn/ui implementation with 40+ components
- **Theme System**: CSS custom properties with light/dark mode support
- **Typography**: Inter font family with multiple weight variants
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: ARIA-compliant components via Radix UI primitives

# External Dependencies

## Core Framework Dependencies
- **@neondatabase/serverless**: Serverless PostgreSQL driver for production database connectivity
- **drizzle-orm**: Type-safe database ORM with PostgreSQL dialect support
- **@tanstack/react-query**: Server state management and caching solution
- **wouter**: Lightweight client-side routing library

## UI Component Dependencies
- **@radix-ui/***: Collection of unstyled, accessible UI primitives (25+ packages)
- **class-variance-authority**: Utility for creating type-safe component variants
- **tailwindcss**: Utility-first CSS framework with custom configuration
- **lucide-react**: Icon library for consistent iconography

## Development Tools
- **vite**: Fast build tool with HMR support and React plugin
- **tsx**: TypeScript execution environment for development
- **esbuild**: Fast JavaScript bundler for production builds
- **@replit/vite-plugin-runtime-error-modal**: Development error overlay for Replit environment

## Form & Validation
- **react-hook-form**: Performant form library with minimal re-renders
- **@hookform/resolvers**: Integration layer for external validation libraries
- **zod**: TypeScript-first schema validation library
- **drizzle-zod**: Integration between Drizzle ORM and Zod validation

## Database & Session Management
- **connect-pg-simple**: PostgreSQL session store for Express sessions
- **drizzle-kit**: CLI tool for database migrations and schema management

## Date & Utility Libraries
- **date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for constructing className strings conditionally
- **nanoid**: Secure URL-friendly unique ID generator