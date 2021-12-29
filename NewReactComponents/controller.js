var mongoUtil = require('./mongoUtil');
var database = mongoUtil.getDb();
const collection = database.collection('test');


async function insertOneFN(data){

    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let randomString = ' ';
        for ( let i = 0; i < characters.length; i++ ) {
            randomString += characters.charAt(Math.floor(Math.random() * characters.length));
        }

    const doc = { code: data.code, playerCount: data.playerCount, _id: randomString };
    const result = await collection.insertOne(doc);
    if(result !== "undefined"){
        console.log(`Document inserted: ${JSON.stringify(result)}`);
    }
    
}

module.exports = { insertOneFN }

