# Green Belt Platform

A multilingual, mobile-first public website for the Green Belt food-waste circular-economy pilot.

## Current stage

Prototype and pilot preparation. No field data is presented as verified unless explicitly labelled `Verified`.

## Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- Motion
- Lucide icons
- pnpm

## Local development

```bash
corepack enable
pnpm install
pnpm run dev
```

## Quality checks

```bash
pnpm run typecheck
pnpm run build
```

## Data language

Every metric must use one of these states:

- `Demo` — illustrative data only
- `Target` — planned pilot outcome
- `Verified` — checked field data with a documented source
