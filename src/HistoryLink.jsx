import React from "react";
import HistoryIcon from "@mui/icons-material/History";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const HistoryLink = () => {
  return (
    <Button
      component={Link}
      to={"/history"}
      sx={{
        position: "absolute",
        top: "50px",
        right: "50px",
        color: "#001B5E",
      }}
    >
      <HistoryIcon />
    </Button>
  );
};

export default HistoryLink;
