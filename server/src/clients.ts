import utils from './utils';
import { Client, ClientsMap, IClients, ClientMessage } from './clients.model';

export default class Clients implements IClients {

  clients: ClientsMap = {};

  constructor() {}

  add = (client: Client): void => {
    client.id = Math.random();
    client.name = utils.getUrlQueryName(client.url);
    this.clients[client.id] = client;
    this.broadcast(`${client.name} has joined to chat`);
  }

  broadcast = (message: string): void => {
    for (var key in this.clients) {
      const sendingMessage: ClientMessage = {
        message,
        date: new Date(),
      };
      this.clients[key].send(sendingMessage);
    }
  }
}