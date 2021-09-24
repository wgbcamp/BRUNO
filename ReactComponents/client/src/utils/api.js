import axios from "axios";

export default{

    createSession: function (playerCount){
        return axios.post("/api/create", playerCount);
    },
    findSession: function (data){
        return axios.post("/api/find", data);
    },
    checkForNullRole: function (data){
        return axios.post("/api/checkNull", data);
    },
    findAndUpdate: function (data){
        return axios.post("/api/findAndUpdate", data);
    },
    findAndDelete: function (data){
        return axios.post("/api/findAndDelete", data);
    }
};