import { MergeDeep } from "type-fest";
import { Database as DatabaseGenerated } from "../generated.types";
import { EventPayloadByType, EventType, Phase } from "./events";

// Deeply override generated types to replace generic JSON payloads with
// strongly-typed event payloads, and align enums to TS unions.
type Overrides = {
  public: {
    Enums: {
      event_type_enum: EventType;
      phase_enum: Phase;
    };
    Tables: {
      match_events: {
        Row: {
          event_type: EventType;
          payload: EventPayloadByType[EventType];
          payload_version: number;
        };
        Insert: {
          event_type?: EventType;
          payload?: EventPayloadByType[EventType];
          payload_version?: number;
        };
        Update: {
          event_type?: EventType;
          payload?: EventPayloadByType[EventType];
          payload_version?: number;
        };
      };
    };
    Views: {
      match_events_timeline_payload: {
        Row: {
          payload: EventPayloadByType[EventType];
        };
      };
      vw_card_plays: {
        Row: {
          payload: EventPayloadByType["card_played"];
        };
      };
      vw_attacks: {
        Row: {
          payload: EventPayloadByType["attack_declared"];
        };
      };
    };
  };
};

export type Database = MergeDeep<DatabaseGenerated, Overrides>;
