const WebSocket = require('ws');
const ws = new WebSocket.Server({ port: 8080 });

console.log("server.js started")

ws.on('connection', function connection(wsConnection) {
  wsConnection.on('message', function incoming(message) {
    console.log(`server received: ${message}`);
  });

  wsConnection.send('got your message!');
});