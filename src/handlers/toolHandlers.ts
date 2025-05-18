import { fetchTicker, fetchCandlesticks } from '../api/okxApi.js';
import { OKXTickerResponse, OKXCandlesticksResponse } from '../types/okxTypes.js';
import { McpError, ErrorCode } from '@modelcontextprotocol/sdk/types.js';

export async function handleGetPrice(args: { instrument: string }) {
    if (!args.instrument) {
        throw new McpError(ErrorCode.InvalidParams, 'Missing required parameter: instrument');
    }
    const response: OKXTickerResponse = await fetchTicker(args.instrument);
    if (response.code !== '0') {
        throw new Error(`OKX API error: ${response.msg}`);
    }
    if (!response.data || response.data.length === 0) {
        throw new Error('No data returned from OKX API');
    }
    const ticker = response.data[0];
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify({
                    instrument: ticker.instId,
                    lastPrice: ticker.last,
                    bid: ticker.bidPx,
                    ask: ticker.askPx,
                    high24h: ticker.high24h,
                    low24h: ticker.low24h,
                    volume24h: ticker.vol24h,
                    timestamp: new Date(parseInt(ticker.ts)).toISOString(),
                }, null, 2),
            },
        ],
    };
}

export async function handleGetCandlesticks(args: { instrument: string; bar?: string; limit?: number }) {
    if (!args.instrument) {
        throw new McpError(ErrorCode.InvalidParams, 'Missing required parameter: instrument');
    }
    const response: OKXCandlesticksResponse = await fetchCandlesticks(args.instrument, args.bar, args.limit);
    if (response.code !== '0') {
        throw new Error(`OKX API error: ${response.msg}`);
    }
    if (!response.data || response.data.length === 0) {
        throw new Error('No data returned from OKX API');
    }
    return {
        content: [
            {
                type: 'text',
                text: JSON.stringify(
                    response.data.map(([time, open, high, low, close, vol, volCcy]) => ({
                        timestamp: new Date(parseInt(time)).toISOString(),
                        open,
                        high,
                        low,
                        close,
                        volume: vol,
                        volumeCurrency: volCcy,
                    })),
                    null,
                    2
                ),
            },
        ],
    };
} 