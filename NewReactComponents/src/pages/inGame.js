import "../stylesheets/main.css";
import "../stylesheets/inGame.css";
import React, { useState, useEffect } from 'react';
import API from "../utilities/api";
import HeaderBar from "../subComponents/headerBar";



function InGame(props) {

    var credentials ={
        name: localStorage.getItem("userID"),
        session: window.location.href.slice(window.location.href.lastIndexOf("/") + 1, window.location.href.length)
    }
    useEffect(() => {
        
        
    }, [])

    props.ws.onopen = () => {
        //if cookie doesn't exist, then send a message to server to log the user, then saves a cookie that only allows the logged-in user to play as a specific player
        console.log("HIHIHI")
        props.ws.send("test");
    }
function StartGame(){
        // props.ws.send("test");
        console.log(credentials);
        API.signIntoGame(credentials);

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
        <div className="startButton" onClick={() => StartGame()} style={{color: 'white', backgroundColor: 'green'}}>START BUTTON</div>
        <div className="playerStats" >PLAYER STATS</div>
                {otherPlayerStats.map(({ player, name, score, hand }) => ( 
                    <div className={player} style={{color: props.darkMode ? "white" : "black"}} key={[player]}>
                        <div> {player}</div>
                        <div>Name: {name}</div>
                        <div>Score: {score}</div>
                        <div>Hand: {hand}</div>
                    </div>     
                ))}
                <div className="playerHandContainer">
                    <div className="placeholderArrowLeft">Left</div>
                    <div className="placeholderArrowRight">Right</div>
                    <div className="playerHand">
                        {yourHand.map((x) => (
                            <div className={`${"cardAlign"} ${yourHand[yourHand.indexOf(x)].slice(0, yourHand[yourHand.indexOf(x)].search("Card"))}`} key={x}>{x}</div>    
                        ))}
                    </div>
                </div>
        </div>
    </div>
  );
}

export default InGame;
