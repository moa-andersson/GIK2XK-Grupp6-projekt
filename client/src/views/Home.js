import "./Home.css";
import ProductList from "../components/ProductList";
import { Box } from "@mui/material";

function Home() {
  return (
    <Box p={10} sx={{ backgroundColor: "#f7ede2" }}>
      <ProductList />
    </Box>
  );
}

export default Home;
