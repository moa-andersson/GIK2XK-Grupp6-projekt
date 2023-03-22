const router = require("express").Router();
const db = require("../models");
const validate = require("validate.js");

const constraints = {};

router.get("/", (req, res) => {
  db.cartRow.findAll().then((result) => {
    res.send(result);
  });
});
module.exports = router;
