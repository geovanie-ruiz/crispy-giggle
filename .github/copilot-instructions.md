# Copilot Coding Agent Onboarding Instructions

## High-Level Repository Overview

**Repository Purpose:**
This repository is a Next.js web application project. It is designed for app development, likely with a focus on interactive or coaching features (see repo name: "gundam-coach").

**Project Type & Size:**

- Type: Web application
- Framework: Next.js (React-based)
- Languages: TypeScript, JavaScript, CSS
- Size: Small to medium (single main app, no monorepo)

**Target Runtime:**

- Node.js (recommended v18+)
- Runs in browser (client-side) and Node.js (server-side rendering)

## Build, Run, and Validation Instructions

### Environment Setup

- Always run `npm install` before any build, run, or test step. This installs all dependencies.
- Node.js v18 or newer is recommended. Use `nvm use 18` if available.
- No additional global dependencies required.

### Bootstrap

- Run `npm install` in the repo root. This is required after any dependency change or fresh clone.

### Build

- Run `npm run build` to build the Next.js app for production.
- If you encounter errors, ensure all dependencies are installed and Node.js version is compatible.

### Run (Development)

- Run `npm run dev` to start the development server (usually on http://localhost:3000).
- If port 3000 is busy, set `PORT=xxxx` in your environment.

### Run (Production)

- After building, run `npm start` to launch the production server.

### Test

- No test scripts or test files detected in the current structure. If tests are added, document the steps here.

### Lint

- Run `npm run lint` to check code style and errors using ESLint.
- ESLint config is in `eslint.config.mjs`.

### Other Scripted Steps

- No custom scripts detected in `package.json` beyond Next.js defaults.

### Common Issues & Workarounds

- If build fails, check Node.js version and run `npm install` again.
- If lint fails, check for TypeScript or ESLint errors in `src/`.
- If you see missing module errors, ensure `node_modules` is present and up to date.

## Project Layout & Architecture

### Key Files in Repo Root

- `package.json`: Project metadata and scripts
- `tsconfig.json`: TypeScript configuration
- `next.config.ts`: Next.js configuration
- `eslint.config.mjs`: ESLint configuration
- `postcss.config.mjs`: PostCSS configuration
- `README.md`: Project overview (see below)

### Main Source Directory

- `src/app/`: Contains main app files
  - `globals.css`: Global styles
  - `layout.tsx`: Main layout component
  - `page.tsx`: Main page component
  - `favicon.ico`: App icon

### Public Assets

- `public/`: Static assets (SVGs, icons)

### Configuration Files

- `eslint.config.mjs`: ESLint rules
- `tsconfig.json`: TypeScript settings
- `next.config.ts`: Next.js settings
- `postcss.config.mjs`: PostCSS settings

### Validation & CI

- No GitHub Actions or CI workflows detected. If present, document workflow steps here.
- Manual validation: Always run `npm run lint` and `npm run build` before committing.

### README.md Contents

- The README provides a basic project overview. If more details are added, update this section.

## Agent Guidance

- Trust these instructions for build, run, and validation steps.
- Only perform additional searches if these instructions are incomplete or found to be in error.
- Prioritize changes in `src/app/` for UI and logic, and update config files in the repo root as needed.
- For new features, add files in `src/app/` and update `package.json` if new dependencies are required.

## Shadcn Usage Rule

- When asked to use shadcn components, always use the MCP server to fetch or insert components.

## Shadcn Planning Rule

- For any planning involving shadcn:
  - Use the MCP server during the planning phase.
  - Apply shadcn components wherever components are applicable.
  - Use whole blocks from shadcn (such as login page, calendar) when possible.

## Shadcn Implementation Rule

- When implementing with shadcn:
  - First, use the MCP server's demo tool to view usage examples.
  - Then, implement the component as shown in the demo to ensure correct usage.

---

**End of onboarding instructions.**
