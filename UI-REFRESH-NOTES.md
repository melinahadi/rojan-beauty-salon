# Rojan UI refresh

This update focuses on the visual layer only. Booking steps, Supabase queries, authentication, routes, admin actions, and business rules were not intentionally changed.

## Visual updates
- Refined the cream / charcoal / muted rose / champagne palette.
- Added a modern editorial luxury styling layer for navigation, hero, sections, gallery, forms, cards, buttons, and admin workspace.
- Improved responsive spacing, rounded surfaces, focus states, hover transitions, and reduced-motion handling.
- Reused the project's existing Framer Motion and Lucide packages. No Three.js dependency was added because the current visual direction does not need a 3D scene and a new rendering dependency would add weight without improving the booking experience.

## Run locally
1. Install Node.js (prefer the version compatible with the project's Vite setup).
2. Copy `.env.example` to `.env` and fill in the project's own Supabase URL and anon key.
3. In the project folder run `npm install`.
4. Run `npm run dev`.
5. For a production build run `npm run build`.

Do not commit `.env` or share real Supabase secrets. The provided `.env.example` contains placeholders only.

## Important
The archive was reviewed for its directory structure and required source files. A production build could not be executed in this environment because dependency installation did not complete, so run `npm run build` locally before deployment.
