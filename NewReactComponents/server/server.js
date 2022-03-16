const express = require("express");
const morgan = require("morgan");
const http = require('http');
const app = express();
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server, {
    cors: {
        origin: true
    }
});


const local = "localhost";
const localNetwork = "192.168.1.181";
var cors = require('cors');

//require routes & controller
const routes = require("./routes/api");
const controller = require("./controller");

//express server properties
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../build'));
app.use(morgan('dev'));
app.use(cors());

// app.use('/api', routes);

//listen on port
const PORT = process.env.PORT || 3001;
// server.listen(PORT, localNetwork, () => {
//     console.log(`Starting Proxy at ${localNetwork}:${PORT}`);
// });
server.listen(PORT, local, () => {
    console.log(`Starting Proxy at ${local}:${PORT}`);
});

//start mongodb server
var mongoUtil = require('./database/mongoUtil');
mongoUtil.connectServer();

//socket.io
io.on("connection", (socket) => {
    // send a message to the client
    console.log("User connected.");
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
                status: result 
            })
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected')
    });
  });