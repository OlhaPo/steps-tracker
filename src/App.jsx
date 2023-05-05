import React from "react";
import "./App.css";
import HomeScreen from "./HomeScreen";
import { Container } from "@mui/material";

function App() {
  return (
    <Container
      maxWidth="sm"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <HomeScreen />
    </Container>
  );
}

export default App;
