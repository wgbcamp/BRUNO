const Session = require("./models/Session");

module.exports = {

    createSession: function (req, res) {
        var x;
        async function runCode(){
            const value = new Session ({
                code: Math.random().toString(36).substring(7),
                name: 'Jon Snow',
                title: `Lord Commander of the Night's Watch`
            });
            const doc = await value.save()
            console.log(doc)
            x = doc.code;
        }
        runCode()
            .then(function(){ 
                console.log(x)
                res.json(x)
                    }
                )
            .catch(error => { console.error(error) })
    },
    findSession: function(req, res){
        var x;
        Session.findOne({ code: req }, function(err, info){
            console.log(info)
            x = info.code;
        })
    },
    findAndUpdate: function(req, res){
        async function runCode(){
           const value = await Session.findOne({ name: 'Barry'})
            value.specials = {
                skill1:"",
                skill2:"",
                skill3:""
            }
            const doc = await value.save()
            console.log(doc)
        }
        runCode()
            .catch(error => { console.error(error) })
    },
    findAndDelete: function(){
        async function runCode(){
            const value = await Session.findOne({ name: 'Ryu' })
            const deleted = await value.remove()
        }
        runCode()
            .catch(error => { console.error(error) })
    },
    checkNull: function(req, res){
        ryu.save(function (error, document){
            if (error) console.error(error)
            console.log(document)
        })
    }
};


// .find({ code: req.body.code, players: "none"})
// .then((results) => {
//     console.log(results);
//     res.json(results);
// })
// .catch(err => res.status(422).json(err));



// createSession: function(req, res) {
//     db.Session
//         .create(req.body)
//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
// },


// createSession: function createSession(req, res) {
//     ryu.save(function (error, document){
//         if (error) console.error(error)
//         console.log(document)
//     })

//         .then(dbModel => res.json(dbModel))
//         .catch(err => res.status(422).json(err));
// },

// findSession: function(req, res){
//     console.log(req.body.code);
//     db.Session
//         .find({code: req.body.code})
//         .then((results) => {
//             res.json(results);
//         })
//         .catch(err => res.status(422).json(err));
// }