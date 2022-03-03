import axios from "axios";

function createSession(playerCount, packagedCharacters, cb){
    console.log(playerCount);
    axios.post("http://192.168.1.181:3001/api/create", { playerCount: playerCount, preliminaryCode: packagedCharacters })
    .then(res => {
        console.log(packagedCharacters);
        axios.post("http://192.168.1.181:3001/api/fetch", { preliminaryCode: packagedCharacters, fetchPrelim: 1})
        .then(res => {
            cb(res.data);
            if(res.status === 200){
            sessionStorage.setItem('gameCode', res.data);
            }
        })
    });
}

function fetchGameCode(data, cb){
    for(var i = data.length; i > -1; i--){
        if(data.charAt(i) === "/"){
            var g = data.slice(i+1, data.length);
            console.log(g);
            break;
        }
    }
    axios.post("http://192.168.1.181:3001/api/fetch" , { preliminaryCode: g, fetchPrelim: 1})
    .then(res => {
        console.log(res);
        cb(res);
    });
}

function signIntoGame(data){
    axios.post("http://192.168.1.181:3001/api/postUser", { name: data.name, session: data.code, insertPlayer: 1})
    // .then(res => {
    //     console.log(res);
    // })

}

const functions = {createSession, fetchGameCode, signIntoGame};
export default functions;

