# GCG Coach - AI-Powered Gundam Card Game Analysis

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=for-the-badge&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Supabase](https://img.shields.io/badge/Supabase-181818?style=for-the-badge&logo=supabase&logoColor=white)](https://supabase.com/)

> Empowering Gundam Card Game players to improve their strategic gameplay through AI-powered analysis of match logs, providing personalized insights and actionable advice to elevate competitive performance.

## 🎯 Project Overview

GCG Coach is a web application that transforms raw Gundam Card Game match logs into actionable strategic insights. Players upload their game transcripts (from Wing Table, manual notes, or digital matches), and Niven, our AI coach powered by Claude Sonnet 4, analyzes gameplay to provide:

- **Turn-by-turn tactical analysis** with specific improvement suggestions
- **Strategic pattern recognition** across match history
- **Personalized coaching** adapted to player skill level and goals
- **Performance tracking** with win rates and improvement metrics
- **Contextual insights** using player deck data and opponent history

### Core Value Proposition

Make expert-level Gundam TCG coaching accessible to all players through AI analysis, regardless of local competitive scene availability.

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 14+ App Router with TypeScript
- **Styling**: Tailwind CSS v4 + Shadcn/ui components
- **Authentication**: Clerk (OAuth, user management)
- **Database**: Supabase (PostgreSQL with real-time capabilities)
- **AI Engine**: Claude Sonnet 4 via Anthropic API
- **Game Logic**: Custom MCP (Model Context Protocol) server for Gundam TCG rules
- **Deployment**: Vercel

### Key Components

```text
src/
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication routes
│   ├── dashboard/         # Main dashboard
│   ├── matches/           # Match history & analysis
│   ├── profile/           # User settings & decks
│   └── api/               # API routes
├── components/            # Reusable UI components
│   ├── ui/                # Shadcn/ui base components
│   ├── forms/             # Form components
│   ├── charts/            # Data visualization
│   └── analysis/          # Analysis display components
├── lib/                   # Utility functions
│   ├── supabase/          # Database client & queries
│   ├── clerk/             # Auth utilities
│   ├── ai/                # Claude API integration
│   └── mcp/               # Game rules MCP client
├── types/                 # TypeScript definitions
└── hooks/                 # Custom React hooks
```

### Database Schema (Supabase)

```sql
-- User profiles (extends Clerk data)
CREATE TABLE profiles (
  id UUID REFERENCES auth.users PRIMARY KEY,
  username VARCHAR(50) UNIQUE,
  skill_level VARCHAR(20) DEFAULT 'beginner',
  preferred_language VARCHAR(5) DEFAULT 'en',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- User deck collections
CREATE TABLE decks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  name VARCHAR(100) NOT NULL,
  archetype VARCHAR(50),
  cards JSONB NOT NULL, -- Card list with quantities
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Match data
CREATE TABLE matches (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES profiles(id),
  opponent_name VARCHAR(100),
  opponent_user_id UUID REFERENCES profiles(id), -- If opponent uses app
  user_deck_id UUID REFERENCES decks(id),
  opponent_archetype VARCHAR(50),
  result VARCHAR(10) CHECK (result IN ('win', 'loss', 'draw')),
  tournament_context VARCHAR(100),
  raw_log TEXT NOT NULL,
  processed_log JSONB, -- Structured game events
  analysis_complete BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- AI analysis results
CREATE TABLE match_analyses (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  match_id UUID REFERENCES matches(id) UNIQUE,
  insights JSONB NOT NULL, -- Structured insights from AI
  recommendations JSONB NOT NULL, -- Action items for player
  confidence_scores JSONB, -- AI confidence in analysis
  processing_time_ms INTEGER,
  ai_model_version VARCHAR(50),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

### MCP Server Integration

The custom MCP server provides Claude with comprehensive Gundam TCG knowledge:

```typescript
// lib/mcp/client.ts
interface MCPGameRules {
  validatePlay(gameState: GameState, action: PlayerAction): ValidationResult;
  getCardData(cardId: string): CardDetails;
  calculateOptimalPlays(gameState: GameState): OptimalPlay[];
  getMetaAnalysis(archetype: string): MetaData;
}

// AI Analysis with MCP context
const analyzeMatch = async (matchLog: string): Promise<MatchAnalysis> => {
  const gameEvents = parseMatchLog(matchLog);
  const mcpContext = await mcpClient.getGameContext(gameEvents);

  const analysis = await claude.analyze({
    context: mcpContext,
    events: gameEvents,
    prompt: "Analyze this match for strategic improvements...",
  });

  return structuredAnalysis;
};
```

## 🚀 Getting Started

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm
- Supabase account and project
- Clerk account and application
- Anthropic API key for Claude access

### Environment Variables

Create `.env.local` with the following variables:

```bash
# Database
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key

# Authentication
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key

# AI Services
ANTHROPIC_API_KEY=your_anthropic_api_key

# MCP Server
MCP_SERVER_URL=http://localhost:3001  # Local development
MCP_SERVER_TOKEN=your_mcp_server_token

# App Configuration
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/yourusername/gcg-coach.git
   cd gcg-coach
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up the database**

   ```bash
   # Run Supabase migrations
   npm run db:migrate

   # Seed with initial card data (optional)
   npm run db:seed
   ```

4. **Start the MCP server** (separate terminal)

   ```bash
   cd mcp-server
   npm install
   npm run dev
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

Open [http://localhost:3000](http://localhost:3000) to view the application.

### Database Setup

1. **Initialize Supabase tables**:

   ```bash
   npm run db:reset  # Fresh install
   npm run db:migrate  # Apply migrations only
   ```

2. **Enable Row Level Security** in your Supabase dashboard for all tables

3. **Configure Clerk webhook** for user creation:
   - Add webhook endpoint: `https://yourapp.com/api/webhooks/clerk`
   - Select `user.created` event

## 🧪 Testing

### Unit Tests

```bash
# Run all tests
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

### Integration Tests

```bash
# Test API routes
npm run test:api

# Test database operations
npm run test:db

# Test AI analysis pipeline
npm run test:ai
```

### E2E Tests (Playwright)

```bash
# Install Playwright browsers
npx playwright install

# Run E2E tests
npm run test:e2e

# Run E2E tests in UI mode
npm run test:e2e:ui
```

### Testing Structure

```
__tests__/
├── components/          # Component unit tests
├── pages/              # Page integration tests
├── api/                # API route tests
├── lib/                # Utility function tests
└── e2e/                # End-to-end test scenarios
    ├── auth.spec.ts    # Authentication flows
    ├── upload.spec.ts  # Match upload process
    └── analysis.spec.ts # Analysis generation
```

## 🔧 Development

### Code Quality & Linting

```bash
# Run ESLint
npm run lint

# Fix auto-fixable lint issues
npm run lint:fix

# Run Prettier formatting
npm run format

# Type checking
npm run type-check
```

### Pre-commit Hooks (Husky)

Automatically runs on commit:

- ESLint checks
- Prettier formatting
- TypeScript compilation
- Unit test suite

### Configuration Files

- **ESLint**: `.eslintrc.json` - Next.js recommended + custom rules
- **Prettier**: `.prettierrc` - Consistent code formatting
- **TypeScript**: `tsconfig.json` - Strict mode enabled
- **Tailwind**: `tailwind.config.ts` - Custom theme configuration

### Development Scripts

```bash
# Development
npm run dev              # Start dev server
npm run build           # Production build
npm run start           # Start production server

# Database
npm run db:migrate      # Run Supabase migrations
npm run db:seed         # Seed with test data
npm run db:reset        # Reset database

# Code Quality
npm run lint            # ESLint check
npm run lint:fix        # Fix linting issues
npm run format          # Prettier formatting
npm run type-check      # TypeScript validation

# Testing
npm run test            # Unit tests
npm run test:e2e        # E2E tests
npm run test:coverage   # Coverage report

# Utilities
npm run analyze         # Bundle analyzer
npm run clean           # Clean build files
```

## 📱 Key Features

### MVP Features

- ✅ **Authentication**: Clerk OAuth (Discord, Google, Email)
- ✅ **Match Upload**: Support for Wing Table exports and manual entry
- ✅ **AI Analysis**: Claude-powered tactical insights and recommendations
- ✅ **Match History**: Filterable timeline with performance metrics
- ✅ **Player Profiles**: Deck management and skill tracking
- ✅ **Progress Tracking**: Win rates, improvement trends, goal setting

### Planned Features (Post-MVP)

- 🔄 **ELO System**: Skill-based rating and leaderboards
- 🔄 **Opponent Linking**: Cross-reference known players for context
- 🔄 **Community Features**: Top player showcases, strategy sharing
- 🔄 **Advanced Analytics**: Meta game trends, sideboard optimization
- 🔄 **Internationalization**: Japanese, Korean, Chinese localization

## 🤖 AI Integration Details

### Claude Sonnet 4 Analysis Pipeline

1. **Log Processing**: Parse raw match transcripts into structured game events
2. **MCP Context**: Query game rules server for card data, interactions, optimal plays
3. **AI Analysis**: Send structured data to Claude with specialized coaching prompts
4. **Insight Extraction**: Process AI response into actionable recommendations
5. **Confidence Scoring**: Rate reliability of each suggestion for user transparency

### Prompt Engineering Examples

```typescript
// Coaching prompt template
const COACHING_PROMPT = `
You are Niven, an expert Gundam Card Game coach. Analyze this match transcript and provide specific, actionable feedback.

Player Context:
- Skill Level: ${playerProfile.skillLevel}
- Deck Archetype: ${deck.archetype}  
- Current Goals: ${playerProfile.goals}
- Win Rate vs ${opponentArchetype}: ${winRate}%

Match Data: ${structuredGameEvents}

Provide analysis in this format:
1. Critical Moments (2-3 key turning points with turn numbers)
2. Strategic Patterns (recurring strengths/weaknesses)  
3. Specific Improvements (actionable advice with reasoning)
4. Practice Focus (what to work on next)

Tone: Encouraging but direct. Focus on improvement over criticism.
`;
```

### MCP Server Capabilities

The custom MCP server provides:

- **Complete Card Database**: All cards with current errata and interactions
- **Rules Engine**: Comprehensive game mechanics validation
- **Meta Analysis**: Current competitive trends and deck statistics
- **Optimal Play Calculation**: Mathematical analysis of best moves
- **Strategy Templates**: Common patterns and counter-strategies

## 🚦 Deployment

### Vercel Deployment (Recommended)

1. **Connect repository** to Vercel dashboard
2. **Configure environment variables** in Vercel project settings
3. **Set build command**: `npm run build`
4. **Deploy**: Automatic on main branch push

### Environment Configuration

```bash
# Production environment variables
NEXT_PUBLIC_SUPABASE_URL=your_production_supabase_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_production_clerk_key
ANTHROPIC_API_KEY=your_production_api_key
MCP_SERVER_URL=https://your-mcp-server.com
```

### Performance Monitoring

- **Vercel Analytics**: Page load times and user behavior
- **Supabase Monitoring**: Database performance and query optimization
- **Error Tracking**: Sentry integration for production error monitoring
- **AI Usage Tracking**: Claude API usage and cost monitoring

## 📚 Project Context for AI Agents

### Development Approach

This is a **solo-developed project** focused on delivering core value quickly while maintaining high code quality. The architecture prioritizes:

- **Type Safety**: Comprehensive TypeScript usage throughout
- **Component Reusability**: Shadcn/ui base with custom extensions
- **Performance**: Next.js App Router with optimized loading
- **User Experience**: Accessibility-first design with progressive enhancement
- **Maintainability**: Clear separation of concerns and thorough testing

### AI Agent Guidelines

When working on this codebase:

1. **Follow established patterns** in existing components and utilities
2. **Maintain type safety** - add proper TypeScript definitions for new features
3. **Use existing UI components** from `/components/ui/` before creating new ones
4. **Write tests** for new functionality using the established testing patterns
5. **Consider accessibility** - ensure WCAG 2.1 AA compliance for new features
6. **Optimize for solo development** - prefer simple, maintainable solutions

### Common Development Tasks

- **Adding new pages**: Use App Router structure in `/app` directory
- **Database changes**: Create migrations in `/supabase/migrations`
- **New API routes**: Follow RESTful patterns in `/app/api`
- **UI components**: Extend Shadcn/ui components in `/components`
- **AI integration**: Extend existing Claude integration patterns in `/lib/ai`

### Code Style Preferences

- **Naming**: camelCase for variables, PascalCase for components
- **File organization**: Feature-based grouping with shared utilities
- **Import structure**: External libraries → internal utilities → components
- **Error handling**: Comprehensive error boundaries and user feedback
- **Performance**: Lazy loading, code splitting, and optimization by default

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing

This is currently a solo project, but feedback and suggestions are welcome via issues. Future community contributions may be considered post-MVP launch.

---

**Built with ❤️ for the Gundam TCG community**
