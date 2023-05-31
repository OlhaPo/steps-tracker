import React, { useEffect, useState } from "react";
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
import { Link, useParams } from "react-router-dom";
import { buttonStyle } from "./EditRecord";
import { db } from "./firebase";
import { doc, getDoc } from "firebase/firestore";
import dayjs from "dayjs";

const OverviewRecord = () => {
  let { id } = useParams();

  const [date, setDate] = useState();
  const [stepCount, setStepCount] = useState();

  useEffect(() => {
    const retrieveDataById = async () => {
      try {
        const documentRef = doc(db, "dailyRecord", id);
        const documentSnapshot = await getDoc(documentRef);

        if (documentSnapshot.exists()) {
          const data = documentSnapshot.data();
          // Access the specific fields from the data object
          const { stepsCount, timestamp } = data;
          setDate(dayjs.unix(timestamp.seconds));
          setStepCount(stepsCount);
        } else {
          console.log("Document does not exist!");
        }
      } catch (error) {
        console.log("Error retrieving data:", error);
      }
    };

    retrieveDataById();
  }, [id]);

  const cardStyle = {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    height: "180px",
    width: "180px",
    borderRadius: "50%",
    border: "thick double",
    borderColor: "grey",
    margin: "auto",
  };

  if (stepCount) {
    if (stepCount < 1000) {
      cardStyle.borderColor = "#ff0000";
    } else if (stepCount < 4000) {
      cardStyle.borderColor = "#962b52";
    } else if (stepCount < 8000) {
      cardStyle.borderColor = "#df503d";
    } else {
      cardStyle.borderColor = "#2a9330";
    }
  }

  const typographyStyle = {
    textAlign: "center",
    fontSize: "1.3rem",
    color: "#001b5e",
  };

  return (
    <Box
      sx={{
        width: "500px",
        "@media (max-width:576px)": {
          width: "300px",
        },
      }}
    >
      <Typography mb={6} sx={typographyStyle}>
        {date?.format("LL")}
      </Typography>
      <Card sx={cardStyle}>
        <CardContent
          sx={{
            paddingBottom: "16px",
            "&:last-child": {
              paddingBottom: "16px",
            },
            display: "flex",
            flexDirection: "column",
            flexWrap: "nowrap",
            alignItems: "center",
          }}
        >
          <DirectionsWalkIcon sx={{ fontSize: "30px", color: "#001b5e" }} />
          {stepCount > 0 ? (
            <div>
              <Typography
                mt={1}
                sx={{
                  fontSize: "18px",
                  textAlign: "center",
                  color: "#001b5e",
                }}
              >
                {stepCount}
                <br />
                steps
              </Typography>
            </div>
          ) : (
            ""
          )}
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
            <Button component={Link} to={"/"}>
              <ArrowBackIcon sx={buttonStyle} />
            </Button>
          </Grid>
          <Grid>
            <Button component={Link} to={"/edit/" + id}>
              <EditIcon sx={buttonStyle} />
            </Button>
          </Grid>
        </Grid>
      </Box>
      <Box sx={{ paddingLeft: "20px" }}>
        <HistoryLink />
      </Box>
    </Box>
  );
};

export default OverviewRecord;
