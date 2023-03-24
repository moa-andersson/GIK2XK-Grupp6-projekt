import ProductItemSmall from "./ProductItemSmall";
import { Button, Grid, Rating, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { getAll } from "../models/ProductModel";
import "./CartList.css";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";

function CartList({ cart, setAmount }) {
  // START NY KOD
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getAll().then((products) => setProducts(products));
  }, []);
  // SLUT NY KOD

  //skapar och bygger upp nuvarande kundkorg
  var cartList = [];

  for (var i = 0; i < cart.length; i++) {
    for (var j = 0; j < products.length; j++) {
      if (cart[i].productId == products[j].id) {
        cartList.push(products[j]);
        Object.assign(cartList[i], {
          cartId: `${cart[i].id}`,
          amount: `${cart[i].amount}`,
        });
        break;
      }
    }
  }

  var totalSum = 0;
  for (var i = 0; i < cartList.length; i++) {
    totalSum = totalSum + cartList[i].amount * cartList[i].price;
    console.log(totalSum);
  }
  setAmount(totalSum);

  return (
    <ul>
      {cartList &&
        cartList.map((cartItem) => (
          <li key={`cartRowId_${cartItem.id}`}>
            <Grid
              container
              columnSpacing={2}
              //columns={{ xs: 6, sm: 4, md: 4 }}
              className="CartItem"
            >
              <Grid item xs={6} sm={6} md={6}>
                <img src={cartItem.imgUrl} width={100} height={100}></img>
              </Grid>
              <Grid item xs={6} sm={6} md={6}>
                <Typography>{cartItem.title}</Typography>
                <Typography>{cartItem.price} kr</Typography>
                <div>
                  <Button>-</Button>
                  <Typography>{cartItem.amount}</Typography>
                  <Button>+</Button>
                  <Button
                    startIcon={<DeleteSweepTwoToneIcon />}
                    variant="contained"
                    color="primary"
                  >
                    Ta bort
                  </Button>
                </div>
              </Grid>
            </Grid>
          </li>
        ))}
    </ul>
  );
}

export default CartList;
