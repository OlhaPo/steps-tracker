import React from "react";
import "./App.css";
// import store from "./store/store";
// import { Provider } from "react-redux";
import { Container } from "@mui/material";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomeScreen from "./HomeScreen";
import OverviewRecord from "./OverviewRecord";
import EditRecord from "./EditRecord";
import HistoryRecords from "./HistoryRecords";

function App() {
  return (
    // <Provider store={store}>
    <Container maxWidth="sm" sx={{ height: "100%" }}>
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
    // </Provider>
  );
}

export default App;
