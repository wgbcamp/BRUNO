import React, { useState, useEffect } from "react";
import API from "../../utils/api";
import { useHistory } from 'react-router-dom';

function StartSession(){

const [gameCode, setGameCode] = useState("code");


    useEffect(() => {

    }, []);

let history = useHistory();

function goToGame(){
    history.push("/game");
}

function handleFormSubmit(){

    API.createSession({
    }).then(function(res){
        console.log(res);
        if(res.status == 200){
            console.log(res.data)
            sessionStorage.setItem("code", res.data)
            goToGame();
            }
        })
        .catch(err => console.log(err));
    
};


    return(
        <div className="container vh">
            <div className="row h-100">
                <div className="col my-5">
                            <a 

                                onClick={handleFormSubmit}
                                className="btn btn-primary"
                                >
                                    Create BRUNO session!
                            </a> 
                </div>
            </div>
        </div>
    )
}

export default StartSession;