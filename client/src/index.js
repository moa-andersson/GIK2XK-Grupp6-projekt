import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    type: "light",
    primary: {
      main: "#f5cac3",
    },
    secondary: {
      main: "#84a59d",
    },
    background: {
      default: "#f7ede2",
      paper: "#faf7f4",
    },
    warning: {
      main: "#ff6e6c",
    },
  },
  typography: {
    fontFamily: "Roboto Condensed",
    h1: {
      fontFamily: "Oleo Script Swash Caps",
      fontSize: "3rem",
      textAlign: "center",
      marginLeft: "6rem",
    },
    h2: {
      fontFamily: "Roboto Condensed",
      fontSize: "1.2rem",
    },
    h6: {
      fontFamily: "Roboto Condensed",
      fontSize: "1.3rem",
      margin: "0.5rem",
    },
    productTitle: {
      fontFamily: "Roboto Condensed",
      fontSize: "2.5rem",
    },
  },
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
