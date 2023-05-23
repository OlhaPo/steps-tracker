import React from "react";
import HistoryIcon from "@mui/icons-material/History";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { buttonStyle } from "./EditRecord";

const HistoryLink = () => {
  return (
    <Button
      component={Link}
      to={"/history"}
      sx={{
        position: "absolute",
        top: "50px",
        right: "80px",
        "@media (max-width:576px)": {
          right: "20px",
        },
      }}
    >
      <HistoryIcon sx={buttonStyle} />
    </Button>
  );
};

export default HistoryLink;
