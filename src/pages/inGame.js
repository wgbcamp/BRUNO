import "../stylesheets/main.css";
import "../stylesheets/inGame.css";
import React, { useState, useEffect } from 'react';
import API from "../utilities/api";



function InGame(props) {
    
    var [players, adjustPlayers] = useState([]);
    var [yourChoices, updateYourChoices] = useState([]);
    var [yourPrivileges, updateYourPrivileges] = useState(["Join game"]);
    var gameCode = sessionStorage.getItem('gameCode');
    var g = window.location.pathname;
    var [playerName, setPlayerName] = useState([]);
    var [dealerPopup, toggleDealerPopup] = useState(false);
    

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
        props.cgp.socket.on("dealer", (data) => {
            props.cgp.switchBlur(!props.cgp.showBlur);
            toggleDealerPopup(true);
        });
        props.cgp.socket.on("updatePlayerChoices", (data) => {
            console.log(data);
            updateYourChoices(data);
        });
        props.cgp.socket.on("updatePrivileges", (data) => {
            console.log(data);
            updateYourPrivileges(data);
        });
        props.cgp.socket.on("updatePlayerHand", (data) => {
            console.log(data);
            updateYourHand(data);
            updateSimplifiedHand(data.slice(0,5));
        });
        props.cgp.socket.on("updateDiscardPile", (data) => {
            console.log(data);
            updateDiscardPile(data);
        });
        props.cgp.socket.on("updateRule", (data) => {
            console.log(data);
            updateRule(data);
        });
        
    }, [])

function buttonChoice(option){
    switch (option[0]){
        case "Join game":
            props.cgp.switchPopup(!props.cgp.showPopup); 
            props.cgp.switchBlur(!props.cgp.showBlur);
            props.cgp.handleClick();
            break;            
        case "Play card":
            props.cgp.socket.emit('play card', g.slice(1+g.lastIndexOf('/', g.length)), localStorage.getItem('userID'), option[1]);
            console.log(option);
            break;
        case "Red" || "Blue" || "Green" || "Yellow":
            props.cgp.socket.emit(option[0].toLowerCase(), g.slice(1+g.lastIndexOf('/', g.length)), localStorage.getItem('userID'), option[0]);
        default:
            props.cgp.socket.emit(option[0].toLowerCase(), g.slice(1+g.lastIndexOf('/', g.length)), localStorage.getItem('userID'));
    }
}


function joinGame(){
     
    props.cgp.socket.emit('join game', g.slice(1+g.lastIndexOf('/', g.length)), localStorage.getItem('userID'), playerName, (response) => {
            console.log(response.status);
    });
}


const submitStyle = {
    backgroundColor: props.cgp.darkMode ? "#4cdd81" : "#4cdd81",
    color: props.cgp.darkMode ? "white" : "white",
    textDecoration: 'none'
}
    const [yourHand, updateYourHand] = useState([]);

    const [simplifiedHand, updateSimplifiedHand] = useState([]);

    const [handFloor, updateHandFloor] = useState(0);
    const [handCeil, updateHandCeil] = useState(5);

    async function calculateArrayShift(data){
        if(yourHand.length > 5){

            if(data === "left"){
                if(handFloor > 0){
                    updateHandFloor(handFloor-1);
                    updateHandCeil(handCeil-1);
                    updateSimplifiedHand(yourHand.slice(handFloor-1, handCeil-1));
                }     
            }
            if(data === "right"){
                if(handCeil < yourHand.length){
                    updateHandFloor(handFloor+1);
                    updateHandCeil(handCeil+1);
                    updateSimplifiedHand(yourHand.slice(handFloor+1, handCeil+1));
                }
            }

            
        }else{
            console.log("NOPE");
        }
    }
    
    const [discardPile, updateDiscardPile] = useState([]);
    const [currentRule, updateRule] = useState([]);

    function receiveEnter(e) {
        if(e.key === 'Enter'){
            joinGame(); 
            props.cgp.switchPopup(!props.cgp.showPopup); 
            props.cgp.switchBlur(!props.cgp.showBlur); 
            setPlayerName("");
        }
    }
    

  return (
    <div>  
        <div id="mainGrid" className={`${"igGrid"} ${props.cgp.showBlur ? "blur" : "no-blur"}`} style={{backgroundColor: props.cgp.darkMode ? "#3d298a" : "white"}}>

        <div className="gameCode" style={{color: 'white'}}>{props.cgp.gameCode}</div>
        <div className="playerChoices" style={{backgroundColor: "#1c1c1c"}}>  
            {yourChoices === null ? '' : yourChoices.map((x) => (
                <div className={'bChoiceContainer'} style={{color: 'white'}} onClick={() => buttonChoice([x])}>
                <div className="choicesStyles"  key={x}>{x}</div> 
                </div>))}
            
            
            {yourPrivileges === [] ? "" : yourPrivileges.map((x) => (
                <div className={'bChoiceContainer'} style={{color: 'white'}} onClick={() => buttonChoice([x])}>
                <div className="choicesStyles"  key={x}>{x}</div> 
                </div>
            ))}          
        </div>
        
        <div className="currentPlayers" style={{textAlign: "center"}}>CURRENT PLAYERS
            {players.map(( x ) => ( 

                        <div key={JSON.stringify(x)} className="playerPresence" style={{backgroundColor: x.present ? "green" : "red"}}> {x.name}</div>
    
                ))}
        </div>
        <div className="discardPile" style={{textAlign: "center"}}> Previous Card
                {discardPile.map((x, index) => (
                    <div className={`${x.slice(0, x.search("Card"))}`} key={index}>{x}</div>
                ))}
        </div>
        <div className="currentRule" style={{textAlign: "center"}}> Current Rule
               {currentRule.map((x, index) => (
                    <div  style={{backgroundColor: "black", color: "white"}}key={index}>{x}</div>
               ))}
        </div>
                <div className="playerHandContainer">
                    <div className="placeholderArrowLeft" onClick={() => calculateArrayShift("left")}>Left</div>
                    
                    <div className="playerHand">
                        {simplifiedHand.map((x, index) => (
                            <div className={`${"cardAlign"} ${x.slice(0, x.search("Card"))}`} onClick={() => buttonChoice(["Play card", x])} key={index}>{x}</div>    
                        ))}
                    </div>
                    <div className="placeholderArrowRight" onClick={() => calculateArrayShift("right")}>Right</div>
                </div>
        </div>

        <div id="sessionPopupContainer" className={props.cgp.showPopup ? "sessionPopupContainer1" : "sessionPopupContainer2"} onClick={() => {props.cgp.switchPopup(!props.cgp.showPopup); props.cgp.switchBlur(!props.cgp.showBlur)}}>
        <div id="sessionPopup" className={props.cgp.showPopup ? "sessionPopup1" : "sessionPopup2"} style={{backgroundColor: props.cgp.darkMode? "#c079ff" : "#3d298a"}} onClick={(e) => e.stopPropagation()}>
            <div id="playerNameText" className="playerNameText">
                Enter nickname
            </div>

            <input ref={props.cgp.ref} type="name" value={playerName} className="playerCount" onChange={e => setPlayerName(e.target.value)} style={{backgroundColor: props.cgp.darkMode ? "#d09aff" : "#5c57e6", border: 'none'}} onKeyDown={(e) => receiveEnter(e)}></input>

            <div className="confirm" style={submitStyle} onClick={() => {joinGame(); props.cgp.switchPopup(!props.cgp.showPopup); props.cgp.switchBlur(!props.cgp.showBlur); setPlayerName("")}}>
            Submit
            </div>
        </div>
        </div>
        <div id="dealerPopupContainer" className={dealerPopup ? "dealerPopupContainer1" : "dealerPopupContainer2"} onClick={() => toggleDealerPopup(false)}>
            <div id="dealerPopup" className={dealerPopup ? "dealerPopup1" : "dealerPopup2"}>
                <div id="dealerText">You are the dealer.</div>
                <div id="dealerButton">Deal cards</div>
            </div>
        </div> 
    </div>
  );
}

export default InGame;
