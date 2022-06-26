// var inquirer = require('inquirer');

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

//regular gameplay
function normalTurn(){
    //if drawPile is depleted, run reshuffle, also prevents forcing reshuffle by playing the wrong card
    for (i=0; i<players.length; i++){
        if(players[i].hand.length == 0){
            noCardsLeft == players[i].name;
        }
    }
    if(noCardsLeft !== "blank"){
        endGameScore();
    }else{
        if(drawPile.length == 0 && stayOnPlayer == 0){
            reshuffle();
        }
        console.log("drawPile is = ")
        console.log(drawPile);
        console.log("discardPile is = ")
        console.log(discardPile)
     
        switch (rule){
            case "wildcard":
                rule = "";
                inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'chooseColor',
                        message: `What color will ${players[playerCounter].name} choose?`,
                        choices: [
                            'Red',
                            'Blue',
                            'Green',
                            'Yellow'
                        ]
                    }
                ]).then((answer) =>{
                    console.log("The color " + answer.chooseColor + " has been chosen.")
                    previousWildCardColor = wildCardColor;
                    wildCardColor = answer.chooseColor.toString();
                    standardSequence();
                })
                break;
            case "skip":
                rule = "";
                if(gameDirection == 0){
                    playerCounter--;
                }else{
                    playerCounter++;
                }
                console.log("PlayerCounter = " + playerCounter);
                if(playerCounter < 0){
                    playerCounter = players.length-1
                }else if (playerCounter > players.length-1){
                    playerCounter = 0;
                }
                standardSequence();
                break;
            case "reverse":
                rule = "";
                if(gameDirection == 0){
                    gameDirection = 1
                }else{
                    gameDirection = 0
                }
                standardSequence();
                break;
            case "draw2":
                rule = "";
                if(gameDirection == 0){
                    if(playerCounter > 0){
                        console.log(players[playerCounter-1].name + " drew " + drawPile.slice(0, 1) + " from the drawPile!");
                        players[playerCounter-1].hand.unshift(drawPile.splice(0, 1).toString());
                        console.log(players[playerCounter-1].name + " drew " + drawPile.slice(0, 1) + " from the drawPile!");
                        players[playerCounter-1].hand.unshift(drawPile.splice(0, 1).toString());
                    }else{
                        console.log(players[players.length-1].name + " drew " + drawPile.slice(0, 1) + " from the drawPile!");
                        players[players.length-1].hand.unshift(drawPile.splice(0, 1).toString());
                        console.log(players[players.length-1].name + " drew " + drawPile.slice(0, 1) + " from the drawPile!");
                        players[players.length-1].hand.unshift(drawPile.splice(0, 1).toString());
                    }
    
                }else{
                    if(playerCounter < players.length-1){
                        console.log(players[playerCounter+1].name + " drew " + drawPile.slice(0, 1) + " from the drawPile!");
                        players[playerCounter+1].hand.unshift(drawPile.splice(0, 1).toString());
                        console.log(players[playerCounter+1].name + " drew " + drawPile.slice(0, 1) + " from the drawPile!");
                        players[playerCounter+1].hand.unshift(drawPile.splice(0, 1).toString());
                    }else{
                        console.log(players[0].name + " drew " + drawPile.slice(0, 1) + " from the drawPile!");
                        players[0].hand.unshift(drawPile.splice(0, 1).toString());
                        console.log(players[0].name + " drew " + drawPile.slice(0, 1) + " from the drawPile!");
                        players[0].hand.unshift(drawPile.splice(0, 1).toString());
                    }
                }
                if(firstReverse == 1){
                    if(gameDirection == 0){
                        playerCounter--;
                    }else{
                        playerCounter++;
                    }
                    console.log("PlayerCounter = " + playerCounter);
                    if(playerCounter < 0){
                        playerCounter = players.length-1
                    }else if (playerCounter > players.length-1){
                        playerCounter = 0;
                    }
                }
                standardSequence();
                break;
            case "wilddraw4card":
                rule = "";
                inquirer
                .prompt([
                    {
                        type: 'list',
                        name: 'chooseColor',
                        message: `What color will ${players[playerCounter].name} choose?`,
                        choices: [
                            'Red',
                            'Blue',
                            'Green',
                            'Yellow'
                        ]
                    }
                ]).then((answer) =>{
                    console.log("The color " + answer.chooseColor + " has been chosen.")
                    previousWildCardColor = wildCardColor;
                    wildCardColor = answer.chooseColor.toString();
                    challenge();
                })
                break;
            default:
                standardSequence();
        }
    }

}

function standardSequence(){

    //prevents first reverse card rule from being applied
    firstReverse = 1;

    //prevents function from moving onto next player until a correct card is played
    if(stayOnPlayer == 0){
        //choose the next player based on game direction status
        if(gameDirection == 0){
            playerCounter--;
        }else{
            playerCounter++;
        }
        //check if player counter tracking goes out of bounds, correct when necessary
        if(playerCounter < 0){
            playerCounter = players.length-1
        }else if (playerCounter > players.length-1){
            playerCounter = 0;
        }
    }
    
    console.log(players[playerCounter]);

    inquirer
    .prompt([
        {
            type: 'list',
            name: 'startPlay',
            message: `What card will ${players[playerCounter].name} play?`,
            choices: players[playerCounter].hand
        }
    ])
    .then((answer) =>{
        var cardPicked = JSON.stringify(answer.startPlay);
        cardPicked = cardPicked.slice(1,-1); //removes quotes

        console.log("THIS IS THE WILDCARD COLOR CHOICE: " + wildCardColor);
        console.log("THIS IS THE CARD YOU PLAYED: " + cardPicked);
            //validate if card exists at top of discard pile based on type

            //first statement=checking first character, second statement=checking for last two characters to get number type, third statement=wildcard check
            if(cardPicked.charAt(0) == discardPile[0].charAt(0) || cardPicked.slice(cardPicked.length-2,cardPicked.length) == discardPile[0].slice(discardPile[0].length-2, discardPile[0].length) || cardPicked.charAt(0) == "W" || cardPicked.charAt(0) == wildCardColor.charAt(0)){
                console.log(`${cardPicked} matches ${discardPile[0]}!`)
                console.log(`Copying ${cardPicked} to top of discard pile.`);
                discardPile.unshift(cardPicked);
                console.log(`Removing ${cardPicked} from ${players[playerCounter].name}'s hand.`);
                players[playerCounter].hand.splice(players[playerCounter].hand.indexOf(cardPicked), 1);
                //card type will apply a rule that affects the cases of the next normalTurn
                if(cardPicked.slice(cardPicked.length-4, cardPicked.length) == "Skip"){
                    rule = "skip";
                }
                if(cardPicked.slice(cardPicked.length-7, cardPicked.length) == "Reverse"){
                    rule = "reverse";
                }
                if(cardPicked.slice(cardPicked.length-5, cardPicked.length) == "Draw2"){
                    rule = "draw2";
                }
                if(cardPicked.slice(0, cardPicked.length) == "WildCard"){
                    rule = "wildcard";
                }
                if(cardPicked == "WildDraw4Card"){
                    rule = "wilddraw4card"
                }
                //lets function move onto next player
                stayOnPlayer = 0;
                normalTurn();

                
            }else if(cardPicked == "Draw card from deck"){
                //if drawPile is depleted, run reshuffle 
                if(drawPile.length == 0){
                    reshuffle();
                }
                //player draws card if they have no match or choose to draw on their own accord, if card drawn matches card at top of discardPile, it must be played
                console.log(players[playerCounter].name + " drew " + drawPile.slice(0, 1) + " from the drawPile!");
                players[playerCounter].hand.unshift(drawPile.splice(0, 1).toString());
                var x = players[playerCounter].hand[0];
                console.log("######THIS IS X = " + x);
                if(x.charAt(0) == discardPile[0].charAt(0) || x.slice(x.length-2,x.length) == discardPile[0].slice(discardPile[0].length-2, discardPile[0].length) || x.charAt(0) == "W" || x.charAt(0) == wildCardColor.charAt(0)){
                    console.log(`${x} matches ${discardPile[0]}!`);
                    console.log(`Copying ${x} to top of discard pile.`);
                    discardPile.unshift(x);
                    console.log(`Removing ${x} from ${players[playerCounter].name}'s hand.`);
                    players[playerCounter].hand.splice(players[playerCounter].hand[0], 1);
                                    //card type will apply a rule that affects the cases of the next normalTurn
                    if(x.slice(x.length-4, x.length) == "Skip"){
                        rule = "skip";
                    }
                    if(x.slice(x.length-7, x.length) == "Reverse"){
                        rule = "reverse";
                    }
                    if(x.slice(x.length-5, x.length) == "Draw2"){
                        rule = "draw2";
                    }
                    if(x.slice(0, x.length) == "WildCard"){
                        rule = "wildcard";
                    }
                    if(x == "WildDraw4Card"){
                        rule = "wilddraw4card"
                    }
                }
                //lets function move onto next player
                stayOnPlayer = 0;
                normalTurn();
            }else{
                //restart function if played card does not match the type of the card at the top of the discard pile, alert player
                stayOnPlayer = 1;
                console.log(players[playerCounter].name + " picked " + cardPicked + ", but it doesn't match " + discardPile[0] + "!");
                normalTurn();
            }

    })  
}

function challenge(){

    if(gameDirection == 0){
        if(playerCounter > 0){                   
            challenger = playerCounter-1;
        }else{
            challenger = players.length-1;
        }
    }else{
        if(playerCounter < players.length-1){
            challenger = playerCounter+1;
        }else{
            challenger = 0;
        }
    }

    inquirer
    .prompt([
        {
            type: 'list',
            name: 'challengePrompt',
            message: `Will ${players[challenger].name} challenge ${players[playerCounter].name}'s WildDraw4Card?`,
            choices: [
                'Yes',
                'No'
            ]
        }
    ]).then((answer) =>{
        if (answer.challengePrompt == "Yes"){
            console.log(`Naturally, we would show ${players[playerCounter].name}'s hand to ${players[challenger].name}, but this is only a terminal application! Here's ${players[playerCounter].name}'s hand:`);
            console.log(players[playerCounter].hand);
            //variable that determines who will draw cards at the end of the challenge
            var draw = 0;
            //loops through hand of player who played WildDrawCard4
            for (i=0; i<players[playerCounter].hand.length; i++){
                //checks for color type between hand and discardPile, but omits wild cards
                if(players[playerCounter].hand[i].charAt(0) == discardPile[1].charAt(0) && players[playerCounter].hand[i].charAt(0)!== "W"){
                    console.log("### playerCounter.hand = " + players[playerCounter].hand[i].charAt(0))
                    console.log("### discardPile[1] = " + discardPile[1].charAt(0));
                    draw = 1;  
                }
                //checks for number and action type between hand and discardPile, but omits wild cards
                if(players[playerCounter].hand[i].slice(players[playerCounter].hand[i].length-2,players[playerCounter].hand[i].length) == discardPile[1].slice(discardPile[1].length-2, discardPile[1].length) && players[playerCounter].hand[i].charAt(0)!== "W"){
                    console.log("#### playerCounter.hand = " + players[playerCounter].hand[i].slice(players[playerCounter].hand[i].length-2,players[playerCounter].hand[i].length));
                    console.log("#### discardPile[1] = " + discardPile[1].slice(discardPile[1].length-2, discardPile[1].length));
                    draw = 1;
                }
                //checks for color type between hand and previousWildCardColor if wildCard or wildDraw4Card was played directly beforehand
                if(players[playerCounter].hand[i].charAt(0) == previousWildCardColor.charAt(0) && discardPile[1].charAt(0) == "W"){
                    console.log("## playerCounter.hand = " + players[playerCounter].hand[i].charAt(0));
                    console.log("## previousWildCardColor = " + previousWildCardColor.charAt(0));
                    console.log("## discardPile[1] = " + discardPile[1].charAt(0));
                    draw = 1;
                }
            }
            if(draw == 1){
                console.log(`${players[playerCounter].name} played WildDraw4Card illegally and will draw 4 cards!`);
                for(i=0; i<4; i++){
                    console.log(players[playerCounter].name + " drew " + drawPile.slice(0, 1) + " from the drawPile!");
                    players[playerCounter].hand.unshift(drawPile.splice(0, 1).toString());
                }  
            }else{
                console.log(`${players[challenger].name} played is incorrect and will draw 6 cards!`);
                for(i=0; i<6; i++){
                    console.log(players[challenger].name + " drew " + drawPile.slice(0, 1) + " from the drawPile!");
                    players[challenger].hand.unshift(drawPile.splice(0, 1).toString());
                }  
            }
        }else{
            for(i=0; i<4; i++){
                console.log(players[challenger].name + " drew " + drawPile.slice(0, 1) + " from the drawPile!");
                players[challenger].hand.unshift(drawPile.splice(0, 1).toString());
            }
        }

        if(firstReverse == 1){
            if(gameDirection == 0){
                playerCounter--;
            }else{
                playerCounter++;
            }
            console.log("PlayerCounter = " + playerCounter);
            if(playerCounter < 0){
                playerCounter = players.length-1
            }else if (playerCounter > players.length-1){
                playerCounter = 0;
            }
        }
        standardSequence();
    })
};

//shuffles deck
function reshuffle(){
    var g;

    console.log("discardPile before shuffle (unshuffled): ")
    console.log(discardPile);
    console.log("preserving card at top of discardPile");
    g = discardPile.splice(0, 1).toString();

    var currentIndex = discardPile.length;
    var randomCard, tempValue;

    while (currentIndex !== 0){
        randomCard = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempValue = discardPile[currentIndex];
        discardPile[currentIndex] = discardPile[randomCard];
        discardPile[randomCard] = tempValue;
    }
    console.log("Reshuffled discardPile and transferring to drawPile");
    drawPile = (discardPile.splice(0, discardPile.length)); 
    console.log("Unshifting preserved card into discardPile");
    discardPile.unshift(g);
    console.dir(drawPile, {'maxArrayLength': null});
}

//calculates end game score
function endGameScore(){

    
}

module.exports = { deck, uploadDeckToMongo, shuffleDeck, initialDraw, assignDealer, retrieveInitialDraw, initial7CardDeal, createDrawPile, beginDiscardPile };
