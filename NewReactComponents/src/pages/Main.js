import "../stylesheets/main.css";
import React, { useState } from 'react';
import API from "../utilities/api";
import HeaderBar from "../subComponents/headerBar";


function App(props) {
    
    const characters = {
        type: "trigger_game",
        value: Math.random().toString(36).substring(2,15)
    }

    const packagedCharacters = JSON.parse(JSON.stringify(characters)).value;

    const [playerCount, setPlayers] = useState(2);
    
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
        
    
        props.switchLoadingIcon(true);
        props.switchBlur(!props.showBlur);
        props.switchPopup(!props.showPopup);
        console.log("test")

        API.createSession(playerCount, packagedCharacters, response);
        function response(result){
            console.log(result);
            window.location.assign(`/inGame/${packagedCharacters}`);
        }    
    }

    const submitStyle = {
        backgroundColor: props.darkMode ? "#4cdd81" : "#4cdd81",
        color: props.darkMode ? "white" : "white",
        textDecoration: 'none'
    }

  return (
    <div>
        {props.loadingIcon ? <div id="mainGrid" className={`${"mainGrid1"} ${props.showBlur ? "blur" : "no-blur"}`} style={{backgroundColor: props.darkMode ? "#3d298a" : "white"}}>
            <div className="loadingIconContainer"><div className="fa-10x"><i className="fas fa-spinner fa-spin" style={{color: props.darkMode ? "white" : "black"}}></i></div></div></div> : 
            <div>
                    <div id="mainGrid" className={`${"mainGrid1"} ${props.showBlur ? "blur" : "no-blur"}`} style={{backgroundColor: props.darkMode ? "#3d298a" : "white"}}>
        <div id="title" className="title" style={{color: props.darkMode ? "white" : "black"}}> 
            BRUNO
            <div id="subtitle" className="subtitle" style={{color: props.darkMode ? "#ededed" : "#383838"}}>
                A recreation of the classic crazy eights card game.
            </div>
        </div>
        <div id="createSession" className="createSession" onClick={() => {props.switchPopup(!props.showPopup); props.switchBlur(!props.showBlur)}} style={{backgroundColor: props.darkMode ? "#c079ff" : "#3d298a"}}>
            Create Session
        </div>
        <div id="publicSession" className="publicSession" style={{backgroundColor: props.darkMode ? "#c079ff" : "#3d298a"}}>
            Browse Public Games
        </div>
        <div id="searchForSession" className="searchForSession" style={{backgroundColor: props.darkMode ? "#c079ff" : "#3d298a"}}>
            Search for Private Game
        </div>
    </div>
    <div id="sessionPopupContainer" className={props.showPopup ? "sessionPopupContainer1" : "sessionPopupContainer2"} onClick={() => {props.switchPopup(!props.showPopup); props.switchBlur(!props.showBlur)}}>
        <div id="sessionPopup" className={props.showPopup ? "sessionPopup1" : "sessionPopup2"} style={{backgroundColor: props.darkMode? "#c079ff" : "#3d298a"}} onClick={(e) => e.stopPropagation()}>
            <div id="playerCountText" className="playerCountText">
                How many players?
            </div>
            <div id="playerCountContainer" className="playerCountContainer">
            <div id="arrow" className="arrowLeft" style={{backgroundColor: props.darkMode ? "#d7aaff" : "#706bff"}} onClick={() => decrement()}><i className="fas fa-long-arrow-alt-left"></i></div>
            <div id="playerCount" className="playerCount" style={{backgroundColor: props.darkMode ? "#d09aff" : "#5c57e6"}}>{playerCount}</div>
            <div id="arrow" className="arrowRight" style={{backgroundColor: props.darkMode ? "#d7aaff" : "#706bff"}} onClick={() => increment()}><i className="fas fa-long-arrow-alt-right"></i></div>
            </div>
            <div to="/InGame" className="confirm" style={submitStyle} onClick={() => submitCode()}>
            Submit
            </div>
        </div>
    </div>    
            </div>}

    
    </div>
  );
}

export default App;
