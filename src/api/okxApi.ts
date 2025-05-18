import axios from 'axios';
import { OKXTickerResponse, OKXCandlesticksResponse } from '../types/okxTypes.js';

const axiosInstance = axios.create({
    baseURL: 'https://www.okx.com/api/v5',
    timeout: 5000,
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
    },
});

export async function fetchTicker(instId: string): Promise<OKXTickerResponse> {
    const response = await axiosInstance.get<OKXTickerResponse>('/market/ticker', {
        params: { instId },
    });
    return response.data;
}

export async function fetchCandlesticks(instId: string, bar = '1m', limit = 100): Promise<OKXCandlesticksResponse> {
    const response = await axiosInstance.get<OKXCandlesticksResponse>('/market/candles', {
        params: { instId, bar, limit },
    });
    return response.data;
} 