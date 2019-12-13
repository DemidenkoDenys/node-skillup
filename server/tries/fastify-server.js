const url = require('url');
const fastify = require('fastify')();
const fastifyWs = require('fastify-ws');
const clients = {};

fastify.register(fastifyWs);

const addClient = client => {
  clients[client.id] = client;
  broadcastAllClients(`${client.name} has joined to chat`);
}

const broadcastAllClients = message => {
  for (var key in clients) {
    clients[key].send(message);
  }
}

const handleWsMessageEvent = socket => {
  socket.on('message', msg => {
    broadcastAllClients(msg);
  });
}

const handleWsCloseConnection = socket => {
  socket.on('close', () => console.log('Client disconnected.'))
}

const getUrlQueryName = path => {
  return url.parse(path, true).query.name;
}

fastify.ready(err => {
  if (err) throw err;
  fastify.ws.on('connection', (socket, req) => {
    socket.id = Math.random();
    socket.name = getUrlQueryName(req.url);
    addClient(socket);
    handleWsMessageEvent(socket);
    handleWsCloseConnection(socket);
  });
});

const start = async () => {
  try {
    await fastify.listen(3000);
  } catch (err) {
    process.exit(1);
  }
};

start();