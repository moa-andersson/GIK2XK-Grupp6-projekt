const router = require("express").Router();
const db = require("../models");
const validate = require("validate.js");

const constraints = {};

router.get("/", (req, res) => {
  db.cart.findAll().then((result) => {
    res.send(result);
  });
});

router.post("/", (req, res) => {
  const cart = req.body;
  db.cart.create(cart).then((result) => {
    res.send(result);
  });
});

router.put("/", (req, res) => {
  const cart = req.body;
  const id = cart.id;
  db.cart
    .update(cart, {
      where: { id: cart.id },
    })
    .then((result) => {
      res.send(result);
    });
});

router.delete("/", (req, res) => {
  const email = req.body.email;
  db.cart
    .destroy({
      where: { id: req.body.id },
    })
    .then(() => {
      res.json(`Kundvagn togs bort`);
    });
});
module.exports = router;
