import axios from "axios";

function createSession2(packagedCharacters, socket, cb){

    socket.emit("create session", { preliminaryCode: packagedCharacters }, (response) => {
        if(response.status === "ok"){
            console.log(response.status);
            socket.emit("fetch session", { preliminaryCode: packagedCharacters, fetchPrelim: 1}, (response) => {
                if(response.status){
                    cb(response.data);
                }
            })
        }
    });
}

function fetchGameCode2(data, socket, cb){
    for(var i = data.length; i > -1; i--){
        if(data.charAt(i) === "/"){
            var g = data.slice(i+1, data.length);
            break;
        }
    }
    socket.emit("fetch session", { preliminaryCode: g, fetchPrelim: 1 }, (response) => {
        if(response.status){
            cb(response);
        }
    })
}

function signIntoRoom(data, gameCode, socket){

    for(var i = data.length; i > -1; i--){
        if(data.charAt(i) === "/"){
            var g = data.slice(i+1, data.length);
            break;
        }
    }
    socket.emit("join room", gameCode, g);

}

function signIntoGame(data){
    axios.post("http://localhost/api/postUser", { name: data.name, session: data.session, insertPlayer: 1})
    // .then(res => {
    //     console.log(res);
    // })

}

const functions = {createSession2, fetchGameCode2, signIntoGame, signIntoRoom};
export default functions;

