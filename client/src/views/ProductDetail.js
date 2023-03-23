import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProductItemLarge from "../components/ProductItemLarge";
import { getOne } from "../models/ProductModel";
import { useLocation } from "react-router-dom";
import { Button } from "@mui/material";

function ProductDetail() {
  const params = useParams();
  const productId = params.id;

  const [products, setProducts] = useState({});

  useEffect(() => {
    getOne(productId).then((products) => setProducts(products));
  }, [productId]);

  console.log("ID: ", productId);
  return (
    <>
      <ProductItemLarge products={products} />
      <Link to={`/products/${productId}/edit`}>
        <Button variant="contained" color="primary">
          Ändra
        </Button>
      </Link>
    </>
  );
}

export default ProductDetail;
