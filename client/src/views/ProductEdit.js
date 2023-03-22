import { TextField, Button } from "@mui/material";
import { useParams } from "react-router-dom";

function ProductEdit() {
  const params = useParams();
  console.log(params);
  return (
    <form>
      <TextField name="title" label="Titel" fullWidth></TextField>
      <TextField
        name="description"
        label="Beskrivning"
        fullWidth
        multiline
        minRows={7}
      ></TextField>
      <TextField name="pris" label="Pris" fullWidth></TextField>
      <TextField name="imgUrl" label="URL till bild" fullWidth></TextField>
      <Button variant="contained" color="primary">
        Tillbaka
      </Button>
      <Button variant="contained" color="primary">
        Spara
      </Button>
    </form>
  );
}

export default ProductEdit;
