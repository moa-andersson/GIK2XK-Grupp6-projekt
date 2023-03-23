import "./App.css";
import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Routes, Route, Link } from "react-router-dom";
import ProductEdit from "./views/ProductEdit";
import ProductDetail from "./views/ProductDetail";
import Cart from "./views/Cart";
import Home from "./views/Home";
import UserItemSmall from "./components/UserItemSmall";

function App() {
  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/"> Home{/* logga */}</Link>
            </Typography>
            <Typography variant="h6" component="div">
              <Link to="/products/new">Skapa produkt{/* logga */}</Link>
            </Typography>
            <UserItemSmall />
            <Typography variant="h6" component="div">
              <Link to="/cart">Kundvagn</Link>
            </Typography>
          </Toolbar>
        </AppBar>
      </Box>
      <div>
        <Routes>
          <Route exact path="/" element={<Home></Home>}></Route>
          <Route
            exact
            path="/products/:id"
            element={<ProductDetail></ProductDetail>}
          ></Route>
          <Route path="/cart" element={<Cart></Cart>}></Route>

          {/* NY KOD - TESTER EN ROUTE TILL EN SPECIFIK USER CART */}
          <Route path="user/:userId/cart" element={<Cart></Cart>}></Route>

          <Route
            exact
            path="/products/new"
            element={<ProductEdit></ProductEdit>}
          ></Route>
          <Route
            exact
            path="/products/:id/edit"
            element={<ProductEdit></ProductEdit>}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
