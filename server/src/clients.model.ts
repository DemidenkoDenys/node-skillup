export interface Client {
  id: number;
  url: string;
  name: string;
  send(msg: ClientMessage): void;
}

export interface ClientsMap {
  [id: string]: Client
}

export interface IClients {
  add(client: Client): void,
  broadcast(message: string): void,
};

export interface ClientMessage {
  date: Date,
  message: string,
}