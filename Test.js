// var array = [1,2,10,14,5,7,50,234];

// for (i=0; i<Math.ceil(array.length/2); i++){
    
//     var tempValue;
//     var value2 = array.length-i;

//     value2--;

//     tempValue = array[i];
//     array[i] = array[value2];
//     array[value2] = tempValue;
// }

//     console.log(array);
//     // console.log(array[0])
//     // console.log(array[array.length-1])



// var array = ["candy", "apple", "stacy"];

// array.push(array.splice(0,1).toString())
// // array.splice(array.length,1,array[0])
// console.log(array)

// var players = [{name: "sam", hand: ["cherry"], score: 0}, {name: "jeff", hand: ["orange"], score: 6} ];

// for (i=players.length-1; i>=0; i--){
            
//     console.log("testing the loop")
//     console.log(players[i].hand);

// }

// var arrayOfFunctions = [
//     function(){ first_function('a string')}
// ]



// var testDeck = ["Coco", "Flower"];
// console.log(testDeck);

// var arrayOfFunctions = [
//     function firstSkip(){
//         console.log("firstSkip")
//     },
//     function firstReverse(){
//         console.log("firstReverse")
//     },
//     function firstDrawTwo(){
//         console.log("firstDrawTwo")
//     },
//     function firstWild(){
//         console.log("firstWild")
//     },
//     function firstWildDrawFour(){
//         console.log("firstWildDrawFour")
//         if(testDeck[0] == "Coco"){
//            testDeck.splice(0, 1);
//            i = -1;
//            console.log(testDeck) 
//         }

//     }
// ]

// for (i=0; i<5; i++){
//     arrayOfFunctions[i]();
// }

// var number = 0;
// console.log("number started out as " + number)

// function add(){
//     number++;
// }

// function check(){
//     console.log("number is now " + number);
// }

// add();
// check();

// function passdown(){
//     var test = 0;
//     receive(test);
// }

// function receive(test){
//     // console.log(test);
//     console.log(6-test);
//     console.log(test)
//     if(test == undefined){
//         console.log("its undefined!")
//     }
// }

// // passdown();
// // receive();

// var players = ["jimmy", "jimjam", "eric"];
// var playerCounter = players.length;
// console.log(playerCounter);
// function scopetest(){
//     console.log(playerCounter);
//     playerCounter++;
//     console.log(playerCounter);
//     if (playerCounter == 4){
//         playerCounter = 1
//     }
//     console.log(playerCounter);
//     test2();
// }

// async function waitBro(){
//     await sleep(3000)
//     console.log(playerCounter)
// }

// function test2(){
//     console.log(playerCounter)
// }



// // scopetest();

// var x = -5;
// x++; x++;
// console.log(x);
// y = Math.abs(x)
// console.log(y);

// var gameDirection;
// console.log(gameDirection);

var array = ["salsa", "coffee"];
if (array[0].length > 4){
    console.log("it works")
}