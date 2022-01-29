import "../stylesheets/header.css";
import React, { useState, useEffect } from 'react';

function HeaderBar(props){

    const [helpStatus, toggleHelp] = useState(false);
    const [settingsStatus, toggleStatus] = useState(false);
    const [dimStatus, toggleDim] = useState(false);

    const helpDropdown = () => {
        toggleStatus(false);
        toggleHelp(!helpStatus);  
    }
    const settingsDropdown = () => {
        toggleHelp(false);
        toggleStatus(!settingsStatus);
    }

    const dimMainGrid = () => {
        toggleDim(!dimStatus);
        if(dimStatus == false){
            props.dimFunction(true);
        }else{
            props.dimFunction(false);
        }     
    }

    return(
        <div>
            <div id="headerBar" className={props.showPopup ? "headerBar1" : "headerBar2"} style={{backgroundColor: props.darkMode ? '#d549eb' : '#fdf906'}}>
                <div id="siteLogo" className="siteLogo">
                    <div id="placeholderLogo" className="placeholderLogo">
                    BRUNO
                    </div>
                </div>
                <div id="help" className="help" style={{color: 'black'}} onClick={() =>{helpDropdown(); dimMainGrid();}}>Help </div>

                <div id="settings" className="settings" style={{color: 'black'}} onClick={settingsDropdown}>Settings</div>

                <div id="source" className="source"><a href="https://github.com/wgbcamp/BRUNO"><i className="fab fa-github" style={{color: 'black'}}> </i></a>
                </div>
            </div>
            <div className="helpContainer">
                <div className={helpStatus ? "dropdownHelp2" : "dropdownHelp1"} style={{backgroundColor: props.darkMode ? "#d549eb" : "white", color: props.darkMode ? "black" : "#ededed"}}>
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
            </div>
            <div className="settingsContainer">
                <div className={settingsStatus ? "dropdownSettings2" : "dropdownSettings1"}>
                    <div className="volume">Sounds: ON/OFF</div>
                    <div className="textSize">Change text size</div>
                    <div className="darkMode">placeholder for dark mode</div>
                    <div className="leaveSession">Leave Session</div>
                </div>
            </div>
    </div>
    )
}
export default HeaderBar;
