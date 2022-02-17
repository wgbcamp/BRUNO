import React from 'react';
import  ReactDOM  from 'react-dom';
import App from './app';
const ws = new WebSocket('ws://localhost:8080');

ws.onopen = () => {
    console.log("websocket connected");
    
}
ws.onmessage = (e) => {
    if(sessionStorage.getItem('gameCode')){
        ws.send("test");
    }
}

ws.onclose = () => {
    console.log('websocket disconnected')
}

ReactDOM.render(<App ws={ws}/>,  document.getElementById("root")
);



