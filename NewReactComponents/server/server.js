const express = require("express");
const morgan = require("morgan");
const http = require('http');
const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors: {
        origin: true
    }
});

var cors = require('cors');

//require controller
const controller = require("./controller");

//express server properties
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../build'));
app.use(morgan('dev'));
app.use(cors());


//listen on port
const PORT = process.env.PORT || 3001;
server.listen(3001, "192.168.1.181", () => {
    console.log(`Starting Proxy at 192.168.1.181:3001`);
});

//start mongodb server
var mongoUtil = require('./database/mongoUtil');
mongoUtil.connectServer();

//socket.io
var socketio = require('./routes/webSockets');
socketio.socketIoFunction(io, controller);
