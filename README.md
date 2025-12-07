# KWin Scripts Template

Tiny starter for building and iterating on KWin 6 scripts with TypeScript. It compiles to `dist/main.js` and reloads into KWin via `qdbus6` helper scripts.

## Prerequisites
- KWin 6 with scripting enabled and `qdbus6` available on PATH.
- Node.js 18+ (or current LTS) and npm for TypeScript and ESLint.

## Getting Started
```bash
npm install
npm run start
```
`npm run start` compiles `src/main.ts`, loads the script into KWin using the package name as the plugin id, and tails the scripting log so you can see console output immediately.

## Development Commands
- `npm run compile` – build `src/` into `dist/` without loading into KWin.
- `npm run start` – compile, load, and follow logs (good for live iteration).
- `npm run unload` – remove the loaded script from KWin.
- `npm run log` – tail relevant KWin scripting logs without rebuilding.
- `npm run lint` – lint with ESLint and TypeScript rules.

## Project Layout
- `src/main.ts` – current entry point; expand or replace with your script logic.
- `src/kwin.d.ts` – TypeScript declarations for the KWin scripting API; extend as needed.
- `dist/` – generated output loaded by KWin; do not edit by hand.
- `scripts/` – helper shell scripts for loading/unloading and log streaming.

## Notes for Developing KWin Scripts
- Keep KWin-specific calls isolated so you can swap behaviors without hunting through the code.
- Use concise `console.log` statements while iterating, then trim noise before committing.
- If the script fails to load, run `npm run unload` then `npm run start` to ensure KWin drops any cached copy.

## Contributing
See `AGENTS.md` for repository guidelines, style, and PR expectations.
