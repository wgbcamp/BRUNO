var deck = {

    blueCard: [0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,"skip","skip","reverse","reverse","draw2","draw2"],
    greenCard: [0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,"skip","skip","reverse","reverse","draw2","draw2"],
    redCard: [0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,"skip","skip","reverse","reverse","draw2","draw2"],
    yellowCard: [0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,"skip","skip","reverse","reverse","draw2","draw2"],
    specialCard: [
        "wildCard",
        "wildCard",
        "wildCard",
        "wildCard",
        "wildDraw4Card",
        "wildDraw4Card",
        "wildDraw4Card",
        "wildDraw4Card"
    ],
}

var blueCardCounter = 19;
var greenCardCounter = 19;
var redCardCounter = 19;
var yellowCardCounter = 19;
var wildCardCounter = 4;
var wildDraw4CardCounter = 4;
var blankCardCounter = 4;

var players = [];







// console.log(deck.blueCard);

// console.log(deck.blueCard[deck.blueCard.length-1]); //draw2

// console.log(deck [Object.keys(deck)[1]] [20] ); //skip

// console.log ("deck length is " + Object.keys(deck).length); //deck length is 5

// console.log (deck [Object.keys(deck)[1]].length ); //25



// //logs the deck
// console.log(deck)

// //logs a deck property then logs a property's array element
// var x = Math.floor((Math.random()*Object.keys(deck).length));

// console.log("x = " + x)
// console.log("Card type: " + Object.keys(deck)[x]);

// var y = deck [Object.keys(deck)[x]] [Math.floor(Math.random()* deck[Object.keys(deck)[x]].length )] ;
// console.log("Card picked: " + y);


// //for loop that removes all cards in the deck at random

// for (a=0; a<108; a++){
//     var c = Math.floor(Math.random()*Object.keys(deck).length);
//     var d = Math.floor(Math.random()*deck[Object.keys(deck)[c]].length);
//     if(deck[Object.keys(deck)[c]] == ""){
//         a--;
//         console.log("No more cards remain in array of property " + Object.getOwnPropertyNames(deck)[c]);
//     }else{
//         console.log("Removed " + deck [Object.keys(deck)[c]] [d]);
//         deck[Object.keys(deck)[c]].splice(d, 1);
//     }    
// }

// //logs the deck
// console.log(deck)



//adds number of players to game, will use connected sessions in the future
const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

readline.question("How many players are in this game? ", playerCount => {
    console.log(`There are ${playerCount} players in this game!`);
    for (i=0; i<playerCount; i++){
        players.push({name: `player${i+1}`, hand: [], score: 0});
    }

    console.log(players);
    initialDraw();
    readline.close();
});

    // //log player score
    // console.log(players [Object.keys(players)[1]].score)

    // //add to player score
    // players [Object.keys(players)[1]].score++;


//draw functions

function initialDraw(){
    
    for (a=0; a<108; a++){
        var c = Math.floor(Math.random()*Object.keys(deck).length);
        var d = Math.floor(Math.random()*deck[Object.keys(deck)[c]].length);
        if(deck[Object.keys(deck)[c]] == ""){
            a--;
            console.log("No more cards remain in array of property " + Object.getOwnPropertyNames(deck)[c]);
        }else{
            players[Object.keys(players)[1]].hand.push(deck[Object.keys(deck)[c]][d]);
            console.log(players[Object.keys(players)[1]]);
            console.log("Removed " + deck [Object.keys(deck)[c]] [d]);
            deck[Object.keys(deck)[c]].splice(d, 1);
        }    
    }

}