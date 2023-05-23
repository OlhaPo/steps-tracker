import React from "react";
import { Box, Typography, TextField, Button } from "@mui/material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import HistoryLink from "./HistoryLink";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCurrentMonthStats } from "./store/historySlice";

const HomeScreen = () => {
  const currentMonth = useSelector(getCurrentMonthStats);
  console.log(currentMonth);
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignContent: "center",
      }}
    >
      <HistoryLink />
      <Typography variant="h5" gutterBottom>
        Today I walked ...
      </Typography>
      <Typography
        component={Link}
        to={"/create"}
        sx={{
          color: "#7A7A7B",
          fontSize: "18px",
          textDecoration: "none",
        }}
      >
        Type here ...
      </Typography>

      {currentMonth ? (
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
            {currentMonth?.stepsTotal} steps in {currentMonth?.month}
          </Typography>
        </Box>
      ) : (
        ""
      )}
    </Box>
  );
};

export default HomeScreen;
