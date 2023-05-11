import React from "react";
import "./App.css";
import { Container } from "@mui/material";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import OverviewRecord from "./OverviewRecord";
import EditRecord from "./EditRecord";
import HistoryRecords from "./HistoryRecords";

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
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="record" element={<OverviewRecord />} />
          <Route path="edit" element={<EditRecord />} />
          <Route path="history" element={<HistoryRecords />} />
        </Routes>
      </BrowserRouter>
    </Container>
  );
}

export default App;
