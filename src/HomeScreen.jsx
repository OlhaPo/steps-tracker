import React from "react";
import { Box, Typography, TextField } from "@mui/material";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";
import HistoryIcon from "@mui/icons-material/History";

const HomeScreen = () => {
  return (
    <Box>
      <Box>
        <HistoryIcon
          sx={{ position: "absolute", top: "50px", right: "50px" }}
        />
      </Box>
      <Box>
        <Typography variant="h5" gutterBottom>
          Today I walked ...
        </Typography>
        <TextField
          id="standard-basic"
          variant="standard"
          placeholder="Type here ... "
          InputProps={{
            sx: {
              "&:before": {
                borderBottom: "none",
              },
              "&:after": {
                borderBottom: "none",
              },
            },
          }}
          mt={2}
        />
      </Box>
      <Box
        mt={8}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "stretch",
          flexDirection: "row",
        }}
      >
        <DirectionsWalkIcon sx={{ fontSize: "25px" }} />
        <Typography variant="subtitle1" sx={{ fontSize: "19px" }}>
          23785 steps in May
        </Typography>
      </Box>
    </Box>
  );
};

export default HomeScreen;
