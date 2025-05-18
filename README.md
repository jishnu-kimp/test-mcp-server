# Test MCP Server

A modular Node.js server that exposes both OKX cryptocurrency market data (price, candlesticks,
etc.) and business analytics tools (sales, revenue by region, etc.) as Model Context Protocol (MCP)
tools.

---

## Features

-   **MCP Tool Server:** Exposes both OKX market data and business analytics as MCP tools.
-   **Cryptocurrency Data:**
    -   Get latest price, bid, ask, 24h high/low, and volume for any OKX instrument.
    -   Retrieve historical candlestick data for any OKX instrument and interval.
-   **Business Analytics:**
    -   Get total sales revenue.
    -   Get sales sum grouped by region.
    -   Compare sales performance across regions.
-   **Modular Structure:** Clean separation of API, handlers, types, and server logic.
-   **TypeScript:** Full type safety and modern development experience.

---

## Project Structure

```
src/
  api/                  # Handles OKX and business analytics API requests
  handlers/             # MCP tool handler logic
  server/               # Server setup and logic
  types/                # TypeScript interfaces for APIs
  main.ts               # Entry point, starts the server
```

---

## Getting Started

### Prerequisites

-   Node.js (v18+ recommended)
-   npm, pnpm, or yarn
-   OKX public API (no key required for public endpoints)

### Installation

```bash
npm install
# or
pnpm install
# or
yarn install
```

### Build

```bash
npm run build
# or
pnpm run build
# or
yarn build
```

### Run

```bash
npm start
# or
pnpm start
# or
yarn start
```

---

## Usage

The server runs as an MCP tool server over stdio. It exposes the following tools:

### Cryptocurrency Market Data Tools

#### 1. `get_price`

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

#### 2. `get_candlesticks`

Fetch historical candlestick data for a given OKX instrument and interval.

**Input:**

```json
{
    "instrument": "BTC-USDT",
    "bar": "1D",
    "limit": 2
}
```

**Output:** An array of candlestick objects with open, high, low, close, volume, and timestamp.

### Business Analytics Tools

#### 3. `get_total_revenue`

Fetch the total sales revenue.

**Output:**

```json
{
    "totalRevenue": 1234.56
}
```

#### 4. `get_sales_by_region`

Fetch the sales sum for a specific region.

**Input:**

```json
{
    "region": "North"
}
```

**Output:**

```json
{
    "region": "North",
    "revenue": 120.5
}
```

#### 5. Regional Sales Comparison

You can compare sales across different regions to identify the best-performing area.

---

## Development

-   **API Layer:** All OKX and business analytics API calls are in `src/api/`.
-   **Handlers:** MCP tool logic is in `src/handlers/`.
-   **Types:** API response types are in `src/types/`.
-   **Server:** MCP server setup is in `src/server/`.
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
