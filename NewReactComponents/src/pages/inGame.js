import "../stylesheets/main.css";
import "../stylesheets/inGame.css";
import React, { useState, useEffect } from 'react';
import API from "../utilities/api";
import socketIOClient from "socket.io-client";



function InGame(props) {
    
    var [players, adjustPlayers] = useState([]);

    
    
    useEffect(() => {
        
        if(localStorage.getItem("userID")){
        }else{
            localStorage.setItem("userID", Math.random().toString(36).substring(2,13));
        }

        const socket = socketIOClient('http://192.168.1.181:3001', {
        });

        // send a message to the server
        socket.emit("hello from client", 5, "6", { 7: Uint8Array.from([8]) });

        // receive a message from the server
        socket.on("contact", (data) => {
            console.log(data);
        });

        socket.emit('message', "hello");
        // const ws = new WebSocket(`ws://localhost:8080/?token=${localStorage.getItem("userID")}`);
        // ws.onopen = () => {
        //     console.log("websocket connected");
            
        //     var credentials ={
        //         name: localStorage.getItem("userID"),
        //         session: window.location.href.slice(window.location.href.lastIndexOf("/") + 1, window.location.href.length)
        //     }
        
        //     ws.send(JSON.stringify(credentials));
        // }

        // ws.onmessage = (e) => {
        //     console.log(JSON.parse(e.data));
        //     adjustPlayers(JSON.parse(e.data));
            
        // }
        
        // ws.onclose = () => {
        //     console.log('websocket disconnected')
        // }
        
        
    }, [])



function StartGame(){

        // console.log(credentials);
        // // API.signIntoGame(credentials);
        // ws.send("{x: 254: y: 100}");

}


    const [yourHand, updateYourHand] = useState(["greenCard4", "yellowCard5", "blueCardReverse", "wildCardDraw4", "redCardSkip"]);
    const [yourScore, updateYourScore] = useState(0);
    const otherPlayerStats = [
        { player: "player2", name: "Bill", score: 0, hand: ["redCard6 ", "blueCardSkip "] },
        { player: "player3", name: "Sam", score: 0, hand: ["redCard6 ", "blueCardSkip "] },
        { player: "player4", name: "Phil", score: 0, hand: ["redCard6 ", "blueCardSkip "] },
    ]

  return (
    <div>  
        <div id="mainGrid" className={`${"igGrid"} ${props.showBlur ? "blur" : "no-blur"}`} style={{backgroundColor: props.darkMode ? "#3d298a" : "white"}}>

        <div className="gameCode" style={{color: 'white'}}>{props.gameCode}</div>
        <div className="startButton" onClick={() => StartGame()} style={{color: 'white', backgroundColor: 'green'}}>Add Player</div>
        <div className="currentPlayers">CURRENT PLAYERS
            {players.map(( x ) => ( 
                    <div key={JSON.stringify(x)}>
                        <div> {x.name}</div>
                    </div>     
                ))}
        </div>
        
                {/* {otherPlayerStats.map(({ player, name, score, hand }) => ( 
                    <div className={player} style={{color: props.darkMode ? "white" : "black"}} key={[player]}>
                        <div> {player}</div>
                        <div>Name: {name}</div>
                        <div>Score: {score}</div>
                        <div>Hand: {hand}</div>
                    </div>     
                ))} */}
                <div className="playerHandContainer">
                    <div className="placeholderArrowLeft">Left</div>
                    
                    <div className="playerHand">
                        {yourHand.map((x) => (
                            <div className={`${"cardAlign"} ${yourHand[yourHand.indexOf(x)].slice(0, yourHand[yourHand.indexOf(x)].search("Card"))}`} key={x}>{x}</div>    
                        ))}
                    </div>
                    <div className="placeholderArrowRight">Right</div>
                </div>
        </div>
    </div>
  );
}

export default InGame;
