# OKR MCP Server

A modular Node.js server that exposes OKX cryptocurrency market data (price, candlesticks, etc.) as
Model Context Protocol (MCP) tools. Built with TypeScript and designed for maintainability,
scalability, and team collaboration.

---

## Features

-   **MCP Tool Server:** Exposes OKX market data as MCP tools.
-   **Get Latest Price:** Fetch the latest price, bid, ask, 24h high/low, and volume for any OKX
    instrument.
-   **Get Candlestick Data:** Retrieve historical candlestick data for any OKX instrument and
    interval.
-   **Modular Structure:** Clean separation of API, handlers, types, and server logic.
-   **TypeScript:** Full type safety and modern development experience.

---

## Project Structure

```
src/
  api/
    okxApi.ts           # Handles OKX API requests
  handlers/
    toolHandlers.ts     # MCP tool handler logic
  server/
    okxServer.ts        # OKXServer class, server setup
  types/
    okxTypes.ts         # TypeScript interfaces for OKX API
  main.ts               # Entry point, starts the server
```

---

## Getting Started

### Prerequisites

-   Node.js (v18+ recommended)
-   pnpm (or npm/yarn)
-   OKX public API (no key required for public endpoints)

### Installation

```bash
pnpm install
# or
npm install
# or
yarn install
```

### Build

```bash
pnpm run build
# or
npm run build
# or
yarn build
```

### Run

```bash
pnpm start
# or
npm start
# or
yarn start
```

---

## Usage

The server runs as an MCP tool server over stdio. It exposes the following tools:

### 1. `get_price`

Fetch the latest price and market data for a given OKX instrument.

**Input:**

```json
{
    "instrument": "BTC-USDT"
}
```

**Output:**

```json
{
    "instrument": "BTC-USDT",
    "lastPrice": "104417.4",
    "bid": "104417.9",
    "ask": "104418",
    "high24h": "104528",
    "low24h": "102613.9",
    "volume24h": "3294.9269693",
    "timestamp": "2025-05-18T13:45:24.914Z"
}
```

### 2. `get_candlesticks`

Fetch historical candlestick data for a given OKX instrument and interval.

**Input:**

```json
{
    "instrument": "BTC-USDT",
    "bar": "1D",
    "limit": 2
}
```

**Output:**  
An array of candlestick objects with open, high, low, close, volume, and timestamp.

---

## Development

-   **API Layer:** All OKX API calls are in `src/api/okxApi.ts`.
-   **Handlers:** MCP tool logic is in `src/handlers/toolHandlers.ts`.
-   **Types:** OKX API response types are in `src/types/okxTypes.ts`.
-   **Server:** MCP server setup is in `src/server/okxServer.ts`.
-   **Entry Point:** Start the server with `src/main.ts`.

---

## Contributing

1. Fork the repo
2. Create your feature branch (`git checkout -b feature/YourFeature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin feature/YourFeature`)
5. Open a pull request

---

## License

ISC

---

## Authors

-   Jishnu Satheesh (KIMP)

---

## Acknowledgements

-   [OKX API](https://www.okx.com/docs-v5/en/)
-   [Model Context Protocol (MCP)](https://github.com/modelcontextprotocol)

---
