import "../stylesheets/main.css";
import "../stylesheets/inGame.css";
import React, { useState, useEffect } from 'react';
import API from "../utilities/api";



function InGame(props) {
    
    var [players, adjustPlayers] = useState([]);

    

    var gameCode = sessionStorage.getItem('gameCode');
    var g = window.location.pathname;
    var [playerName, setPlayerName] = useState([]);
    

    useEffect(() => {
        
        if(localStorage.getItem("userID")){
        }else{
            localStorage.setItem("userID", Math.random().toString(36).substring(2,13));
        }
        API.signIntoRoom(window.location.href, gameCode, props.cgp.socket);   

        props.cgp.socket.on("updatePlayerList", (data) => {
            adjustPlayers(data);
            console.log(data);
        });

        
    }, [])



function StartGame(){
     
        props.cgp.socket.emit('join game', g.slice(1+g.lastIndexOf('/', g.length)), localStorage.getItem('userID'), playerName, (response) => {
            console.log(response.status);
        });
}

const submitStyle = {
    backgroundColor: props.cgp.darkMode ? "#4cdd81" : "#4cdd81",
    color: props.cgp.darkMode ? "white" : "white",
    textDecoration: 'none'
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
        <div id="mainGrid" className={`${"igGrid"} ${props.cgp.showBlur ? "blur" : "no-blur"}`} style={{backgroundColor: props.cgp.darkMode ? "#3d298a" : "white"}}>

        <div className="gameCode" style={{color: 'white'}}>{props.cgp.gameCode}</div>
        <div className="startButton" onClick={() => {props.cgp.switchPopup(!props.cgp.showPopup); props.cgp.switchBlur(!props.cgp.showBlur)}} style={{color: 'white', backgroundColor: 'green'}}>Add Player</div>
        <div className="currentPlayers" style={{textAlign: "center"}}>CURRENT PLAYERS
            {players.map(( x ) => ( 

                        <div key={JSON.stringify(x)} className="playerPresence" style={{backgroundColor: x.present ? "green" : "red"}}> {x.name}</div>
    
                ))}
        </div>
        
                {/* {otherPlayerStats.map(({ player, name, score, hand }) => ( 
                    <div className={player} style={{color: props.cgp.darkMode ? "white" : "black"}} key={[player]}>
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

        <div id="sessionPopupContainer" className={props.cgp.showPopup ? "sessionPopupContainer1" : "sessionPopupContainer2"} onClick={() => {props.cgp.switchPopup(!props.cgp.showPopup); props.cgp.switchBlur(!props.cgp.showBlur)}}>
        <div id="sessionPopup" className={props.cgp.showPopup ? "sessionPopup1" : "sessionPopup2"} style={{backgroundColor: props.cgp.darkMode? "#c079ff" : "#3d298a"}} onClick={(e) => e.stopPropagation()}>
            <div id="playerNameText" className="playerNameText">
                Enter nickname
            </div>

            <input type="name" value={playerName} className="playerCount" onChange={e => setPlayerName(e.target.value)} style={{backgroundColor: props.cgp.darkMode ? "#d09aff" : "#5c57e6", border: 'none'}}></input>

            <div className="confirm" style={submitStyle} onClick={() => {StartGame(); props.cgp.switchPopup(!props.cgp.showPopup); props.cgp.switchBlur(!props.cgp.showBlur); setPlayerName("")}}>
            Submit
            </div>
        </div>
    </div> 
    </div>
  );
}

export default InGame;
