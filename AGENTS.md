# Repository Guidelines

## Project Structure & Module Organization
- `src/app/` holds App Router routes, layouts, and page UI (e.g., `src/app/page.tsx`).
- `src/components/` contains shared UI; `src/components/3d/` is for Three.js/React Three Fiber scenes.
- `src/hooks/` provides reusable React hooks.
- `src/lib/` contains utilities and shared logic.
- `public/` stores static assets (images, icons).
- Global styles and Tailwind v4 directives live in `src/app/globals.css`.

## Build, Test, and Development Commands
- `npm run dev` starts the local dev server at `http://localhost:3000`.
- `npm run build` creates the production build in `.next/`.
- `npm run start` serves the production build locally.
- `npm run lint` runs ESLint (`next/core-web-vitals`, `next/typescript`).

## Coding Style & Naming Conventions
- Language: TypeScript + React (Next.js App Router).
- Components: `PascalCase` files and exports (e.g., `HeroSection.tsx`).
- Hooks: `useCamelCase` (e.g., `useScrollLock.ts`).
- Prefer Server Components by default; add `"use client"` only when needed.
- Avoid barrel imports; import directly from modules for smaller bundles.

## Performance & UI Guidelines
- Parallelize independent async work (e.g., `Promise.all`) to avoid waterfalls.
- Use `next/dynamic` for heavy 3D or animation modules when possible.
- Minimize data passed to client components; keep props lean.
- Follow Web Interface Guidelines: semantic HTML first, icon-only buttons need `aria-label`, inputs need labels, and focus-visible styles are required.
- Honor `prefers-reduced-motion` and avoid `transition: all`; animate only `transform`/`opacity`.

## Testing Guidelines
- No automated test framework is configured yet.
- Validate changes with `npm run lint` and manual UI checks.
- If you add tests, use `*.test.tsx` or `*.spec.tsx` and document the new command here.

## Commit & Pull Request Guidelines
- Commit messages follow Conventional Commits: `feat: ...`, `fix: ...`, `chore: ...`.
- PRs should include a clear description, testing notes, and screenshots/clips for UI or motion changes.

## Agent skills
- **Performance** (`.agents/skills/performance`): Optimización de rendimiento web según Lighthouse; usar cuando se pida mejorar velocidad, LCP, FCP o hacer auditoría de performance.
- Skills adicionales en `.agents/skills/` y referenciadas en `.codex/skills/` para Cursor.

## Configuration & Security
- Store secrets in `.env.local` (do not commit).
- Keep a single lockfile updated (prefer `package-lock.json` unless the team standardizes on `pnpm`).
