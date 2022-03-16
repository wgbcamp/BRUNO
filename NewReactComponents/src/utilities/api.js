import axios from "axios";
import socketIOClient from "socket.io-client";

//purge this
function createSession(packagedCharacters, cb){

    axios.post("http://localhost/api/create", { preliminaryCode: packagedCharacters })
    .then(res => {
        console.log(packagedCharacters);
        axios.post("http://localhost/api/fetch", { preliminaryCode: packagedCharacters, fetchPrelim: 1})
        .then(res => {
            cb(res.data);
            if(res.status === 200){
            sessionStorage.setItem('gameCode', res.data);
            }
        })
    }); 
}

function createSession2(packagedCharacters, socket, cb){

    socket.emit("create session", { preliminaryCode: packagedCharacters }, (response) => {
        if(response.status === "ok"){
            console.log(response.status);
            socket.emit("fetch session", { preliminaryCode: packagedCharacters, fetchPrelim: 1}, (response) => {
                if(response.status){
                    sessionStorage.setItem('gameCode', response.data);
                    cb(response.data);
                }
            })
        }
    });
}

function fetchGameCode(data, cb){
    for(var i = data.length; i > -1; i--){
        if(data.charAt(i) === "/"){
            var g = data.slice(i+1, data.length);
            break;
        }
    }
    axios.post("http://localhost/api/fetch" , { preliminaryCode: g, fetchPrelim: 1})
    .then(res => {
        cb(res);
    });
}

function signIntoGame(data){
    axios.post("http://localhost/api/postUser", { name: data.name, session: data.session, insertPlayer: 1})
    // .then(res => {
    //     console.log(res);
    // })

}

const functions = {createSession, createSession2, fetchGameCode, signIntoGame};
export default functions;

