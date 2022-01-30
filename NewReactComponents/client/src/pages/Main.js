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
    const [showPopup, switchPopup] = useState(false);
    const [showBlur, switchBlur] = useState(false);

    const changeStyle = () => {
        switchPopup(!showPopup);
    }

    const blur = (data) => {  
        console.log(data);
        if(data == true){
            switchBlur(true);
        }else{
            switchBlur(false);
        }
    }

    //dark mode switch
    const [darkMode, switchDarkMode] = useState(false);
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

    const submitStyle = {
        backgroundColor: darkMode ? "#4cdd81" : "#4cdd81",
        color: darkMode ? "white" : "white"
    }

  return (
    <div id="container" className={darkMode ? "container1" : "container2"}>  
    <HeaderBar darkMode={darkMode} showPopup={showPopup} blurFunction={blur}/>   
    <div id="mainGrid" className={`${"mainGrid1"} ${showBlur ? "blur" : "no-blur"}`} style={{backgroundColor: darkMode ? "#3d298a" : "white"}}>
        <div id="title" className="title" style={{color: darkMode ? "white" : "black"}}> 
            BRUNO
            <div id="subtitle" className="subtitle" style={{color: darkMode ? "#ededed" : "#383838"}}>
                A recreation of the classic crazy eights card game.
            </div>
        </div>
        <div id="createSession" className="createSession" onClick={() => {changeStyle(); switchBlur(!showBlur)}} style={{backgroundColor: darkMode ? "#c079ff" : "#3d298a"}}>
            Create Session
        </div>
        <div id="publicSession" className="publicSession" style={{backgroundColor: darkMode ? "#c079ff" : "#3d298a"}}>
            Browse Public Games
        </div>
        <div id="searchForSession" className="searchForSession" style={{backgroundColor: darkMode ? "#c079ff" : "#3d298a"}}>
            Search for Private Game
        </div>
    </div>
    <div id="sessionPopupContainer" className={showPopup ? "sessionPopupContainer1" : "sessionPopupContainer2"} onClick={() => {changeStyle(); switchBlur(!showBlur)}}>
        <div id="sessionPopup" className={showPopup ? "sessionPopup1" : "sessionPopup2"} style={{backgroundColor: darkMode? "#c079ff" : "#3d298a"}} onClick={(e) => e.stopPropagation()}>
            <div id="playerCountText" className="playerCountText">
                How many players?
            </div>
            <div id="playerCountContainer" className="playerCountContainer">
            <div id="arrow" className="arrowLeft" style={{backgroundColor: darkMode ? "#d7aaff" : "#706bff"}} onClick={() => decrement()}><i className="fas fa-long-arrow-alt-left"></i></div>
            <div id="playerCount" className="playerCount" style={{backgroundColor: darkMode ? "#d09aff" : "#5c57e6"}}>{playerCount}</div>
            <div id="arrow" className="arrowRight" style={{backgroundColor: darkMode ? "#d7aaff" : "#706bff"}} onClick={() => increment()}><i className="fas fa-long-arrow-alt-right"></i></div>
            </div>
            <div id="confirm" className="confirm" style={submitStyle} onClick={submitCode}>
                Submit
            </div>
        </div>
    </div>

    </div>
  );
}

export default App;
