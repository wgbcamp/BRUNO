var inquirer = require('inquirer');

//DECK ARRAY**
var deck = [ "BlueCard0", "BlueCard1", "BlueCard1", "BlueCard2", "BlueCard2", "BlueCard3", "BlueCard3", "BlueCard4", "BlueCard4", "BlueCard5", "BlueCard5", "BlueCard6", "BlueCard6", "BlueCard7", "BlueCard7", "BlueCard8", "BlueCard8", "BlueCard9", "BlueCard9", "BlueCardSkip", "BlueCardSkip", "BlueCardReverse", "BlueCardReverse", "BlueCardDraw2", "BlueCardDraw2", "GreenCard0", "GreenCard1", "GreenCard1", "GreenCard2", "GreenCard2", "GreenCard3", "GreenCard3", "GreenCard4", "GreenCard4", "GreenCard5", "GreenCard5", "GreenCard6", "GreenCard6", "GreenCard7", "GreenCard7", "GreenCard8", "GreenCard8", "GreenCard9", "GreenCard9", "GreenCardSkip", "GreenCardSkip", "GreenCardReverse", "GreenCardReverse", "GreenCardDraw2", "GreenCardDraw2", "RedCard0", "RedCard1", "RedCard1", "RedCard2", "RedCard2", "RedCard3", "RedCard3", "RedCard4", "RedCard4", "RedCard5", "RedCard5", "RedCard6", "RedCard6", "RedCard7", "RedCard7", "RedCard8", "RedCard8", "RedCard9", "RedCard9", "RedCardSkip", "RedCardSkip", "RedCardReverse", "RedCardReverse", "RedCardDraw2", "RedCardDraw2", "YellowCard0", "YellowCard1", "YellowCard1", "YellowCard2", "YellowCard2", "YellowCard3", "YellowCard3", "YellowCard4", "YellowCard4", "YellowCard5", "YellowCard5", "YellowCard6", "YellowCard6", "YellowCard7", "YellowCard7", "YellowCard8", "YellowCard8", "YellowCard9", "YellowCard9", "YellowCardSkip", "YellowCardSkip", "YellowCardReverse", "YellowCardReverse", "YellowCardDraw2", "YellowCardDraw2", "WildCard", "WildCard", "WildCard", "WildCard", "WildDraw4Card", "WildDraw4Card", "WildDraw4Card", "WildDraw4Card"]

//DRAW PILE ARRAY
var drawPile = [];

//DISCARD PILE ARRAY
var discardPile = [];

//PLAYER ARRAY**
var players = [];
var currentPlayer = players.length-1;

//GLOBAL GAMEPLAY VARIABLES
var playerCounter;
var rule;
var gameDirection = 0;
var firstReverse = 1;


//MAIN GAME FUNCTION CALLS**
//shuffleDeck, generatePlayers, initialDraw, assignDealer, retrieveInitialDraw, initial7CardDeal, createDrawPile, beginDiscardPile


shuffleDeck();
generatePlayers();



//shuffles deck
function shuffleDeck(){
    
    console.log("Before shuffle (unshuffled): ")
    console.log(deck);

    var currentIndex = deck.length;
    var randomCard, tempValue;

    while (currentIndex !== 0){
        randomCard = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempValue = deck[currentIndex];
        deck[currentIndex] = deck[randomCard];
        deck[randomCard] = tempValue;
    }
    console.log("Shuffled Deck: ")
    console.log(deck);
}

//adds number of players to game, will use connected sessions in the future
function generatePlayers(){

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'playerCount',
                message: 'How many players are in this game?',
                choices: [1,2,3,4,5,6,7,8]
            }
        ])
        .then((answer) =>{
            var playerCount = JSON.stringify(answer.playerCount);
            console.log(`There are ${playerCount} players in this game!`);
            for (i=0; i<playerCount; i++){
                players.push({name: `player${i+1}`, hand: [], score: 0, dealer: ""});
            }
            playerCounter = players.length - 1;
            console.log(players);
            initialDraw();
        })
}


//all players draw one card at the start of the game
function initialDraw(){
    console.log("Starting initial draw...")
    for (i=0; i<players.length; i++){
            console.log("Pushed " + deck[0] + " into " + players[i].name + "'s hand.")
            players[i].hand.push(deck[0]);
            deck.splice(0, 1);
    }
    console.log("testing " + players[0].hand[0].charAt(players[0].hand[0].length-1));
    console.log("###PLAYERS BEFORE ASSIGN DEALER");
    console.table(players);
    assignDealer();
}

//assigns dealer
function assignDealer(){

    //randomizes player order
    var currentIndex = players.length;
    var randomPlayer, tempValue;

    while (currentIndex !== 0){
        randomPlayer = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        tempValue = players[currentIndex];
        players[currentIndex] = players[randomPlayer];
        players[randomPlayer] = tempValue;
    }

    console.log("###PLAYERS AFTER RANDOMIZE PLAYER ORDER");
    console.table(players);

    //sends all nonzero values to the end of array
    for(i=0; i<players.length; i++){
        if (isNaN(players[i].hand[0].slice(-1)) == true && players[i].dealer == ""){
            players[i].dealer = "Not a number";
            players = players.concat(players.splice(i, 1));
            i--;
        }
    }

    //sorts all zero values from highest to lowest
    for(i=0; i<10; i++){
            for(a=0; a<players.length; a++){
                    if(players[a].hand[0].slice(-1) > i && players[a].dealer == ""){

                        players = players.splice(a, 1).concat(players);
                    }      
            }
    }

    //resets all players.dealer values to false
    for(i=0; i<players.length; i++){
        players[i].dealer = "false"
    }

    //sets first players.dealer value to true
    players[0].dealer = "true";


    console.log("###PLAYERS AFTER ASSIGN DEALER");
    console.table(players);
    retrieveInitialDraw();

}

//returns card to deck that was dealt to each player after assigning dealer and shuffles deck
function retrieveInitialDraw(){
    console.log("before retrieve initial draw")
    console.dir(deck, {'maxArrayLength': null});
    console.table(players);
    for(i=0; i<players.length; i++){
        deck.push(players[i].hand[0]);
        players[i].hand = [];
    }
    console.log("after retrieve initial draw")
    console.dir(deck, {'maxArrayLength': null});
    console.table(players);

    shuffleDeck();
    initial7CardDeal();
}


//evenly distributes 7 cards to 
function initial7CardDeal(){

    for (z=0; z<players.length; z++){

        for (a=0; a<7; a++){

            players[z].hand.push(deck[0]);
            deck.splice(0, 1);
        }
    }
    
    console.dir(players, {'maxArrayLength': null});
    console.log(deck);
    createDrawPile();
}

//reflects deck and pushes to draw pile
function createDrawPile(){

    console.log("Deck before createDrawPile()");
    console.dir(deck, {'maxArrayLength': null});
    
    console.log("Creating draw pile...");
    

    for (i=0; i<Math.ceil(deck.length/2); i++){
    
        var tempValue;
        var value2 = deck.length-i;
    
        value2--;
    
        tempValue = deck[i];
        deck[i] = deck[value2];
        deck[value2] = tempValue;
    }

    drawPile = (deck.splice(0, deck.length)); 
    console.dir(drawPile, {'maxArrayLength': null});
    console.log(deck);
    beginDiscardPile();
}

//starts discard pile, applies rules based on first card revealed
function beginDiscardPile(){

    switch ("BlueCardReverse"){
        case "WildDraw4Card":
            firstReverse = 0;
            while (drawPile[0] == 'WildDraw4Card'){
                console.log("Pushing a wild card to the bottom of the deck..")
                drawPile.push(drawPile.splice(0, 1).toString());
            }
            discardPile.unshift(drawPile.splice(0, 1).toString());
            
            normalTurn();
            break;
        case "WildCard":
            firstReverse = 0;
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
                discardPile.unshift(drawPile.splice(0, 1).toString());
                console.log("The color " + answer.chooseColor + " has been chosen.")
                discardPile.unshift(answer.chooseColor);
                rule = "modifier";
                normalTurn();
            })
            break;
        case "BlueCardSkip":
        case "GreenCardSkip":
        case "RedCardSkip":
        case "YellowCardSkip":
            firstReverse = 0;
            discardPile.unshift(drawPile.splice(0, 1).toString()); 
            rule = "skip";
            normalTurn();
            break;
        case "BlueCardReverse":
        case "GreenCardReverse":
        case "RedCardReverse":
        case "YellowCardReverse":
            discardPile.unshift(drawPile.splice(0, 1).toString());
            rule = "reverse";
            if (gameDirection == 0){
                gameDirection = 1;
            }else{
                gameDirection = 0;
            }
            if (firstReverse == 1){
                playerCounter = 0;
            }
            normalTurn();
            break;
        case "BlueCardDraw2":
        case "GreenCardDraw2":
        case "RedCardDraw2":
        case "YellowCardDraw2":
            firstReverse = 0;
            discardPile.unshift(drawPile.splice(0, 1).toString());
            rule = "draw2";
            players[playerCounter].hand.push(drawPile.splice(0, 1).toString());
            players[playerCounter].hand.push(drawPile.splice(0, 1).toString());
            normalTurn();
            break;
        default:
            firstReverse = 0;
            discardPile.unshift(drawPile.splice(0, 1).toString());
            normalTurn();
    }       

}

//regular gameplay
function normalTurn(){
    
    console.log("drawPile is = ")
    console.log(drawPile);
    console.log("discardPile is = ")
    console.log(discardPile)
 
    switch (rule){
        case "modifier":
            rule = "";
            standardSequence();
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
                playerCounter--;
            }else{
                playerCounter++;
            }
            standardSequence();
            break;
        case "draw2":
            rule = "";
            standardSequence();
            break;
        default:
            standardSequence();
    }
}

function standardSequence(){
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

        console.log("THIS IS ANSWER.STARTPLAY!!! " + answer.startPlay);
        var cardPicked = JSON.stringify(answer.startPlay);
        cardPicked = cardPicked.slice(1,-1); //removes quotes

            //validate if card exists at top of discard pile based on type

            //first statement=checking first character, second statement=checking for last two characters to get number type, third statement=wildcard check
            if(cardPicked.charAt(0) == discardPile[0].charAt(0) || cardPicked.slice(cardPicked.length-2,cardPicked.length) == discardPile[0].slice(discardPile[0].length-2, discardPile[0].length) || cardPicked.charAt(0) == "W"){
                console.log(`${cardPicked} matches ${discardPile[0]}!`)
                console.log(`Copying ${cardPicked} to top of discard pile.`);
                discardPile.unshift(cardPicked);
                console.log(`Removing ${cardPicked} from ${players[playerCounter].name}'s hand.`);
                players[playerCounter].hand.splice(players[playerCounter].hand.indexOf(cardPicked), 1);
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
                if(discardPile[discardPile.length-2].length < 7){
                    console.log("Removing color placeholder");
                    discardPile.splice(discardPile.length-2, 1);
                    }
                normalTurn();
            }else{
                console.log(players[playerCounter].name + " picked " + cardPicked + ", but it doesn't match " + discardPile[0] + "! Calling normalTurn() again.");
                normalTurn();
            }

    })  
}

function specialCardRules(){
    
};