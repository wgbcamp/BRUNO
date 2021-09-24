const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const routes = require("./routes");
var apiSocket = require('./routes/api');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();
const http = require('http').createServer(app);

const io = require('socket.io')(http, {
  cors: {
    origins: [PORT]
  }
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.resolve(__dirname, './client/build')));
app.use(routes);

mongoose.connect(process.env.MONGODB_URI, { useFindAndModify: false });

io.on('connection', (socket) => {
  console.log('a user connected');
  
  apiSocket.socIO(socket);

  return io;
});



http.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
}); 