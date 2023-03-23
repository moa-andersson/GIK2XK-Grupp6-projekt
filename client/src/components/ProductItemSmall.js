import { Grid, ListItem, Rating, Typography } from "@mui/material";
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
    <div>
      <Link to={`/products/${products.id}`}>
        <img src={products.imgUrl} className="Product__item-small"></img>
        <Typography>{products.title}</Typography>
        <Typography>{products.price}</Typography>
        <Rating
          precision={0.25}
          name="read-only"
          value={averageRating}
          readOnly
        />
      </Link>
    </div>
  );
}

export default ProductItemSmall;
