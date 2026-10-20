# Ekko

A color memory game. Watch the pattern, then repeat it.

**Play:** https://capnjosh.github.io/ekko/

## How to play

1. Watch the colors appear one at a time.
2. When the pattern disappears, the pad unlocks.
3. Press the colors in the same order.
4. 😊 marks a correct press. 😭 marks a mistake and ends the round.
5. A new round starts after 3 seconds.

## Tech

Vue 3, TypeScript, Vite, Tailwind CSS v4, Vitest, Playwright.

## Development

Requires Node `^22.18.0 || >=24.12.0` and pnpm.

```sh
pnpm install
pnpm dev          # start the dev server
pnpm test:unit    # run unit tests
pnpm test:e2e     # run end-to-end tests (first run: pnpm exec playwright install)
pnpm lint         # lint and fix
pnpm format       # format src/
pnpm build        # type-check and build to dist/
```

## Project structure

| Path                         | Contents                                  |
| ---------------------------- | ----------------------------------------- |
| `src/lib/game.ts`            | Colors and pattern generation             |
| `src/composables/useGame.ts` | Game state: phases, answer checks, rounds |
| `src/components/`            | UI: logo, pattern, answers, pad           |
| `src/__tests__/`             | Unit tests                                |
| `e2e/`                       | End-to-end tests                          |

## License

[MIT](LICENSE)
