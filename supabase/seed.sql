-- Seed data for initial development and UI smoke tests
-- Order: sets -> characters -> cards -> card_types -> traits -> effects -> card_characters

-- Card Sets
insert into card_sets (id, code, name, release_date)
values
	('00000000-0000-0000-0000-0000000000a1', 'GUNDAM-BASE', 'Gundam Base Set', '2025-01-01')
on conflict (code) do nothing;

-- Characters (Units and Pilots)
insert into characters (id, name, kind, alt_names)
values
	('00000000-0000-0000-0000-000000000101', 'RX-78-2 Gundam', 'unit', '{"Gundam"}'),
	('00000000-0000-0000-0000-000000000102', 'Amuro Ray', 'pilot', '{"Amuro"}')
on conflict (id) do nothing;

-- Cards
-- Unit card with subtitle and purple color example
insert into cards (
	id, set_id, set_code, card_number, full_number, name, type, color,
	level, cost, ap, hp, rarity, subtitle, card_text, link_text, art_id,
	link_condition, is_token, metadata, created_at
) values (
	'00000000-0000-0000-0000-000000000201',
	'00000000-0000-0000-0000-0000000000a1', 'GUNDAM-BASE', '001', 'GUNDAM-BASE-001',
	'RX-78-2', 'unit', 'purple',
	3, 3, 3, 4, 'R', 'Gundam',
	'Main: Once per turn — Pay 1 resource: This unit gains +1 AP until end of turn.',
	null,
	'11111111-1111-1111-1111-111111111111',
	null, false, '{}'::jsonb, now()
) on conflict (id) do nothing;

-- Pilot card with link text
insert into cards (
	id, set_id, set_code, card_number, full_number, name, type, color,
	level, cost, ap, hp, rarity, subtitle, card_text, link_text, art_id,
	link_condition, is_token, metadata, created_at
) values (
	'00000000-0000-0000-0000-000000000202',
	'00000000-0000-0000-0000-0000000000a1', 'GUNDAM-BASE', '002', 'GUNDAM-BASE-002',
	'Amuro Ray', 'pilot', 'blue',
	1, 1, null, null, 'SR', null,
	'Main: Draw a card.','Link: The linked unit gets +1 AP during combat.',
	'22222222-2222-2222-2222-222222222222',
	'Can link with RX units.', false, '{}'::jsonb, now()
) on conflict (id) do nothing;

-- Command + Pilot dual-type example
insert into cards (
	id, set_id, set_code, card_number, full_number, name, type, color,
	level, cost, ap, hp, rarity, subtitle, card_text, link_text, art_id,
	link_condition, is_token, metadata, created_at
) values (
	'00000000-0000-0000-0000-000000000203',
	'00000000-0000-0000-0000-0000000000a1', 'GUNDAM-BASE', '003', 'GUNDAM-BASE-003',
	'Newtype Instinct', 'command', 'blue',
	0, 2, null, null, 'U', null,
	'Main: Look at the top 3 cards of your deck; put one into hand, rest on bottom.',
	'Link: If linked to a Pilot, reduce this card''s cost by 1.',
	'33333333-3333-3333-3333-333333333333',
	null, false, '{}'::jsonb, now()
) on conflict (id) do nothing;

-- Multi-type mappings
insert into card_types (card_id, card_type) values
	('00000000-0000-0000-0000-000000000201', 'unit'),
	('00000000-0000-0000-0000-000000000202', 'pilot'),
	('00000000-0000-0000-0000-000000000203', 'command'),
	('00000000-0000-0000-0000-000000000203', 'pilot')
on conflict do nothing;

-- Traits
insert into card_traits (card_id, trait) values
	('00000000-0000-0000-0000-000000000201', 'Federation'),
	('00000000-0000-0000-0000-000000000201', 'Gundam'),
	('00000000-0000-0000-0000-000000000202', 'Newtype')
on conflict do nothing;

-- Effects (breakdown of card_text/link_text)
-- RX-78-2: Main, once per turn, cost 1 resource
insert into card_effects (id, card_id, effect_index, scope, timings, restrictions, cost_resources, cost_description, effect_text)
values (
	'00000000-0000-0000-0000-000000000301', '00000000-0000-0000-0000-000000000201', 1, 'regular', '{"main"}', '{"once_per_turn"}', 1, null,
	'This unit gains +1 AP until end of turn.'
) on conflict (id) do nothing;

-- Amuro Ray: Main draw
insert into card_effects (id, card_id, effect_index, scope, timings, restrictions, cost_resources, cost_description, effect_text)
values (
	'00000000-0000-0000-0000-000000000302', '00000000-0000-0000-0000-000000000202', 1, 'regular', '{"main"}', null, null, null,
	'Draw a card.'
) on conflict (id) do nothing;

-- Amuro Ray: Link buff
insert into card_effects (id, card_id, effect_index, scope, timings, restrictions, cost_resources, cost_description, effect_text)
values (
	'00000000-0000-0000-0000-000000000303', '00000000-0000-0000-0000-000000000202', 1, 'link', '{"combat"}', null, null, null,
	'The linked unit gets +1 AP during combat.'
) on conflict (id) do nothing;

-- Newtype Instinct: Main search
insert into card_effects (id, card_id, effect_index, scope, timings, restrictions, cost_resources, cost_description, effect_text)
values (
	'00000000-0000-0000-0000-000000000304', '00000000-0000-0000-0000-000000000203', 1, 'regular', '{"main"}', null, 2, null,
	'Look at the top 3 cards of your deck; put one into hand, rest on bottom.'
) on conflict (id) do nothing;

-- Card ↔ Character links
insert into card_characters (card_id, character_id, role) values
	('00000000-0000-0000-0000-000000000201', '00000000-0000-0000-0000-000000000101', 'featured'),
	('00000000-0000-0000-0000-000000000202', '00000000-0000-0000-0000-000000000102', 'featured')
on conflict do nothing;

-- Optional: basic profile for local dev
insert into profiles (clerk_id, display_name, preferred_language, skill_level, goals)
values ('user_326w7S9mOkgv4wEeGjJmE19W4tA', 'Dev User', 'en', 'beginner', 'Try schema')
on conflict (clerk_id) do nothing;
