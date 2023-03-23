import { Grid, Typography, Button, Rating, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addRating, getOne, addToCart } from "../models/ProductModel";

function ProductItemLarge({ products }) {
  console.log("produkt:", products);
  const rating = products.ratings;
  let averageRating = 0;
  if (rating) {
    const lengthRating = rating.length;
    var sumRating = 0;
    for (var i = 0; i < lengthRating; i++) {
      sumRating += products.ratings[i].rating;
    }
    averageRating = sumRating / lengthRating;
  }

  function onSave(e) {
    const ratingValue = Number(e.target.value);
    const newRating = {
      rating: ratingValue,
      productId: products.id,
    };
    addRating(newRating).then(() => console.log("Produkt betygsatt!"));
    console.log(newRating);
  }

  let amountOfProducts;
  function onChange(e) {
    const value = Number(e.target.value);
    amountOfProducts = value;
    console.log(value);
    return value;
  }

  function onAddToCart(e) {
    const newCartRow = {
      userId: 2,
      productId: products.id,
      amount: amountOfProducts,
    };
    addToCart(newCartRow).then(() => console.log("Produkt lagd i varukorg"));
  }

  return (
    <Grid container columnSpacing={2} className="ProductItem">
      <Grid item className="ProductItem__grid-item" xs={12} md={8}>
        <div>
          <img src={products.imgUrl}></img>
        </div>
        <Typography>{products.description}</Typography>
        <div>
          {products.ratings &&
            products.ratings.map((rating) => (
              <div>
                <Rating
                  key={`ratingId_${rating.id}`}
                  value={rating.rating}
                  readOnly
                />
              </div>
            ))}
        </div>
      </Grid>
      <Grid item className="ProductItem__grid-item_price" xs={12} md={4}>
        <Typography>{products.title}</Typography>
        <Typography>{products.price}</Typography>
        <form>
          <Button onClick={onAddToCart} variant="contained" color="primary">
            Lägg till i kundvagn
          </Button>
        </form>
        <TextField onChange={onChange} name="productAmount">
          Antal
        </TextField>
        <Typography component="legend">Betyg</Typography>
        <Rating
          precision={0.25}
          name="read-only"
          value={averageRating}
          readOnly
        />
        <Typography>leveransinfo</Typography>
        <Typography>Betygsätt produkten</Typography>
        <Rating onClick={onSave} name="no-value" />
      </Grid>
    </Grid>
  );
}

export default ProductItemLarge;
