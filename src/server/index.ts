import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
    CallToolRequestSchema,
    ErrorCode,
    ListToolsRequestSchema,
    McpError
} from '@modelcontextprotocol/sdk/types.js';
import { handleGetPrice, handleGetCandlesticks } from '../handlers/toolHandlers.js';
import { PrismaClient } from "@prisma/client";
import { DATABASE_URL } from "../env";
const prisma = new PrismaClient();

class MCPServer {
    private server: Server;

    constructor() {
        console.error('[Setup] Initializing MCP server...');
        this.server = new Server(
            {
                name: 'test-mcp-server',
                version: '0.1.0',
            },
            {
                capabilities: {
                    tools: {},
                },
            }
        );
        this.setupToolHandlers();
        this.server.onerror = (error) => console.error('[Error]', error);
        process.on('SIGINT', async () => {
            await this.server.close();
            process.exit(0);
        });
    }

    private setupToolHandlers() {
        this.server.setRequestHandler(ListToolsRequestSchema, async () => ({
            tools: [
                {
                    name: 'get_price',
                    description: 'Get latest price for an OKX instrument',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            instrument: {
                                type: 'string',
                                description: 'Instrument ID (e.g. BTC-USDT)',
                            },
                        },
                        required: ['instrument'],
                    },
                },
                {
                    name: 'get_candlesticks',
                    description: 'Get candlestick data for an OKX instrument',
                    inputSchema: {
                        type: 'object',
                        properties: {
                            instrument: {
                                type: 'string',
                                description: 'Instrument ID (e.g. BTC-USDT)',
                            },
                            bar: {
                                type: 'string',
                                description: 'Time interval (e.g. 1m, 5m, 1H, 1D)',
                                default: '1m'
                            },
                            limit: {
                                type: 'number',
                                description: 'Number of candlesticks (max 100)',
                                default: 100
                            }
                        },
                        required: ['instrument'],
                    },
                },
                {
                    name: "get_total_revenue",
                    description: "Get total sales revenue",
                    inputSchema: { type: "object", properties: {}, required: [] },
                },
                {
                    name: "get_sales_by_region",
                    description: "Get sales sum grouped by region",
                    inputSchema: {
                        type: "object",
                        properties: { region: { type: "string" } },
                        required: ["region"],
                    },
                },
            ],
        }));

        this.server.setRequestHandler(CallToolRequestSchema, async ({ params }) => {
            try {

                const args = params.arguments as {
                    instrument: string;
                    bar?: string;
                    limit?: number;
                    region?: string;
                };

                if (params.name === 'get_price') {
                    return await handleGetPrice(args);
                } else if (params.name === 'get_candlesticks') {
                    return await handleGetCandlesticks(args);
                } else if (params.name === "get_total_revenue") {
                    const { _sum } = await prisma.sale.aggregate({ _sum: { amount: true } });
                    return { content: [{ type: "text", text: `Total Revenue: ${_sum?.amount ?? 0}` }] };
                } else if (params.name === "get_sales_by_region") {
                    const data = await prisma.sale.findMany({ where: { region: args.region } });
                    const total = data.reduce((s, row) => s + row.amount, 0);
                    return { content: [{ type: "text", text: `Revenue in ${args.region}: ${total}` }] };
                }
                else {
                    throw new McpError(
                        ErrorCode.MethodNotFound,
                        `Unknown tool: ${params.name}`
                    );
                }
            } catch (error: unknown) {
                if (error instanceof Error) {
                    console.error('[Error] Failed to fetch data:', error);
                    throw new McpError(
                        ErrorCode.InternalError,
                        `Failed to fetch data: ${error.message}`
                    );
                }
                throw error;
            }
        });
    }

    async run() {
        const transport = new StdioServerTransport();
        await this.server.connect(transport);
        console.error('MCP server running on stdio');
    }
}

export default MCPServer; 