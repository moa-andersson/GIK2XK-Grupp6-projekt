import { Grid, Typography, Button, Rating } from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getOne } from "../models/ProductModel";

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
        <Button variant="contained" color="primary">
          Lägg till i kundvagn
        </Button>
        <Typography component="legend">Betyg</Typography>
        <Rating name="read-only" value={averageRating} readOnly />
        <Typography>leveransinfo</Typography>
        <Typography>Betygsätt produkten</Typography>
        <Rating name="no-value" value={null} />
      </Grid>
    </Grid>
  );
}

export default ProductItemLarge;
