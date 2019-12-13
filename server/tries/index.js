var url = require('url');
var WebSocketServer = new require('ws');
var clients = {};

var webSocketServer = new WebSocketServer.Server({
  port: 8081
});

webSocketServer.on('connection', function(ws, req) {
  ws.upgradeReq = req;
  ws.username = url.parse(ws.upgradeReq.url, true).query.name;
  ws.id = Math.random();
  clients[ws.id] = ws;
  sendAllClients(`"${ws.username}" has joined to chat`);
  console.log("новое соединение " + ws.id);
  registerMessageHandler(ws);
  registerCloseHandler(ws);
});

function registerCloseHandler(ws) {
  ws.on('close', function() {
    console.log('соединение закрыто ' + ws.id);
    delete clients[ws.id];
  });
}

function registerMessageHandler(ws) {
  ws.on('message', function(message) {
    sendAllClients(message);
  });
}

function sendAllClients(message) {
  for (var key in clients) {
    clients[key].send(message);
  }
}