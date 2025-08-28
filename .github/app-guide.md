# Gundam TCG Coach - Mobile-First Implementation Guide

## Design Philosophy for TCG Players

### Core Principles

- **Mobile-First**: TCG players check stats between rounds, during commutes, at tournaments
- **Scannable Data**: Players need to quickly digest win rates, matchup data, and key insights
- **Touch-Friendly**: Large tap targets for players wearing gloves or using phones with cases
- **High Contrast**: Tournament venues often have poor lighting conditions
- **Fast Loading**: Tournament WiFi is notoriously unreliable

### Typography Strategy

Your monospace font stack (Geist Mono → JetBrains Mono) is perfect for:

- **Data Tables**: Consistent column alignment for stats
- **Match Transcripts**: Easy to parse game state information
- **Technical Analysis**: Code-like formatting for precise feedback
- **Accessibility**: Monospace fonts are easier for dyslexic users to read

## Color System Integration

### Using Your Theme Colors

**Light Mode:**

- Primary (`oklch(0.6716 0.1368 48.5130)`): Call-to-action buttons, progress indicators
- Secondary (`oklch(0.5360 0.0398 196.0280)`): Secondary actions, info callouts
- Muted (`oklch(0.9670 0.0029 264.5419)`): Background sections, disabled states

**Dark Mode:**

- Primary (`oklch(0.7214 0.1337 49.9802)`): Maintains energy in dark environments
- Secondary (`oklch(0.5940 0.0443 196.0233)`): Cooler tone for balance
- Background (`oklch(0.1797 0.0043 308.1928)`): Deep but not pure black for eye comfort

### TCG-Specific Color Usage

- **Wins**: Use `chart-2` (warm amber) for positive outcomes
- **Losses**: Use `destructive` for negative outcomes
- **Neutral Data**: Use `chart-4` and `chart-5` (grays) for neutral statistics
- **Highlights**: Use `primary` for important insights and achievements
- **Meta Information**: Use `muted-foreground` for less critical data

## Mobile-First Layout Patterns

### 1. Login/Signup (BetterAuth Integration)

**Mobile Layout (320px+):**
[Logo/Branding - Full Width]
[Social Login Buttons - Stack Vertically]

- Discord (popular with TCG community)
- Google (universal appeal)

[Divider: "or continue with email"]
[Email Input - Full Width]
[Password Input - Full Width]
[Login Button - Full Width, Primary Color]
[Switch to Signup Link - Center]

**Tablet/Desktop (768px+):**

- Side-by-side layout with branding left, form right
- Social buttons can be horizontal
- Maximum form width of 400px, centered

**BetterAuth Considerations:**

- Implement proper loading states for OAuth redirects
- Handle network failures gracefully (common at tournaments)
- Remember user preference for login method
- Support biometric authentication where available

### 2. Dashboard - Mobile Priority

**Mobile Dashboard Stack:**

1. **Header Bar** (56px height)

   - Logo/app name (left)
   - Profile avatar + notifications (right)
   - Hamburger menu icon (if using drawer navigation)

2. **Quick Action Card** (Prominent, primary color)

   - "Upload New Match" with large touch target (min 48px)
   - Recent upload status if applicable

3. **Stats Overview** (2x2 grid)

   - Win Rate (large number + trend arrow)
   - Current ELO (with badge/rank indication)
   - Matches This Month (progress toward goals)
   - Recent Streak (W/L with colored indicators)

4. **Recent Activity Feed**
   - Last 3 matches with expandable details
   - Coaching insights ready for review
   - Achievement notifications

**Tablet Adaptations (768px+):**

- 3-column grid for stats
- Side navigation instead of hamburger
- Larger quick action area with preview

**Desktop Enhancements (1024px+):**

- 4-column stats grid
- Right sidebar for activity feed
- Multiple quick actions (Upload, Review, Practice)

### 3. Match Upload - Progressive Disclosure

**Mobile Flow:**

Step 1: Match Details (Single Screen)

- Opponent Deck Type (Dropdown with search)
- Match Result (Large W/L toggle buttons)
- Date/Time (Auto-populated, editable)
- Tournament Context (Optional dropdown)

Step 2: Transcript Upload (Single Screen)

- Format Instructions (Collapsible)
- Large text area (minimum 200px height)
- Character count indicator
- Save Draft button (secondary)
- Upload for Analysis (primary, full width)

Step 3: Processing (Loading Screen)

- Progress indicator
- Encouraging messages
- Estimated time remaining
- Option to continue browsing app

**Accessibility Features:**

- Voice dictation support for transcript entry
- Large touch targets (minimum 48x48px)
- High contrast focus indicators
- Screen reader labels for all form elements
- Error messages announced to assistive technology

### 4. Match History - Data-Dense Mobile View

**Mobile List View:**
[Filter Bar - Horizontal Scroll]
[W/L] [vs Deck] [Date] [Status]
[W] [Angels] [Dec 15] [📊 Analyzed]
[L] [Chaos] [Dec 14] [⏳ Pending]

**Mobile Detail Expansion:**

- Tap to expand row showing:
  - Key insight preview (1-2 lines)
  - Quick stats (turns, damage dealt/taken)
  - Action buttons (View Analysis, Share)

**Tablet/Desktop Enhancements:**

- Full table with all columns visible
- Sortable headers with clear indicators
- Bulk actions for multiple matches
- Advanced filtering sidebar

### 5. Analysis Detail - Reader-Friendly

**Mobile Reading Experience:**

1. **Sticky Header**

   - Match context (decks, result)
   - Progress indicator through analysis
   - Share/bookmark actions

2. **Content Sections** (Expandable)

   - Executive Summary (always open)
   - Turn-by-turn Analysis (collapsible)
   - Key Insights (highlighted boxes)
   - Recommendations (action-oriented)

3. **Interactive Elements**
   - Tap-to-expand card explanations
   - Swipe between related analyses
   - Quick feedback buttons (helpful/not helpful)

**Typography for Analysis:**

```css
/* Headers - Clear hierarchy */
h1: text-2xl md:text-3xl font-bold
h2: text-xl md:text-2xl font-semibold
h3: text-lg md:text-xl font-medium

/* Body text - Optimized for mobile reading */
body: text-sm md:text-base leading-6 md:leading-7

/* Code/transcript blocks */
code: font-mono text-xs md:text-sm bg-muted p-2 rounded
```

## Component Specifications for Mobile

### Touch Targets

```css
/* Minimum touch target sizes */
.touch-target {
  min-height: 48px;
  min-width: 48px;
  padding: 12px; /* Comfortable internal spacing */
}

/* Button sizing */
.btn-primary-mobile {
  height: 52px; /* Slightly larger for primary actions */
  font-size: 16px; /* Prevents iOS zoom */
  font-weight: 600;
}
```

### Cards and Containers

```css
.card-mobile {
  padding: 16px; /* More generous than desktop */
  margin-bottom: 16px;
  border-radius: var(--radius-lg); /* 0.75rem from theme */
  box-shadow: var(--shadow-sm);
}

.card-interactive {
  transition: transform 0.1s ease;
}

.card-interactive:active {
  transform: scale(0.98); /* Subtle press feedback */
}
```

### Data Display

```css
.stat-large {
  font-size: 2.5rem; /* Easily readable from arm's length */
  font-weight: 700;
  line-height: 1;
  font-variant-numeric: tabular-nums;
}

.stat-label {
  font-size: 0.875rem;
  color: hsl(var(--muted-foreground));
  text-transform: uppercase;
  letter-spacing: 0.05em;
}
```

## Responsive Breakpoints

### Mobile-First Media Queries

```css
/* Mobile First (default) */
.container {
  padding: 16px;
}

/* Small tablets */
@media (min-width: 640px) {
  .container {
    padding: 24px;
  }
  .grid-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

/* Large tablets */
@media (min-width: 768px) {
  .container {
    padding: 32px;
  }
  .grid-stats {
    grid-template-columns: repeat(3, 1fr);
  }
  .sidebar {
    display: block;
  }
}

/* Desktop */
@media (min-width: 1024px) {
  .container {
    padding: 40px;
  }
  .grid-stats {
    grid-template-columns: repeat(4, 1fr);
  }
  .layout-desktop {
    display: flex;
  }
}
```

## Accessibility Standards for TCG Players

### Visual Accessibility

- **Contrast Ratios**: Minimum 4.5:1 for normal text, 3:1 for large text
- **Color Independence**: Never rely solely on color for meaning
- **Text Scaling**: Support up to 200% zoom without horizontal scrolling
- **Focus Indicators**: Visible 2px outline with high contrast

### Motor Accessibility

- **Large Touch Targets**: 48x48px minimum for all interactive elements
- **Gesture Alternatives**: Provide button alternatives to swipe actions
- **Timeout Extensions**: Allow users more time for form completion
- **Sticky Elements**: Keep important actions accessible during scroll

### Cognitive Accessibility

- **Clear Navigation**: Always show current location and next steps
- **Simple Language**: Avoid TCG jargon in UI text (save for content)
- **Error Prevention**: Validate inputs in real-time with helpful messages
- **Progress Indicators**: Show completion status for multi-step processes

### Screen Reader Support

```html
<!-- Semantic HTML structure -->
<main aria-label="Dashboard">
  <section aria-labelledby="stats-heading">
    <h2 id="stats-heading">Performance Statistics</h2>
    <!-- Stats content -->
  </section>
</main>

<!-- Descriptive button labels -->
<button aria-label="Upload new match transcript">
  <span aria-hidden="true">📤</span>
  Upload Match
</button>

<!-- Live regions for dynamic content -->
<div aria-live="polite" aria-atomic="true">
  Analysis complete! 3 new insights available.
</div>
```

## Performance Optimization for Mobile

### Loading Strategies

- **Critical CSS**: Inline above-the-fold styles
- **Progressive Enhancement**: Core functionality works without JS
- **Image Optimization**: WebP with fallbacks, proper sizing
- **Code Splitting**: Route-based splitting for faster initial loads

### Network Resilience

- **Offline Support**: Cache critical data with Service Workers
- **Retry Logic**: Automatic retry for failed uploads with backoff
- **Progress Persistence**: Save upload progress locally
- **Network Aware**: Adjust quality based on connection speed

### Supabase Integration

```typescript
// Real-time subscriptions for analysis updates
const subscription = supabase
  .channel("match_analysis")
  .on(
    "postgres_changes",
    { event: "UPDATE", schema: "public", table: "matches" },
    (payload) => {
      // Update UI when analysis completes
      updateMatchAnalysis(payload.new);
    }
  )
  .subscribe();

// Optimized queries for mobile
const { data: matches } = await supabase
  .from("matches")
  .select("id, opponent_deck, result, created_at, analysis_ready")
  .order("created_at", { ascending: false })
  .limit(20); // Paginate for performance
```

## Internationalization (i18n) Strategy

### Global TCG Community Considerations

**Primary Markets to Consider:**

- **Japan**: Origin of Gundam franchise, sophisticated TCG culture
- **English**: Global lingua franca, tournament standard
- **Spanish**: Large growing TCG community in Latin America
- **French**: Strong European TCG presence
- **German**: Major European market with organized play
- **Korean**: Significant mobile gaming and TCG adoption
- **Chinese (Simplified/Traditional)**: Massive potential market

### Technical Implementation with Next.js

**Recommended Setup:**

```typescript
// next-intl configuration
import { createLocalizedPathnamesNavigation } from "next-intl/navigation";

export const locales = [
  "en",
  "ja",
  "es",
  "fr",
  "de",
  "ko",
  "zh-CN",
  "zh-TW",
] as const;
export const defaultLocale = "en" as const;

// Localized pathnames for SEO
export const pathnames = {
  "/": "/",
  "/dashboard": {
    en: "/dashboard",
    ja: "/ダッシュボード",
    es: "/tablero",
    fr: "/tableau-de-bord",
  },
  "/matches": {
    en: "/matches",
    ja: "/試合",
    es: "/partidas",
    fr: "/matchs",
  },
} as const;
```

**Directory Structure:**
messages/
├── en.json # English (base)
├── ja.json # Japanese  
├── es.json # Spanish
├── fr.json # French
├── de.json # German
├── ko.json # Korean
├── zh-CN.json # Chinese Simplified
└── zh-TW.json # Chinese Traditional

### UI Adaptations for Different Languages

**Text Expansion Considerations:**

- **German**: Can be 30% longer than English
- **Chinese/Japanese**: More compact, different line heights needed
- **Arabic/Hebrew**: Right-to-left (RTL) support for future expansion

**Button and Component Sizing:**

```css
/* Flexible button sizing for text expansion */
.btn-primary {
  min-width: 120px; /* Accommodate longer translations */
  padding: 12px 24px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

/* Responsive typography for different scripts */
.text-cjk {
  line-height: 1.7; /* Better for Chinese/Japanese/Korean */
  letter-spacing: 0.02em;
}

.text-latin {
  line-height: 1.5; /* Standard for Latin scripts */
}
```

### Content Strategy by Language

**English (Global Standard):**

- Detailed technical analysis
- Tournament-focused terminology
- Comprehensive coaching insights

**Japanese (Native Market):**

- Honor formal/informal speech levels (敬語/丁寧語)
- Use official Gundam card names in Japanese
- Cultural sensitivity around competitive critique

**Spanish (Growing Market):**

- Region-neutral Spanish (avoid country-specific terms)
- Focus on community building aspects
- Simplified coaching concepts for newer players

**Other Languages:**

- Adapt complexity based on local TCG scene maturity
- Partner with local communities for terminology validation
- Consider cultural attitudes toward AI coaching

### Database Schema for Multilingual Content

**Supabase Table Structure:**

```sql
-- User preferences
CREATE TABLE user_preferences (
  user_id UUID REFERENCES users(id),
  language_code VARCHAR(5) DEFAULT 'en',
  timezone VARCHAR(50),
  date_format VARCHAR(20),
  number_format VARCHAR(20)
);

-- Multilingual card database
CREATE TABLE cards (
  id UUID PRIMARY KEY,
  card_number VARCHAR(20),
  names JSONB, -- {"en": "Strike Freedom", "ja": "ストライクフリーダム"}
  abilities JSONB -- Localized card text
);

-- Localized coaching insights
CREATE TABLE coaching_templates (
  id UUID PRIMARY KEY,
  insight_type VARCHAR(50),
  content JSONB -- {"en": "Consider...", "ja": "...を検討してください"}
);
```

### User Experience Flow

**Language Selection:**

1. **Onboarding**: Detect browser language, offer selection
2. **Settings Page**: Easy language switching with preview
3. **Persistence**: Store in user preferences + local storage
4. **Fallback**: Graceful degradation to English for missing translations

**Dynamic Content Handling:**

```typescript
// AI analysis results with i18n
interface AnalysisResult {
  insights: Array<{
    type: "mistake" | "opportunity" | "strength";
    messageKey: string; // Translation key
    variables?: Record<string, string>; // For dynamic content
  }>;
}

// Usage example
const insight = {
  type: "mistake",
  messageKey: "coaching.turn_timing_error",
  variables: {
    turn: "3",
    cardName: t("cards.strike_freedom"), // Localized card name
    suggestedTurn: "2",
  },
};
```

### Translation Management

**Content Categories:**

1. **UI Elements**: Buttons, labels, navigation (static)
2. **Game Terminology**: Card names, mechanics (managed dictionary)
3. **Coaching Content**: Analysis templates (professional translation required)
4. **User Generated**: Match transcripts (auto-detect language)

**Translation Keys Structure:**

```json
{
  "nav": {
    "dashboard": "Dashboard",
    "matches": "Match History",
    "profile": "Profile"
  },
  "coaching": {
    "turn_timing_error": "On turn {turn}, consider playing {cardName} earlier (turn {suggestedTurn}) for better tempo.",
    "resource_management": "Your resource management shows {trend} - focus on {suggestion}."
  },
  "cards": {
    "strike_freedom": "Strike Freedom Gundam",
    "barbatos": "Gundam Barbatos"
  }
}
```

### Mobile Considerations for i18n

**Font Loading Strategy:**

```css
/* Optimize font loading for different scripts */
@font-face {
  font-family: "NotoSansCJK";
  src: url("/fonts/noto-sans-cjk.woff2") format("woff2");
  unicode-range: U+4E00-9FFF; /* CJK Unified Ideographs */
  font-display: swap;
}

/* Fallback fonts by script */
.font-cjk {
  font-family: "NotoSansCJK", "Hiragino Sans", sans-serif;
}
.font-latin {
  font-family: "Geist Mono", monospace;
}
.font-arabic {
  font-family: "Noto Sans Arabic", sans-serif;
}
```

**Input Method Support:**

- **Japanese**: Support IME input for match transcripts
- **Chinese**: Handle character input with proper encoding
- **Mobile Keyboards**: Test with different language keyboards

### SEO and Accessibility

**Multilingual SEO:**

```html
<!-- Language alternates -->
<link rel="alternate" hreflang="en" href="https://app.com/en/dashboard" />
<link rel="alternate" hreflang="ja" href="https://app.com/ja/ダッシュボード" />
<link
  rel="alternate"
  hreflang="x-default"
  href="https://app.com/en/dashboard"
/>

<!-- Proper language declaration -->
<html lang="ja" dir="ltr"></html>
```

**Screen Reader Support:**

```typescript
// Language-aware announcements
const announceInUserLanguage = (messageKey: string, variables?: any) => {
  const message = t(messageKey, variables);
  const announcement = document.createElement("div");
  announcement.setAttribute("aria-live", "polite");
  announcement.setAttribute("lang", currentLocale);
  announcement.textContent = message;
};
```

### Performance Optimization

**Bundle Splitting by Language:**

```javascript
// next.config.js
module.exports = {
  experimental: {
    optimizeCss: true,
  },
  webpack: (config) => {
    // Split translation bundles
    config.optimization.splitChunks.cacheGroups.translations = {
      name: "translations",
      chunks: "all",
      test: /messages\//,
    };
    return config;
  },
};
```

**Lazy Loading Translations:**

```typescript
// Only load needed translations
const loadTranslations = async (locale: string) => {
  const messages = await import(`../messages/${locale}.json`);
  return messages.default;
};
```
