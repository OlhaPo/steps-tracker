import React from "react";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

export const linkStyle = {
  justifyContent: "flex-start",
  textTransform: "none",
  color: "#001b5e",
  marginTop: "50px",
  paddingLeft: 0,
  fontWeight: 400,
  fontSize: "16px",
};

const HistoryLink = () => {
  return (
    <Button component={Link} to={"/history"} sx={linkStyle}>
      History
    </Button>
  );
};

export default HistoryLink;
