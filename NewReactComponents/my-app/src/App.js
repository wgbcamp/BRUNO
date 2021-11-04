import './App.css';
import React, { useState, useEffect } from 'react';
import * as ani from './animateDropdown';
import * as cC from './colorChange';

function App() {

    React.useEffect(() => {
        function resizeContent(){
            console.log('innerWidth: ' + window.innerWidth + 'innerHeight: ' + window.innerHeight)
        }
        window.addEventListener('resize', resizeContent);
    })
    

  return (
    <div id="container">
      <div id="headerBar" className="headerBar">
        <div id="siteLogo">
          <div id="placeholderLogo">
                  BRUNO
                  
          </div>
        </div>
        <div id="help" onClick={ani.animateDropdown} onMouseOut={cC.changeToBlack} style={{color: 'black'}}>Help </div>

        <div id="settings" onClick={ani.animateDropdown} onMouseOut={cC.changeToBlack} style={{color: 'black'}}>Settings</div>

        <div id="source"><a href="https://github.com/wgbcamp/BRUNO"><i className="fab fa-github" onMouseOut={cC.changeToBlack} style={{color: 'black'}}> </i></a>
        </div>
      </div>
      <div id="dropdownHelp">
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
        <div id="dropdownSettings">
            <div id="settingsChoices">
                <div id="volume" className="ddButton btnClr">
                    Sounds: ON/OFF
                </div>
                <div id="textSize" className="ddButton btnClr">
                    Change text size
                </div>
                <div id="darkMode" className="ddButton btnClr" onClick={cC.darkMode}>Enable Dark Mode</div>
                <div id="leaveSession" className="ddButton btnClr">
                    Leave Session
                </div>
            </div>
        </div>
    <div id="mainGrid">
        <div id="title"> 
            BRUNO
            <div id="subtitle">
                A recreation of the classic crazy eights card game.
            </div>
        </div>
        <div id="createSession" className="mainButton btnClr" onMouseOver={cC.btnClrShift} onMouseOut={cC.originalColor}>
            Create Session
        </div>
        <div id="publicSession" className="mainButton btnClr" onMouseOver={cC.btnClrShift} onMouseOut={cC.originalColor}>
            Browse Public Games
        </div>
        <div id="searchForSession" className="mainButton btnClr" onMouseOver={cC.btnClrShift} onMouseOut={cC.originalColor}>
            Search for Private Game
        </div>
    </div>
    </div>
  );
}

export default App;
