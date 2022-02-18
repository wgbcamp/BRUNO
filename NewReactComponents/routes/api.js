const router = require("express").Router();
const controller = require("../controller");

router.route("/create").post(function (req, res) {
    var data = req.body;
    controller.insertOneFN(data);
    res.send();
})
router.route("/fetch").post(async function (req, res){

    var data = req.body;
    controller.readDB(data, response);
    function response(result){
        res.send(result);
    }
})
module.exports = {router}