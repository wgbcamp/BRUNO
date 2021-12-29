const path = require("path");
const express = require("express");
var cors = require('cors');

//require routes
const routes = require("./routes");

//express server
const app = express();
const http = require('http').createServer(app);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(cors());


app.use(routes);

//listen on port
const PORT = process.env.PORT || 3001;
http.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
});

//start mongodb server
var mongoUtil = require('./mongoUtil');
mongoUtil.connectServer();