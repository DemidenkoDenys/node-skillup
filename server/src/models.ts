import { FastifyInstance } from 'fastify';
import { Server, IncomingMessage, ServerResponse } from 'http';

const fp = require('fastify-plugin');

export default fp(async (server, opts, next) => {
  server.route({
    url: "/status",
    logLevel: "warn",
    method: ["GET", "HEAD"],
    handler: async (request, reply) => {
      return reply.send({ date: new Date(), works: true });
    }
  });
  next();
});

export interface IFastifyServer extends FastifyInstance<Server, IncomingMessage, ServerResponse> {};
export interface IFastifyServerSetup extends IFastifyServer {
  ws?: any,
  log: any,
  ready: any,
  listen: any,
  register: any,
  blipp?: Function,
};
