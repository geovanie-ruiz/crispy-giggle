# GCG Coach - Product Requirements Document

## Product Overview

### Vision Statement

GCG Coach empowers Gundam Card Game players to improve their strategic gameplay through AI-powered analysis of match logs, providing personalized insights and actionable advice to elevate their competitive performance.

### Mission

Democratize access to high-level strategic coaching by making expert-level game analysis accessible to players of all skill levels through Niven, our AI coach that understands every card, rule, and strategic nuance of the Gundam Card Game.

### Target Users

#### Primary Persona: Competitive TCG Player

- Ages 16-35, primarily male demographic
- Plays in local tournaments and online
- Wants to improve win rates and climb rankings
- Willing to invest time in post-game analysis
- Tech-comfortable but gaming-focused

#### Secondary Persona: Casual Enthusiast

- Ages 14-45, diverse demographic
- Plays weekly with friends/local groups
- Interested in understanding game mechanics better
- Values learning over pure competition
- Less time for complex analysis tools

## Product Architecture

### Core Technology Stack

- **Frontend**: Next.js 14+ with TypeScript
- **Styling**: Tailwind CSS with Shadcn/ui components
- **Authentication**: Clerk (seamless OAuth and user management)
- **Database**: Neon (PostgreSQL with edge optimization)
- **AI Integration**: OpenAI GPT-4 or Claude for match analysis
- **Hosting**: Vercel (optimal Next.js deployment)

### Data Architecture

```text
Users
├── Authentication (Clerk-managed)
├── Player Profiles (skill level, preferences, goals)
├── Deck Collections (current builds, archetypes)
└── Performance Metrics (ELO, win rates, trends)

Match Data
├── Game Logs (raw transcripts from various sources)
├── Processed Analysis (Niven's insights and recommendations)
├── Match Context (tournament, opponent, deck matchup)
└── Learning Progress (improvement tracking over time)

Game Knowledge Base
├── Card Database (all cards with current errata)
├── Rule Engine (comprehensive game mechanics)
├── Meta Analysis (current competitive trends)
└── Strategic Templates (common patterns and responses)
```

## MVP Feature Set

### 1. Authentication & User Onboarding

**Core Functionality:**

- Clerk-powered OAuth (Discord, Google, email)
- Player profile creation with skill level assessment
- Initial deck upload and categorization
- Goal setting (tournament placement, win rate targets)

**Success Metrics:**

- 90%+ successful account creation rate
- <2 minutes average onboarding time
- 70%+ deck upload completion in first session

### 2. Match Log Upload & Processing

**Core Functionality:**

- Multi-format log ingestion:
  - Wing Table exports (JSON/text)
  - Manual turn-by-turn entries (structured form)
  - Free-form match notes (AI parsing required)
- Automatic match metadata extraction
- Real-time processing status with progress indicators
- Error handling for malformed logs

**Technical Requirements:**

- Support files up to 5MB
- Process logs within 30 seconds for standard matches
- 95%+ accuracy in extracting key game events
- Queue system for batch processing during peak times

**Success Metrics:**

- <5% log parsing failure rate
- 85%+ user satisfaction with analysis accuracy
- Average 2 minutes from upload to initial insights

### 3. Niven AI Analysis Engine

**Core Functionality:**

- Turn-by-turn strategic analysis
- Critical decision point identification
- Alternative play suggestions with reasoning
- Pattern recognition across player's match history
- Contextual advice based on player skill level and goals

**Analysis Categories:**

- **Resource Management**: Energy curve, card advantage, tempo
- **Threat Assessment**: Reading opponent's strategy, responding to pressure
- **Positioning**: Unit placement, combat math, board control
- **Decision Trees**: Key turning points, missed opportunities
- **Meta Considerations**: Matchup-specific advice, sideboard guidance

**AI Prompt Engineering:**

```text
Context: You are Niven, an expert Gundam Card Game coach with complete knowledge of:
- All 1,200+ cards and their interactions
- Current tournament rules and recent errata
- Meta game trends and competitive deck archetypes
- This specific player's skill level: [INTERMEDIATE]
- Player's deck archetype: [BARBATOS AGGRO]
- Player's improvement goals: [INCREASE WIN RATE VS CONTROL DECKS]

Task: Analyze this match transcript and provide:
1. 3-5 specific tactical improvements with turn references
2. 1-2 strategic pattern observations
3. Next practice focus areas
4. Confidence rating for each suggestion

Tone: Encouraging but direct, focus on actionable advice over theory.
```

### 4. Match History & Progress Tracking

**Core Functionality:**

- Chronological match list with filterable metadata
- Quick-view insights and detailed analysis pages
- Performance trends over time (win rates, common mistakes)
- Matchup analysis (performance vs different archetypes)
- Achievement system for improvement milestones

**Data Visualization:**

- Win rate trends with confidence intervals
- Decision accuracy improvements over time
- Weakness identification heatmaps
- Matchup performance matrices

### 5. Player Context Enhancement

**Core Functionality:**

- Deck management (multiple builds, version tracking)
- Opponent recognition (link to other app users)
- Cross-referencing known player capabilities
- Personal playstyle profile building
- Learning preference adaptation

**Context Enrichment Examples:**

- "Based on your previous 15 matches with Barbatos decks..."
- "Your opponent John typically plays aggressive in this matchup..."
- "This mistake appears in 40% of your control matchups..."

## Phase 2 Features (Post-MVP)

### ELO Rating System

**Functionality:**

- Match-based ELO calculations with decay
- Skill tier assignments and progression tracking
- Leaderboards (global, regional, archetype-specific)
- Matchmaking suggestions for practice partners

**Implementation Approach:**

- Modified Elo system accounting for deck strength disparity
- Tournament results integration for calibration
- Anonymous comparison options for privacy

### Community Features

**Functionality:**

- Top performer showcase and coaching availability
- Match sharing and discussion threads
- Deck strategy guides from high-ELO players
- Tournament preparation group features

### Advanced Analytics

**Functionality:**

- Meta game trend analysis and predictions
- Personalized sideboard recommendations
- Practice scenario generation
- Video analysis integration (future consideration)

## User Experience Design

### Design Principles

#### 1. Analysis-First Interface

- Primary focus on presenting insights clearly
- Secondary priority on data entry efficiency
- Tertiary consideration for visual appeal

#### 2. Progressive Information Disclosure

- Overview → Details → Deep Analysis flow
- Expandable sections for complex topics
- Summary cards with drill-down capability

#### 3. Context-Aware Presentation

- Adapt complexity to user's skill level
- Highlight relevant information based on current goals
- Personalize recommendations using historical data

### Core User Flows

**Match Upload Flow:**

1. Upload/paste match log
2. Confirm/edit match metadata (opponent, date, tournament)
3. Processing indicator with estimated completion
4. Analysis ready notification
5. Review insights → Save to history

**Analysis Review Flow:**

1. Match summary with key metrics
2. Critical moments timeline
3. Detailed turn analysis (expandable)
4. Recommendations with confidence ratings
5. Save insights → Plan next practice focus

**Progress Review Flow:**

1. Performance dashboard with trends
2. Improvement milestone achievements
3. Current focus areas and goals
4. Suggested practice matches or opponents

### Accessibility Standards

**Visual Accessibility:**

- WCAG 2.1 AA compliance minimum
- 4.5:1 contrast ratios for all text
- Support for 200% zoom without functionality loss
- Dark mode support (not just aesthetic preference)
- Color-blind friendly palette with pattern/texture alternatives

**Motor Accessibility:**

- Keyboard navigation for all functionality
- 44x44px minimum touch targets on mobile
- Sticky positioning for primary action buttons
- Voice input support for match transcription

**Cognitive Accessibility:**

- Clear, jargon-free interface language
- Consistent navigation patterns
- Progress indicators for multi-step processes
- Error messages with specific correction guidance
- Timeout warnings with extension options

**Technical Implementation:**

```tsx
// Example accessible component pattern
<Card
  className="analysis-insight"
  role="region"
  aria-labelledby="insight-header"
>
  <CardHeader>
    <h3 id="insight-header" className="sr-only">
      Turn 4 Resource Management Insight
    </h3>
    <Badge variant="secondary" aria-label="Confidence level medium">
      Confidence: Medium
    </Badge>
  </CardHeader>
  <CardContent>
    <p>
      Consider holding your Beam Saber until turn 5 to maximize damage output.
    </p>
    <Button
      variant="outline"
      aria-expanded={showDetails}
      aria-controls="insight-details"
    >
      {showDetails ? "Hide" : "Show"} Detailed Analysis
    </Button>
  </CardContent>
</Card>
```

## Internationalization Strategy

### Target Markets & Implementation Timeline

**Phase 1 (MVP Launch):**

- English (primary market)
- Japanese (franchise origin, established TCG scene)

**Phase 2 (6 months post-MVP):**

- Korean (strong mobile gaming adoption)
- Chinese Simplified (large potential market)

**Phase 3 (12 months post-MVP):**

- Spanish (growing Latin American TCG scene)
- French (European competitive scene)

### Technical Architecture

**Translation Management:**

```typescript
// next-intl configuration
export const locales = ["en", "ja", "ko", "zh-CN", "es", "fr"] as const;
export type Locale = (typeof locales)[number];

// Namespace-based organization
interface Messages {
  auth: {
    signIn: string;
    signUp: string;
  };
  analysis: {
    confidence: {
      high: string;
      medium: string;
      low: string;
    };
    insights: {
      resourceManagement: string;
      threatAssessment: string;
    };
  };
  cards: Record<string, string>; // Card name translations
}
```

**Content Strategy by Language:**

**English (Global Standard):**

- Detailed technical terminology
- Comprehensive coaching explanations
- Tournament-focused language

**Japanese (Cultural Adaptation):**

- Respectful coaching tone (avoiding direct criticism)
- Official Japanese card names and terminology
- Integration with Japanese tournament formats

**Other Languages:**

- Simplified coaching concepts for emerging markets
- Community-validated translations for game terms
- Cultural adaptation of competitive concepts

### Database Schema for Multilingual Content

```sql
-- User language preferences
ALTER TABLE user_profiles ADD COLUMN preferred_language VARCHAR(5) DEFAULT 'en';

-- Multilingual card database
CREATE TABLE cards_i18n (
  card_id UUID REFERENCES cards(id),
  language_code VARCHAR(5),
  name VARCHAR(100),
  description TEXT,
  PRIMARY KEY (card_id, language_code)
);

-- Localized coaching templates
CREATE TABLE coaching_insights_i18n (
  template_id UUID,
  language_code VARCHAR(5),
  title VARCHAR(200),
  content TEXT,
  PRIMARY KEY (template_id, language_code)
);
```

## Technical Specifications

### Performance Requirements

**Response Time Targets:**

- Page loads: <2 seconds (95th percentile)
- Match analysis: <30 seconds for standard games
- Database queries: <500ms for user data
- Real-time updates: <1 second propagation

**Scalability Considerations:**

- Support 1,000+ concurrent users at MVP launch
- Database design for 100,000+ matches within 12 months
- AI processing queue to handle peak tournament periods
- CDN optimization for global user base

### Security & Privacy

**Data Protection:**

- GDPR compliance for EU users
- User data encryption at rest and in transit
- Anonymization options for match sharing
- Right to deletion with 30-day retention for analysis improvement

**Authentication Security:**

- Clerk-managed OAuth with MFA support
- Session management with appropriate timeouts
- API rate limiting to prevent abuse
- Regular security audits of user data handling

### Integration Requirements

**Third-Party Services:**

- Wing Table: API integration for direct log import (future)
- Tournament organizers: Results verification system (future)
- Streaming platforms: Potential integration for content creators (future)

**API Design:**

```typescript
// RESTful API structure
interface APIStructure {
  "/api/matches": {
    POST: "Upload new match log";
    GET: "Retrieve match history with pagination";
  };
  "/api/matches/[id]/analysis": {
    GET: "Fetch detailed analysis for specific match";
    PATCH: "Update analysis feedback";
  };
  "/api/users/profile": {
    GET: "User profile and preferences";
    PATCH: "Update user settings";
  };
  "/api/decks": {
    POST: "Add new deck configuration";
    GET: "List user's deck builds";
  };
}
```

## Success Metrics & KPIs

### User Engagement

- Monthly Active Users (target: 80% retention at 30 days)
- Average matches analyzed per user per month (target: 8+)
- Time spent reviewing analysis (target: 5+ minutes per session)
- Feature adoption rates (deck upload: 70%, profile completion: 85%)

### Product Quality

- Analysis accuracy satisfaction (target: 4.2/5.0 user rating)
- Log parsing success rate (target: 95%+)
- System uptime (target: 99.5%)
- Support ticket volume (target: <5% of user base per month)

### Business Metrics

- User acquisition cost vs. lifetime value
- Premium feature conversion (future monetization)
- Community engagement and organic growth
- Tournament integration partnerships

## Development Roadmap

### MVP Timeline (12 weeks)

#### Weeks 1-2: Foundation

- Project setup with Next.js, TypeScript, Tailwind
- Clerk authentication integration
- Neon database schema design and setup
- Basic UI component library with Shadcn/ui

#### Weeks 3-4: Core Upload System

- Match log upload functionality
- Basic parsing for Wing Table and manual formats
- File validation and error handling
- Processing queue infrastructure

#### Weeks 5-7: AI Analysis Engine

- OpenAI/Claude integration for match analysis
- Prompt engineering and response processing
- Analysis result storage and retrieval
- Basic insights categorization

#### Weeks 8-9: User Interface

- Match history dashboard
- Analysis detail pages with expandable sections
- User profile and deck management
- Responsive design implementation

#### Weeks 10-11: Polish & Testing

- Accessibility audit and improvements
- Performance optimization
- Error boundary implementation
- User acceptance testing with beta group

#### Week 12: Launch Preparation

- Production deployment to Vercel
- Monitoring and analytics setup
- Documentation and user guides
- Soft launch with invited beta users

### Post-MVP Iterations (Quarterly)

#### Q2: Enhancement & Scale

- Advanced filtering and search
- Improved AI analysis with user feedback integration
- Basic ELO system implementation
- Japanese localization

#### Q3: Community Features

- Player discovery and opponent linking
- Match sharing and discussion features
- Tournament result integration
- Korean and Chinese localization

#### Q4: Advanced Analytics

- Comprehensive performance dashboards
- Meta game analysis tools
- Personalized coaching recommendations
- Premium tier features planning

## Risk Assessment & Mitigation

### Technical Risks

**AI Analysis Accuracy (High Impact, Medium Probability):**

- _Risk_: Niven provides incorrect or unhelpful advice
- _Mitigation_: Extensive testing with expert players, feedback loops, confidence ratings

**Log Format Variability (Medium Impact, High Probability):**

- _Risk_: Unable to parse logs from various sources accurately
- _Mitigation_: Flexible parsing system, user correction interface, format documentation

**Scale Performance (High Impact, Low Probability):**

- _Risk_: System slowdown under high user load
- _Mitigation_: Performance monitoring, queue systems, database optimization

### Business Risks

**User Adoption (High Impact, Medium Probability):**

- _Risk_: TCG players resistant to AI coaching tools
- _Mitigation_: Community engagement, expert endorsements, free tier availability

**Competition (Medium Impact, Medium Probability):**

- _Risk_: Established TCG tools add similar features
- _Mitigation_: Focus on Gundam-specific expertise, superior AI integration

### Operational Risks

**Solo Development Bandwidth (High Impact, Medium Probability):**

- _Risk_: Feature scope exceeds development capacity
- _Mitigation_: Strict MVP focus, phased rollout, community beta testing

**Content Moderation (Low Impact, Medium Probability):**

- _Risk_: Inappropriate user-generated content in match logs
- _Mitigation_: Automated filtering, community reporting, moderation guidelines

## Conclusion

GCG Coach represents a focused opportunity to revolutionize how Gundam Card Game players approach strategic improvement. By leveraging modern web technologies and AI capabilities, we can create a tool that makes expert-level coaching accessible to players regardless of their local competitive scene.

The MVP focuses on core value delivery: transforming raw match data into actionable insights through Niven's AI analysis. This foundation enables future expansion into community features, advanced analytics, and tournament integration while maintaining a sustainable development pace for solo execution.

Success depends on delivering accurate, helpful analysis that genuinely improves player performance, supported by an accessible, well-designed interface that respects users' time and diverse needs.
