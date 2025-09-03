
# Developer Guide - Vitlíkisstovan Platform

## Tech Stack Overview

### Frontend
- **React 18** with TypeScript
- **Vite** for fast development and building
- **Wouter** for lightweight client-side routing
- **shadcn/ui** component library (built on Radix UI)
- **Tailwind CSS** for styling
- **TanStack Query** for server state management
- **React Hook Form** + Zod for form handling and validation

### Backend
- **Node.js** with Express.js
- **TypeScript** with ES modules
- **Drizzle ORM** for PostgreSQL database
- **Neon Database** for serverless PostgreSQL

### Development
- **Hot Module Replacement** via Vite
- **TypeScript** strict mode with path mapping
- **ESBuild** for production builds

## Important Theme & Styling Notes

⚠️ **CRITICAL: Do NOT change the Replit theme configuration!**

- We use a custom theme called `vts` (defined in the root `data-theme="vts"` attribute)
- Custom CSS variables are defined in `client/src/index.css` with the `[data-theme="vts"]` selector
- The color scheme uses custom variables like `--vts-accent`, `--vts-bg`, etc.
- Always use existing Tailwind utilities and shadcn components
- If you need new colors, extend the existing theme rather than creating new ones

## Getting Started

1. **Run the project**: Click the Run button or use `npm run dev`
2. **File structure**: 
   - Frontend code: `client/src/`
   - Backend code: `server/`
   - Shared types: `shared/`
   - UI components: `client/src/components/ui/`
   - Site components: `client/src/components/site/`

## Development Guidelines

- **Port**: Development runs on port 5000 (mapped to 80/443 in production)
- **Content**: Site content is managed in `client/src/content/site.ts`
- **Forms**: Use React Hook Form with Zod validation (see ContactForm.tsx)
- **Styling**: Stick to Tailwind classes and existing component patterns
- **Icons**: Use Lucide React icons (already imported)

## Key Files to Understand
- `client/src/pages/home.tsx` - Main landing page
- `client/src/content/site.ts` - All site content and copy
- `client/src/components/site/ContactForm.tsx` - Form implementation example
- `tailwind.config.ts` - Tailwind configuration (includes our custom theme)

## What NOT to Touch
- `.replit` configuration
- `vite.config.ts` 
- Theme variables in `index.css` (the `[data-theme="vts"]` section)
- Package.json dependencies without discussion

Need help? Check the existing components for patterns and ask questions!
