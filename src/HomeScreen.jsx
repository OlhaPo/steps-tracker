import React, { useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import { Link } from "react-router-dom";
import { getCurrentMonthStats, fetchHistory } from "./store/historySlice";
import { useSelector, useDispatch } from "react-redux";
import { linkStyle } from "./HistoryLink";

const HomeScreen = () => {
  const currentMonth = useSelector(getCurrentMonthStats);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        flexWrap: "wrap",
        alignContent: "center",
      }}
    >
      <Typography variant="h5" gutterBottom>
        Today I walked
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
        Click here...
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
            {currentMonth?.stepsTotal.toLocaleString()} steps in{" "}
            {currentMonth?.month}
          </Typography>
        </Box>
      ) : (
        ""
      )}

      <Button component={Link} to={"/history"} sx={linkStyle}>
        History
      </Button>
    </Box>
  );
};

export default HomeScreen;
