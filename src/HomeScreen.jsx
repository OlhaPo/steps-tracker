import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import HistoryLink from "./HistoryLink";
import { Link } from "react-router-dom";

const HomeScreen = () => {
  return (
    <Box>
      <HistoryLink />
      <Typography variant="h5" gutterBottom>
        Today I walked ...
      </Typography>
      <Typography
        component={Link}
        to={"/edit"}
        sx={{
          color: "#7A7A7B",
          fontSize: "18px",
          textDecoration: "none",
        }}
      >
        Type here ...
      </Typography>

      <Box
        mt={6}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "stretch",
          flexDirection: "row",
        }}
      >
        <DirectionsWalkIcon sx={{ fontSize: "24px" }} />
        <Typography variant="subtitle1" sx={{ fontSize: "18px" }}>
          23785 steps in May
        </Typography>
      </Box>
    </Box>
  );
};

export default HomeScreen;
