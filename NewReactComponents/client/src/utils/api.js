import axios from "axios";

export default{

    createSession: function (playerCount){
        console.log(playerCount);
        axios.post("http://localhost:3001/api/create", { playerCount: playerCount })
        .then(res => {
            console.log(res);
        });
        
    }
};

