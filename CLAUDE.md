# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Common Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview
```

## Architecture Overview

This is a gamified tourism platform for Caçapava do Sul, RS, Brazil, built as a React TypeScript single-page application with mock backend services.

### Core Architecture

**Multi-Role System**
- Tourist: Main users with gamification features (points, badges, check-ins)
- Admin/Secretaria: Tourism department dashboard with analytics
- Hotel: Check-in management system
- Restaurant: Customer feedback and management

**Key Patterns**
- Context-based state management (AuthContext, GamificationContext)
- Protected routes with role-based access in App.tsx
- Service layer pattern with mock backend (services/backendService.ts)
- Session storage for data persistence (no real backend)

### Data Flow
1. User actions trigger service calls in components
2. Services update mock data in session storage
3. Context providers notify components of state changes
4. Components re-render with updated data

### Gamification System
- QR code-based check-ins with GPS validation
- Points and achievements system with 8 badges
- Anti-fraud measures using crypto-js for security
- Leaderboard with ranking calculations

### AI Integration
- Primary: Google Gemini API for tourist assistance
- Fallback: OpenAI API when Gemini fails
- Environment variables: VITE_GEMINI_API_KEY, VITE_OPENAI_API_KEY

### Key Files to Understand
- types.ts: All TypeScript interfaces and types
- constants.ts: Mock data for POIs, users, badges
- App.tsx: Routing and layout structure
- services/backendService.ts: Mock API implementation
- context/AuthContext.tsx: Authentication logic
- context/GamificationContext.tsx: Game mechanics

### Development Considerations
- This is a prototype with mock data - no real backend
- All data resets on page refresh (session storage only)
- API keys should be in .env file (not committed)
- Tailwind CSS with custom brand colors defined in tailwind.config.js
- Maps use Leaflet with React Leaflet wrapper
- Charts use Chart.js and Recharts libraries

### Common Tasks
- To add a new POI: Update POINTS_OF_INTEREST in constants.ts
- To add a new badge: Update BADGES array with criteria function
- To modify routes: Update App.tsx routing configuration
- To change AI behavior: Modify services/ai/index.ts