//DECK ARRAY**
var deck = [ "BlueCard0", "BlueCard1", "BlueCard1", "BlueCard2", "BlueCard2", "BlueCard3", "BlueCard3", "BlueCard4", "BlueCard4", "BlueCard5", "BlueCard5", "BlueCard6", "BlueCard6", "BlueCard7", "BlueCard7", "BlueCard8", "BlueCard8", "BlueCard9", "BlueCard9", "BlueCardSkip", "BlueCardSkip", "BlueCardReverse", "BlueCardReverse", "BlueCardDraw2", "BlueCardDraw2", "greenCard0", "greenCard1", "greenCard1", "greenCard2", "greenCard2", "greenCard3", "greenCard3", "greenCard4", "greenCard4", "greenCard5", "greenCard5", "greenCard6", "greenCard6", "greenCard7", "greenCard7", "greenCard8", "greenCard8", "greenCard9", "greenCard9", "greenCardSkip", "greenCardSkip", "greenCardReverse", "greenCardReverse", "greenCardDraw2", "greenCardDraw2", "RedCard0", "RedCard1", "RedCard1", "RedCard2", "RedCard2", "RedCard3", "RedCard3", "RedCard4", "RedCard4", "RedCard5", "RedCard5", "RedCard6", "RedCard6", "RedCard7", "RedCard7", "RedCard8", "RedCard8", "RedCard9", "RedCard9", "RedCardSkip", "RedCardSkip", "RedCardReverse", "RedCardReverse", "RedCardDraw2", "RedCardDraw2", "YellowCard0", "YellowCard1", "YellowCard1", "YellowCard2", "YellowCard2", "YellowCard3", "YellowCard3", "YellowCard4", "YellowCard4", "YellowCard5", "YellowCard5", "YellowCard6", "YellowCard6", "YellowCard7", "YellowCard7", "YellowCard8", "YellowCard8", "YellowCard9", "YellowCard9", "YellowCardSkip", "YellowCardSkip", "YellowCardReverse", "YellowCardReverse", "YellowCardDraw2", "YellowCardDraw2", "WildCard", "WildCard", "WildCard", "WildCard", "WildDraw4Card", "WildDraw4Card", "WildDraw4Card", "WildDraw4Card"]

//PLAYER ARRAY**
var players = [];

//MAIN GAME FUNCTION CALLS**
shuffleDeck();
generatePlayers();


//GENERATE PLAYER FUNCTIONS**

//adds number of players to game, will use connected sessions in the future
function generatePlayers(){

    const readline = require('readline').createInterface({
        input: process.stdin,
        output: process.stdout
    });
    
    readline.question("How many players are in this game? ", playerCount => {
        console.log(`There are ${playerCount} players in this game!`);
        for (i=0; i<playerCount; i++){
            players.push({name: `player${i+1}`, hand: [], score: 0, dealer: ""});
        }
    
        console.log(players);
        initialDraw();
        readline.close();
    });
}




//DRAW FUNCTIONS**

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



}

//ARRAY SHUFFLE FUNCTIONS**

//shuffles deck
function shuffleDeck(){
    
    console.log("Original Deck (unshuffled): ")
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
        if (isNaN(players[i].hand[0].charAt(players[i].hand[0].length-1)) == true && players[i].dealer == ""){
            players[i].dealer = "Not a number";
            players = players.concat(players.splice(i, 1));
            i=0;
        }
    }

    //sorts all zero values from highest to lowest
    for(i=0; i<10; i++){
            for(a=0; a<players.length; a++){
                    if(players[a].hand[0].charAt(players[a].hand[0].length-1) > i && players[a].dealer == ""){

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

}