import { Button, Grid, Paper, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CartList from "../components/CartList";
import UserItemLarge from "../components/UserItemLarge";
import { getAll } from "../models/CartModel";
import PaidTwoToneIcon from "@mui/icons-material/PaidTwoTone";
import { Box } from "@mui/system";

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

  return (
    <Box component="div" sx={{ backgroundColor: "#f7ede2", height: "100vh" }}>
      <Grid ml={20} mr={20} container columnSpacing={2} className="CartItem">
        <Grid item xs={6} sm={6} md={6}>
          <CartList setAmount={setTotal} cart={cartItems} />
        </Grid>
        <Grid item xs={6} sm={6} md={6} sx={{ paddingRight: "30vw" }}>
          <Paper sx={{ padding: "2rem" }}>
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
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cart;
