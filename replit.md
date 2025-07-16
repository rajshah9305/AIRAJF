# replit.md

## Overview

This is a full-stack web application that generates multiple code variations using AI providers. The application allows users to input prompts and generate 5 unique HTML code variations using different AI models (GPT-4o, Claude-4, Gemini, Mistral). It features a modern React frontend with a Node.js/Express backend, built with TypeScript and styled using Tailwind CSS with shadcn/ui components.

## User Preferences

Preferred communication style: Simple, everyday language.

## Current Status

✓ RAJ AI Code Generation Studio - Award-winning monochromatic design completed
✓ Simplified to use only Gemini AI model as requested  
✓ Added Preview/Code toggle functionality in header
✓ Implemented sandboxed iframe previews for security
✓ Created settings panel for API key management
✓ Fixed environment variable access issues

## Recent Changes (January 16, 2025)

- Streamlined UI to show only Gemini 2.5 Flash model
- Added code/preview toggle buttons with icons
- Updated schema to only support Gemini model
- Simplified settings to show only Google AI API key field
- Fixed React environment variable access (import.meta.env)
- Resolved server port conflicts and workflow restart issues

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query (React Query) for server state management
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **UI Components**: shadcn/ui component library with Radix UI primitives
- **Build Tool**: Vite for development and production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Language**: TypeScript with ESM modules
- **API Design**: RESTful API with JSON responses
- **Error Handling**: Centralized error middleware with proper HTTP status codes
- **Logging**: Custom request logging middleware for API endpoints

### Database & ORM
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Database**: PostgreSQL (configured but with in-memory storage fallback)
- **Migrations**: Drizzle Kit for schema migrations
- **Connection**: Neon Database serverless connection

## Key Components

### AI Integration
- **Providers**: Multiple AI service integrations
  - OpenAI (GPT-4o)
  - Anthropic (Claude-4)
  - Google AI (Gemini)
  - Mistral AI
- **Code Generation**: Parallel generation of 5 unique HTML variations
- **Configuration**: Adjustable temperature and max tokens parameters

### UI Components
- **Control Panel**: Main interface for prompt input and AI model selection
- **Preview Area**: Tabbed interface displaying generated code variations
- **Settings Panel**: Configuration for API keys and generation parameters
- **Toast System**: User feedback for success/error states

### Data Models
- **Code Generations**: Schema for storing generation history
- **API Schemas**: Zod validation for request/response types
- **User Management**: Basic user schema (prepared but not fully implemented)

## Data Flow

1. **User Input**: User enters prompt and selects AI model in Control Panel
2. **API Request**: Frontend sends POST request to `/api/generate` with validation
3. **AI Processing**: Backend creates AI provider instance and generates 5 variations in parallel
4. **Response Handling**: Frontend receives variations and updates Preview Area
5. **Error Management**: Toast notifications display success/error messages

## External Dependencies

### AI Services
- **OpenAI API**: For GPT-4o model access
- **Anthropic API**: For Claude-4 model access
- **Google AI API**: For Gemini model access
- **Mistral API**: For Mistral model access

### Database
- **Neon Database**: PostgreSQL serverless hosting
- **Connection Pool**: @neondatabase/serverless for optimized connections

### Development Tools
- **Replit Integration**: Custom Vite plugins for Replit environment
- **Hot Reload**: Vite HMR with Express middleware integration

## Deployment Strategy

### Development
- **Server**: Express with Vite middleware for HMR
- **Build Process**: TypeScript compilation with `tsx` for development
- **Environment**: NODE_ENV-based configuration

### Production
- **Build**: Vite builds frontend to `dist/public`, esbuild bundles server
- **Server Bundle**: ESM format with external packages
- **Static Serving**: Express serves built frontend assets
- **Database**: Requires DATABASE_URL environment variable

### Key Architectural Decisions

1. **Monorepo Structure**: Shared schemas between client/server for type safety
2. **AI Provider Pattern**: Abstracted AI service integration for easy extensibility
3. **Parallel Generation**: Multiple variations generated simultaneously for better UX
4. **Component Architecture**: Modular UI components with proper separation of concerns
5. **Type Safety**: End-to-end TypeScript with Zod validation
6. **Modern Tooling**: Vite + ESM for optimal developer experience