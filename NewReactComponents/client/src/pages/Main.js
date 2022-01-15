import "../stylesheets/main.css";
import React, { useState, useEffect } from 'react';
import * as ani from '../animations/animateDropdown';
import * as cC from '../animations/colorChange';
import API from "../utilities/api";

function App() {

    React.useEffect(() => {
        
    function detectDarkMode(){
            let matched = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if(matched){
                localStorage.setItem('darkMode', 'disabled');
                cC.darkMode("pageLoad");
            }else{
                localStorage.setItem('darkMode', 'enabled');
                cC.darkMode("pageLoad");
            }   
        }
        detectDarkMode();

    })

    const [playerCount, setPlayers] = useState(2);
    const [showPopup, switchPopup] = useState("false");

    const changeStyle = () => {
        switchPopup(!showPopup);
    }

    const [helpStatus, toggleHelp] = useState(false);
    const [settingsStatus, toggleStatus] = useState(false);

    const helpDropdown = () => {
        toggleStatus(false);
        toggleHelp(!helpStatus);  
    }
    const settingsDropdown = () => {
        toggleHelp(false);
        toggleStatus(!settingsStatus);
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
      <div id="headerBar" className={showPopup ? "headerBar1" : "headerBar2"}>
        <div id="siteLogo" className="siteLogo">
          <div id="placeholderLogo" className="placeholderLogo">
                  BRUNO
          </div>
        </div>
        <div id="help" className="help" onClick={helpDropdown} onMouseOut={cC.changeToBlack} style={{color: 'black'}}>Help </div>

        <div id="settings" className="settings" onClick={settingsDropdown} onMouseOut={cC.changeToBlack} style={{color: 'black'}}>Settings</div>

        <div id="source" className="source"><a href="https://github.com/wgbcamp/BRUNO"><i className="fab fa-github" onMouseOut={cC.changeToBlack} style={{color: 'black'}}> </i></a>
        </div>
      </div>
      <div id="dropdownHelp" className={helpStatus ? "dropdownHelp2" : "dropdownHelp1"}>
            <p>The key to winning a game of <u><b>BRUNO</b></u>, is by being the first player to play all of the cards in your hand each round.</p>

                            <p>The <u>first player</u> with no cards left in hand is awarded <u>points</u> based on the cards that are still left in each of their opponents' hands.</p>

                            <p>Each player draws a card at the start of the game. The player with the highest card value is designated as the <u>dealer</u>.</p>

                            <p>The deck is shuffled and each player is dealt <u>7 cards</u> from the top of the deck.</p>

                            <p>The remaining cards are placed facedown to and serve as the <u>draw pile</u>.</p>

                            <p>The first card from the top of the draw pile will be the first card of the <u>discard pile</u>.</p>

                            <p>The player to the <u>left of the dealer goes first</u>. Cards must be matched by color, type, or action to be played. Otherwise, the player must draw a card from the <u>draw pile</u>.</p>

                            <p>You must click <b>BRUNO</b> before you play your second to last card. If the next player catches you without saying <b>BRUNO</b>, you must draw 4 more cards from the <u>draw pile</u>.</p>

                            <p>There are 25 cards of each color type (Red, Blue, Green, & Yellow). These cards include numbered cards from 0 to 9 as well as Skip, Reverse, and Draw 2 cards. There are also 4 Wild cards and 4 Wild Draw 4 cards.</p>

                            <p>Scoring for the first player to play every card in their hand:
                                <br></br>
                                <br></br>
                                Numbered cards = their face value
                                <br></br>
                                <br></br>
                                Draw 2/Reverse/Skip = 20 points
                                <br></br>
                                <br></br>
                                Wild/Wild Draw 4 = 20 points
                            </p>
        </div>
        <div id="dropdownSettings" className={settingsStatus ? "dropdownSettings2" : "dropdownSettings1"}>
            <div id="settingsChoices" className="settingsChoices">
                <div id="volume" className="volume">
                    Sounds: ON/OFF
                </div>
                <div id="textSize" className="textSize">
                    Change text size
                </div>
                <div id="darkMode" className="darkMode" onClick={cC.darkMode}>Enable Dark Mode</div>
                <div id="leaveSession" className="leaveSession">
                    Leave Session
                </div>
            </div>
        </div>
    <div id="mainGrid" className={showPopup ? "mainGrid1" : "mainGrid2"}>
        <div id="title" className="title"> 
            BRUNO
            <div id="subtitle" className="subtitle">
                A recreation of the classic crazy eights card game.
            </div>
        </div>
        <div id="createSession" className="createSession" onClick={changeStyle}>
            Create Session
        </div>
        <div id="publicSession" className="publicSession" onMouseOver={cC.btnClrShift} onMouseOut={cC.originalColor}>
            Browse Public Games
        </div>
        <div id="searchForSession" className="searchForSession" onMouseOver={cC.btnClrShift} onMouseOut={cC.originalColor}>
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
