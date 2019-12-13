var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const fastify = require('fastify')();
const fastifyWs = require("fastify-ws");
const fastifyBlipp = require("fastify")();
import statusRoutes from './models';
export default class Server {
    constructor(clients) {
        this.clients = clients;
        this.server = fastify();
        this.create = () => {
            this.setupServer();
            this.setupWebsocketConnection();
        };
        this.start = () => __awaiter(this, void 0, void 0, function* () {
            try {
                yield this.server.listen(3000);
                this.server.blipp();
            }
            catch (err) {
                console.log(err);
                this.server.log.error(err);
                process.exit(1);
            }
        });
        this.setupServer = () => {
            this.server.register(fastifyBlipp);
            this.server.register(fastifyWs);
            this.server.register(statusRoutes);
        };
        this.setupHandlers = socket => {
            socket.on('message', (msg) => {
                this.clients.broadcast(msg);
            });
            socket.on('close', () => {
                console.log('Client disconnected.');
            });
        };
        this.setupWebsocketConnection = () => {
            this.server.ready(err => {
                if (err)
                    throw err;
                this.server.ws.on('connection', (socket, req) => {
                    socket.url = req.url;
                    this.clients.add(socket);
                    this.setupHandlers(socket);
                });
            });
        };
    }
}
