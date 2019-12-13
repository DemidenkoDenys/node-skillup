const fastify = require('fastify')();
const fastifyWs = require("fastify-ws");
const fastifyBlipp = require("fastify")();

import statusRoutes, { IFastifyServerSetup } from './models';
import Clients from './clients';

export default class Server {
  server: IFastifyServerSetup = fastify();

  constructor(private clients: Clients) {}

  create = () => {
    this.setupServer();
    this.setupWebsocketConnection();
  }

  start = async () => {
    try {
      await this.server.listen(3000);
      this.server.blipp();
    } catch (err) {
      console.log(err);
      this.server.log.error(err);
      process.exit(1);
    }
  };

  setupServer = () => {
    this.server.register(fastifyBlipp);
    this.server.register(fastifyWs);
    this.server.register(statusRoutes);
  }

  setupHandlers = socket => {
    socket.on('message', (msg: string) => {
      this.clients.broadcast(msg);
    });
    socket.on('close', () => {
      console.log('Client disconnected.')
    });
  }

  setupWebsocketConnection = () => {
    this.server.ready(err => {
      if (err) throw err;
      this.server.ws.on('connection', (socket, req) => {
        socket.url = req.url;
        this.clients.add(socket);
        this.setupHandlers(socket);
      });
    });
  }
}