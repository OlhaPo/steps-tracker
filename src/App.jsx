import React from "react";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import OverviewRecord from "./OverviewRecord";
import EditRecord from "./EditRecord";
import HistoryRecords from "./HistoryRecords";

function App() {
  return (
    <Container maxWidth="sm">
      <Router>
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="record/:id" element={<OverviewRecord />} />
          <Route path="edit/:id" element={<EditRecord />} />
          <Route path="create" element={<EditRecord />} />
          <Route path="history" element={<HistoryRecords />} />
        </Routes>
      </Router>
    </Container>
  );
}

export default App;
