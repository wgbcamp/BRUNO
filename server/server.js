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

//express server properties
var cors = require('cors');
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../build'));
app.use(morgan('dev'));
app.use(cors());

//listen on port
const PORT = process.env.PORT || 3001;
server.listen(PORT, "192.168.1.181", () => {
    console.log(`Starting Proxy at 192.168.1.181:3001`);
});

//start mongodb server
var mongoUtil = require('./database/mongoUtil');
mongoUtil.connectServer();

//require controller
const controller = require("./controller");

//socket.io
var socketio = require('./routes/webSockets');
socketio.socketIoFunction(io, controller);
