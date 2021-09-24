const router = require("express").Router();
const controller = require("../controller");
const Session = require("../models/Session");



router.route("/create").post(controller.createSession);
router.route("/find").post(controller.findSession);
router.route("/checkNull").post(controller.checkNull);
router.route("/findAndUpdate").post(controller.findAndUpdate);
router.route("/findAndDelete").post(controller.findAndDelete);

var socIO = function (socket){
    socket.on('startRefresh', (msg) =>{

        console.log(msg);
        const emitRefresh = socket => {
            const response = new Date();
            socket.emit("Refresh", response);
          };

        if(msg == "go"){
            console.log("Refresh started.");
            setInterval(() => emitRefresh(socket), 500);
        }else{
            console.log("Refresh stopped.");
            clearInterval(emitRefresh);
        }
        

      })

    socket.on('getGameDeets', (msg) => {
        const response = msg;
        socket.emit("deliverGameDeets", response);
    });

    socket.on('getSessionData', (msg) => {

        Session.findOne({ code: msg}, function(err, info){
            console.log(info)
            socket.emit("sessionDataToClient", info) 
        })
        .catch(error => { console.error(error) })
    })

    socket.on('changePlayerName', (msg) => {

        async function runCode(){

            let doc = await Session.findOne({ code: 'ullg0t' });
            console.log("THIS IS DOC vvv");
            console.log(doc);
            doc.name = "back4blood";
            doc.title = "WebDeveloper";
            await doc.save();
            console.log("UPDATED DOC vvv");
            console.log(doc);
            Session.findOneAndUpdate(
                {"code": 'ullg0t'},
                {"$set": {
                    "player1.score": 50
                }}
            )


            
        }
        runCode()
        .catch(error => { console.error(error) })
    })

    socket.on('disconnect', () => {
        console.log('user disconnected');
        // clearInterval(interval);
    })
};

module.exports = {router, socIO}