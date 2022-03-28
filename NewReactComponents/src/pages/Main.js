import "../stylesheets/main.css";
import React, { useState, useEffect } from 'react';
import API from "../utilities/api";


function App(props) {
    
    
    const characters = {
        type: "trigger_game",
        value: Math.random().toString(36).substring(2,15)
    }

    const packagedCharacters = JSON.parse(JSON.stringify(characters)).value;


    function submitCode(){
        
    
        API.createSession2(packagedCharacters, props.app.socket, response); 
        function response(result){
            console.log(result);
            window.location.assign(`/inGame/${packagedCharacters}`);
        }


    }

  return (
    <div>
        {props.app.loadingIcon ? <div id="mainGrid" className={`${"mainGrid1"}`} style={{backgroundColor: props.app.darkMode ? "#3d298a" : "white"}}>
            <div className="loadingIconContainer"><div className="fa-10x"><i className="fas fa-spinner fa-spin" style={{color: props.app.darkMode ? "white" : "black"}}></i></div></div></div> : 
            <div>
                    <div id="mainGrid" className={`${"mainGrid1"} ${props.app.showBlur ? "blur" : "no-blur"}`} style={{backgroundColor: props.app.darkMode ? "#3d298a" : "white"}}>
        <div id="title" className="title" style={{color: props.app.darkMode ? "white" : "black"}}> 
            BRUNO
            <div id="subtitle" className="subtitle" style={{color: props.app.darkMode ? "#ededed" : "#383838"}}>
                A recreation of the classic crazy eights card game.
            </div>
        </div>
        <div id="createSession" className="createSession" onClick={() => submitCode()} style={{backgroundColor: props.app.darkMode ? "#c079ff" : "#3d298a"}}>
            Create Session
        </div>
        <div id="publicSession" className="publicSession" style={{backgroundColor: props.app.darkMode ? "#c079ff" : "#3d298a"}}>
            Browse Public Games
        </div>
        <div id="searchForSession" className="searchForSession" style={{backgroundColor: props.app.darkMode ? "#c079ff" : "#3d298a"}}>
            Search for Private Game
        </div>
    </div>   
            </div>}

    
    </div>
  );
}

export default App;
