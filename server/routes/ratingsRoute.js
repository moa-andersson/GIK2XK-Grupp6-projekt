const router = require("express").Router();
const db = require("../models");
const validate = require("validate.js");
const productService = require("../services/productService");

const constraints = {
  rating: {
    numericality: {
      greaterThanOrEqualTo: 1,
      lessThanOrEqualTo: 5,
      message: "^Omdömmet måste vara mellan 1 och 5",
    },
  },
};

router.post("/:id/addRating", (req, res) => {
  const rating = req.body;
  const id = req.params.id;

  productService.addRating(id, rating).then((result) => {
    res.status(result.status).json(result.data);
  });
});

router.get("/", (req, res) => {
  db.rating.findAll().then((result) => {
    res.send(result);
  });
});

router.post("/", (req, res) => {
  const rating = req.body;
  db.rating.create(rating).then((result) => {
    res.send(result);
  });
});

router.put("/", (req, res) => {
  const rating = req.body;
  const id = rating.id;
  db.rating
    .update(rating, {
      where: { id: rating.id },
    })
    .then((result) => {
      res.send(result);
    });
});

router.delete("/", (req, res) => {
  const email = req.body.email;
  db.rating
    .destroy({
      where: { id: req.body.id },
    })
    .then(() => {
      res.json(`Användaren med e-post ${email} togs bort.`);
    });
});
module.exports = router;
