const path = require("path");
const express = require("express");
const morgan = require("morgan");

const controller = require("./controller");
const local = "localhost";
const localNetwork = "192.168.1.181";
var cors = require('cors');

//require routes
const routes = require("./routes/api");

//express server
const app = express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('../build'));
app.use(morgan('dev'));
app.use(cors());

app.post("/create", (req, res) => {
    var data = req.body;
    controller.insertOneFN(data);
    res.send();
})
app.post("/fetch", (req, res) => {
    var data = req.body;
    controller.readDB(data, response);
    function response(result){
        res.send(result);
    }
})

// app.use('/api', routes);

//listen on port
const PORT = process.env.PORT || 3001;
app.listen(PORT, localNetwork, () => {
    console.log(`Starting Proxy at ${localNetwork}:${PORT}`);
});
app.listen(PORT, local, () => {
    console.log(`Starting Proxy at ${local}:${PORT}`);
});

//websocket operations
var wsUtil = require('./webSockets');
wsUtil.engageWebSockets();

//start mongodb server
var mongoUtil = require('./database/mongoUtil');
mongoUtil.connectServer();