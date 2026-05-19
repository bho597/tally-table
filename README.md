# Tally & Table

Pantry tracker, recipe manager, meal planner, and smart grocery list — all in one.

## Tech Stack

- **Framework**: React Native + Expo (SDK 52)
- **Navigation**: Expo Router (file-based)
- **Backend**: Supabase (Postgres + Auth + Realtime)
- **State**: Zustand (global) + TanStack Query (server state)
- **Storage**: MMKV (local persistence)
- **Payments**: RevenueCat

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Fill in your Supabase project URL and anon key from the [Supabase dashboard](https://supabase.com/dashboard).

### 3. Start the dev server

```bash
npx expo start
```

Press `i` for iOS simulator, `a` for Android emulator, or scan the QR code with Expo Go.

## Project Structure

```
app/
  _layout.tsx          # Root layout (providers)
  (tabs)/
    _layout.tsx        # Bottom tab navigator
    pantry.tsx         # Pantry screen
    recipes.tsx        # Recipes screen
    plan.tsx           # Meal plan screen
    grocery.tsx        # Grocery list screen
  +not-found.tsx       # 404 screen

components/
  navigation/          # Tab bar icons etc.

constants/
  colors.ts            # Design tokens — colors
  typography.ts        # Design tokens — text styles

lib/
  supabase.ts          # Supabase client

store/                 # Zustand stores (added in Phase 1 Step 2)
hooks/                 # Custom React hooks
types/                 # Shared TypeScript types
```

## Scripts

```bash
npm run lint          # ESLint
npm run lint:fix      # ESLint with auto-fix
npm run format        # Prettier
npm run typecheck     # TypeScript check (no emit)
```
