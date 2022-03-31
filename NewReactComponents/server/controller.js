var mongoUtil = require('./database/mongoUtil');
var database = mongoUtil.getDb();
const collection = database.collection('test');


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
    
    const doc = { code: gameCode, _id: randomString, preliminaryCode: data.preliminaryCode, players: [] };
    const result = await collection.insertOne(doc);
    if(result !== "undefined"){
        console.log(`Document inserted: ${JSON.stringify(result)}`);
    }
    
}

async function updateDoc(data, cb){
    const filter = { preliminaryCode: data.session };
    var update = {
        $push: {
            players: {id: data.id, name: data.name, present: data.present, socketID: data.socketID}
                }
    };
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
    console.log(`Document found: ${JSON.stringify(result)}`);

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

module.exports = { insertOneFN, readDB, updateDoc, updatePresence }

/*
need error checking on playercount manipulation and same code/string already existing in database
*/