export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  graphql_public: {
    Tables: {
      [_ in never]: never
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      graphql: {
        Args: {
          extensions?: Json
          operationName?: string
          query?: string
          variables?: Json
        }
        Returns: Json
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
  public: {
    Tables: {
      card_advantage: {
        Row: {
          advantage_differential: number | null
          advantage_source: string | null
          cards_drawn: number | null
          cards_in_hand: number | null
          cards_played: number | null
          id: string
          match_id: string | null
          opponent_estimated_hand_size: number | null
          turn_number: number | null
        }
        Insert: {
          advantage_differential?: number | null
          advantage_source?: string | null
          cards_drawn?: number | null
          cards_in_hand?: number | null
          cards_played?: number | null
          id?: string
          match_id?: string | null
          opponent_estimated_hand_size?: number | null
          turn_number?: number | null
        }
        Update: {
          advantage_differential?: number | null
          advantage_source?: string | null
          cards_drawn?: number | null
          cards_in_hand?: number | null
          cards_played?: number | null
          id?: string
          match_id?: string | null
          opponent_estimated_hand_size?: number | null
          turn_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "card_advantage_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "card_advantage_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      card_characters: {
        Row: {
          card_id: string
          character_id: string
          role: string | null
        }
        Insert: {
          card_id: string
          character_id: string
          role?: string | null
        }
        Update: {
          card_id?: string
          character_id?: string
          role?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "card_characters_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "card_characters_character_id_fkey"
            columns: ["character_id"]
            isOneToOne: false
            referencedRelation: "characters"
            referencedColumns: ["id"]
          },
        ]
      }
      card_effects: {
        Row: {
          card_id: string | null
          cost_description: string | null
          cost_resources: number | null
          effect_index: number
          effect_text: string
          id: string
          restrictions: string[] | null
          scope: Database["public"]["Enums"]["effect_scope_enum"]
          timings: string[] | null
        }
        Insert: {
          card_id?: string | null
          cost_description?: string | null
          cost_resources?: number | null
          effect_index: number
          effect_text: string
          id?: string
          restrictions?: string[] | null
          scope?: Database["public"]["Enums"]["effect_scope_enum"]
          timings?: string[] | null
        }
        Update: {
          card_id?: string | null
          cost_description?: string | null
          cost_resources?: number | null
          effect_index?: number
          effect_text?: string
          id?: string
          restrictions?: string[] | null
          scope?: Database["public"]["Enums"]["effect_scope_enum"]
          timings?: string[] | null
        }
        Relationships: [
          {
            foreignKeyName: "card_effects_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
        ]
      }
      card_sets: {
        Row: {
          code: string
          id: string
          name: string
          release_date: string | null
        }
        Insert: {
          code: string
          id?: string
          name: string
          release_date?: string | null
        }
        Update: {
          code?: string
          id?: string
          name?: string
          release_date?: string | null
        }
        Relationships: []
      }
      card_traits: {
        Row: {
          card_id: string
          trait: string
        }
        Insert: {
          card_id: string
          trait: string
        }
        Update: {
          card_id?: string
          trait?: string
        }
        Relationships: [
          {
            foreignKeyName: "card_traits_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
        ]
      }
      card_types: {
        Row: {
          card_id: string
          card_type: Database["public"]["Enums"]["card_type_enum"]
        }
        Insert: {
          card_id: string
          card_type: Database["public"]["Enums"]["card_type_enum"]
        }
        Update: {
          card_id?: string
          card_type?: Database["public"]["Enums"]["card_type_enum"]
        }
        Relationships: [
          {
            foreignKeyName: "card_types_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
        ]
      }
      cards: {
        Row: {
          ap: number | null
          art_id: string | null
          card_number: string | null
          card_text: string | null
          color: string | null
          cost: number | null
          created_at: string
          full_number: string | null
          hp: number | null
          id: string
          is_token: boolean
          level: number | null
          link_condition: string | null
          link_text: string | null
          metadata: Json | null
          name: string
          rarity: string | null
          search_vector: unknown | null
          set_code: string | null
          set_id: string | null
          subtitle: string | null
          type: string
        }
        Insert: {
          ap?: number | null
          art_id?: string | null
          card_number?: string | null
          card_text?: string | null
          color?: string | null
          cost?: number | null
          created_at?: string
          full_number?: string | null
          hp?: number | null
          id?: string
          is_token?: boolean
          level?: number | null
          link_condition?: string | null
          link_text?: string | null
          metadata?: Json | null
          name: string
          rarity?: string | null
          search_vector?: unknown | null
          set_code?: string | null
          set_id?: string | null
          subtitle?: string | null
          type: string
        }
        Update: {
          ap?: number | null
          art_id?: string | null
          card_number?: string | null
          card_text?: string | null
          color?: string | null
          cost?: number | null
          created_at?: string
          full_number?: string | null
          hp?: number | null
          id?: string
          is_token?: boolean
          level?: number | null
          link_condition?: string | null
          link_text?: string | null
          metadata?: Json | null
          name?: string
          rarity?: string | null
          search_vector?: unknown | null
          set_code?: string | null
          set_id?: string | null
          subtitle?: string | null
          type?: string
        }
        Relationships: [
          {
            foreignKeyName: "cards_set_id_fkey"
            columns: ["set_id"]
            isOneToOne: false
            referencedRelation: "card_sets"
            referencedColumns: ["id"]
          },
        ]
      }
      characters: {
        Row: {
          alt_names: string[] | null
          created_at: string
          id: string
          kind: Database["public"]["Enums"]["character_kind_enum"]
          metadata: Json | null
          name: string
        }
        Insert: {
          alt_names?: string[] | null
          created_at?: string
          id?: string
          kind: Database["public"]["Enums"]["character_kind_enum"]
          metadata?: Json | null
          name: string
        }
        Update: {
          alt_names?: string[] | null
          created_at?: string
          id?: string
          kind?: Database["public"]["Enums"]["character_kind_enum"]
          metadata?: Json | null
          name?: string
        }
        Relationships: []
      }
      combat_decisions: {
        Row: {
          alternative_targets_available: string[] | null
          attack_event_id: string | null
          attack_target: string | null
          damage_dealt: number | null
          damage_received: number | null
          id: string
          match_id: string | null
          opponent_units_lost: number | null
          tactical_advantage_gained: boolean | null
          turn_number: number | null
          units_lost: number | null
        }
        Insert: {
          alternative_targets_available?: string[] | null
          attack_event_id?: string | null
          attack_target?: string | null
          damage_dealt?: number | null
          damage_received?: number | null
          id?: string
          match_id?: string | null
          opponent_units_lost?: number | null
          tactical_advantage_gained?: boolean | null
          turn_number?: number | null
          units_lost?: number | null
        }
        Update: {
          alternative_targets_available?: string[] | null
          attack_event_id?: string | null
          attack_target?: string | null
          damage_dealt?: number | null
          damage_received?: number | null
          id?: string
          match_id?: string | null
          opponent_units_lost?: number | null
          tactical_advantage_gained?: boolean | null
          turn_number?: number | null
          units_lost?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "combat_decisions_attack_event_id_fkey"
            columns: ["attack_event_id"]
            isOneToOne: false
            referencedRelation: "match_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "combat_decisions_attack_event_id_fkey"
            columns: ["attack_event_id"]
            isOneToOne: false
            referencedRelation: "match_events_timeline_payload"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "combat_decisions_attack_event_id_fkey"
            columns: ["attack_event_id"]
            isOneToOne: false
            referencedRelation: "vw_attacks"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "combat_decisions_attack_event_id_fkey"
            columns: ["attack_event_id"]
            isOneToOne: false
            referencedRelation: "vw_card_plays"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "combat_decisions_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "combat_decisions_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      decision_points: {
        Row: {
          alternative_actions: string[] | null
          chosen_action: string | null
          confidence_level: number | null
          created_at: string
          decision_type:
            | Database["public"]["Enums"]["decision_type_enum"]
            | null
          event_id: string | null
          id: string
          immediate_result: string | null
          match_id: string | null
          outcome_satisfaction: number | null
          phase: Database["public"]["Enums"]["phase_enum"] | null
          reasoning: string | null
          turn_number: number | null
        }
        Insert: {
          alternative_actions?: string[] | null
          chosen_action?: string | null
          confidence_level?: number | null
          created_at?: string
          decision_type?:
            | Database["public"]["Enums"]["decision_type_enum"]
            | null
          event_id?: string | null
          id?: string
          immediate_result?: string | null
          match_id?: string | null
          outcome_satisfaction?: number | null
          phase?: Database["public"]["Enums"]["phase_enum"] | null
          reasoning?: string | null
          turn_number?: number | null
        }
        Update: {
          alternative_actions?: string[] | null
          chosen_action?: string | null
          confidence_level?: number | null
          created_at?: string
          decision_type?:
            | Database["public"]["Enums"]["decision_type_enum"]
            | null
          event_id?: string | null
          id?: string
          immediate_result?: string | null
          match_id?: string | null
          outcome_satisfaction?: number | null
          phase?: Database["public"]["Enums"]["phase_enum"] | null
          reasoning?: string | null
          turn_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "decision_points_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "match_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decision_points_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "match_events_timeline_payload"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decision_points_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "vw_attacks"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "decision_points_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "vw_card_plays"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "decision_points_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decision_points_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      decision_quality: {
        Row: {
          adaptation_score: number | null
          areas_for_improvement: string[] | null
          id: string
          match_id: string | null
          overall_score: number | null
          risk_assessment_score: number | null
          strategic_score: number | null
          strengths_identified: string[] | null
          tactical_score: number | null
        }
        Insert: {
          adaptation_score?: number | null
          areas_for_improvement?: string[] | null
          id?: string
          match_id?: string | null
          overall_score?: number | null
          risk_assessment_score?: number | null
          strategic_score?: number | null
          strengths_identified?: string[] | null
          tactical_score?: number | null
        }
        Update: {
          adaptation_score?: number | null
          areas_for_improvement?: string[] | null
          id?: string
          match_id?: string | null
          overall_score?: number | null
          risk_assessment_score?: number | null
          strategic_score?: number | null
          strengths_identified?: string[] | null
          tactical_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "decision_quality_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "decision_quality_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      deck_cards: {
        Row: {
          card_id: string
          deck_id: string
          quantity: number
        }
        Insert: {
          card_id: string
          deck_id: string
          quantity: number
        }
        Update: {
          card_id?: string
          deck_id?: string
          quantity?: number
        }
        Relationships: [
          {
            foreignKeyName: "deck_cards_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "deck_cards_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["id"]
          },
        ]
      }
      decks: {
        Row: {
          archetype: string | null
          created_at: string
          id: string
          name: string
          owner_clerk_id: string | null
          updated_at: string
        }
        Insert: {
          archetype?: string | null
          created_at?: string
          id?: string
          name: string
          owner_clerk_id?: string | null
          updated_at?: string
        }
        Update: {
          archetype?: string | null
          created_at?: string
          id?: string
          name?: string
          owner_clerk_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "decks_owner_clerk_id_fkey"
            columns: ["owner_clerk_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["clerk_id"]
          },
        ]
      }
      event_types: {
        Row: {
          description: string | null
          json_schema: Json | null
          name: Database["public"]["Enums"]["event_type_enum"]
          version: number | null
        }
        Insert: {
          description?: string | null
          json_schema?: Json | null
          name: Database["public"]["Enums"]["event_type_enum"]
          version?: number | null
        }
        Update: {
          description?: string | null
          json_schema?: Json | null
          name?: Database["public"]["Enums"]["event_type_enum"]
          version?: number | null
        }
        Relationships: []
      }
      game_sessions: {
        Row: {
          deck_archetype: string | null
          game_outcome: Database["public"]["Enums"]["game_outcome_enum"] | null
          match_id: string
          opponent_archetype: string | null
          player_clerk_id: string | null
          session_date: string | null
          total_turns: number | null
        }
        Insert: {
          deck_archetype?: string | null
          game_outcome?: Database["public"]["Enums"]["game_outcome_enum"] | null
          match_id: string
          opponent_archetype?: string | null
          player_clerk_id?: string | null
          session_date?: string | null
          total_turns?: number | null
        }
        Update: {
          deck_archetype?: string | null
          game_outcome?: Database["public"]["Enums"]["game_outcome_enum"] | null
          match_id?: string
          opponent_archetype?: string | null
          player_clerk_id?: string | null
          session_date?: string | null
          total_turns?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "game_sessions_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: true
            referencedRelation: "match_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_sessions_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: true
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "game_sessions_player_clerk_id_fkey"
            columns: ["player_clerk_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["clerk_id"]
          },
        ]
      }
      insight_event_links: {
        Row: {
          event_id: string | null
          id: string
          insight_id: string
          insight_kind: string | null
          match_id: string | null
          notes: string | null
        }
        Insert: {
          event_id?: string | null
          id?: string
          insight_id: string
          insight_kind?: string | null
          match_id?: string | null
          notes?: string | null
        }
        Update: {
          event_id?: string | null
          id?: string
          insight_id?: string
          insight_kind?: string | null
          match_id?: string | null
          notes?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "insight_event_links_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "match_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insight_event_links_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "match_events_timeline_payload"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insight_event_links_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "vw_attacks"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "insight_event_links_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "vw_card_plays"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "insight_event_links_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "insight_event_links_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      match_card_instances: {
        Row: {
          card_id: string | null
          controller_player_slot: number | null
          created_at: string
          created_event_id: string | null
          destroyed_event_id: string | null
          id: string
          instance_label: string | null
          is_token: boolean
          match_id: string | null
        }
        Insert: {
          card_id?: string | null
          controller_player_slot?: number | null
          created_at?: string
          created_event_id?: string | null
          destroyed_event_id?: string | null
          id?: string
          instance_label?: string | null
          is_token?: boolean
          match_id?: string | null
        }
        Update: {
          card_id?: string | null
          controller_player_slot?: number | null
          created_at?: string
          created_event_id?: string | null
          destroyed_event_id?: string | null
          id?: string
          instance_label?: string | null
          is_token?: boolean
          match_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "match_card_instances_card_id_fkey"
            columns: ["card_id"]
            isOneToOne: false
            referencedRelation: "cards"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_card_instances_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_card_instances_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      match_events: {
        Row: {
          actor_player_slot: number | null
          attacker_ap: number | null
          attacker_instance_id: string | null
          card_id: string | null
          cost_paid: number | null
          created_at: string
          event_index: number
          event_type: Database["public"]["Enums"]["event_type_enum"]
          id: string
          instance_id: string | null
          match_id: string | null
          occurred_at: string | null
          parent_event_id: string | null
          payload: Json
          payload_version: number
          phase: Database["public"]["Enums"]["phase_enum"] | null
          round_number: number | null
          source_line_refs: number[] | null
          target_base_card_id: string | null
          target_instance_id: string | null
          turn_number: number | null
        }
        Insert: {
          actor_player_slot?: number | null
          attacker_ap?: number | null
          attacker_instance_id?: string | null
          card_id?: string | null
          cost_paid?: number | null
          created_at?: string
          event_index: number
          event_type: Database["public"]["Enums"]["event_type_enum"]
          id?: string
          instance_id?: string | null
          match_id?: string | null
          occurred_at?: string | null
          parent_event_id?: string | null
          payload?: Json
          payload_version?: number
          phase?: Database["public"]["Enums"]["phase_enum"] | null
          round_number?: number | null
          source_line_refs?: number[] | null
          target_base_card_id?: string | null
          target_instance_id?: string | null
          turn_number?: number | null
        }
        Update: {
          actor_player_slot?: number | null
          attacker_ap?: number | null
          attacker_instance_id?: string | null
          card_id?: string | null
          cost_paid?: number | null
          created_at?: string
          event_index?: number
          event_type?: Database["public"]["Enums"]["event_type_enum"]
          id?: string
          instance_id?: string | null
          match_id?: string | null
          occurred_at?: string | null
          parent_event_id?: string | null
          payload?: Json
          payload_version?: number
          phase?: Database["public"]["Enums"]["phase_enum"] | null
          round_number?: number | null
          source_line_refs?: number[] | null
          target_base_card_id?: string | null
          target_instance_id?: string | null
          turn_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "match_events_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_events_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_events_parent_event_id_fkey"
            columns: ["parent_event_id"]
            isOneToOne: false
            referencedRelation: "match_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_events_parent_event_id_fkey"
            columns: ["parent_event_id"]
            isOneToOne: false
            referencedRelation: "match_events_timeline_payload"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_events_parent_event_id_fkey"
            columns: ["parent_event_id"]
            isOneToOne: false
            referencedRelation: "vw_attacks"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "match_events_parent_event_id_fkey"
            columns: ["parent_event_id"]
            isOneToOne: false
            referencedRelation: "vw_card_plays"
            referencedColumns: ["event_id"]
          },
        ]
      }
      match_ingestions: {
        Row: {
          created_at: string
          format_version: string | null
          id: string
          owner_clerk_id: string | null
          raw_text: string
          source: string | null
        }
        Insert: {
          created_at?: string
          format_version?: string | null
          id?: string
          owner_clerk_id?: string | null
          raw_text: string
          source?: string | null
        }
        Update: {
          created_at?: string
          format_version?: string | null
          id?: string
          owner_clerk_id?: string | null
          raw_text?: string
          source?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "match_ingestions_owner_clerk_id_fkey"
            columns: ["owner_clerk_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["clerk_id"]
          },
        ]
      }
      match_players: {
        Row: {
          clerk_id: string | null
          deck_archetype: string | null
          deck_id: string | null
          display_name: string | null
          id: string
          is_owner: boolean | null
          match_id: string | null
          player_slot: number
        }
        Insert: {
          clerk_id?: string | null
          deck_archetype?: string | null
          deck_id?: string | null
          display_name?: string | null
          id?: string
          is_owner?: boolean | null
          match_id?: string | null
          player_slot: number
        }
        Update: {
          clerk_id?: string | null
          deck_archetype?: string | null
          deck_id?: string | null
          display_name?: string | null
          id?: string
          is_owner?: boolean | null
          match_id?: string | null
          player_slot?: number
        }
        Relationships: [
          {
            foreignKeyName: "match_players_clerk_id_fkey"
            columns: ["clerk_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["clerk_id"]
          },
          {
            foreignKeyName: "match_players_deck_id_fkey"
            columns: ["deck_id"]
            isOneToOne: false
            referencedRelation: "decks"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_players_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_players_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      matches: {
        Row: {
          created_at: string
          deck_archetype: string | null
          game_outcome: Database["public"]["Enums"]["game_outcome_enum"] | null
          id: string
          ingestion_id: string | null
          opponent_archetype: string | null
          owner_clerk_id: string | null
          session_date: string | null
          total_turns: number | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          deck_archetype?: string | null
          game_outcome?: Database["public"]["Enums"]["game_outcome_enum"] | null
          id?: string
          ingestion_id?: string | null
          opponent_archetype?: string | null
          owner_clerk_id?: string | null
          session_date?: string | null
          total_turns?: number | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          deck_archetype?: string | null
          game_outcome?: Database["public"]["Enums"]["game_outcome_enum"] | null
          id?: string
          ingestion_id?: string | null
          opponent_archetype?: string | null
          owner_clerk_id?: string | null
          session_date?: string | null
          total_turns?: number | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "matches_ingestion_id_fkey"
            columns: ["ingestion_id"]
            isOneToOne: false
            referencedRelation: "match_ingestions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "matches_owner_clerk_id_fkey"
            columns: ["owner_clerk_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["clerk_id"]
          },
        ]
      }
      opponent_adaptations: {
        Row: {
          actual_play: string | null
          adaptation_success: boolean | null
          clerk_id: string | null
          created_at: string
          id: string
          lessons_learned: string | null
          opponent_archetype: string | null
          predicted_play: string | null
          prediction_accuracy: boolean | null
        }
        Insert: {
          actual_play?: string | null
          adaptation_success?: boolean | null
          clerk_id?: string | null
          created_at?: string
          id?: string
          lessons_learned?: string | null
          opponent_archetype?: string | null
          predicted_play?: string | null
          prediction_accuracy?: boolean | null
        }
        Update: {
          actual_play?: string | null
          adaptation_success?: boolean | null
          clerk_id?: string | null
          created_at?: string
          id?: string
          lessons_learned?: string | null
          opponent_archetype?: string | null
          predicted_play?: string | null
          prediction_accuracy?: boolean | null
        }
        Relationships: [
          {
            foreignKeyName: "opponent_adaptations_clerk_id_fkey"
            columns: ["clerk_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["clerk_id"]
          },
        ]
      }
      performance_metrics: {
        Row: {
          clerk_id: string | null
          combat_win_rate: number | null
          decision_satisfaction_avg: number | null
          games_analyzed: number | null
          generated_at: string
          id: string
          improvement_trend:
            | Database["public"]["Enums"]["improvement_trend_enum"]
            | null
          prediction_accuracy_rate: number | null
          resource_efficiency_avg: number | null
          time_period: string | null
          win_rate: number | null
        }
        Insert: {
          clerk_id?: string | null
          combat_win_rate?: number | null
          decision_satisfaction_avg?: number | null
          games_analyzed?: number | null
          generated_at?: string
          id?: string
          improvement_trend?:
            | Database["public"]["Enums"]["improvement_trend_enum"]
            | null
          prediction_accuracy_rate?: number | null
          resource_efficiency_avg?: number | null
          time_period?: string | null
          win_rate?: number | null
        }
        Update: {
          clerk_id?: string | null
          combat_win_rate?: number | null
          decision_satisfaction_avg?: number | null
          games_analyzed?: number | null
          generated_at?: string
          id?: string
          improvement_trend?:
            | Database["public"]["Enums"]["improvement_trend_enum"]
            | null
          prediction_accuracy_rate?: number | null
          resource_efficiency_avg?: number | null
          time_period?: string | null
          win_rate?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "performance_metrics_clerk_id_fkey"
            columns: ["clerk_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["clerk_id"]
          },
        ]
      }
      player_patterns: {
        Row: {
          clerk_id: string | null
          confidence: number | null
          examples: string[] | null
          frequency: number | null
          id: string
          impact_on_winrate: number | null
          pattern_description: string | null
          pattern_type: Database["public"]["Enums"]["pattern_type_enum"] | null
          recommendation: string | null
        }
        Insert: {
          clerk_id?: string | null
          confidence?: number | null
          examples?: string[] | null
          frequency?: number | null
          id?: string
          impact_on_winrate?: number | null
          pattern_description?: string | null
          pattern_type?: Database["public"]["Enums"]["pattern_type_enum"] | null
          recommendation?: string | null
        }
        Update: {
          clerk_id?: string | null
          confidence?: number | null
          examples?: string[] | null
          frequency?: number | null
          id?: string
          impact_on_winrate?: number | null
          pattern_description?: string | null
          pattern_type?: Database["public"]["Enums"]["pattern_type_enum"] | null
          recommendation?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_patterns_clerk_id_fkey"
            columns: ["clerk_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["clerk_id"]
          },
        ]
      }
      player_recommendations: {
        Row: {
          category: string | null
          clerk_id: string | null
          created_at: string
          description: string | null
          difficulty_level: number | null
          expected_impact: number | null
          id: string
          recommendation_type:
            | Database["public"]["Enums"]["recommendation_type_enum"]
            | null
          related_patterns: string[] | null
          success_metrics: string[] | null
          time_investment: string | null
          title: string | null
        }
        Insert: {
          category?: string | null
          clerk_id?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: number | null
          expected_impact?: number | null
          id?: string
          recommendation_type?:
            | Database["public"]["Enums"]["recommendation_type_enum"]
            | null
          related_patterns?: string[] | null
          success_metrics?: string[] | null
          time_investment?: string | null
          title?: string | null
        }
        Update: {
          category?: string | null
          clerk_id?: string | null
          created_at?: string
          description?: string | null
          difficulty_level?: number | null
          expected_impact?: number | null
          id?: string
          recommendation_type?:
            | Database["public"]["Enums"]["recommendation_type_enum"]
            | null
          related_patterns?: string[] | null
          success_metrics?: string[] | null
          time_investment?: string | null
          title?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "player_recommendations_clerk_id_fkey"
            columns: ["clerk_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["clerk_id"]
          },
        ]
      }
      profiles: {
        Row: {
          clerk_id: string
          created_at: string
          display_name: string | null
          goals: string | null
          preferred_language: string | null
          skill_level: string | null
          updated_at: string
        }
        Insert: {
          clerk_id: string
          created_at?: string
          display_name?: string | null
          goals?: string | null
          preferred_language?: string | null
          skill_level?: string | null
          updated_at?: string
        }
        Update: {
          clerk_id?: string
          created_at?: string
          display_name?: string | null
          goals?: string | null
          preferred_language?: string | null
          skill_level?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      resource_usage: {
        Row: {
          cards_played: number | null
          efficiency_ratio: number | null
          id: string
          impact_score: number | null
          match_id: string | null
          resources_generated: number | null
          resources_spent: number | null
          turn_number: number | null
        }
        Insert: {
          cards_played?: number | null
          efficiency_ratio?: number | null
          id?: string
          impact_score?: number | null
          match_id?: string | null
          resources_generated?: number | null
          resources_spent?: number | null
          turn_number?: number | null
        }
        Update: {
          cards_played?: number | null
          efficiency_ratio?: number | null
          id?: string
          impact_score?: number | null
          match_id?: string | null
          resources_generated?: number | null
          resources_spent?: number | null
          turn_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "resource_usage_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "resource_usage_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      strategic_insights: {
        Row: {
          action_items: string[] | null
          category: Database["public"]["Enums"]["insight_category_enum"] | null
          clerk_id: string | null
          created_at: string
          estimated_impact: number | null
          id: string
          insight_text: string | null
          priority_level:
            | Database["public"]["Enums"]["priority_level_enum"]
            | null
          supporting_evidence: string[] | null
          time_to_implement: string | null
        }
        Insert: {
          action_items?: string[] | null
          category?: Database["public"]["Enums"]["insight_category_enum"] | null
          clerk_id?: string | null
          created_at?: string
          estimated_impact?: number | null
          id?: string
          insight_text?: string | null
          priority_level?:
            | Database["public"]["Enums"]["priority_level_enum"]
            | null
          supporting_evidence?: string[] | null
          time_to_implement?: string | null
        }
        Update: {
          action_items?: string[] | null
          category?: Database["public"]["Enums"]["insight_category_enum"] | null
          clerk_id?: string | null
          created_at?: string
          estimated_impact?: number | null
          id?: string
          insight_text?: string | null
          priority_level?:
            | Database["public"]["Enums"]["priority_level_enum"]
            | null
          supporting_evidence?: string[] | null
          time_to_implement?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "strategic_insights_clerk_id_fkey"
            columns: ["clerk_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["clerk_id"]
          },
        ]
      }
      weekly_insights: {
        Row: {
          clerk_id: string | null
          created_at: string
          id: string
          next_week_focus: string[] | null
          performance_summary: Json | null
          week_period: string | null
        }
        Insert: {
          clerk_id?: string | null
          created_at?: string
          id?: string
          next_week_focus?: string[] | null
          performance_summary?: Json | null
          week_period?: string | null
        }
        Update: {
          clerk_id?: string | null
          created_at?: string
          id?: string
          next_week_focus?: string[] | null
          performance_summary?: Json | null
          week_period?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "weekly_insights_clerk_id_fkey"
            columns: ["clerk_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["clerk_id"]
          },
        ]
      }
      weekly_insights_insights: {
        Row: {
          strategic_insight_id: string
          weekly_id: string
        }
        Insert: {
          strategic_insight_id: string
          weekly_id: string
        }
        Update: {
          strategic_insight_id?: string
          weekly_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_insights_insights_strategic_insight_id_fkey"
            columns: ["strategic_insight_id"]
            isOneToOne: false
            referencedRelation: "strategic_insights"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weekly_insights_insights_weekly_id_fkey"
            columns: ["weekly_id"]
            isOneToOne: false
            referencedRelation: "weekly_insights"
            referencedColumns: ["id"]
          },
        ]
      }
      weekly_insights_patterns: {
        Row: {
          player_pattern_id: string
          weekly_id: string
        }
        Insert: {
          player_pattern_id: string
          weekly_id: string
        }
        Update: {
          player_pattern_id?: string
          weekly_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "weekly_insights_patterns_player_pattern_id_fkey"
            columns: ["player_pattern_id"]
            isOneToOne: false
            referencedRelation: "player_patterns"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "weekly_insights_patterns_weekly_id_fkey"
            columns: ["weekly_id"]
            isOneToOne: false
            referencedRelation: "weekly_insights"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      match_events_timeline_payload: {
        Row: {
          actor_player_slot: number | null
          event_index: number | null
          event_type: Database["public"]["Enums"]["event_type_enum"] | null
          id: string | null
          match_id: string | null
          occurred_at: string | null
          parent_event_id: string | null
          payload: Json | null
          phase: Database["public"]["Enums"]["phase_enum"] | null
          round_number: number | null
          source_line_refs: number[] | null
          turn_number: number | null
        }
        Insert: {
          actor_player_slot?: number | null
          event_index?: number | null
          event_type?: Database["public"]["Enums"]["event_type_enum"] | null
          id?: string | null
          match_id?: string | null
          occurred_at?: string | null
          parent_event_id?: string | null
          payload?: Json | null
          phase?: Database["public"]["Enums"]["phase_enum"] | null
          round_number?: number | null
          source_line_refs?: number[] | null
          turn_number?: number | null
        }
        Update: {
          actor_player_slot?: number | null
          event_index?: number | null
          event_type?: Database["public"]["Enums"]["event_type_enum"] | null
          id?: string | null
          match_id?: string | null
          occurred_at?: string | null
          parent_event_id?: string | null
          payload?: Json | null
          phase?: Database["public"]["Enums"]["phase_enum"] | null
          round_number?: number | null
          source_line_refs?: number[] | null
          turn_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "match_events_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_events_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_events_parent_event_id_fkey"
            columns: ["parent_event_id"]
            isOneToOne: false
            referencedRelation: "match_events"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_events_parent_event_id_fkey"
            columns: ["parent_event_id"]
            isOneToOne: false
            referencedRelation: "match_events_timeline_payload"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_events_parent_event_id_fkey"
            columns: ["parent_event_id"]
            isOneToOne: false
            referencedRelation: "vw_attacks"
            referencedColumns: ["event_id"]
          },
          {
            foreignKeyName: "match_events_parent_event_id_fkey"
            columns: ["parent_event_id"]
            isOneToOne: false
            referencedRelation: "vw_card_plays"
            referencedColumns: ["event_id"]
          },
        ]
      }
      match_history: {
        Row: {
          deck_archetype: string | null
          event_count: number | null
          game_outcome: Database["public"]["Enums"]["game_outcome_enum"] | null
          id: string | null
          opponent_archetype: string | null
          owner_clerk_id: string | null
          player1: string | null
          player2: string | null
          session_date: string | null
          total_turns: number | null
        }
        Insert: {
          deck_archetype?: string | null
          event_count?: never
          game_outcome?: Database["public"]["Enums"]["game_outcome_enum"] | null
          id?: string | null
          opponent_archetype?: string | null
          owner_clerk_id?: string | null
          player1?: never
          player2?: never
          session_date?: string | null
          total_turns?: number | null
        }
        Update: {
          deck_archetype?: string | null
          event_count?: never
          game_outcome?: Database["public"]["Enums"]["game_outcome_enum"] | null
          id?: string | null
          opponent_archetype?: string | null
          owner_clerk_id?: string | null
          player1?: never
          player2?: never
          session_date?: string | null
          total_turns?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "matches_owner_clerk_id_fkey"
            columns: ["owner_clerk_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["clerk_id"]
          },
        ]
      }
      vw_attacks: {
        Row: {
          actor_player_slot: number | null
          attacker_ap: number | null
          attacker_instance_id: string | null
          event_id: string | null
          event_index: number | null
          match_id: string | null
          payload: Json | null
          target_base_card_id: string | null
          target_instance_id: string | null
          turn_number: number | null
        }
        Insert: {
          actor_player_slot?: number | null
          attacker_ap?: number | null
          attacker_instance_id?: string | null
          event_id?: string | null
          event_index?: number | null
          match_id?: string | null
          payload?: Json | null
          target_base_card_id?: string | null
          target_instance_id?: string | null
          turn_number?: number | null
        }
        Update: {
          actor_player_slot?: number | null
          attacker_ap?: number | null
          attacker_instance_id?: string | null
          event_id?: string | null
          event_index?: number | null
          match_id?: string | null
          payload?: Json | null
          target_base_card_id?: string | null
          target_instance_id?: string | null
          turn_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "match_events_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_events_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
      vw_card_plays: {
        Row: {
          actor_player_slot: number | null
          card_id: string | null
          cost_paid: number | null
          event_id: string | null
          event_index: number | null
          instance_id: string | null
          match_id: string | null
          payload: Json | null
          turn_number: number | null
        }
        Insert: {
          actor_player_slot?: number | null
          card_id?: string | null
          cost_paid?: number | null
          event_id?: string | null
          event_index?: number | null
          instance_id?: string | null
          match_id?: string | null
          payload?: Json | null
          turn_number?: number | null
        }
        Update: {
          actor_player_slot?: number | null
          card_id?: string | null
          cost_paid?: number | null
          event_id?: string | null
          event_index?: number | null
          instance_id?: string | null
          match_id?: string | null
          payload?: Json | null
          turn_number?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "match_events_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "match_history"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "match_events_match_id_fkey"
            columns: ["match_id"]
            isOneToOne: false
            referencedRelation: "matches"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Functions: {
      auth_clerk_id: {
        Args: Record<PropertyKey, never>
        Returns: string
      }
    }
    Enums: {
      card_type_enum:
        | "unit"
        | "pilot"
        | "command"
        | "base"
        | "resource"
        | "token"
      change_status_enum: "rested" | "readied"
      character_kind_enum: "unit" | "pilot"
      decision_type_enum:
        | "combat"
        | "resource_management"
        | "card_play"
        | "target_selection"
      effect_scope_enum: "regular" | "link"
      event_type_enum:
        | "resource_payment"
        | "card_played"
        | "pilot_paired"
        | "token_deployed"
        | "base_set"
        | "status_change"
        | "ability_activated"
        | "search_resolved"
        | "hand_change"
        | "attack_declared"
        | "block_declared"
        | "damage_resolved"
        | "unit_removed"
        | "phase_marker"
        | "pass_action"
      game_outcome_enum: "win" | "loss" | "draw"
      hand_change_type_enum: "draw" | "discard" | "add_to_hand"
      improvement_trend_enum: "improving" | "declining" | "stable"
      insight_category_enum:
        | "tactical"
        | "strategic"
        | "technical"
        | "psychological"
      marker_type_enum:
        | "round_start"
        | "round_end"
        | "phase_start"
        | "phase_end"
      pattern_type_enum: "weakness" | "strength" | "tendency"
      phase_enum: "draw" | "resource" | "main" | "combat" | "end"
      priority_level_enum: "high" | "medium" | "low"
      recommendation_type_enum: "immediate" | "short_term" | "long_term"
      target_type_enum: "unit" | "base" | "player"
      zone_enum: "battle" | "base" | "hand" | "resource" | "shield" | "other"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  graphql_public: {
    Enums: {},
  },
  public: {
    Enums: {
      card_type_enum: ["unit", "pilot", "command", "base", "resource", "token"],
      change_status_enum: ["rested", "readied"],
      character_kind_enum: ["unit", "pilot"],
      decision_type_enum: [
        "combat",
        "resource_management",
        "card_play",
        "target_selection",
      ],
      effect_scope_enum: ["regular", "link"],
      event_type_enum: [
        "resource_payment",
        "card_played",
        "pilot_paired",
        "token_deployed",
        "base_set",
        "status_change",
        "ability_activated",
        "search_resolved",
        "hand_change",
        "attack_declared",
        "block_declared",
        "damage_resolved",
        "unit_removed",
        "phase_marker",
        "pass_action",
      ],
      game_outcome_enum: ["win", "loss", "draw"],
      hand_change_type_enum: ["draw", "discard", "add_to_hand"],
      improvement_trend_enum: ["improving", "declining", "stable"],
      insight_category_enum: [
        "tactical",
        "strategic",
        "technical",
        "psychological",
      ],
      marker_type_enum: [
        "round_start",
        "round_end",
        "phase_start",
        "phase_end",
      ],
      pattern_type_enum: ["weakness", "strength", "tendency"],
      phase_enum: ["draw", "resource", "main", "combat", "end"],
      priority_level_enum: ["high", "medium", "low"],
      recommendation_type_enum: ["immediate", "short_term", "long_term"],
      target_type_enum: ["unit", "base", "player"],
      zone_enum: ["battle", "base", "hand", "resource", "shield", "other"],
    },
  },
} as const

