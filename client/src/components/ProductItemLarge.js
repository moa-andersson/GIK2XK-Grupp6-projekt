import {
  Grid,
  Typography,
  Button,
  Rating,
  TextField,
  Paper,
  Box,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { addRating, getOne, addToCart } from "../models/ProductModel";
import "./ProductItemLarge.css";
import AddShoppingCartTwoToneIcon from "@mui/icons-material/AddShoppingCartTwoTone";
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
    <Grid
      container
      columnSpacing={2}
      className="ProductItemLarge"
      sx={{ backgroundColor: "#f7ede2" }}
    >
      <Grid item className="ProductItem__grid-item" xs={12} md={8}>
        <Box variant="div" sx={{ padding: "1vw 15vw" }}>
          <Box
            component={Stack}
            direction="row"
            justifyContent="center"
            sx={{ marginBottom: "3rem" }}
          >
            <Box
              component="img"
              src={products.imgUrl}
              sx={{ maxHeight: "30vw" }}
            ></Box>
          </Box>
          <Paper sx={{ padding: "2vw" }}>
            <Typography fontSize="1.6rem" variant="productTitle">
              {products.title}
            </Typography>

            <Typography sx={{ marginTop: "1rem" }}>
              {products.description}
            </Typography>
          </Paper>
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
        </Box>
      </Grid>
      <Grid item className="ProductItem__grid-item_price" xs={12} md={4}>
        <Paper sx={{ padding: "2rem" }}>
          <Typography variant="productTitle">{products.title}</Typography>
          <Typography fontSize="1.8rem" color="secondary">
            {products.price} kr
          </Typography>
          <form>
            <Button
              onClick={onAddToCart}
              startIcon={<AddShoppingCartTwoToneIcon />}
              variant="contained"
              color="primary"
            >
              Lägg till i kundvagnen
            </Button>
          </form>
          <TextField
            sx={{ marginTop: "1rem" }}
            onChange={onChange}
            name="productAmount"
          >
            Antal
          </TextField>
          <Typography component="legend">Betyg</Typography>
          <Rating
            precision={0.25}
            name="read-only"
            value={averageRating}
            readOnly
          />
          <Typography>
            leveransinfo: kommer att levereras inom 5 arbetsdagar med snailmail!{" "}
          </Typography>
          <Typography>Betygsätt produkten</Typography>
          <Rating onClick={onSave} name="no-value" />
        </Paper>
      </Grid>
    </Grid>
  );
}

export default ProductItemLarge;
