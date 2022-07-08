// var inquirer = require('inquirer');

const { setInternalBufferSize } = require("bson");
const e = require("express");
const { useSearchParams } = require("react-router-dom");

//DECK ARRAY**
var deck = [ "BlueCard0", "BlueCard1", "BlueCard1", "BlueCard2", "BlueCard2", "BlueCard3", "BlueCard3", "BlueCard4", "BlueCard4", "BlueCard5", "BlueCard5", "BlueCard6", "BlueCard6", "BlueCard7", "BlueCard7", "BlueCard8", "BlueCard8", "BlueCard9", "BlueCard9", "BlueCardSkip", "BlueCardSkip", "BlueCardReverse", "BlueCardReverse", "BlueCardDraw2", "BlueCardDraw2", "GreenCard0", "GreenCard1", "GreenCard1", "GreenCard2", "GreenCard2", "GreenCard3", "GreenCard3", "GreenCard4", "GreenCard4", "GreenCard5", "GreenCard5", "GreenCard6", "GreenCard6", "GreenCard7", "GreenCard7", "GreenCard8", "GreenCard8", "GreenCard9", "GreenCard9", "GreenCardSkip", "GreenCardSkip", "GreenCardReverse", "GreenCardReverse", "GreenCardDraw2", "GreenCardDraw2", "RedCard0", "RedCard1", "RedCard1", "RedCard2", "RedCard2", "RedCard3", "RedCard3", "RedCard4", "RedCard4", "RedCard5", "RedCard5", "RedCard6", "RedCard6", "RedCard7", "RedCard7", "RedCard8", "RedCard8", "RedCard9", "RedCard9", "RedCardSkip", "RedCardSkip", "RedCardReverse", "RedCardReverse", "RedCardDraw2", "RedCardDraw2", "YellowCard0", "YellowCard1", "YellowCard1", "YellowCard2", "YellowCard2", "YellowCard3", "YellowCard3", "YellowCard4", "YellowCard4", "YellowCard5", "YellowCard5", "YellowCard6", "YellowCard6", "YellowCard7", "YellowCard7", "YellowCard8", "YellowCard8", "YellowCard9", "YellowCard9", "YellowCardSkip", "YellowCardSkip", "YellowCardReverse", "YellowCardReverse", "YellowCardDraw2", "YellowCardDraw2", "WildCard", "WildCard", "WildCard", "WildCard", "WildDraw4Card", "WildDraw4Card", "WildDraw4Card", "WildDraw4Card"]

//DRAW PILE ARRAY
var drawPile = [];

//DISCARD PILE ARRAY
var discardPile = [];

//PLAYER ARRAY**
// var players = [];

//GLOBAL GAMEPLAY VARIABLES
var playerCounter = 0;
var rule;
var gameDirection = 0;
var firstReverse = 0;
var wildCardColor = "z";
var previousWildCardColor;
var stayOnPlayer = 0;
var challenger;
var noCardsLeft = "blank";


//MAIN GAME FUNCTION CALLS**
//shuffleDeck, generatePlayers, initialDraw, assignDealer, retrieveInitialDraw, initial7CardDeal, createDrawPile, beginDiscardPile


// shuffleDeck();
// generatePlayers();

function uploadDeckToMongo(){
    console.log("made it to game logic...")
}

//shuffles deck
function shuffleDeck(gDeck, cb){
    
    console.log("gameLogic received deck...");
    console.log(gDeck);

    var currentIndex = gDeck.length;
    var randomCard, tempValue;

    while (currentIndex !== 0){
        randomCard = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempValue = gDeck[currentIndex];
        gDeck[currentIndex] = gDeck[randomCard];
        gDeck[randomCard] = tempValue;
    }

    console.log("shuffled deck...");
    cb(gDeck);
}


//all players draw one card at the start of the game
function initialDraw(data, playerID, cb){
    console.log("gameLogic received data to begin initial draw.");
    for (var i=0; i<data.players.length; i++){
        if(data.players[i].id === playerID){

            if(data.deck[0].slice(-1) < 10 && data.deck[0].slice(-2, -1) !== "w"){
                data.players[i].hand.push(data.deck.splice(0, 1).toString());
                data.players[i].choices = [];        
                console.log(`gameLogic loaded ${i+1} cards into tempHand and spliced ${i+1} cards from the deck.`);
                break;

            }else{
                data.deck.push(data.deck.splice(0, 1).toString());
                i--;
            }
        }
    }
    console.log("gameLogic finished initialDraw, sending data back to controller.");
    cb(data);
}

//assigns dealer
function assignDealer(data, cb){
    data.playerOrder = data.players.map((x) => x);
    
    //distinguishes between number and non-number cards
    for(var i=0; i<data.players.length; i++){
        if (data.players[i].hand[0].slice(-1) < 10 && data.players[i].hand[0].slice(-2,-1) !== "w"){
            console.log(data.players);
        }
    }

    //sorts all zero values from highest to lowest
    console.log("PLAYER ORDER 1st:");
    console.log(data.playerOrder);
    for(i=0; i<10; i++){
        console.log("ran i" + i + " times")
            for(a=0; a<data.playerOrder.length; a++){
                console.log("ran a" + a + " times")
                    if(data.playerOrder[a].hand[0].slice(-1) > i){
                        console.log("LOOK");
                        console.log(data.playerOrder);   
                        data.playerOrder.splice(0, 0, data.playerOrder[a]);
                        data.playerOrder.splice(a+1, 1);
                    }      
            }
    }

    //decides dealer
    for (var i=0; i<data.players.length; i++){
        if(data.players[i].id === data.playerOrder[0].id){
            data.players[i].privileges = "dealer";
        }
    }

    //grant choice to dealer the ability to retrieve initial draw
    for (var i=0; i<data.players.length; i++){
        if(data.players[i].privileges === 'dealer'){
            data.players[i].choices.push('Retrieve initial draw');
        }
    }

    //removes redundant playerOrder properties
    for (var i=0; i<data.playerOrder.length; i++){
        data.playerOrder[i] = data.playerOrder[i].id;
    }

    console.log("PLAYER ORDER:");
    console.log(data.playerOrder);
    cb(data);
}


//returns card to deck that was dealt to each player after assigning dealer and shuffles deck
function retrieveInitialDraw(data, cb){
    console.log("This is the deck before retrieve initial draw starts shuffleDeck");
    console.log(data.deck);
    for(i=0; i<data.players.length; i++){
        data.deck.push(data.players[i].hand[0]);
        data.players[i].hand.splice(0,1);
        if(data.players[i].privileges === "dealer"){
            data.players[i].choices = [];
            data.players[i].choices.push("Deal starting hand");
        }
    }
    
    shuffleDeck(data.deck, response);
    function response(shuffledDeck){
        data.deck = shuffledDeck;
        cb(data);
    }
}

//evenly distributes 7 cards to players
function initial7CardDeal(data, cb){

    console.log("gameLogic received data to begin initial draw.");

    for (i=0; i<data.players.length; i++){
        for (a=0; a<7; a++){
            data.players[i].hand.push(data.deck.splice(0, 1).toString());
        }  
        if(data.players[i].privileges === "dealer"){
            data.players[i].choices = [];
            data.players[i].choices.push("Set draw pile");
        }    
    }
    console.log("Here's the deck after 7 cards were distributed to each player:");
    console.log(data.deck);
    cb(data);
}

//reflects deck and pushes to draw pile
function createDrawPile(data, cb){
    console.log("DECK SENT TO CREATEDRAWPILE:");
    console.log(data.deck);
    for (i=0; i<Math.ceil(data.deck.length/2); i++){
    
        var tempValue;
        var value2 = data.deck.length-i;
    
        value2--;
    
        tempValue = data.deck[i];
        data.deck[i] = data.deck[value2];
        data.deck[value2] = tempValue;
    }
    data.drawPile = [];
    data.drawPile = data.deck.map((x) => x);
    data.deck.splice(0, data.deck.length);

    for (i=0; i<data.players.length; i++){
        if(data.players[i].privileges === "dealer"){
            data.players[i].choices = [];
            data.players[i].choices.push("Set discard pile");
        }    
    }
    console.log("THE DRAWPILE:");
    console.log(data.drawPile);
    
    cb(data);
}

//starts discard pile, applies rules based on first card revealed
async function beginDiscardPile(data, cb){

    for (var i=0; i<data.drawPile.length; i++){
        if(data.drawPile[0] === 'WildDraw4Card'){
            data.drawPile.push(data.drawPile.splice(0, 1).toString()); 
        }else{
            data.rule = await getRule(data.drawPile[0].slice(-8));
            data.discardPile = [data.drawPile.splice(0, 1).toString()];

            //clears choices from dealer and applies choices to player position on first card that was drawn

            for (var d=0; d<data.players.length; d++){
                if(data.players[d].privileges === "dealer"){

                    data.players[d].choices = [];

                    var VR = await applyRule(d, data.rule);
                    

                    //NEW
                    //calculate position if value is less than max index
                    if(VR[0] < data.players.length-1){
                        if(VR[0] >= 0){
                            console.log("case1");
                            data.players[VR[0]].choices = [VR[1]];
                        }else{
                            console.log("case2");
                            data.players[data.players.length - Math.abs(VR[0])].choices = [VR[1]];
                        }
                    }

                    //calculate position if value is greater than or equal to max index
                    if(VR[0] >= data.players.length-1){
                        if(VR[0] === data.players.length-1){
                            console.log("case3")
                            data.players[VR[0]].choices = [VR[1]];
                        }else{
                            console.log("case4");
                            data.players[Math.abs(data.players.length-VR[0])].choices = [VR[1]];
                        }
                        
                    }

                    cb(data);
                    break;
                }
            }
            break;
        }
    }
}

    function getRule(type){
        var rules = {
            'WildCard': 'wildcard',
            'CardSkip': 'skip',
            'dReverse': 'reverse',
            'ardDraw2': 'draw2',
            'default': 'none'
        };
        return rules[type] || rules['default'];
    }

    function applyRule(value, rule){
        var rules = {
            'reverse': [value+1, 'Play card'],
            'skip': [value-2, 'Play card'],
            'draw2': [value-1, 'Draw 2 cards'],
            'wildcard': [value-1, 'Choose color'],
            'none': [value-1, 'Play card']
        };
        return rules[rule];
}

async function playCard(data, player, card, cb){

    var currentPlayer = "";
    var currentCard = "";
    var target = "";
    var choice = "";

    //validate player name, choice, and card requested
    loop1:
        for (var i=0; i<data.players.length; i++){
            for (var a=0; a<data.players[i].choices.length; a++){
                if (data.players[i].choices[a] === "Play card"){
                    if (data.players[i].id === player){
                        currentPlayer = data.players[i].name; 
                        for (var e=0; e<data.players[i].hand.length; e++){
                            if (data.players[i].hand[e] === card){
                                currentCard = data.players[i].hand[e];
                                break loop1;
                            }
                        }
                    } 
                }
            }
        }
    
    console.log("currentPlayer: " + currentPlayer);
    console.log("currentCard: " + currentCard);

    //splice card from player hand into top of discardpile
    loop2:
    if ((data.discardPile[0].slice(0, 4) === currentCard.slice(0, 4) || data.discardPile[0].slice(-5) === currentCard.slice(-5)) && currentPlayer !== ""){
        for (var i=0; i<data.players.length; i++){
            if (data.players[i].name === currentPlayer){
                for (var a=0; a<data.players[i].hand.length; a++){
                    if (data.players[i].hand[a] === currentCard){
                        data.discardPile.unshift(data.players[i].hand.splice(a, 1).toString());
                        break loop2;
                    }
                }
            }
        }
    }

    //pass play card choice and special card rule onto next player
    if (currentPlayer !== ""){
        for (var i=0; i<data.players.length; i++){
            for (var a=0; a<data.players[i].choices; a++){
                if (data.players[i].choices[a] === "Play card"){
                    data.players[i].choices.splice(a, 1);
                    
                    //creates array for rules given to players related to their positions
                    choice = await passRule(currentCard.slice(-5));

                    //index position differs based on wild cards
                    var index = 1;

                        if (choice.length === 3){
                            index = 2;
                        }else if (choice.length === 4){
                            index = 3;
                        }

                        //flips direction if reverse rule is already in place
                        if (data.rule === "reverse"){
                            choice[index] = -choice[index];
                        }

                        //decides target player 
                        if (i + choice[index] < 0){
                            target = data.players.length - choice[index];
                        }else if (i + choice[index] > data.players.length-1){
                            target = -1 + choice[index];
                        } else {
                            target = i + choice[index];
                        }

                        //applies choices to target player and reversal rule to game session
                        if (choice.length === 2){
                            ///

                            data.players[target].choices.unshift(choice[1]);

                            if (currentCard.slice(-7) === "Reverse"){
                                if (data.rule === "reverse"){
                                    data.rule = "none";
                                }else{
                                    data.rule = "reverse";
                                }
                            }

                        }else if (choices.length === 3){

                            //we need to add a temporary storage array to mongodb here to prevent the next player from receiving their choices at the same time as the current player
                            data.players[i].choo
                            data.players[target].choices.unshift(choice[1]);
                        } else {

                        }

                    }
                    
                    

                }
            }
        }
        //add reneging choice somewhere at the end of this function
    cb(data);
} 

    function passRule(type){
        var rules = {
            'Draw2': ['Draw two cards', -1],
            'verse': ['Play card', 1],
            'dSkip': ['Play card', -2],
            'dCard': ['Choose card color', 'Play card', -1],
            '4Card': ['Choose card color', 'Draw four cards', 'Challenge Wild Draw 4 Play', -1]
        };
        return rules[type];
    }


//calculates end game score
function endGameScore(){

    
}

module.exports = { deck, uploadDeckToMongo, shuffleDeck, initialDraw, assignDealer, retrieveInitialDraw, initial7CardDeal, createDrawPile, beginDiscardPile, playCard };
