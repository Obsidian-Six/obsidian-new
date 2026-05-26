# Obsidian New – TypeScript Migration and Stabilization Report

Date: 2026-10-13
Repository: obsidian-new (master)

## Executive summary

We migrated the Next.js application to TypeScript end-to-end, patched dependencies, replaced legacy image usage with `next/image`, fixed routing duplication, and tightened TypeScript to a strict configuration in multiple phases. Production build and type checks pass. Dev/start flow is healthy after cleaning stale build output.

## Scope and goals

- Migrate project to TypeScript (App Router) without breaking runtime.
- Replace `<img>` with `next/image` and whitelist remote domains.
- Remove legacy `.jsx` duplicates to silence Next.js duplicate route warnings.
- Harden typing gradually to strict mode while keeping builds green.
- Keep dependencies updated and free of known vulnerabilities.

## Final environment

- Next.js 15.5.4 (App Router) with React 19
- TypeScript 5.x
- ESLint 9.x (flat config) with Next.js rules
- Tailwind CSS 4
- Key libs: framer-motion, swiper, @tsparticles/react, react-typed, react-icons

## Major phases and changes

### 1) Security patching and baseline upgrades

- Upgraded Next.js to `15.5.4`.
- Updated ESLint to `9.x` and aligned config.
- Ran `npm audit` and addressed vulnerabilities until 0 remaining.

### 2) TypeScript setup and conversion groundwork

- Installed TypeScript and @types packages.
- tsconfig initialized for Next 15 App Router with alias `@/* -> src/*`.
- Added ambient typings and ensured `next-env.d.ts` is present.
- Centralized `framer-motion` wrappers in `src/lib/motion.ts` (e.g., `MotionDiv`, `MotionP`).

### 3) Component and route migrations to TSX

- Converted many components in `src/app/_components` to TSX.
- Replaced numerous `<img>` tags with `next/image`.
- Migrated case-study section to TypeScript:
  - `src/app/case-study/layout.tsx` – typed route layout.
  - `src/app/case-study/page.tsx` – case study listing using `next/image` and typed tags.
  - `src/app/case-study/[id]/layout.tsx` – detail route layout.
  - `src/app/case-study/[id]/page.tsx` – client page using typed `useParams` and typed subcomponents.
  - Subcomponents under `src/app/case-study/_components` converted to TSX: `hero-case.tsx`, `challenge-section.tsx`, `approch-section.tsx`, `the-result.tsx`, `the-impact.tsx`.

### 4) next/image adoption and remote domains

- Replaced `<img>` with `next/image` across pages/components where feasible.
- Extended `images.remotePatterns` in `next.config.mjs` to include external sources used by cards/logos/hero images:
  - `sdg.esa.int`, `boxxinsurance.com`, `associationoflearning.com`, `5.imimg.com`, `www.igrowmybiz.com`, `animationvisarts.com`, `logos-world.net`, `pachmarhiayurveda.com`, `funnel.io`, `www.tenontenstays.com`, `www.rezmytour.com`, `www.truevalueventures.in`, `www.shim.co.in`, `upload.wikimedia.org`, `tenontenstays.com` (http), `connectfz.com`, `azbigmedia.com`, `img.freepik.com`, `storage.googleapis.com`, `www.thegyef.com`, `sportxcoins.com`, `www.4dgcc.com`.
- Fixed public asset path issues (ensuring leading `/` for `public/` assets).

### 5) Fixes for data and routing

- `src/data.ts` migrated to TypeScript and updated any missing/misplaced images. For the case study cards, ensured images were resolvable or replaced with allowed remote URLs.
- Removed/neutralized legacy duplicate `.jsx` files in `case-study/` and `[id]/` routes to eliminate duplicate page warnings in dev.

### 6) Strong typing for case-study data

- `src/data.ts` now exports strong interfaces:
  - `CaseStudy` with `casesection`, `challenge`, `approch`, `result`, `impact`.
  - `CaseStudyResultItem`, `CaseStudyApproachItem`, `CaseStudyChallengePoint`, etc.
- Updated case-study components to accept `CaseStudy` props, replacing `any`.
- `hero-case.tsx` migrated to `next/image` with `fill`, `sizes="100vw"`, and `priority`.

### 7) Dev/start stabilization

- Dev initially showed duplicate route warnings; resolved by deleting/neutralizing `.jsx` duplicates.
- An initial `next start` error (`routesManifest.dataRoutes is not iterable`) was caused by stale `.next` output; fixed by removing `.next` and rebuilding.
- Verified: `npm run build` and `npm run start` now succeed.

### 8) Incremental strictness for TypeScript

We tightened TypeScript in three steps and fixed surfaced issues.

- Batch 1 (already applied):
  - `strict`, `noImplicitAny`, `strictNullChecks`, `noImplicitThis`, `alwaysStrict`, `useUnknownInCatchVariables`.

- Batch 2 (enabled):
  - `noUncheckedIndexedAccess: true`, `exactOptionalPropertyTypes: true`.
  - Fixes applied:
    - `reviews.tsx`: added guards and non-null assertions with `currentReview/prevReview/nextReview`.
    - `approch-section.tsx`: guarded odd-length case and used local `last`.
    - `the-result.tsx`: ensured at least 4 results; extracted `r0..r3` variables with assertions.

- Batch 3 (enabled):
  - `noImplicitReturns: true`, `noUnusedLocals: true`, `noUnusedParameters: true`, `noFallthroughCasesInSwitch: true`.
  - Fixes applied:
    - `hero-section.tsx`: replaced unused `ele` param with `_` in `.map`.
    - `particle-snow.tsx` and `particle.tsx`: removed unused state; simplified effects.
    - `src/app/page.tsx`: removed unused `OurTeam` import.

All strict batches: build passes with lint/type checks succeeding.

## Files notably changed or added

- `next.config.mjs` – updated `images.remotePatterns`.
- `tsconfig.json` – strict typing flags enabled progressively.
- `src/lib/motion.ts` – centralized framer-motion wrappers.
- `src/app/layout.tsx`, `src/app/page.tsx` – migrated to TSX.
- `src/app/_components/*` – multiple components migrated/cleaned; key updates in `hero-section.tsx`, `reviews.tsx`, `particle*.tsx`.
- `src/app/case-study/**/*` – route, detail page, and subcomponents migrated and typed.
- `src/data.ts` – replaced dynamic `any` with strong `CaseStudy` models and data corrections.
- Deleted duplicate `.jsx` files in `src/app/case-study/` and subfolders.

## Build results (latest)

- `npm run build`: PASS
- Typecheck/Lint: PASS
- `npm run start`: PASS (after clean rebuild)
- Dev server: runs; earlier transient TimeoutError observed once in dev did not block usage.

## How to run

- Development
  - `npm run dev`
- Production
  - `npm run build`
  - `npm run start`

If `next start` throws manifest errors, delete `.next` and rebuild:

- Delete `.next` and rebuild
  - Windows PowerShell:
    - `if (Test-Path -LiteralPath '.next') { Remove-Item -Recurse -Force -LiteralPath '.next' }`
    - `npm run build`

## Known decisions and trade-offs

- `next/image` unoptimized is used for some remote images to prioritize ease and correctness during migration; can revisit for performance (loader or optimization settings).
- For strict indexing (`noUncheckedIndexedAccess`), we added guards/non-null assertions. For even stronger guarantees, we could model certain arrays (like `result`) as fixed-length tuples.

## Suggested follow-ups (optional)

- Consider modeling `CaseStudy.result` as a 4-tuple to remove non-null assertions at indices 0–3.
- Add lightweight tests (e.g., data shape validations) to assert each case study conforms to expected schema.
- Evaluate enabling `noPropertyAccessFromIndexSignature` for even stricter safety.
- Review remaining components for any legacy `<img>` usage outside case-study (most are already migrated).
- Performance pass on images: drop `unoptimized` where feasible and leverage Next.js image optimization/CDN.

## Completion summary

The project has been successfully migrated to TypeScript with strict type checks, duplicate routes removed, image handling modernized, and dev/start flows stable. The codebase now benefits from stronger typing guarantees and cleaner component structure while preserving behavior.

## Recent commits overview

- ea0114e (2026-10-13): Refactor case study components to TypeScript
  - Converted `src/app/case-study` pages and subcomponents from `.jsx` to `.tsx`.
  - Removed duplicate `.jsx` files to fix dev duplicate-route warnings.
  - Updated `src/app/_components/reviews.tsx`, particles cleanup, `src/data.ts` refinements, and `tsconfig.json` adjustments.
- dbb67ef (2025-10-13): feat: add TypeScript definitions and configuration
  - Introduced TypeScript: added `tsconfig.json`, `src/global.d.ts`, and base typings.
  - Migrated many `src/app/_components/*` to TSX (e.g., `home-service.tsx`, `banner.tsx`, `contact-us.tsx`, `footer.tsx`, `navbar.tsx`, `our-*`, `particle*.tsx`, `reviews.tsx`).
  - Migrated `src/app/layout.tsx` and `src/app/page.tsx`; added `src/data.ts` and `src/lib/motion.ts`.
  - Updated `next.config.mjs` for `next/image` remote patterns.
- e78a407 (2025-10-13): Fixed Audit issue
  - Updated `package.json`/lockfiles to resolve vulnerabilities.

## Changelog of files (appendix)

- Configuration and tooling
  - Added `tsconfig.json` (later tightened strict flags).
  - Added `src/global.d.ts` for ambient types.
  - Updated `next.config.mjs` to extend `images.remotePatterns` for external hosts.
  - Added `src/lib/motion.ts` (moved/renamed from `src/app/utils/page.jsx`) to centralize framer-motion wrappers.
  - Updated `package.json`, lockfiles for audits and TypeScript/Next upgrades.

- App shell and pages
  - Deleted `src/app/layout.js` → Added `src/app/layout.tsx` (TypeScript App Router layout).
  - Renamed `src/app/page.js` → `src/app/page.tsx`.

- Core components migrated to TSX (replacing `.jsx`):
  - `src/app/_components/FloatingWhatsapp.tsx`
  - `src/app/_components/banner.tsx`
  - `src/app/_components/contact-us.tsx`
  - `src/app/_components/footer.tsx`
  - `src/app/_components/hero-section.tsx` (also cleaned unused vars)
  - `src/app/_components/home-service.tsx` (replaced `home-service.jsx`; no logic change)
  - `src/app/_components/navbar.tsx`
  - `src/app/_components/our-client.tsx`
  - `src/app/_components/our-maintaince.tsx`
  - `src/app/_components/our-team.tsx`
  - `src/app/_components/our-work.tsx`
  - `src/app/_components/particle-snow.tsx`, `src/app/_components/particle.tsx` (simplified effects)
  - `src/app/_components/reviews.tsx` (added index guards for strict mode)

- Case-study route migration
  - Deleted `.jsx` duplicates and added TSX counterparts:
    - `src/app/case-study/layout.tsx`, `src/app/case-study/page.tsx`.
    - `src/app/case-study/[id]/layout.tsx`, `src/app/case-study/[id]/page.tsx`.
    - `src/app/case-study/_components/hero-case.tsx`, `challenge-section.tsx`, `approch-section.tsx`, `the-result.tsx`, `the-impact.tsx`.

- Data layer
  - Deleted `src/data.js` → Added `src/data.ts` with strong interfaces; later refined image URLs and types.

## Component differences: home-service and reviews

- HomeService (`src/app/_components/home-service.tsx`)
  - Baseline (pre-TypeScript JSX) had interactive selection: a left list of services that updates the right image and description on click.
  - During initial TSX conversion, this interaction was simplified away. We have now restored the original behavior:
    - Reintroduced `selectedService` state, clickable list, and animated detail panel.
    - Migrated to `next/image` with `fill` for the service image and preserved MotionDiv usage.
  - Added whitelisted image hosts required by service images (e.g., `images.pexels.com`).

- Reviews (`src/app/_components/reviews.tsx`)
  - Restored the full review dataset from the original JSX (names, titles, companies, images, and texts), while keeping strict-safe logic.
  - Kept strict-mode protections: early return on empty data; precomputed indices and non-null assertions.
  - Replaced repeated modular index expressions with variables for readability and safety.
  - UI and interaction (prev/next buttons, layout) remain unchanged functionally; moved images to `next/image`.

## Additional image hosts whitelisted

To support images used by the restored components, added these hosts to `next.config.mjs`:

- `images.pexels.com`, `media.licdn.com`, `content.jdmagicbox.com`, `encrypted-tbn2.gstatic.com`, `www.khonshnaw.com`.
