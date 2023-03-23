const router = require("express").Router();
const db = require("../models");
const validate = require("validate.js");

const constraints = {};

router.get("/", (req, res) => {
  db.cartRow.findAll().then((result) => {
    res.send(result);
  });

  router.delete("/", (req, res) => {
    const id = req.body.id;
    db.cartRow
      .destroy({
        where: { cartId: id },
      })
      .then(() => {
        res.json(`Kundvagn togs bort`);
      });
  });
});
module.exports = router;
