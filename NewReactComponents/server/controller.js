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
    
    const doc = { code: gameCode, playerCount: data.playerCount, _id: randomString, preliminaryCode: data.preliminaryCode };
    const result = await collection.insertOne(doc);
    if(result !== "undefined"){
        console.log(`Document inserted: ${JSON.stringify(result)}`);
    }
    
}

async function updateDoc(data, cb){
    const filter = { code: data.session };
    const updateDocument = {
        $set: {
            player1: data.name
        },
    };
    const result = await collection.updateOne(filter, updateDocument);
    console.dir(result.acknowledged);
    
}

async function readDB(data, cb){
    var query = "";
    if(data.fetchCode){
        console.log(data)
        query = { code: data.code };
    }
    if(data.fetchPrelim){
        query = { preliminaryCode: data.preliminaryCode};
    }
    const result = await collection.findOne(query);
    console.log(`Document found: ${JSON.stringify(result)}`);

    if(result === null){
        cb("Document not found")
    }else{
        cb(JSON.stringify(result.code));
    }  
}

module.exports = { insertOneFN, readDB, updateDoc }

/*
need error checking on playercount manipulation and same code/string already existing in database
*/