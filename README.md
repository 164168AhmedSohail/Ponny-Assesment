# Hand Betting Game — React + TypeScript + CRA

A web-based Mahjong tile betting game where you predict whether the next hand will be higher or lower in total value.

---

## Setup & Installation

```bash
# 1. Clone the repository
git clone <repo-url>
cd hand-betting-game

# 2. Install dependencies
npm install

# 3. Start the development server
npm start
# App runs at http://localhost:3000
```

### All Scripts

```bash
# Run tests in watch mode
npm test

# Run tests once with full coverage report
npm run test -- --coverage --watchAll=false

# Production build
npm run build
```

> **Coverage targets:** ≥ 70% on `src/services/` &nbsp;|&nbsp; ≥ 50% on `src/components/`

---

## Handwritten vs. AI-Assisted — Full Disclosure

### What the Developer Wrote / Decided (Human)

| Contribution | Details |
|---|---|
| **Requirement analysis** | Read and interpreted the full assessment specification |
| **Technology decisions** | Chose Redux Toolkit over Zustand; chose MUI v5 + SCSS as the styling stack |
| **Architecture direction** | Decided on services-separate-from-reducers, container/presentational split, and single-slice state design |
| **Prompting & iteration** | Wrote precise prompts, reviewed AI output, identified failures (TypeScript errors, Jest config issues), and directed all fixes |
| **Code logic decisions** | Directed the tile value scaling rule, deck reshuffle behaviour, scoring multiplier design, and game-over conditions |
| **Code review** | Read through the full generated codebase to understand every architectural decision well enough to extend it live |

### What AI Generated (Claude — claude-sonnet-4-6)

- All TypeScript type definitions (`src/types/`)
- All service classes — `gameEngine.service.ts`, `deck.service.ts`, `scoring.service.ts`, `storage.service.ts`, `event.service.ts`
- All React components — `Game/`, `LandingPage/`, `History/`, `Common/`, `ErrorBoundary`
- All custom hooks — `useGameEngine`, `useDeckManager`, `useScoring`, `useLocalStorage`
- Redux Toolkit store — `gameSlice`, typed `useAppSelector` / `useAppDispatch` hooks, selectors
- SCSS theming — `default.scss`, `dark.scss` (CSS custom properties, light/dark ready)
- All unit tests (`*.test.ts` / `*.test.tsx`)
- README and supporting documentation files

### Summary

AI was used as the primary code-generation tool. The developer's role was requirements translation, all architectural and technology decisions, close review of the output, and directing iterative fixes throughout. The developer is fully responsible for understanding the codebase and is prepared to extend it live.
