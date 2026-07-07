# Crypto Trade UI

Frontend application for the Crypto Trade project, built with Angular.
Crypto Trade is a trading platform clone where the user can browse market data, analyze charts, maintain a watchlist of favorite pairs, and execute test trades with virtual funds.

The platform runs on top of Binance Spot Testnet — a fully functional Binance test environment that provides virtual funds upon registration. All data is virtual — no real money is involved.

### Video Proof

- [Demonstration of 404, Loading, and Error states](https://youtu.be/HoBU2AN7WiU)

## Team

| Name              | Role                         | Github                                          | Development notes                         |
| ----------------- | ---------------------------- | ----------------------------------------------- | ----------------------------------------- |
| Aleksei Drob      | Fullstack Engineer           | [aliakseidrob](https://github.com/aliakseidrob) | [notes](./development-notes/aliakseidrob) |
| Alexandr Zhdanko  | Fullstack Engineer           | [Zhdko](https://github.com/Zhdko)               | [notes](./development-notes/zhdko)        |
| Anatoliy Rubankov | Fullstack Engineer           | [anatolirub](https://github.com/anatolirub)     | [notes](./development-notes/anatolirub)   |
| Hanna Surmach     | Mentor and World's Best Boss | [khasekai](https://github.com/khasekai)         |                                           |
| Raman Kamarou     | Our secret weapon            | [PoMaKoM](https://github.com/PoMaKoM)           |                                           |

## Kanban Board

[Trello board](https://trello.com/b/tMcxfI8x/cryptotrade)

## Scripts

| Script                 | Description                                                      |
| ---------------------- | ---------------------------------------------------------------- |
| `npm start`            | Starts the Angular development server via `ng serve`.            |
| `npm run build`        | Builds the application for production.                           |
| `npm run watch`        | Builds the app in watch mode with the development configuration. |
| `npm run lint`         | Runs ESLint across the project.                                  |
| `npm run lint:fix`     | Runs ESLint and applies automatic fixes where possible.          |
| `npm run format`       | Formats the project with Prettier.                               |
| `npm run format:check` | Checks formatting with Prettier without changing files.          |
| `npm run ci:format`    | Verifies formatting in CI.                                       |
| `npm test`             | Runs unit tests with Angular test tooling.                       |
| `npm run coverage`     | Runs tests once and generates a coverage report.                 |

## Getting started

### 1. Install dependencies

```bash
npm install
```

### 2. Run the app locally

```bash
npm start
```

By default, the development server is available at `http://localhost:4200/`.

## Development workflow

- Use `npm start` for local development.
- Use `npm run watch` when you want rebuilds on file changes without a full serve workflow.
- Run `npm run lint` and `npm run format:check` before committing.
- Run `npm test` for regular test execution.
- Run `npm run coverage` to inspect test coverage.

## Build

Create a production build with:

```bash
npm run build
```

The build output is generated in the `dist/` directory.

## Technologies

| Software | Version |
| -------- | ------- |
| Angular  | 21.2.0  |
| Husky    | 9.1.7   |
| Prettier | 3.8.1   |
| Vitest   | 4.0.8   |

## Code quality

This project uses:

- ESLint for linting.
- Prettier for formatting.
- Husky for Git hooks.

Recommended local check before pushing changes:

```bash
npm run lint && npm run format:check && npm test
```

## Deploy

[Deploy link](https://stonks.com.ru/)
