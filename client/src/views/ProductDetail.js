import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductItemLarge from "../components/ProductItemLarge";
import { getOne } from "../models/ProductModel";
import { useLocation } from "react-router-dom";
import { Box, Button } from "@mui/material";
import "./ProductDetail.css";

function ProductDetail() {
  const params = useParams();
  const productId = params.id;

  const [products, setProducts] = useState({});

  useEffect(() => {
    getOne(productId).then((products) => setProducts(products));
  }, [productId]);

  console.log("ID: ", productId);
  return (
    <Box
      component="div"
      sx={{ backgroundColor: "#f7ede2", paddingBottom: "10vw" }}
    >
      <ProductItemLarge className="ProductItemLarge" products={products} />
      <Link to={`/products/${productId}/edit`}>
        <Button variant="contained" color="primary" sx={{ marginLeft: "5vw" }}>
          Ändra
        </Button>
      </Link>
    </Box>
  );
}

export default ProductDetail;
