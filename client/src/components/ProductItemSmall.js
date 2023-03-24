import { Box, Paper, Rating, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "./ProductItemSmall.css";
function ProductItemSmall({ products }) {
  const lengthRating = products.ratings.length;
  console.log(lengthRating);
  var sumRating = 0;
  for (var i = 0; i < lengthRating; i++) {
    sumRating += products.ratings[i].rating;
  }
  const averageRating = sumRating / lengthRating;
  return (
    <Paper
      elevation={3}
      className="ProductItem"
      sx={{
        backgroundColor: "white",
        minHeight: "250px",
        borderRadius: "25px",
        marginTop: "30px",
        paddingTop: "40px",
      }}
      component={Stack}
      direction="row"
      justifyContent="center"
    >
      <Link to={`/products/${products.id}`}>
        <Box
          component={Stack}
          direction="row"
          justifyContent="center"
          sx={{ marginBottom: "2rem" }}
        >
          <img src={products.imgUrl} className="Product__item-small"></img>
        </Box>
        <Box justifySelf="end" sx={{ marginBottom: "1rem" }}>
          <Typography>{products.title}</Typography>
          <Typography>{products.price} kr</Typography>
          <Rating
            precision={0.25}
            name="read-only"
            value={averageRating}
            readOnly
          />
        </Box>
      </Link>
    </Paper>
  );
}

export default ProductItemSmall;
