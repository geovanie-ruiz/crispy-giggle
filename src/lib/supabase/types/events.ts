// Event payload TypeScript types matching Postgres event_type_enum and JSON payload keys
// These types reflect the payload-first model in supabase/migrations/..._init_schema.sql

export type UUID = string;

// Enums (mirror Postgres enums)
export type Phase = "draw" | "resource" | "main" | "combat" | "end";
export type MarkerType =
  | "round_start"
  | "round_end"
  | "phase_start"
  | "phase_end";
export type HandChangeType = "draw" | "discard" | "add_to_hand";
export type ChangeStatus = "rested" | "readied";
export type EffectScope = "regular" | "link";

export type EventType =
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
  | "pass_action";

// Individual payload shapes (minimal, based on indexed JSON keys + likely fields)
export interface ResourcePaymentPayload {
  cost_paid: number; // total resources paid
  sources?: Array<"resource" | "hand" | "effect" | string>;
}

export interface CardPlayedPayload {
  card_id: UUID; // base card id
  instance_id?: UUID; // created instance (if tracked at play)
  cost_paid: number;
  zone_from?: "hand" | "search" | "deck" | "discard" | "other";
  scope?: EffectScope; // if originated via an effect
}

export interface PilotPairedPayload {
  // Either provide explicit pilot/unit or rely on instance/target convention
  pilot_instance_id?: UUID;
  unit_instance_id?: UUID;
  instance_id?: UUID; // pilot
  target_instance_id?: UUID; // unit
}

export interface TokenDeployedPayload {
  instance_id: UUID;
  card_id?: UUID; // token base card if represented in catalog
  token_kind?: string; // e.g., "Shield", "Harassment Token"
}

export interface BaseSetPayload {
  card_id: UUID;
  instance_id?: UUID;
  slot_index?: number; // base slot if board has multiple base slots
}

export interface StatusChangePayload {
  target_instance_id: UUID;
  status: ChangeStatus; // rested/readied
}

export interface AbilityActivatedPayload {
  instance_id?: UUID; // source instance activating the ability
  card_id?: UUID; // source card (if instance not known)
  effect_index?: number; // maps to card_effects.effect_index where applicable
  scope?: EffectScope; // regular vs link-only (pilot)
  cost_paid?: number; // resources paid as part of activation
}

export interface SearchResolvedPayload {
  query?: string;
  found_card_ids?: UUID[];
  chosen_card_id?: UUID;
  results_count?: number;
}

export interface HandChangePayload {
  change: HandChangeType; // draw | discard | add_to_hand
  count?: number;
  card_ids?: UUID[]; // optional concrete list if known
}

export interface AttackDeclaredPayload {
  attacker_instance_id: UUID;
  attacker_ap?: number; // attacker AP at declaration
  target_instance_id?: UUID; // defending unit, if any
  target_base_card_id?: UUID; // if attacking a base instead of a unit
}

export interface BlockDeclaredPayload {
  blocker_instance_id: UUID;
  attacker_instance_id: UUID;
}

export interface DamageResolvedPayload {
  amount: number;
  target_instance_id?: UUID;
  target_base_card_id?: UUID;
  source_instance_id?: UUID; // often the attacker
  overkill?: number;
}

export interface UnitRemovedPayload {
  instance_id: UUID;
  reason?: "destroyed" | "returned" | "sacrificed" | "other";
}

export interface PhaseMarkerPayload {
  marker: MarkerType;
  phase?: Phase; // redundant with column, but allowed
  round_number?: number;
}

export interface PassActionPayload {
  reason?: string;
}

// Mapping of event type to payload
export interface EventPayloadByType {
  resource_payment: ResourcePaymentPayload;
  card_played: CardPlayedPayload;
  pilot_paired: PilotPairedPayload;
  token_deployed: TokenDeployedPayload;
  base_set: BaseSetPayload;
  status_change: StatusChangePayload;
  ability_activated: AbilityActivatedPayload;
  search_resolved: SearchResolvedPayload;
  hand_change: HandChangePayload;
  attack_declared: AttackDeclaredPayload;
  block_declared: BlockDeclaredPayload;
  damage_resolved: DamageResolvedPayload;
  unit_removed: UnitRemovedPayload;
  phase_marker: PhaseMarkerPayload;
  pass_action: PassActionPayload;
}

export type AnyEventPayload = EventPayloadByType[EventType];

// Row helper shapes (useful for typed narrowing on payload)
export interface MatchEventRowBase {
  id: UUID;
  match_id: UUID;
  event_type: EventType;
  payload: unknown;
  turn_number: number | null;
  round_number: number | null;
  phase: Phase | null;
  actor_player_slot: 1 | 2 | null;
  payload_version: number; // from column
}

export type TypedMatchEventRow<T extends EventType> =
  & Omit<MatchEventRowBase, "event_type" | "payload">
  & {
    event_type: T;
    payload: EventPayloadByType[T];
  };

export function isEventType<T extends EventType>(
  row: MatchEventRowBase,
  type: T,
): row is TypedMatchEventRow<T> {
  return row.event_type === type;
}
