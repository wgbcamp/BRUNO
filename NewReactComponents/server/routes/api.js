const path = require("path");
const router = require("express").Router();
const controller = require("../controller");





// wss.on("connection", ws => {
//     console.log("new client connected");
//     ws.uuid = uuid();

//     wss.clients.forEach(function each(client){
//         if (client.readyState === WebSocket.OPEN){
//             connectedClients.push(client.uuid);
//         }
//         console.log("###");
//         console.log(connectedClients);
//     })
//     ws.on("message", data => {
//         var x = JSON.parse(`${data}`)
//         console.log(x);
//         controller.updateDoc(x, response);
//         function response(result){
//             wss.clients.forEach(function each(client){
//                 if (client.readyState === WebSocket.OPEN){
//                     console.log("THIS IS IT!!!" + client.uuid);
//                     if(client.uuid === '440a5382-371e-4eea-ad79-9308d7dab4ac'){
//                         client.send(result);
//                     }
                    
//                 }
//             })
//         }
//     });
//     ws.on("close", (code, reason) => {
//         console.log(code);
//         console.log(reason);
//         console.log("A disconnect occurred.");
//         // wss.clients.forEach(function each(client){
//         //     if (client.uuid === )
//         // })
//     });
//     ws.onerror = function () {
//         console.log("Some Error occurred")
//     }
// });

router.route("/create").post(function (req, res) {
    var data = req.body;
    controller.insertOneFN(data);
    res.send();
})
router.route("/fetch").post(async function (req, res){
    var data = req.body;
    controller.readDB(data, response);
    function response(result){
        res.send(result);
    }
})
router.route("/postUser").post(function (req, res){
    var data = req.body;
    console.log(req.body);
    controller.updateDoc(data, response);
    function response(result){
        res.send(result);
    }  
})

router.use(function(req, res){
    res.sendFile(path.join(__dirname, "../build/index.html"));
});


module.exports = router;