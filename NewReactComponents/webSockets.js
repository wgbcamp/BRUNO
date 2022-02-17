const WebSocket = require('ws');
const wss = new WebSocket.Server({ port: 8080 });

module.exports = {

    engageWebSockets: function(){

        wss.on('connection', function connection(ws){
    
            // ws.on('message', function incoming(data){
                
            //     var parsed = JSON.parse(data);
            //     console.log(parsed.type);
            //     if(parsed.type == "trigger_game"){

            //         ws.send(parsed.value);
            //     }
            // })

            ws.on('message', function incoming(data){
                console.log("GOT IT");
            })
        })
    }
};

