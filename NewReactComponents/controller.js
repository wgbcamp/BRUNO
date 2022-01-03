var mongoUtil = require('./mongoUtil');
var database = mongoUtil.getDb();
const collection = database.collection('test');


async function insertOneFN(data){

    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = ' ';
    let gameCode = ' ';

    for ( let i = 0; i < characters.length; i++ ) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    for ( let e = 0; e < 5; e++ ){
            gameCode += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    
    const doc = { code: gameCode, playerCount: data.playerCount, _id: randomString };
    const result = await collection.insertOne(doc);
    if(result !== "undefined"){
        console.log(`Document inserted: ${JSON.stringify(result)}`);
    }
    
}

module.exports = { insertOneFN }

/*
need error checking on playercount manipulation and same code/string already existing in database
*/