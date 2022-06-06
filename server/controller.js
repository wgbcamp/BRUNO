const e = require('express');
const { Db } = require('mongodb');
var mongoUtil = require('./database/mongoUtil');
var database = mongoUtil.getDb();
const collection = database.collection('test');
var gameLogic = require('./gameLogic');

checkForCollection();
//create collection on startup if none exists
async function checkForCollection(){
    var currentCollections = [];
    await database.listCollections().forEach(element => currentCollections.push(element.name));
    await console.log(currentCollections);

    for (var i = 0; i<currentCollections.length; i++){
        if(currentCollections[i] === 'test'){
            break;
        }
        if(i === currentCollections.length-1){
            database.createCollection('test', function(err, res){
                if(err) throw err;
                console.log("Collection test has been created");
            })
        }  
    }
}


async function insertOneFN(data){

    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    let gameCode = '';

    for ( let i = 0; i < characters.length; i++ ) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    for ( let e = 0; e < 5; e++ ){
            gameCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    const doc = { code: gameCode, _id: randomString, preliminaryCode: data.preliminaryCode, players: [], gameCreator: data.gameCreator, privileges: ["Join game"], inSession: false };
    const result = await collection.insertOne(doc);
    if(result !== "undefined"){
        console.log(`Document inserted: ${JSON.stringify(result)}`);
    }
    
}

async function addPlayer(data, cb){
    
    const filter = { preliminaryCode: data.session };
    const checkForGC = await collection.findOne(filter);

    //if the gameCreator has joined, add start game choice to their array
    if (checkForGC.gameCreator === data.id){
        var update = {
            $push: {
                players: {id: data.id, name: data.name, present: data.present, socketID: data.socketID, choices: ["Start game"], hand: []}
                    }
        };
    }else{
        var update = {
            $push: {
                players: {id: data.id, name: data.name, present: data.present, socketID: data.socketID, choices: [], hand: []}
                    }
        };
    }
    
    const checkRule = await collection.findOne(filter);

    //if we find a duplicate, break and if we found no duplicates then push
    if(checkRule.players.length === 8){
        console.log("Player length limit met.")
        var update = {$set: {}};
        }else{
            for (var i=0; i<checkRule.players.length; i++){   
                if (checkRule.players[i].id === data.id){
                    console.log("DUPLICATE FOUND!");
                    var update = {$set: {}};
                    break;
                    }
                }
            }

        const result = await collection.updateOne(filter, update);
        console.dir(result.acknowledged);
        const currentPlayers = await collection.findOne(filter);
        console.log(currentPlayers.players);
        cb(JSON.stringify(currentPlayers.players));
    }


async function readDB(data, cb){
    var query = "";
    if(data.fetchCode){
        query = { code: data.code };
    }
    if(data.fetchPrelim){
        query = { preliminaryCode: data.preliminaryCode};
    }
    if(data.fetchSocketID){
        query = { players: {$elemMatch: {socketID: data.socketID}}};
    }
    
    const result = await collection.findOne(query);

    if(result === null){
        cb("Document not found")
    }else{
        cb(result);
    }  
}

async function updatePresence(data, cb){

    var filter = {};
    var update = {};
    if(data.userID){
        filter = {"players.id": data.userID, preliminaryCode: data.gameSession};
        update = {$set: {"players.$.present": true, "players.$.socketID": data.socketID}};
    }
    
    if(data.players){
        var x = 0;
        for(var i = 0; i<data.players.length; i++){
            if(data.players[i].socketID === data.currentID){
                x = i;
                break;
            }
        }
        filter = {"players.socketID": data.players[i].socketID};
        update = {$set: {"players.$.present": false }};
    }

    const value = await collection.updateOne(filter, update);
    cb(value);
}

async function startGame(currentRoom, cb, userID){
    const checkStatus = await collection.findOne({code: currentRoom[0]});
    for (var i=0; i<checkStatus.players.length; i++){
        if(userID == checkStatus.gameCreator && userID == checkStatus.players[i].id){
            if(checkStatus.inSession === false){
                if(checkStatus.players.length > 1){
                console.log("controller loading deck...");
                console.log("setting inSession status to true");
                const value = await collection.updateOne({code: currentRoom[0]}, {$set: { deck: gameLogic.deck, inSession: true, }});
                console.log("controller added deck.");
                const removeStart = await collection.updateOne({code: currentRoom[0], "players.id": userID}, {$set: {"players.$.choices": [] }});
                console.log('removed Start game choice from gameCreator');
                const readDeck = await collection.findOne({code: currentRoom[0]});
                console.log("controller found deck.");

                gameLogic.shuffleDeck(readDeck.deck, response);
                    async function response(deck2){
                        console.log("controller received shuffled deck.");
                        const upc = await collection.findOne({code: currentRoom[0]});
                        for (var i=0; i<upc.players.length; i++){
                            upc.players[i].choices.push("Draw first card");
                        }
                        const result = await collection.updateOne({code: currentRoom[0]}, {$set: { deck: deck2, players: upc.players}});
                        console.log("controller updated deck.");
                        const value2 = await collection.findOne({code: currentRoom[0]});
                        console.log("controller found deck.")
                        console.log(deck2);
                        cb();
                    }
                }else{
                    console.log("Cannot start game. Not enough players in array.");
                }
            }else{
                console.log("Cannot start game. Game is currently in session.");
                cb();
            }
            break;
        }
    }
}

async function drawFirstCard(currentRoom, cb, playerID){

    const search = await collection.findOne({code: currentRoom[0]});
    
        gameLogic.initialDraw(search, playerID, response);
        async function response(data){
            var counter = 0;
            for (var i=0; i<data.players.length; i++){
                if(data.players[i].hand.length > 0){
                    counter++;
                }
            }
            if(counter === data.players.length){
                gameLogic.assignDealer(data, response);
                async function response(data2){
                    const result = await collection.updateOne({code: currentRoom[0]}, {$set: {deck: data2.deck, players: data2.players, playerOrder: data2.playerOrder}});
                cb();
                }
                
            }else{
                const result = await collection.updateOne({code: currentRoom[0]}, {$set: {deck: data.deck, players: data.players}});
                cb();
            }
            
            
        }
    
}

async function retrieveInitialDraw(currentRoom, cb){
    const search = await collection.findOne({code: currentRoom[0]});
    gameLogic.retrieveInitialDraw(search, response);
    async function response(data){
        const result = await collection.updateOne({code: currentRoom[0]}, {$set: {deck: data.deck, players: data.players}});
        cb();
    }
}


async function dealStartingHand(currentRoom, cb){
    const search = await collection.findOne({code: currentRoom[0]});
    gameLogic.initial7CardDeal(search, response);
    async function response(data){
        const result = await collection.updateOne({code: currentRoom[0]}, {$set: {deck: data.deck, players: data.players}});
        cb();
    }
}


async function setDrawPile(currentRoom, cb){
    const search = await collection.findOne({code: currentRoom[0]});
    gameLogic.createDrawPile(search, response);
    async function response(data){
        const result = await collection.updateOne({code: currentRoom[0]}, {$set: {deck: data.deck, drawPile: data.drawPile, players: data.players}});
        cb();
    }
}

//continue here
async function setDiscardPile(currentRoom, cb){
    const search = await collection.findOne({code: currentRoom[0]});
    gameLogic.beginDiscardPile(search, response);
    async function response(data){
        const result = await collection.updateOne({code: currentRoom[0]}, {$set: {drawPile: data.drawPile, discardPile: data.discardPile, rule: data.rule, players: data.players}})
        cb();
    }
}

//I want off Mr. Bones' async ride
async function loadDeck(currentRoom){
    console.log("controller loading deck...");

    const value = await collection.updateOne({code: currentRoom[0]}, {$set: { deck: gameLogic.deck }});
    console.log("controller added deck.");
    const readDeck = await collection.findOne({code: currentRoom[0]});
    console.log("controller found deck.");
    gameLogic.shuffleDeck(readDeck.deck, response);
    async function response(deck2){
        console.log("controller received shuffled deck.");
        const result = await collection.updateOne({code: currentRoom[0]}, {$set: { deck: deck2 }});
        console.log("controller updated deck.");
        const value2 = await collection.findOne({code: currentRoom[0]});
        console.log("controller found deck.")
        console.log(deck2);
        gameLogic.initialDraw(value2, response2);
        async function response2(deck3, tempHand){
            console.log("controller received spliced deck and tempHand from gameLogic.");
            for (var i=0; i<tempHand.length; i++){
                var tempHandValue = tempHand[i];
                const test = await collection.updateOne({code: currentRoom[0], "players.hand": []}, {$push: {"players.$.hand": tempHandValue}});
                if(i === tempHand.length-1){
                    console.log(`controller distributed ${i+1} unique cards to players with empty hands.`);
                    console.log(await collection.findOne({code: currentRoom[0]}));
                }
            }
            

            const updateDeck = await collection.updateOne({code: currentRoom[0]}, {$set: {deck: deck3}});
            console.log("controller updated deck with spliced deck results.");
            const value3 = await collection.findOne({code: currentRoom[0]});
            gameLogic.assignDealer(value3, response3);
            async function response3(dealer){
                console.log("THE DEALER IS: ");
                console.log(dealer);
                const setDealer = await collection.updateOne({code: currentRoom[0], 'players.name': dealer}, {$set: { 'players.$.dealer': true }});
                const value4 = await collection.findOne({code: currentRoom[0]});
                gameLogic.retrieveInitialDraw(value4, response4);
                async function response4(data){
                    console.log("This is the retrieveInitialDraw response with the shuffled deck callback: ");
                    console.log(data);
                    const initDrawReset = await collection.updateOne({code: currentRoom[0]}, {$set: {deck: data}});
                    const playerCount = await collection.findOne({code: currentRoom[0]});
                    
                    console.log(playerCount.players.length)
                    for (var i=0; i<playerCount.players.length; i++){
                        const kill1FromHand = await collection.updateOne({code: currentRoom[0], 'players.hand': {$size: 1}}, {$set: {'players.$.hand': []}});
                    }
                    console.log("controller returned initial draws from dealer assignment to bottom deck.");
                    const value5 = await collection.findOne({code: currentRoom[0]});
                    console.log('documents before initial7cardDeal:');
                    console.log(value5);
                    gameLogic.initial7CardDeal(value5, response5);
                    async function response5(deckInit7, tempHand){
                        const updDeckInit7 = await collection.updateOne({code: currentRoom[0]}, {$set: {deck: deckInit7}});
                        console.log("Temphand at start of response5:");
                        console.log(tempHand);
                        for (var i=0; i< value5.players.length; i++){
                            const distribute7Cards = await collection.updateOne({code: currentRoom[0], 'players.hand': []}, {$set: {'players.$.hand': tempHand.splice(0, 7)}});
                        }
                        console.log("Temphand at end of response5:");
                        console.log(tempHand);
                        const value6 = await collection.findOne({code: currentRoom[0]});
                        gameLogic.createDrawPile(value6, response6);
                        async function response6(drawPile){
                            const insDrawPile = await collection.updateOne({code: currentRoom[0]}, {$set: {drawPile: drawPile}});
                            const scrapDeck = await collection.updateOne({code: currentRoom[0]}, {$set: {deck: []}});
                            const value7 = await collection.findOne({code: currentRoom[0]});
                            gameLogic.beginDiscardPile(value7, response7);
                            async function response7(data, discardPile, rule){
                                console.log(discardPile);
                                const firstDiscardPileUpdate = await collection.updateOne({code: currentRoom[0]}, {$set: {drawPile: data, discardPile: discardPile, rule: rule}});

                            }
                        }
                    }
                }
            }
        }
    }
}

async function pushIntoHand(){}

module.exports = { insertOneFN, readDB, addPlayer, updatePresence, loadDeck, startGame, drawFirstCard, retrieveInitialDraw, dealStartingHand, setDrawPile, setDiscardPile }

/*
need error checking on playercount manipulation and same code/string already existing in database
*/