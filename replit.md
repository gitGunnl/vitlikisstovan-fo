# Overview

This is a static website for Vitlíkisstovan, an AI and coding education platform with a Faroese-first approach. The application is built as a modern single-page application with React, deployed as a static site on Replit. It features a landing page that showcases educational programs, consulting services, and resources. The platform is designed to provide professional AI and coding education through a comprehensive 12-week flagship program and various consulting services. Contact form submissions and the `/landsnet` ritlingur lead-magnet form are handled directly through Google Forms (no-cors POST) — the ritlingur uses a dedicated form whose Apps Script trigger emails the PDF to the visitor (see `docs/ritlingur/google-form-setup.md`). A lightweight Express backend exists for form-submission monitoring. The monitor runs synthetic POST + schema health checks every 30 minutes by default (override via `FORM_MONITOR_INTERVAL_MIN`) and ingests client-side failure beacons from the browser; both feed the same per-form alert state machine and send alert/recovery emails via the Replit Gmail integration when a lead form silently breaks. Monitoring runtime state is persisted to `data/monitoring.json` for direct inspection (gitignored — regenerated at runtime). Required env vars for monitoring: `ALERT_EMAIL_TO` plus an authorized Gmail connection (`google-mail` connector with `gmail.send` scope). There is intentionally no admin dashboard or admin endpoint; to manually trigger or verify, restart the workflow (a startup check runs ~30s after boot) or read `data/monitoring.json` directly.

# User Preferences

Preferred communication style: Simple, everyday language.

## Development Best Practices

### Content Management
- **Single Source of Truth**: All site content and configuration should be centralized in `client/src/content/site.ts` to prevent duplication and inconsistencies
- **No Hard-coded Content**: Components should never contain hard-coded text. Instead, they should import and use data from the site configuration
- **Structured Data**: Content should be organized in logical sections within site.ts (hero, program, cases, etc.) for maintainability

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Routing**: Client-side routing with Wouter library for lightweight navigation
- **UI Framework**: shadcn/ui component library built on Radix UI primitives
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **State Management**: TanStack Query (React Query) for server state management
- **Forms**: React Hook Form with Zod validation through @hookform/resolvers

## Static Site Architecture
- **Deployment**: Static site deployment on Replit (no server required)
- **Contact Form**: Direct integration with Google Forms API
- **Build Tool**: Vite for development and production builds
- **Form Submission**: Client-side POST to Google Forms endpoint with no-cors mode

## Form Integration
- **Contact Form**: Google Forms integration with direct client-side submission
- **Form Fields**: Name, Email, and Message fields mapped to Google Forms entry IDs
- **Validation**: Client-side Zod validation before submission
- **Success Handling**: Toast notifications for user feedback

## Build System
- **Frontend Build**: Vite with React plugin for fast development and optimized production builds
- **SEO Prerender**: Post-build step (`scripts/prerender-seo.js` shim → `scripts/prerender-seo.ts` impl, run via `tsx`) auto-discovers every file matching `client/src/content/seo/**/*.seo.ts`. Each module exports a default `PageSeo` (or array of them) with `{ path, title, description, content?, jsonLd?, noindex?, sitemap? }`. The `<!-- SEO_CONTENT_PLACEHOLDER -->` marker in `client/index.html` is replaced per-route with semantic HTML so crawlers/LLMs see real text. Meta tags are HTML-escaped, JSON-LD blocks are injected before `</head>`, and `sitemap.xml` is generated from the same list.

  **Adding a new page**: drop a `<name>.seo.ts` file in `client/src/content/seo/` (or add an entry to `registry.seo.ts` for simple title+description pages). The build fails with a coverage error if any `<Route path="...">` in `App.tsx` has no matching SEO entry, so you literally cannot ship a page without prerendered content. Rich pages (`home.seo.ts`, `ai-workshop.seo.ts`, `blog-posts.seo.ts`) import data directly from their content modules — no regex parsing of TS source.
- **TypeScript**: Strict mode enabled with path mapping for clean imports
- **Development**: Vite development server with hot module replacement
- **Production**: Static build output deployed to Replit Static Deployments

## Data Validation
- **Form Validation**: Zod schemas for contact form validation
- **Client-side Validation**: React Hook Form with Zod resolver
- **Error Handling**: User-friendly error messages in Faroese

## UI/UX Design System
- **Component Library**: Comprehensive shadcn/ui implementation with 40+ components
- **Theme System**: CSS custom properties with light/dark mode support
- **Typography**: Inter font family with multiple weight variants
- **Responsive Design**: Mobile-first approach with Tailwind breakpoints
- **Accessibility**: ARIA-compliant components via Radix UI primitives

# External Dependencies

## Core Framework Dependencies
- **@tanstack/react-query**: State management and mutation handling for form submissions
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


## Date & Utility Libraries
- **date-fns**: Modern JavaScript date utility library
- **clsx**: Utility for constructing className strings conditionally
- **nanoid**: Secure URL-friendly unique ID generator