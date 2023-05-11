import React from "react";
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
} from "@mui/material";
import HistoryLink from "./HistoryLink";
import EditIcon from "@mui/icons-material/Edit";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DirectionsWalkIcon from "@mui/icons-material/DirectionsWalk";

const OverviewRecord = () => {
  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    height: "128px",
    width: "128px",
    borderRadius: "50%",
    border: "thick double",
    margin: "50px auto",
  };

  // if () {
  //   cardStyle.borderColor = 'green';
  // }

  const typographyStyle = {
    textAlign: "center",
    fontSize: "1.5rem",
  };
  return (
    <Box sx={{ width: "inherit" }}>
      <HistoryLink />
      <Typography sx={typographyStyle}>Monday</Typography>
      <Typography sx={typographyStyle}>May 1, 2023</Typography>

      <Card sx={cardStyle}>
        <CardContent
          sx={{
            paddingBottom: "16px",
            "&:last-child": {
              paddingBottom: "16px",
            },
          }}
        >
          <DirectionsWalkIcon sx={{ fontSize: "30px" }} />
          <Typography mt={1}>4857</Typography>
        </CardContent>
      </Card>
      <Box>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Grid>
            <Button>
              <ArrowBackIcon />
            </Button>
          </Grid>
          <Grid>
            <Button>
              <EditIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default OverviewRecord;
