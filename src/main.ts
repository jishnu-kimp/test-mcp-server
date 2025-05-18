import MCPServer from './server';

const server = new MCPServer();
server.run().catch(console.error);