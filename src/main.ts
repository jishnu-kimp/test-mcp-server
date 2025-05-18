import OKXServer from './server/okxServer.js';

const server = new OKXServer();
server.run().catch(console.error);