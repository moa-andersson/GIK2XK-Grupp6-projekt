import { Button, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartList from "../components/CartList";
import UserItemLarge from "../components/UserItemLarge";
import { getAll } from "../models/CartModel";
import PaidTwoToneIcon from "@mui/icons-material/PaidTwoTone";

function Cart() {
  const paramId = useParams();
  const userId = Number(paramId.userId);
  console.log("USERID FRÅN PARAMS", paramId);
  //const userId = 1;
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  console.log(total);
  useEffect(() => {
    getAll(userId).then((cartItems) => setCartItems(cartItems));
  }, []);

  console.log(cartItems);

  // const users = [
  //   {
  //     id: 2,
  //     firstName: "Moa",
  //     lastName: "Andersson",
  //     email: "h21moaan@du.se",
  //     password: "12345",
  //     createdAt: "2023-03-16T14:06:58.000Z",
  //     updatedAt: "2023-03-16T14:06:58.000Z",
  //   },
  //   {
  //     id: 3,
  //     firstName: "Tom",
  //     lastName: "Enqvist",
  //     email: "h21moaan@du.se",
  //     password: "12345",
  //     createdAt: "2023-03-16T14:06:58.000Z",
  //     updatedAt: "2023-03-16T14:06:58.000Z",
  //   },
  // ];

  // var currentUser;
  // for (let i = 0; i < users.length; i++) {
  //   if (users[i].id == userId) {
  //     currentUser = users[i];
  //   }
  // }

  return (
    <Grid
      ml={20}
      mr={20}
      container
      columnSpacing={2}
      //columns={{ xs: 6, sm: 4, md: 4 }}
      className="CartItem"
    >
      <Grid item xs={6} sm={6} md={6}>
        <CartList setAmount={setTotal} cart={cartItems} />
      </Grid>
      <Grid item xs={6} sm={6} md={6}>
        <Typography>Kunduppgifter</Typography>
        <UserItemLarge userId={userId} />
        <Typography>Totalsumma: {total}</Typography>
        <div>
          <Button
            startIcon={<PaidTwoToneIcon />}
            variant="contained"
            color="primary"
          >
            Betala
          </Button>
        </div>
      </Grid>
    </Grid>
  );
}

export default Cart;
