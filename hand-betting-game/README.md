# Hand Betting Game — React + TypeScript + CRA

A web-based Mahjong tile betting game where you predict whether the next hand will be higher or lower in total value.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 (TypeScript strict mode) |
| Build Tool | Create React App — no eject |
| State Management | Redux Toolkit + localStorage persistence |
| Styling | MUI (Material UI v5) + SCSS (CSS custom properties) |
| Testing | Jest + React Testing Library (CRA built-in) |

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

### Other Scripts

```bash
# Run tests in watch mode
npm test

# Run tests with coverage report
npm run test -- --coverage --watchAll=false

# Production build
npm run build
```

> **Coverage targets:** ≥ 70% on `services/`, ≥ 50% on `components/`

---

## Project Structure

```
src/
├── components/
│   ├── LandingPage/       # Landing screen, leaderboard
│   ├── Game/              # GameBoard, Tile, BettingControls, DeckInfo, GameOverScreen
│   ├── History/           # HistoryPanel, HistoryHand
│   ├── Common/            # Button, Card, Modal (pure, reusable)
│   └── ErrorBoundary.tsx
├── hooks/                 # useGameEngine, useLocalStorage, useDeckManager, useScoring
├── services/              # gameEngine, deck, scoring, storage, event
├── store/                 # Redux slice (gameSlice) + StoreProvider
├── types/                 # tile.types, game.types, config.types
├── constants/             # GAME_CONFIG, tile constants, game constants
├── utils/                 # shuffle, validation, helpers
└── themes/                # default.scss, dark.scss (CSS custom properties)
```

---

## Architecture Highlights

### State Management — Redux Toolkit
A single `gameSlice` owns all game state. Every bet dispatches `setGameState(newState)`, which also syncs to localStorage via `storageService`. On app start, `initialState` loads the persisted state — so a page refresh restores the game exactly as left.

### Services Are Separate From Reducers
Redux reducers must be pure. All game logic (drawing tiles, evaluating bets, scoring) lives in `services/`, keeping reducers to simple state assignments. Services are independently testable with plain Jest — no store setup required.

### Component Data Flow
Only top-level containers (`Game.tsx`, `LandingPage.tsx`) read from the Redux store. All child components receive plain props, limiting the blast radius of state changes and enabling straightforward memoization.

---

## Extension Points

| Point | How |
|---|---|
| **Configuration** | Edit `src/constants/config.constants.ts` — tile values, reshuffle limit, scoring multipliers, animation speed |
| **Scoring Strategy** | Implement `IScoringStrategy` in `src/services/scoring.service.ts` and swap without touching components |
| **Event System** | `eventService.subscribe(event, callback)` — listen to `handComplete`, `scoreChange`, `deckReshuffled`, etc. |
| **Themes** | Add CSS custom properties in `src/themes/` and toggle via the `data-theme` attribute |

---

## Scripts Reference

| Command | Description |
|---|---|
| `npm start` | Dev server at `localhost:3000` |
| `npm test` | Tests in watch mode |
| `npm run test -- --coverage --watchAll=false` | Single-run with coverage |
| `npm run build` | Production build |

---

## Handwritten vs. AI-Assisted — Full Disclosure

The assignment explicitly requested this note.

### What the Developer Did (Handwritten / Human-Driven)

| Contribution | Details |
|---|---|
| **Requirement analysis** | Read and interpreted the full assessment spec |
| **Technology decisions** | Chose Redux Toolkit over Zustand; chose MUI + SCSS as the styling stack |
| **Architecture direction** | Decided on services-separate-from-reducers pattern and container/presentational split |
| **AI prompting & iteration** | Wrote precise prompts, reviewed output, identified failures (TypeScript errors, Jest config issues), and directed fixes |
| **Migration decision** | Instructed the switch from an initial Zustand build to Redux Toolkit mid-project |
| **Review & understanding** | Read through the generated codebase to understand every architectural decision well enough to extend it live during an interview |

### What AI Did (Claude — claude-sonnet-4-6)

AI was used as the primary code-generation tool. Specifically, Claude produced:

- All TypeScript type definitions (`types/`)
- All service classes — `gameEngine.service.ts`, `deck.service.ts`, `scoring.service.ts`, `storage.service.ts`, `event.service.ts`
- All React components, including memoization and ARIA accessibility attributes
- Custom hooks — `useGameEngine`, `useDeckManager`, `useScoring`, `useLocalStorage`
- Redux Toolkit store — `gameSlice`, typed `useAppSelector`/`useAppDispatch` hooks, selectors
- SCSS theming with CSS custom properties (light and dark themes)
- All unit tests (`*.test.ts` / `*.test.tsx`)
- README and supporting documentation files

### Honest Summary

The developer used AI as the primary builder. The key human contributions were requirement translation, tool selection, and the architectural direction given through prompting. The developer is fully responsible for understanding the output and being able to extend the codebase — the `App_Workflow_And_AI_Usage.md` and `Interview_QA.md` files document that preparation.

---

## Known Limitations / Trade-offs

- Dynamic tile value scaling applies to the *next* drawn hand, not the current one — this matches the spec but can feel counterintuitive on first play
- No backend; leaderboard and game state are localStorage-only (data is lost if the browser storage is cleared)
- Dark theme tokens are defined in `src/themes/dark.scss` but theme toggle UI is not wired to a button in this version

---

## Video Walkthrough

> A short screen recording demonstrating gameplay and the technical approach is included in the submission (see `walkthrough.mp4` or the linked video in the submission email).
>
> The walkthrough covers:
> 1. Landing page — new game, leaderboard, continue game
> 2. Core gameplay loop — dealing hands, placing higher/lower bets, score updating
> 3. Deck reshuffle behaviour and the reshuffle counter
> 4. Game over conditions (tile value limit and reshuffle limit)
> 5. End-of-game screen — saving score to leaderboard
> 6. Page refresh → state restored from localStorage
> 7. Brief code walkthrough: Redux slice → service → hook → component flow
