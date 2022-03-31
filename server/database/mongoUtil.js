const { MongoClient } = require("mongodb");
const client = new MongoClient('mongodb://localhost:27017/');
const database = client.db('admin');

module.exports = {

    connectServer: function(){
        client.connect();
    },

    getDb: function(){
        return database;
    }
};