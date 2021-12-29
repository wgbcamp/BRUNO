const router = require("express").Router();
const controller = require("../controller");
// const Session = require("../models/Session");
// router.route("/create").post(controller.insertOneFN);
router.route("/create").post(function (req, res) {
    var data = req.body;
    controller.insertOneFN(data);
    res.send();
})
module.exports = {router}