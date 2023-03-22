import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ProductItemLarge from "../components/ProductItemLarge";
import { getOne } from "../models/ProductModel";
import { useLocation } from "react-router-dom";

function ProductDetail() {
  const params = useParams();
  const id = params.id;

  const [products, setProducts] = useState({});

  useEffect(() => {
    getOne(id).then((products) => setProducts(products));
  }, {});

  console.log("ID: ", id);
  return (
    <>
      <ProductItemLarge products={products} />
    </>
  );
}

export default ProductDetail;
