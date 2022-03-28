import React from 'react';
import  ReactDOM  from 'react-dom';
import App from './app';
import socketIOClient from "socket.io-client";

const socket = socketIOClient('http://192.168.1.181:3001', {
});


socket.on("contact", (data) => {
    console.log(data);
});

socket.on("join/leave", (data) => {
    console.log(data);
});

socket.on("joined game", (data) => {
    console.log(data);
});

socket.on("error", (data) => {
    alert(data);
});

ReactDOM.render(<App socket={socket}/>,  document.getElementById("root")
);



