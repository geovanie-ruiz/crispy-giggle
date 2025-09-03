-- =============================================================
-- GCG Coach - Initial Schema (MVP)
-- Organized by: extensions -> enums -> helper functions -> models -> RLS -> triggers -> vectors -> views
-- Notes:
-- - Clerk is the auth provider. RLS policies assume JWT 'sub' contains the Clerk ID.
-- - Uses gen_random_uuid() from pgcrypto extension.
-- - Event model is payload-first (event_type enum + JSONB payload) with indexes for scalability.
-- =============================================================
-- =====================
-- Extensions
-- =====================
create extension if not exists "pgcrypto";

-- create extension if not exists "vector";
-- =====================
-- Enums (stable, low-churn domains)
-- =====================
do $$ begin
	-- game phases
	create type phase_enum as enum ('draw','resource','main','combat','end');
exception when duplicate_object then null; end $$;

do $$ begin
	-- match outcome
	create type game_outcome_enum as enum ('win','loss','draw');
exception when duplicate_object then null; end $$;

do $$ begin
	create type improvement_trend_enum as enum ('improving','declining','stable');
exception when duplicate_object then null; end $$;

do $$ begin
	create type priority_level_enum as enum ('high','medium','low');
exception when duplicate_object then null; end $$;

do $$ begin
	create type decision_type_enum as enum ('combat','resource_management','card_play','target_selection');
exception when duplicate_object then null; end $$;

do $$ begin
	create type recommendation_type_enum as enum ('immediate','short_term','long_term');
exception when duplicate_object then null; end $$;

do $$ begin
	create type pattern_type_enum as enum ('weakness','strength','tendency');
exception when duplicate_object then null; end $$;

do $$ begin
	create type insight_category_enum as enum ('tactical','strategic','technical','psychological');
exception when duplicate_object then null; end $$;

do $$ begin
	create type target_type_enum as enum ('unit','base','player');
exception when duplicate_object then null; end $$;

do $$ begin
	create type marker_type_enum as enum ('round_start','round_end','phase_start','phase_end');
exception when duplicate_object then null; end $$;

do $$ begin
	create type zone_enum as enum ('battle','base','hand','resource','shield','other');
exception when duplicate_object then null; end $$;

do $$ begin
	create type change_status_enum as enum ('rested','readied');
exception when duplicate_object then null; end $$;

do $$ begin
	create type hand_change_type_enum as enum ('draw','discard','add_to_hand');
exception when duplicate_object then null; end $$;

do $$ begin
	-- event types registry enum (aligns with subtype tables and allows easy addition)
	create type event_type_enum as enum (
		'resource_payment',
		'card_played',
		'pilot_paired',
		'token_deployed',
		'base_set',
		'status_change',
		'ability_activated',
		'search_resolved',
		'hand_change',
		'attack_declared',
		'block_declared',
		'damage_resolved',
		'unit_removed',
		'phase_marker',
		'pass_action'
	);
exception when duplicate_object then null; end $$;

do $$ begin
	-- card types (for multi-type support)
	create type card_type_enum as enum ('unit','pilot','command','base','resource','token');
exception when duplicate_object then null; end $$;

do $$ begin
	-- characters featured on cards
	create type character_kind_enum as enum ('unit','pilot');
exception when duplicate_object then null; end $$;

do $$ begin
	-- scope of a card effect (regular text vs link-only for pilots)
	create type effect_scope_enum as enum ('regular','link');
exception when duplicate_object then null; end $$;

-- =====================
-- Helper functions
-- =====================
-- Return Clerk ID from JWT 'sub'. Works with external auth if JWT is forwarded.
create
or replace function auth_clerk_id () returns text language sql stable as $$
	select coalesce(nullif(current_setting('request.jwt.claims', true), '')::jsonb->>'sub', '');
$$;

-- Simple updated_at trigger helper
create
or replace function set_updated_at () returns trigger language plpgsql as $$
begin
	new.updated_at = now();
	return new;
end;
$$;

-- =====================
-- Models (tables, indexes, FKs)
-- =====================
-- Profiles (Clerk-managed identity; app profile data only)
create table if not exists
  profiles (
    clerk_id text primary key,
    display_name text,
    preferred_language varchar(8) default 'en',
    skill_level text check (
      skill_level in ('beginner', 'intermediate', 'advanced')
    ) default 'beginner',
    goals text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  );

create index if not exists profiles_language_idx on profiles (preferred_language);

-- Card catalog
create table if not exists
  card_sets (
    id uuid primary key default gen_random_uuid (),
    code text unique not null,
    name text not null,
    release_date date
  );

create table if not exists
  cards (
    id uuid primary key default gen_random_uuid (),
    set_id uuid references card_sets (id) on delete set null,
    set_code text,
    card_number text,
    full_number text,
    name text not null,
    -- primary type retained for convenience; see card_types for multi-type mapping
    type text check (
      type in (
        'unit',
        'pilot',
        'command',
        'base',
        'resource',
        'token'
      )
    ) not null,
    color text check (
      color in ('blue', 'green', 'red', 'white', 'purple')
      or color is null
    ),
    level int,
    cost int,
    ap int,
    hp int,
    rarity text,
    subtitle text, -- e.g., specific model identifier for units
    card_text text, -- rules text printed on the card
    link_text text, -- for pilot cards: link-specific rules text
    art_id uuid, -- reference/id for card art asset
    -- Full-text search vector generated from name, subtitle, card_text, and link_text
    search_vector tsvector generated always as (
      setweight(to_tsvector('english', coalesce(name, '')), 'A') || setweight(
        to_tsvector('english', coalesce(subtitle, '')),
        'B'
      ) || setweight(
        to_tsvector('english', coalesce(card_text, '')),
        'C'
      ) || setweight(
        to_tsvector('english', coalesce(link_text, '')),
        'C'
      )
    ) stored,
    link_condition text,
    is_token boolean not null default false,
    metadata jsonb,
    created_at timestamptz not null default now()
  );

create index if not exists cards_by_type_idx on cards (
  type
);

create index if not exists cards_fullnumber_idx on cards (full_number);

-- enforce uniqueness of a print by full_number + rarity (reprints possible with different rarity)
alter table cards
add constraint cards_full_number_rarity_unique unique (full_number, rarity);

-- Full-text GIN index for search
create index if not exists cards_search_vector_idx on cards using gin (search_vector);

create table if not exists
  card_traits (
    card_id uuid references cards (id) on delete cascade,
    trait text not null,
    primary key (card_id, trait)
  );

create index if not exists card_traits_trait_idx on card_traits (trait);

-- Multi-type mapping for cards (supports cards that are both command and pilot, etc.)
create table if not exists
  card_types (
    card_id uuid references cards (id) on delete cascade,
    card_type card_type_enum not null,
    primary key (card_id, card_type)
  );

create index if not exists card_types_type_idx on card_types (card_type);

-- Characters (Units and Pilots) normalized for cross-card linking
create table if not exists
  characters (
    id uuid primary key default gen_random_uuid (),
    name text not null,
    kind character_kind_enum not null,
    alt_names text[],
    metadata jsonb,
    created_at timestamptz not null default now()
  );

-- Link cards to featured characters (one card may feature multiple; one character appears on many cards)
create table if not exists
  card_characters (
    card_id uuid references cards (id) on delete cascade,
    character_id uuid references characters (id) on delete cascade,
    role text,
    primary key (card_id, character_id)
  );

-- Card effects broken down with optional timings, restrictions, and costs
create table if not exists
  card_effects (
    id uuid primary key default gen_random_uuid (),
    card_id uuid references cards (id) on delete cascade,
    effect_index int not null, -- ordering on the card text
    scope effect_scope_enum not null default 'regular', -- regular card text vs pilot link text
    timings text[], -- e.g., ['main'] or more specific textual timings
    restrictions text[], -- e.g., ['once_per_turn']
    cost_resources int, -- resource cost, if applicable
    cost_description text, -- free-form for non-resource or additional costs
    effect_text text not null,
    unique (card_id, effect_index, scope)
  );

create index if not exists card_effects_card_idx on card_effects (card_id);

-- Decks (optional for MVP but useful)
create table if not exists
  decks (
    id uuid primary key default gen_random_uuid (),
    owner_clerk_id text references profiles (clerk_id) on delete cascade,
    name text not null,
    archetype text,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  );

create index if not exists decks_owner_idx on decks (owner_clerk_id);

create table if not exists
  deck_cards (
    deck_id uuid references decks (id) on delete cascade,
    card_id uuid references cards (id) on delete restrict,
    quantity int not null check (quantity > 0),
    primary key (deck_id, card_id)
  );

-- Match ingestion
create table if not exists
  match_ingestions (
    id uuid primary key default gen_random_uuid (),
    owner_clerk_id text references profiles (clerk_id) on delete cascade,
    source text,
    format_version text,
    raw_text text not null,
    created_at timestamptz not null default now()
  );

create index if not exists match_ingestions_owner_idx on match_ingestions (owner_clerk_id);

-- Matches
create table if not exists
  matches (
    id uuid primary key default gen_random_uuid (),
    owner_clerk_id text references profiles (clerk_id) on delete cascade,
    ingestion_id uuid references match_ingestions (id) on delete set null,
    session_date timestamptz,
    total_turns int,
    deck_archetype text,
    opponent_archetype text,
    game_outcome game_outcome_enum,
    created_at timestamptz not null default now(),
    updated_at timestamptz not null default now()
  );

create index if not exists matches_owner_idx on matches (owner_clerk_id);

create table if not exists
  match_players (
    id uuid primary key default gen_random_uuid (),
    match_id uuid references matches (id) on delete cascade,
    player_slot smallint not null check (player_slot in (1, 2)),
    clerk_id text references profiles (clerk_id),
    display_name text,
    is_owner boolean default false,
    deck_id uuid references decks (id) on delete set null,
    deck_archetype text,
    unique (match_id, player_slot)
  );

create index if not exists match_players_by_match_idx on match_players (match_id);

-- Instances of cards within a match timeline
create table if not exists
  match_card_instances (
    id uuid primary key default gen_random_uuid (),
    match_id uuid references matches (id) on delete cascade,
    controller_player_slot smallint check (controller_player_slot in (1, 2)),
    card_id uuid references cards (id) on delete restrict,
    instance_label text,
    is_token boolean not null default false,
    created_event_id uuid,
    destroyed_event_id uuid,
    created_at timestamptz not null default now()
  );

create index if not exists mci_match_idx on match_card_instances (match_id);

-- Canonical events header
create table if not exists
  match_events (
    id uuid primary key default gen_random_uuid (),
    match_id uuid references matches (id) on delete cascade,
    event_index int not null,
    turn_number int,
    round_number int,
    phase phase_enum,
    event_type text not null, -- converted to enum below
    actor_player_slot smallint check (actor_player_slot in (1, 2)),
    parent_event_id uuid references match_events (id) on delete set null,
    source_line_refs int[],
    occurred_at timestamptz,
    created_at timestamptz not null default now(),
    unique (match_id, event_index)
  );

create index if not exists match_events_match_idx on match_events (match_id, event_index);

create index if not exists match_events_type_idx on match_events (event_type);

-- Convert event_type to enum and add flexible payload (for forward-compatible modeling)
alter table match_events
alter column event_type
type event_type_enum using event_type::event_type_enum;

alter table match_events
add column if not exists payload jsonb not null default '{}'::jsonb;

-- Versioning to manage payload evolution
alter table match_events
add column if not exists payload_version smallint not null default 1;

-- Generated columns for hot fields to keep queries/indexes ergonomic
alter table match_events
add column if not exists card_id uuid generated always as (nullif(payload ->> 'card_id', '')::uuid) stored,
add column if not exists instance_id uuid generated always as (nullif(payload ->> 'instance_id', '')::uuid) stored,
add column if not exists attacker_instance_id uuid generated always as (
  nullif(payload ->> 'attacker_instance_id', '')::uuid
) stored,
add column if not exists target_instance_id uuid generated always as (
  nullif(payload ->> 'target_instance_id', '')::uuid
) stored,
add column if not exists target_base_card_id uuid generated always as (
  nullif(payload ->> 'target_base_card_id', '')::uuid
) stored,
add column if not exists attacker_ap int generated always as ((payload ->> 'attacker_ap')::int) stored,
add column if not exists cost_paid int generated always as ((payload ->> 'cost_paid')::int) stored;

-- JSONB indexing for flexible queries
create index if not exists match_events_payload_gin_idx on match_events using gin (payload);

-- Common example: index by card_id inside payload for card_played events
create index if not exists match_events_card_played_card_idx on match_events ((payload ->> 'card_id'))
where
  event_type = 'card_played';

-- Example: index attacker_instance_id for attack_declared events
create index if not exists match_events_attack_attacker_idx on match_events ((payload ->> 'attacker_instance_id'))
where
  event_type = 'attack_declared';

-- Indexes on generated columns
create index if not exists me_by_type_turn_phase_idx on match_events (match_id, event_type, turn_number, phase);

create index if not exists me_card_id_idx on match_events (event_type, card_id);

create index if not exists me_instance_id_idx on match_events (event_type, instance_id);

create index if not exists me_attacker_idx on match_events (event_type, attacker_instance_id);

create index if not exists me_target_idx on match_events (event_type, target_instance_id);

-- Lightweight validation constraints (NOT VALID; validate after backfill if desired)
alter table match_events
add constraint me_card_played_required_fields check (
  event_type <> 'card_played'
  or (
    card_id is not null
    and cost_paid is not null
  )
) not valid;

alter table match_events
add constraint me_attack_declared_required_fields check (
  event_type <> 'attack_declared'
  or (
    attacker_instance_id is not null
    and attacker_ap is not null
  )
) not valid;

-- Optional registry of event types with schemas (app-enforced validation)
create table if not exists
  event_types (
    name event_type_enum primary key,
    version int default 1,
    description text,
    json_schema jsonb
  );

alter table event_types enable row level security;

create policy event_types_public_select on event_types for
select
  using (true);

-- NOTE: Event subtype tables removed in favor of payload-first modeling.
-- Insights schema (aligned to gundam_feedback_schema.md)
create table if not exists
  game_sessions (
    match_id uuid primary key references matches (id) on delete cascade,
    player_clerk_id text references profiles (clerk_id) on delete cascade,
    opponent_archetype text,
    game_outcome game_outcome_enum,
    total_turns int,
    session_date timestamptz,
    deck_archetype text
  );

create table if not exists
  decision_points (
    id uuid primary key default gen_random_uuid (),
    match_id uuid references matches (id) on delete cascade,
    event_id uuid references match_events (id) on delete cascade,
    turn_number int,
    phase phase_enum,
    decision_type decision_type_enum,
    chosen_action text,
    alternative_actions text[],
    reasoning text,
    confidence_level int check (confidence_level between 1 and 10),
    outcome_satisfaction int check (outcome_satisfaction between 1 and 10),
    immediate_result text,
    created_at timestamptz not null default now()
  );

create table if not exists
  resource_usage (
    id uuid primary key default gen_random_uuid (),
    match_id uuid references matches (id) on delete cascade,
    turn_number int,
    resources_spent int,
    resources_generated int,
    efficiency_ratio numeric,
    cards_played int,
    impact_score int check (impact_score between 1 and 10)
  );

create table if not exists
  combat_decisions (
    id uuid primary key default gen_random_uuid (),
    match_id uuid references matches (id) on delete cascade,
    turn_number int,
    attack_event_id uuid references match_events (id) on delete set null,
    attack_target text,
    damage_dealt int,
    damage_received int,
    units_lost int,
    opponent_units_lost int,
    tactical_advantage_gained boolean,
    alternative_targets_available text[]
  );

create table if not exists
  card_advantage (
    id uuid primary key default gen_random_uuid (),
    match_id uuid references matches (id) on delete cascade,
    turn_number int,
    cards_in_hand int,
    cards_drawn int,
    cards_played int,
    opponent_estimated_hand_size int,
    advantage_differential int,
    advantage_source text
  );

create table if not exists
  performance_metrics (
    id uuid primary key default gen_random_uuid (),
    clerk_id text references profiles (clerk_id) on delete cascade,
    time_period text,
    win_rate numeric,
    combat_win_rate numeric,
    resource_efficiency_avg numeric,
    decision_satisfaction_avg numeric,
    prediction_accuracy_rate numeric,
    games_analyzed int,
    improvement_trend improvement_trend_enum,
    generated_at timestamptz not null default now()
  );

create index if not exists performance_metrics_user_period_idx on performance_metrics (clerk_id, time_period);

create table if not exists
  player_patterns (
    id uuid primary key default gen_random_uuid (),
    clerk_id text references profiles (clerk_id) on delete cascade,
    pattern_type pattern_type_enum,
    pattern_description text,
    frequency int,
    confidence numeric,
    impact_on_winrate numeric,
    recommendation text,
    examples text[]
  );

create table if not exists
  strategic_insights (
    id uuid primary key default gen_random_uuid (),
    clerk_id text references profiles (clerk_id) on delete cascade,
    category insight_category_enum,
    insight_text text,
    supporting_evidence text[],
    action_items text[],
    priority_level priority_level_enum,
    estimated_impact numeric,
    time_to_implement text,
    created_at timestamptz not null default now()
  );

create table if not exists
  opponent_adaptations (
    id uuid primary key default gen_random_uuid (),
    clerk_id text references profiles (clerk_id) on delete cascade,
    opponent_archetype text,
    predicted_play text,
    actual_play text,
    prediction_accuracy boolean,
    adaptation_success boolean,
    lessons_learned text,
    created_at timestamptz not null default now()
  );

create table if not exists
  weekly_insights (
    id uuid primary key default gen_random_uuid (),
    clerk_id text references profiles (clerk_id) on delete cascade,
    week_period text,
    performance_summary jsonb,
    next_week_focus text[],
    created_at timestamptz not null default now()
  );

create table if not exists
  weekly_insights_insights (
    weekly_id uuid references weekly_insights (id) on delete cascade,
    strategic_insight_id uuid references strategic_insights (id) on delete cascade,
    primary key (weekly_id, strategic_insight_id)
  );

create table if not exists
  weekly_insights_patterns (
    weekly_id uuid references weekly_insights (id) on delete cascade,
    player_pattern_id uuid references player_patterns (id) on delete cascade,
    primary key (weekly_id, player_pattern_id)
  );

create table if not exists
  decision_quality (
    id uuid primary key default gen_random_uuid (),
    match_id uuid references matches (id) on delete cascade,
    overall_score numeric,
    tactical_score numeric,
    strategic_score numeric,
    risk_assessment_score numeric,
    adaptation_score numeric,
    areas_for_improvement text[],
    strengths_identified text[]
  );

create table if not exists
  player_recommendations (
    id uuid primary key default gen_random_uuid (),
    clerk_id text references profiles (clerk_id) on delete cascade,
    recommendation_type recommendation_type_enum,
    category text,
    title text,
    description text,
    expected_impact numeric,
    difficulty_level int check (difficulty_level between 1 and 5),
    time_investment text,
    success_metrics text[],
    related_patterns text[],
    created_at timestamptz not null default now()
  );

create table if not exists
  insight_event_links (
    id uuid primary key default gen_random_uuid (),
    match_id uuid references matches (id) on delete cascade,
    event_id uuid references match_events (id) on delete cascade,
    insight_kind text check (
      insight_kind in (
        'decision_point',
        'strategic_insight',
        'player_pattern',
        'opponent_adaptation',
        'weekly_insight',
        'decision_quality',
        'player_recommendation'
      )
    ),
    insight_id uuid not null,
    notes text
  );

create index if not exists insight_event_links_event_idx on insight_event_links (match_id, event_id);

create index if not exists insight_event_links_insight_idx on insight_event_links (insight_kind, insight_id);

-- =====================
-- Row Level Security (RLS)
-- Assumes auth_clerk_id() returns Clerk ID from JWT 'sub'
-- =====================
-- Enable RLS
alter table profiles enable row level security;

alter table decks enable row level security;

alter table deck_cards enable row level security;

alter table match_ingestions enable row level security;

alter table matches enable row level security;

alter table match_players enable row level security;

alter table match_card_instances enable row level security;

alter table match_events enable row level security;

alter table game_sessions enable row level security;

alter table decision_points enable row level security;

alter table resource_usage enable row level security;

alter table combat_decisions enable row level security;

alter table card_advantage enable row level security;

alter table performance_metrics enable row level security;

alter table player_patterns enable row level security;

alter table strategic_insights enable row level security;

alter table opponent_adaptations enable row level security;

alter table weekly_insights enable row level security;

alter table weekly_insights_insights enable row level security;

alter table weekly_insights_patterns enable row level security;

alter table decision_quality enable row level security;

alter table player_recommendations enable row level security;

alter table insight_event_links enable row level security;

-- Cards: public readable (SELECT for all), mutations via service role only
alter table card_sets enable row level security;

alter table cards enable row level security;

alter table card_traits enable row level security;

alter table card_types enable row level security;

alter table characters enable row level security;

alter table card_characters enable row level security;

alter table card_effects enable row level security;

create policy profiles_self_select on profiles for
select
  using (clerk_id = auth_clerk_id ());

create policy profiles_self_insert on profiles for insert
with
  check (clerk_id = auth_clerk_id ());

create policy profiles_self_update on profiles for
update using (clerk_id = auth_clerk_id ())
with
  check (clerk_id = auth_clerk_id ());

create policy decks_owner_select on decks for
select
  using (owner_clerk_id = auth_clerk_id ());

create policy decks_owner_insert on decks for insert
with
  check (owner_clerk_id = auth_clerk_id ());

create policy decks_owner_update on decks for
update using (owner_clerk_id = auth_clerk_id ());

create policy decks_owner_delete on decks for delete using (owner_clerk_id = auth_clerk_id ());

create policy deck_cards_owner_all on deck_cards for all using (
  exists (
    select
      1
    from
      decks d
    where
      d.id = deck_id
      and d.owner_clerk_id = auth_clerk_id ()
  )
)
with
  check (
    exists (
      select
        1
      from
        decks d
      where
        d.id = deck_id
        and d.owner_clerk_id = auth_clerk_id ()
    )
  );

create policy mi_owner_all on match_ingestions for all using (owner_clerk_id = auth_clerk_id ())
with
  check (owner_clerk_id = auth_clerk_id ());

create policy matches_owner_all on matches for all using (owner_clerk_id = auth_clerk_id ())
with
  check (owner_clerk_id = auth_clerk_id ());

create policy match_players_by_owner on match_players for all using (
  exists (
    select
      1
    from
      matches m
    where
      m.id = match_id
      and m.owner_clerk_id = auth_clerk_id ()
  )
)
with
  check (
    exists (
      select
        1
      from
        matches m
      where
        m.id = match_id
        and m.owner_clerk_id = auth_clerk_id ()
    )
  );

-- For all match-scoped tables, grant via owning match
create policy mci_by_owner on match_card_instances for all using (
  exists (
    select
      1
    from
      matches m
    where
      m.id = match_id
      and m.owner_clerk_id = auth_clerk_id ()
  )
)
with
  check (
    exists (
      select
        1
      from
        matches m
      where
        m.id = match_id
        and m.owner_clerk_id = auth_clerk_id ()
    )
  );

create policy me_by_owner on match_events for all using (
  exists (
    select
      1
    from
      matches m
    where
      m.id = match_id
      and m.owner_clerk_id = auth_clerk_id ()
  )
)
with
  check (
    exists (
      select
        1
      from
        matches m
      where
        m.id = match_id
        and m.owner_clerk_id = auth_clerk_id ()
    )
  );

-- Insights scope: owner via match or direct user
create policy gs_owner on game_sessions for all using (player_clerk_id = auth_clerk_id ())
with
  check (player_clerk_id = auth_clerk_id ());

create policy dp_owner on decision_points for all using (
  exists (
    select
      1
    from
      matches m
    where
      m.id = match_id
      and m.owner_clerk_id = auth_clerk_id ()
  )
)
with
  check (
    exists (
      select
        1
      from
        matches m
      where
        m.id = match_id
        and m.owner_clerk_id = auth_clerk_id ()
    )
  );

create policy ru_owner on resource_usage for all using (
  exists (
    select
      1
    from
      matches m
    where
      m.id = match_id
      and m.owner_clerk_id = auth_clerk_id ()
  )
)
with
  check (
    exists (
      select
        1
      from
        matches m
      where
        m.id = match_id
        and m.owner_clerk_id = auth_clerk_id ()
    )
  );

create policy cd_owner on combat_decisions for all using (
  exists (
    select
      1
    from
      matches m
    where
      m.id = match_id
      and m.owner_clerk_id = auth_clerk_id ()
  )
)
with
  check (
    exists (
      select
        1
      from
        matches m
      where
        m.id = match_id
        and m.owner_clerk_id = auth_clerk_id ()
    )
  );

create policy ca_owner on card_advantage for all using (
  exists (
    select
      1
    from
      matches m
    where
      m.id = match_id
      and m.owner_clerk_id = auth_clerk_id ()
  )
)
with
  check (
    exists (
      select
        1
      from
        matches m
      where
        m.id = match_id
        and m.owner_clerk_id = auth_clerk_id ()
    )
  );

create policy pm_owner on performance_metrics for all using (clerk_id = auth_clerk_id ())
with
  check (clerk_id = auth_clerk_id ());

create policy patt_owner on player_patterns for all using (clerk_id = auth_clerk_id ())
with
  check (clerk_id = auth_clerk_id ());

create policy si_owner on strategic_insights for all using (clerk_id = auth_clerk_id ())
with
  check (clerk_id = auth_clerk_id ());

create policy oa_owner on opponent_adaptations for all using (clerk_id = auth_clerk_id ())
with
  check (clerk_id = auth_clerk_id ());

create policy wi_owner on weekly_insights for all using (clerk_id = auth_clerk_id ())
with
  check (clerk_id = auth_clerk_id ());

create policy wii_owner on weekly_insights_insights for all using (
  exists (
    select
      1
    from
      weekly_insights wi
    where
      wi.id = weekly_id
      and wi.clerk_id = auth_clerk_id ()
  )
)
with
  check (
    exists (
      select
        1
      from
        weekly_insights wi
      where
        wi.id = weekly_id
        and wi.clerk_id = auth_clerk_id ()
    )
  );

create policy wip_owner on weekly_insights_patterns for all using (
  exists (
    select
      1
    from
      weekly_insights wi
    where
      wi.id = weekly_id
      and wi.clerk_id = auth_clerk_id ()
  )
)
with
  check (
    exists (
      select
        1
      from
        weekly_insights wi
      where
        wi.id = weekly_id
        and wi.clerk_id = auth_clerk_id ()
    )
  );

create policy dq_owner on decision_quality for all using (
  exists (
    select
      1
    from
      matches m
    where
      m.id = match_id
      and m.owner_clerk_id = auth_clerk_id ()
  )
)
with
  check (
    exists (
      select
        1
      from
        matches m
      where
        m.id = match_id
        and m.owner_clerk_id = auth_clerk_id ()
    )
  );

create policy pr_owner on player_recommendations for all using (clerk_id = auth_clerk_id ())
with
  check (clerk_id = auth_clerk_id ());

create policy iel_owner on insight_event_links for all using (
  exists (
    select
      1
    from
      matches m
    where
      m.id = match_id
      and m.owner_clerk_id = auth_clerk_id ()
  )
)
with
  check (
    exists (
      select
        1
      from
        matches m
      where
        m.id = match_id
        and m.owner_clerk_id = auth_clerk_id ()
    )
  );

-- Cards public read
create policy card_sets_select_all on card_sets for
select
  using (true);

create policy cards_select_all on cards for
select
  using (true);

create policy card_traits_select_all on card_traits for
select
  using (true);

create policy card_types_select_all on card_types for
select
  using (true);

create policy characters_select_all on characters for
select
  using (true);

create policy card_characters_select_all on card_characters for
select
  using (true);

create policy card_effects_select_all on card_effects for
select
  using (true);

-- =====================
-- Triggers
-- =====================
drop trigger if exists trg_profiles_updated_at on profiles;

create trigger trg_profiles_updated_at before
update on profiles for each row
execute function set_updated_at ();

drop trigger if exists trg_decks_updated_at on decks;

create trigger trg_decks_updated_at before
update on decks for each row
execute function set_updated_at ();

drop trigger if exists trg_matches_updated_at on matches;

create trigger trg_matches_updated_at before
update on matches for each row
execute function set_updated_at ();

-- =====================
-- Vectors (optional, scaffold only)
-- =====================
-- To enable semantic search later, add embedding columns, e.g.:
-- alter table strategic_insights add column if not exists embedding vector(384);
-- create index if not exists strategic_insights_embedding_idx on strategic_insights using ivfflat (embedding vector_cosine_ops);
-- =====================
-- Views
-- =====================
create or replace view
  match_history with (security_invoker = on) as
select
  m.id,
  m.owner_clerk_id,
  m.session_date,
  m.total_turns,
  m.deck_archetype,
  m.opponent_archetype,
  m.game_outcome,
  (
    select
      count(*)
    from
      match_events me
    where
      me.match_id = m.id
  ) as event_count,
  (
    select
      mp.display_name
    from
      match_players mp
    where
      mp.match_id = m.id
      and mp.player_slot = 1
  ) as player1,
  (
    select
      mp.display_name
    from
      match_players mp
    where
      mp.match_id = m.id
      and mp.player_slot = 2
  ) as player2
from
  matches m;

-- Payload-first, lightweight timeline (no joins) for flexible rendering
create or replace view
  match_events_timeline_payload with (security_invoker = on) as
select
  id,
  match_id,
  event_index,
  turn_number,
  round_number,
  phase,
  event_type,
  actor_player_slot,
  parent_event_id,
  source_line_refs,
  occurred_at,
  payload
from
  match_events;

-- Focused payload-only convenience views
create or replace view
  vw_card_plays with (security_invoker = on) as
select
  e.id as event_id,
  e.match_id,
  e.event_index,
  e.turn_number,
  e.actor_player_slot,
  e.card_id,
  e.cost_paid,
  e.instance_id,
  e.payload
from
  match_events e
where
  e.event_type = 'card_played';

create or replace view
  vw_attacks with (security_invoker = on) as
select
  e.id as event_id,
  e.match_id,
  e.event_index,
  e.turn_number,
  e.actor_player_slot,
  e.attacker_instance_id,
  e.attacker_ap,
  e.target_instance_id,
  e.target_base_card_id,
  e.payload
from
  match_events e
where
  e.event_type = 'attack_declared';

-- End of migration