import utils from './utils';
export default class Clients {
    constructor() {
        this.clients = {};
        this.add = (client) => {
            client.id = Math.random();
            client.name = utils.getUrlQueryName(client.url);
            this.clients[client.id] = client;
            this.broadcast(`${client.name} has joined to chat`);
        };
        this.broadcast = (message) => {
            for (var key in this.clients) {
                const sendingMessage = {
                    message,
                    date: new Date(),
                };
                this.clients[key].send(sendingMessage);
            }
        };
    }
}
