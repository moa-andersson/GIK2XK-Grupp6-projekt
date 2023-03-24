import { TextField, Button, Paper } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { create, getOne, update, remove } from "../models/ProductModel";
import SaveIcon from "@mui/icons-material/Save";
import DeleteSweepTwoToneIcon from "@mui/icons-material/DeleteSweepTwoTone";
import ReplyTwoToneIcon from "@mui/icons-material/ReplyTwoTone";
import { Box, Container } from "@mui/system";

function ProductEdit() {
  const params = useParams();
  const navigate = useNavigate();

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
    <Container
      maxWidth="md"
      sx={{ marginTop: "6rem", backgroundColor: "#f7ede2" }}
    >
      <Paper elevation={6} sx={{ padding: "3rem" }}>
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
          <Box
            marginTop="20px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            spacing={5}
          >
            <Button
              sx={{ margin: "1rem" }}
              startIcon={<ReplyTwoToneIcon />}
              onClick={() => {
                navigate(-1);
              }}
              variant="contained"
              color="primary"
            >
              Tillbaka
            </Button>

            <Button
              sx={{ margin: "1rem" }}
              startIcon={<SaveIcon />}
              onClick={onSave}
              variant="contained"
              color="primary"
              alignItems="center"
              justify="center"
            >
              Spara
            </Button>
            {products.id !== 0 && (
              <Button
                sx={{ margin: "1rem" }}
                startIcon={<DeleteSweepTwoToneIcon />}
                onClick={onDelete}
                variant="contained"
                color="warning"
              >
                Ta bort
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Container>
  );
}

export default ProductEdit;
