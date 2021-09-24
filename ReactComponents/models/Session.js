const mongoose = require("mongoose");


const newSessionSchema = new mongoose.Schema({
    code: String, 
    name: String, 
    title: String,
    player1: {type: Object, 
                    default: {name: "Terry",
                    hand: ["red", "green", "etc"],
                    score: 0}},
});


module.exports = mongoose.model("Sessions", newSessionSchema);



// const SessionSchema = new Schema({
//     code: { type: String, required: true},
//     date: { type: Date, default: Date.now, required: true },
// });


// {skill1:["RedCard8", "BlueCardSkip"], skill2:["GreenCard2"]}}



// code: {type: String},
// player1: {type: Object, default: {name: "Terry",
// hand: ["red", "green", "etc"],
// score: 0}},
// player2: {type: Object},
// player3: {type: Object},
// player4: {type: Object},
// player5: {type: Object},
// player6: {type: Object},
// player7: {type: Object},
// player8: {type: Object},

