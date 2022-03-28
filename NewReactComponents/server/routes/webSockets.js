function socketIoFunction(io, controller){
    io.on("connection", (socket) => {
        // send a message to the client
        console.log(`New user ${socket.id} has connected.`);
        socket.emit("contact", "connected to server");
      
        socket.on("create session", (data, callback) => {
            console.log(data);
            controller.insertOneFN(data);
            callback({
              status: "ok"
            });
          });
    
        socket.on("fetch session", (data, callback) => {
            controller.readDB(data, response);
            function response(result){
                callback({
                    status: result.code 
                })
            }
        });
    
        socket.on("join room", (gameCode, gameSession, callback) => {
            socket.join(gameCode);
            getRoom(updateClients, gameSession);
        });
    
    
        socket.on("join game", (gameSession, userID, playerName, callback) => {
            var data = { session: gameSession, id: userID, name: playerName, present: true, preliminaryCode: gameSession, fetchPrelim: 1};
            controller.readDB(data, res);
                function res(result){
                    console.log(result.players);
                    var x = 0;
                    for(var i=0; i<result.players.length; i++){
                        if(result.players[i].name === playerName){
                            console.log("duplicate name found!");
                            socket.emit("error", "This name has already been taken!");
                            x = 1;
                            break;
                        }
                    }
                    if(x === 0){
                        controller.updateDoc(data, response);
                        function response(result){
                            callback({
                                status: result
                            })
                            getRoom(updateClients, gameSession);    
                        }
                    }
                } 
        })
    
        socket.on("disconnecting", () => {
    
            getRoom(response);
            function response(currentRoom){
                console.log(currentRoom);
                if(currentRoom != ""){
                    io.to(currentRoom).emit("join/leave", socket.id + " has exited the game.");
                }
            } 
        })
    
        function getRoom(cb, gameSession){
            const arr = Array.from(io.sockets.adapter.rooms);
            console.log(arr);
            const roomsWithUsers = arr.filter(room => !room[1].has(room[0]));
            console.log(roomsWithUsers);
            const roomMatchSocketId = roomsWithUsers.filter(id => id[1].has(socket.id));
            console.log(roomMatchSocketId);
            const currentRoom = roomMatchSocketId.map(i => i[0]);
            cb(currentRoom, gameSession);
        }
    
        function updateClients(currentRoom, gameSession){
            var data2 = {fetchPrelim: 1, preliminaryCode: gameSession}
            controller.readDB(data2, res);
            function res(result){
                console.log("the result...: ")
                console.log(result);
                var playerArray = [];
                for(var i=0; i<result.players.length; i++){
                    playerArray.push({name: result.players[i].name, present: result.players[i].present});
                }
                io.to(currentRoom).emit("updatePlayerList", playerArray);
            }
        }
        socket.on('disconnect', () => {
            console.log('User ' + socket.id + ' disconnected from the websocket.')
        });
      });
}


module.exports = { socketIoFunction };