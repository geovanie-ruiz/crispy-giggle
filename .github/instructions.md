# Shadcn UI Implementation Guide — Gundam TCG Coach (Planning Only)

Purpose: Map blocks/components to app features per the mobile-first guide. Names only. No code.

## Global Layout & Navigation

- sidebar-11 (primary) or sidebar-07 (alternate)
- navigation-menu
- breadcrumb
- sheet (mobile drawer)
- avatar
- dropdown-menu

- separator

## Authentication

- login-05 (primary) or login-04 (compact) or login-02 (split hero)
- form
- input
- label
- button
- separator

- alert
- sonner
- input-otp (2FA, optional)
- hover-card (social/login help, optional)

## Dashboard

- dashboard-01
- sidebar-11 (paired navigation)
- card (quick action, stat tiles)
- progress (goals, processing)
- badge (rank, streak)
- chart

- table (recent items, desktop)
- accordion (activity details, mobile)
- tabs (switch views)
- tooltip
- avatar
- dropdown-menu
- skeleton (initial load)

## Match Upload (Progressive Disclosure)

Step 1 — Details

- form
- select
- command (searchable dropdown)
- toggle-group (W/L)
- calendar (date/time via popover)

- popover

- button
- alert (inline validation)

Step 2 — Transcript

- accordion (format instructions)
- textarea
- tooltip (format tips)
- button (save draft, upload)

- sonner (toasts)

Step 3 — Processing

- progress
- skeleton
- dialog or sheet (optional status/continue browsing)

## Match History

Filters

- tabs (quick filters)
- toggle-group (segmented filter)
- command (search)

- select (advanced filter)

- scroll-area (horizontal filter bar)

List/Table

- table (desktop)
- accordion (mobile row expand)

- badge (W/L, status)

- dropdown-menu (row actions)
- separator
- pagination
- skeleton (loading page)

## Analysis Detail (Reader-Friendly)

Header

- breadcrumb
- progress

- button (share, bookmark)

- dialog (share)

Content

- accordion (sections)

- card (key insights, recommendations)

- tabs (related analyses)
- collapsible (long blocks)
- scroll-area (transcript)
- tooltip (term hints)
- badge (result)
- sonner (feedback)

## Accessibility & Mobile Standards

- label (every input)
- switch (settings)

- focus-visible defaults (component-level)
- minimum touch targets: use button, toggle-group, tabs, select

## Internationalization (i18n) Touchpoints

- select (language picker)
- command (searchable language)

- dropdown-menu (quick switch)
- dialog (first-run language selection)

## Premium Polish Add-ons (Validated)

- hover-card (rich previews)
- tooltip (icon clarity)

- sheet (contextual panes)
- command (omnibox/search)
- carousel (hero or highlight reels)
- resizable (analysis panes)
- collapsible (dense content)

## Component Inventory (to include)

- accordion
- alert

- alert-dialog
- avatar
- badge
- breadcrumb
- button
- calendar
- card
- carousel
- chart
- checkbox
- collapsible
- command
- dialog
- drawer
- dropdown-menu
- form
- hover-card
- input
- input-otp (optional)
- label
- menubar (optional)
- navigation-menu
- pagination
- popover
- progress
- radio-group
- resizable
- scroll-area
- select
- separator
- sheet
- skeleton
- slider (optional)
- sonner
- switch
- table
- tabs
- textarea
- toggle
- toggle-group
- tooltip

## Block Selections (by route)

- /auth: login-05 (mobile-first) or login-04
- /dashboard: dashboard-01 + sidebar-11

- /matches/upload: cards + form + command + calendar + toggle-group + progress
- /matches: tabs + table + accordion + pagination + dropdown-menu
- /analysis/[id]: breadcrumb + accordion + tabs + scroll-area + dialog

Notes

- Use the theme tokens for primary/secondary/muted and chart-2/destructive for wins/losses.
- Keep 48px min touch targets for all primary actions.

- Use skeleton and sonner to maintain perceived performance in poor networks.
