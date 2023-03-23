const router = require("express").Router();
const db = require("../models");
const validate = require("validate.js");
const cartService = require("../services/cartService");

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
  const id = req.body.id;
  cartService.destroy(id).then((result) => {
    res.status(result.status).json(result.data);
  });
});
module.exports = router;
