import "../stylesheets/main.css";
import "../stylesheets/inGame.css";
import React, { useState, useEffect } from 'react';
import API from "../utilities/api";
import HeaderBar from "../subComponents/headerBar";
import { Link } from "react-router-dom";

function InGame() {

    React.useEffect(() => {
        
        function detectDarkMode(){
            if(localStorage.getItem('userSetDarkMode') == undefined){
                let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;
                if(matched){
                    swDarkMode1(true);
                }else{
                    swDarkMode1(false);
                }
            }
            if(localStorage.getItem('userSetDarkMode') === 'dark'){
                swDarkMode1(true);                
            } 
        }
        detectDarkMode();
    })

    const [playerCount, setPlayers] = useState(2);
    const [showPopup, switchPopup] = useState(false);
    const [showBlur, switchBlur] = useState(false);

    const blur = (data) => {  
        if(data == true){
            switchBlur(!showBlur);
        }
    }

    //dark mode switch
    const [darkMode, swDarkMode1] = useState(false);

    const swDarkMode2 = (data) => {
        if(data == true){
            swDarkMode1(!darkMode);

        }
    }

    function submitCode(){
        
        API.createSession(playerCount);
    }

    const [yourHand, updateYourHand] = useState(["greenCard4", "yellowCard5", "blueCardReverse", "wildCardDraw4", "redCardSkip"]);
    const [yourScore, updateYourScore] = useState(0);
    const otherPlayerStats = [
        { player: "player2", name: "Bill", score: 0, hand: ["redCard6 ", "blueCardSkip "] },
        { player: "player3", name: "Sam", score: 0, hand: ["redCard6 ", "blueCardSkip "] },
        { player: "player4", name: "Phil", score: 0, hand: ["redCard6 ", "blueCardSkip "] },
    ]
    
  return (
    <div id="container" className={darkMode ? "container1" : "container2"}>  
    <HeaderBar swDarkMode3={swDarkMode2} darkMode={darkMode} showPopup={showPopup} blurFunction={blur}/>   
        <div id="mainGrid" className={`${"igGrid"} ${showBlur ? "blur" : "no-blur"}`} style={{backgroundColor: darkMode ? "#3d298a" : "white"}}>

                {otherPlayerStats.map(({ player, name, score, hand }) => ( 
                    <p className={player} style={{color: darkMode ? "white" : "black"}} key={[player]}>
                        <div> {player}</div>
                        <div>Name: {name}</div>
                        <div>Score: {score}</div>
                        <div>Hand: {hand}</div>
                    </p>     
                ))}
                <div className="playerHandContainer">
                    <div className="placeholderArrowLeft">Left</div>
                    <div className="placeholderArrowRight">Right</div>
                    <div className="playerHand">
                        {yourHand.map((x) => (
                            <div className={`${"card1"} ${yourHand[yourHand.indexOf(x)].slice(0, yourHand[yourHand.indexOf(x)].search("Card"))}`}>{x}</div>    
                        ))}
                    </div>
                </div>
        </div>
    </div>
  );
}

export default InGame;
