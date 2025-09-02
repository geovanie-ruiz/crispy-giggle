# Gundam TCG AI Feedback Schema

## Core Feedback Instance Structure

### Game Session Record

```typescript
interface GameSession {
  session_id: string;
  player_id: string;
  opponent_archetype: string;
  game_outcome: "win" | "loss" | "draw";
  total_turns: number;
  session_date: timestamp;
  deck_archetype: string;
}
```

### Decision Point Instance

```typescript
interface DecisionPoint {
  decision_id: string
  session_id: string
  turn_number: number
  phase: 'draw' | 'resource' | 'main' | 'combat' | 'end'
  game_state: {
    hand_size: number
    resources_available: number
    board_units: number
    opponent_board_units: number
    life_total: number
    opponent_life_total: number
  }
  decision_type: 'combat' | 'resource_management' | 'card_play' | 'target_selection'
  chosen_action: string
  alternative_actions: string[]
  reasoning: string
  confidence_level: 1-10
  outcome_satisfaction: 1-10
  immediate_result: string
}
```

### Resource Tracking Instance

```typescript
interface ResourceUsage {
  usage_id: string
  session_id: string
  turn_number: number
  resources_spent: number
  resources_generated: number
  efficiency_ratio: number
  cards_played: number
  impact_score: 1-10
}
```

### Combat Analysis Instance

```typescript
interface CombatDecision {
  combat_id: string;
  session_id: string;
  turn_number: number;
  attack_target: string;
  damage_dealt: number;
  damage_received: number;
  units_lost: number;
  opponent_units_lost: number;
  tactical_advantage_gained: boolean;
  alternative_targets_available: string[];
}
```

### Card Advantage Tracking

```typescript
interface CardAdvantage {
  advantage_id: string;
  session_id: string;
  turn_number: number;
  cards_in_hand: number;
  cards_drawn: number;
  cards_played: number;
  opponent_estimated_hand_size: number;
  advantage_differential: number;
  advantage_source: string;
}
```

## Aggregated Insights Structure

### Performance Metrics

```typescript
interface PerformanceMetrics {
  player_id: string;
  time_period: string;
  win_rate: number;
  combat_win_rate: number;
  resource_efficiency_avg: number;
  decision_satisfaction_avg: number;
  prediction_accuracy_rate: number;
  games_analyzed: number;
  improvement_trend: "improving" | "declining" | "stable";
}
```

### Pattern Recognition

```typescript
interface PlayerPatterns {
  pattern_id: string;
  player_id: string;
  pattern_type: "weakness" | "strength" | "tendency";
  pattern_description: string;
  frequency: number;
  confidence: number;
  impact_on_winrate: number;
  recommendation: string;
  examples: string[];
}
```

### Strategic Analysis

```typescript
interface StrategicInsight {
  insight_id: string;
  player_id: string;
  category: "tactical" | "strategic" | "technical" | "psychological";
  insight_text: string;
  supporting_evidence: string[];
  action_items: string[];
  priority_level: "high" | "medium" | "low";
  estimated_impact: number;
  time_to_implement: string;
}
```

### Opponent Adaptation Tracking

```typescript
interface OpponentAdaptation {
  adaptation_id: string;
  player_id: string;
  opponent_archetype: string;
  predicted_play: string;
  actual_play: string;
  prediction_accuracy: boolean;
  adaptation_success: boolean;
  lessons_learned: string;
}
```

## AI Insights Format Structure

### Weekly Analysis Report

```typescript
interface WeeklyInsights {
  report_id: string;
  player_id: string;
  week_period: string;
  key_insights: StrategicInsight[];
  performance_summary: PerformanceMetrics;
  improvement_areas: {
    area: string;
    current_score: number;
    target_score: number;
    action_plan: string[];
  }[];
  pattern_alerts: PlayerPatterns[];
  next_week_focus: string[];
}
```

### Decision Quality Score

```typescript
interface DecisionQuality {
  quality_id: string;
  session_id: string;
  overall_score: number;
  tactical_score: number;
  strategic_score: number;
  risk_assessment_score: number;
  adaptation_score: number;
  areas_for_improvement: string[];
  strengths_identified: string[];
}
```

## Recommendation Engine Schema

### Personalized Recommendations

```typescript
interface PlayerRecommendation {
  recommendation_id: string
  player_id: string
  recommendation_type: 'immediate' | 'short_term' | 'long_term'
  category: string
  title: string
  description: string
  expected_impact: number
  difficulty_level: 1-5
  time_investment: string
  success_metrics: string[]
  related_patterns: string[]
}
```

## Data Collection Points

### Required Input Data

- Game transcripts/logs
- Decision timestamps and contexts
- Resource expenditure tracking
- Combat outcome data
- Hand size progression
- Opponent archetype identification
- Win/loss outcomes with context

### Generated Analytics

- Decision pattern recognition
- Resource efficiency trends
- Combat success correlations
- Strategic adherence scoring
- Improvement velocity tracking
- Comparative performance analysis

## Implementation Notes for SQL Schema

- Use time-series tables for tracking progression
- Implement foreign key relationships between sessions and decision points
- Create indexed views for common analytical queries
- Design for both real-time feedback and historical analysis
- Include metadata for AI model versioning and insight confidence levels
