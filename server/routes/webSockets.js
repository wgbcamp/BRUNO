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
    
        socket.on("join room", (data, callback) => {
            data.socketID = socket.id;
            socket.join(data.gameCode);
            controller.updatePresence(data, response);
            function response(result){
                getRoom(updateClients, data.gameSession);
            }
            
        });
    
    
        socket.on("join game", (gameSession, userID, playerName, callback) => {
            var data = { session: gameSession, id: userID, name: playerName, present: true, socketID: socket.id, preliminaryCode: gameSession, fetchPrelim: 1};
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
                        controller.addPlayer(data, response);
                        function response(result){
                            callback({
                                status: result
                            })
                            getRoom(updateClients, gameSession);    
                        }
                    }
                } 
        })
    //**STILL NEED TO BLOCK MESSAGE FROM AFFFECTING GAME THAT DOESN'T HAVE THE PLAYER IN IT WHO SENT SAID MESSAGE! */

        socket.on("start game", (gameSession, userID) => {
            console.log("received start game request");
            getRoom(controller.startGame, res, userID);
            function res(){
                getRoom(updateClients, gameSession);
            }
            // getRoom(controller.loadDeck);
            // controller.loadDeck();
        })

        socket.on("draw first card", (gameSession, player) => {
            console.log(`received draw first card request from ${player}.`);
            getRoom(controller.drawFirstCard, res, player);
            function res(){
                getRoom(updateClients, gameSession);
            }
        })

        socket.on("retrieve initial draw", (gameSession, dealer) => {
            console.log(`received retrieve initial draw request from ${dealer}.`);
            getRoom(controller.retrieveInitialDraw, res);
            function res(){
                getRoom(updateClients, gameSession);
            }
        })

        socket.on("deal starting hand", (gameSession, dealer) => {
            console.log(`received deal starting hand request from ${dealer}.`);
            getRoom(controller.dealStartingHand, res);
            function res(){
                getRoom(updateClients, gameSession);
            }
        })

        socket.on("set draw pile", (gameSession, dealer) => {
            console.log(`received set draw pile request from ${dealer}.`);
            getRoom(controller.setDrawPile, res);
            function res(){
                getRoom(updateClients, gameSession);
            }
        })

        socket.on("set discard pile", (gameSession, dealer) => {
            console.log(`received set draw pile request from ${dealer}.`);
            getRoom(controller.setDiscardPile, res);
            function res(){
                getRoom(updateClients, gameSession);
            }
        })

        socket.on("disconnecting", () => {
            getRoom(response);
            function response(currentRoom){
                if(currentRoom != ""){
                    io.to(currentRoom).emit("join/leave", socket.id + " has exited the game.");
                    
                    var data = {
                        socketID: socket.id,
                        fetchSocketID: 1
                    };  
                    controller.readDB(data, res);
                         function res(result){
                             if(result === "Document not found"){
                                }else{
                                    result.currentID = socket.id;
                                    var gameSession = result.preliminaryCode;
                                    controller.updatePresence(result, res2); 
                                    function res2(){
                                        updateClients(currentRoom, gameSession);
                                }
                             }
                         }   
                }
            }
        })
    
        function getRoom(cb, gameSession, extra){
            const arr = Array.from(io.sockets.adapter.rooms);
            const roomsWithUsers = arr.filter(room => !room[1].has(room[0]));
            const roomMatchSocketId = roomsWithUsers.filter(id => id[1].has(socket.id));
            console.log("LOOK WARREN")
            console.log(roomMatchSocketId);
            const currentRoom = roomMatchSocketId.map(i => i[0]);
            console.log("CURRENT ROOM STARTS HERE")
            console.log(currentRoom);
            cb(currentRoom, gameSession, extra);
        }
    
        function updateClients(currentRoom, gameSession){
            var data2 = {fetchPrelim: 1, preliminaryCode: gameSession}
            controller.readDB(data2, res);
            function res(result){
                var playerArray = [];
                for(var i=0; i<result.players.length; i++){
                    playerArray.push({name: result.players[i].name, present: result.players[i].present});
                }
                var choicesArray = [];
                for(var i=0; i<result.players.length; i++){
                    choicesArray.push({name: result.players[i].name, socketID: result.players[i].socketID, choices: result.players[i].choices});
                }
                console.log(currentRoom);
                io.to(currentRoom[0]).emit("updatePlayerList", playerArray);
                if(result.inSession === true){
                    io.to(currentRoom[0]).emit("updatePrivileges", []);
                }
                console.log(choicesArray);
                for (var i=0; i<choicesArray.length; i++){
                    io.to(choicesArray[i].socketID).emit('updatePlayerChoices', choicesArray[i].choices);
                    io.to(choicesArray[i].socketID).emit('updatePrivileges', []);
                }
            }
        }
        socket.on('disconnect', () => {
            console.log('User ' + socket.id + ' disconnected from the websocket.')
        });
      });
}


module.exports = { socketIoFunction };