import "../stylesheets/main.css";
import React, { useState, useEffect } from 'react';
import * as ani from '../animations/animateDropdown';
import API from "../utilities/api";
import Help from "../subComponents/help";
import HeaderBar from "../subComponents/headerBar";

function App() {

    React.useEffect(() => {
        
    function detectDarkMode(){
            let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if(matched){
                localStorage.setItem('darkMode', 'enabled');
            }else{
                localStorage.setItem('darkMode', 'disabled');
            }   
        }
        detectDarkMode();

    })

    const [playerCount, setPlayers] = useState(2);
    const [showPopup, switchPopup] = useState("false");
    const [showDim, switchDim] = useState(false);

    const changeStyle = () => {
        switchPopup(!showPopup);
    }

    const dim = (data) => {  
        console.log(data);
        if(data == true){
            switchDim(true);
        }else{
            switchDim(false);
        }
    }

    const [darkMode, switchDarkMode] = useState(true);
    const [dModeHTML, switchHTML] = useState(darkMode ? "Disable Dark Mode" : "Enable Dark Mode");

    const changeDarkMode = () => {
        switchHTML(darkMode ? "Enable Dark Mode" : "Disable Dark Mode");
        switchDarkMode(!darkMode);
        
    }

    function increment(){
        if (playerCount !== 8){
            setPlayers(playerCount+1);
        }   
    }

    function decrement(){
        if (playerCount !== 2){
            setPlayers(playerCount-1);
        }
    }

    function submitCode(){
        
        API.createSession(playerCount);
    }

  return (
    <div id="container" className="container">  
    <HeaderBar darkMode={darkMode} showPopup={showPopup} dimFunction={dim}/>   
    <div id="mainGrid" className={`${showPopup ? "mainGrid1" : "mainGrid2"} ${showDim ? "blur" : "no-blur"}`} style={{backgroundColor: darkMode ? "#3d298a" : "white"}}>
        <Help />
        <div id="title" className="title" style={{color: darkMode ? "white" : "black"}}> 
            BRUNO
            <div id="subtitle" className="subtitle" style={{color: darkMode ? "#ededed" : "#383838"}}>
                A recreation of the classic crazy eights card game.
            </div>
        </div>
        <div id="createSession" className="createSession" onClick={changeStyle}>
            Create Session
        </div>
        <div id="publicSession" className="publicSession">
            Browse Public Games
        </div>
        <div id="searchForSession" className="searchForSession">
            Search for Private Game
        </div>
    </div>
    <div id="sessionPopupContainer" className={showPopup ? "sessionPopupContainer1" : "sessionPopupContainer2"} onClick={changeStyle}>
        <div id="sessionPopup" className={showPopup ? "sessionPopup1" : "sessionPopup2"} onClick={(e) => e.stopPropagation()}>
            <div id="playerCountText" className="playerCountText">
                How many players?
            </div>
            <div id="playerCountContainer" className="playerCountContainer">
            <div id="arrow" className="arrowLeft" onClick={() => decrement()}><i className="fas fa-long-arrow-alt-left"></i></div>
            <div id="playerCount" className="playerCount">{playerCount}</div>
            <div id="arrow" className="arrowRight" onClick={() => increment()}><i className="fas fa-long-arrow-alt-right"></i></div>
            </div>
            <div id="confirm" className="confirm" onClick={submitCode}>
                Submit
            </div>
        </div>
    </div>

    </div>
  );
}

export default App;
