import axios from "axios";

export default{

    createSession: function (value, playerCount){
        console.log(value);
        console.log(playerCount);
        axios.post("http://localhost:3001/api/create", { code: value, playerCount: playerCount })
        .then(res => {
            console.log(res);
        });
        
    }
};

