var inquirer = require('inquirer');

//DECK ARRAY**
var deck = [ "BlueCard0", "BlueCard1", "BlueCard1", "BlueCard2", "BlueCard2", "BlueCard3", "BlueCard3", "BlueCard4", "BlueCard4", "BlueCard5", "BlueCard5", "BlueCard6", "BlueCard6", "BlueCard7", "BlueCard7", "BlueCard8", "BlueCard8", "BlueCard9", "BlueCard9", "BlueCardSkip", "BlueCardSkip", "BlueCardReverse", "BlueCardReverse", "BlueCardDraw2", "BlueCardDraw2", "greenCard0", "greenCard1", "greenCard1", "greenCard2", "greenCard2", "greenCard3", "greenCard3", "greenCard4", "greenCard4", "greenCard5", "greenCard5", "greenCard6", "greenCard6", "greenCard7", "greenCard7", "greenCard8", "greenCard8", "greenCard9", "greenCard9", "greenCardSkip", "greenCardSkip", "greenCardReverse", "greenCardReverse", "greenCardDraw2", "greenCardDraw2", "RedCard0", "RedCard1", "RedCard1", "RedCard2", "RedCard2", "RedCard3", "RedCard3", "RedCard4", "RedCard4", "RedCard5", "RedCard5", "RedCard6", "RedCard6", "RedCard7", "RedCard7", "RedCard8", "RedCard8", "RedCard9", "RedCard9", "RedCardSkip", "RedCardSkip", "RedCardReverse", "RedCardReverse", "RedCardDraw2", "RedCardDraw2", "YellowCard0", "YellowCard1", "YellowCard1", "YellowCard2", "YellowCard2", "YellowCard3", "YellowCard3", "YellowCard4", "YellowCard4", "YellowCard5", "YellowCard5", "YellowCard6", "YellowCard6", "YellowCard7", "YellowCard7", "YellowCard8", "YellowCard8", "YellowCard9", "YellowCard9", "YellowCardSkip", "YellowCardSkip", "YellowCardReverse", "YellowCardReverse", "YellowCardDraw2", "YellowCardDraw2", "WildCard", "WildCard", "WildCard", "WildCard", "WildDraw4Card", "WildDraw4Card", "WildDraw4Card", "WildDraw4Card"]

//DRAW PILE ARRAY
var drawPile = [];

//DISCARD PILE ARRAY
var discardPile = [];

//PLAYER ARRAY**
var players = [];

//GLOBAL GAMEPLAY VARIABLES
var globalColor;
var globalNumberOrSymbol;
var gameDirection;



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

    while (drawPile[0] == "WildCard" || drawPile[0] == "WildDraw4Card"){
        console.log("Pushing a wild card to the bottom of the deck..")
        drawPile.push(drawPile.splice(0, 1).toString());
    }
        discardPile = (drawPile.splice(0, 1));

    console.log("discardPile created..")
    console.log("drawPile is = ")
    console.log(drawPile);
    console.log("discardPile is = ")
    console.log(discardPile)   

    console.log ("#####Just checking...")
    console.log(players);
    startPlay();
}

// starts regular gameplay
function startPlay(){
    normalTurn();
           
}

function normalTurn(){

    console.log("drawPile is = ")
    console.log(drawPile);
    console.log("discardPile is = ")
    console.log(discardPile) 
    var currPlay = players.length-1;
    console.log(players[currPlay]);

    inquirer
    .prompt([
        {
            type: 'list',
            name: 'startPlay',
            message: `What card will ${players[currPlay].name} play?`,
            choices: players[currPlay].hand
        }
    ])
    .then((answer) =>{

        
        var cardPicked = JSON.stringify(answer.startPlay);
        cardPicked = cardPicked.slice(1,-1);

            //validate if card exists at top of discard pile based on type

            if(cardPicked.charAt(0) == discardPile[0].charAt(0) || cardPicked.slice(cardPicked.length-2,cardPicked.length) == discardPile[0].slice(discardPile[0].length-2, discardPile[0].length) || cardPicked.charAt(0) == "W"){
                console.log(`${cardPicked} matches ${discardPile[0]}!`)
                console.log(`Copying ${cardPicked} to top of discard pile.`);
                discardPile.unshift(cardPicked);
                console.log(`Removing ${cardPicked} from ${players[currPlay].name}'s hand.`);
                players[currPlay].hand.splice(players[currPlay].hand.indexOf(cardPicked), 1);
                normalTurn();
            }
    })
}




