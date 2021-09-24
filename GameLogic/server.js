import { shuffleDeck, generatePlayers } from "./Logic.js";
import WebSocket from 'ws';

const ws = new WebSocket.Server({ port: 8080 });

console.log("server.js started")
shuffleDeck();

//web sockets
ws.on('connection', function connection(wsConnection) {
  //call functions based on message text
  wsConnection.on('message', function incoming(message) {
      var msg = JSON.parse(message).text;
      switch (msg.charAt(0)){
          case "p":
              var playerCount = msg.slice(-1);
                  generatePlayers(playerCount);     
              break;
          default:
    }       
  });

  wsConnection.send('got your message!');
});