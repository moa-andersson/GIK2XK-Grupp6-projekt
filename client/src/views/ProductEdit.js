import { TextField, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { create, getOne, update, remove } from "../models/ProductModel";

function ProductEdit() {
  const params = useParams();

  const productId = params.id;
  const emptyProduct = {
    id: 0,
    title: "",
    description: "",
    price: "",
    imgUrl: "",
  };

  const [products, setProducts] = useState(emptyProduct);

  useEffect(() => {
    if (!isNaN(productId)) {
      getOne(productId).then((products) => setProducts(products));
    } else {
      setProducts(emptyProduct);
    }
    // eslint-disable-next-line
  }, [productId]);
  console.log(products);

  function onChange(e) {
    const name = e.target.name;
    const value = e.target.value;

    const newProduct = { ...products, [name]: value };
    setProducts(newProduct);
  }

  function onSave() {
    if (products.id === 0) {
      create(products).then(() => console.log("sparad"));
    } else {
      update(products).then(() => console.log("uppdaterad"));
    }
    //lägg till funktion
  }

  function onDelete() {
    //Fel: Uncaught in promise
    remove(products.id).then(() => console.log("borttagen"));
  }

  return (
    <form>
      <TextField
        value={products.title}
        onChange={onChange}
        name="title"
        label="Titel"
        variant="standard"
        fullWidth
      ></TextField>
      <TextField
        value={products.description}
        onChange={onChange}
        name="description"
        label="Beskrivning"
        variant="standard"
        fullWidth
        multiline
        minRows={7}
      ></TextField>
      <TextField
        value={products.price}
        onChange={onChange}
        name="price"
        label="Pris"
        variant="standard"
        fullWidth
      ></TextField>
      <TextField
        value={products.imgUrl}
        onChange={onChange}
        name="imgUrl"
        label="URL till bild"
        variant="standard"
        fullWidth
      ></TextField>

      <Button variant="contained" color="primary">
        Tillbaka
      </Button>

      <Button onClick={onSave} variant="contained" color="primary">
        Spara
      </Button>
      {products.id !== 0 && (
        <Button onClick={onDelete} variant="contained" color="primary">
          Ta bort
        </Button>
      )}
    </form>
  );
}

export default ProductEdit;
