import React, { useState, useEffect } from "react";
import { io } from 'socket.io-client';
import API from '../../utils/api';

function Game(){

    useEffect(() => {
        const socket = io();
        socket.emit('getSessionData', sessionStorage.getItem("code"));
        socket.on("sessionDataToClient", (msg) => {
            console.log(msg)
            if(msg == null){
                alert("Code was not found in database.")
            }else{
                console.log(JSON.stringify(msg))
                var newName = prompt("Enter your name:");
                if(newName == null || newName == ""){
                    alert("you cancelled the prompt :(")
                }else{
                    socket.emit('changePlayerName', {code: sessionStorage.getItem("code"), name: newName});
                }
            }
        })

        for(var i=1; i<=8; i++){
            var d = document.createElement(`player${i}`);
            d.className="col-md-3";
            d.innerHTML=`
            
            <button type="button" class="btn btn-primary">Primary</button>
            `;
            document.getElementById("test").appendChild(d);
        }

   }, [])

      

    return(
        <div className="container vh">
            <div className="row h-100">

                <div className="col-sm" >
                    <div className="row text-center">
                        <div className="col">
                        <h1>SESSION: {sessionStorage.getItem("code")}</h1>
                        <h2>Share this code with others to invite them into your game.</h2>
                        </div>
                    </div>
                    <div className="row text-center h-50" id=""></div>
                    <div className="row text-center h-100" id="test">

                    </div>



                </div>

            </div>
        </div>
    )
}

export default Game;