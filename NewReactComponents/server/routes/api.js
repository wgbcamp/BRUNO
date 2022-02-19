const path = require("path");
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

router.use(function(req, res){
    res.sendFile(path.join(__dirname, "../build/index.html"));
});


module.exports = router;