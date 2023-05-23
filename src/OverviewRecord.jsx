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
  // const documentId = "Ey8X0x7n9Ld4iAynDxtW"; // the ID of the document you want to retrieve
  // const documentRef = doc(db, "dailyRecord", documentId); // get a reference to the document
  const [date, setDate] = useState();
  const [stepCount, setStepCount] = useState();

  // useEffect(() => {
  //   getDoc(documentRef)
  //     .then((docSnap) => {
  //       if (docSnap.exists()) {
  //         const data = docSnap.data(); // get the data object
  //         const { stepsCount, timestamp } = data;
  //         setDate(dayjs.unix(timestamp.seconds));
  //         setStepCount(stepsCount);
  //       } else {
  //         console.log("No such document!");
  //       }
  //     })
  //     .catch((error) => {
  //       console.log("Error getting document:", error);
  //     });
  // }, []);

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
    margin: "50px auto",
  };

  if (stepCount) {
    if (stepCount < 1000) {
      cardStyle.borderColor = "#ff0000";
    } else if (stepCount < 4000) {
      cardStyle.borderColor = "#962b52";
    } else if (stepCount < 8000) {
      cardStyle.borderColor = "#ed9f66";
    } else {
      cardStyle.borderColor = "#2a9330";
    }
  }

  const typographyStyle = {
    textAlign: "center",
    fontSize: "1.3rem",
  };

  return (
    <Box sx={{ width: "inherit" }}>
      <HistoryLink />
      <Typography sx={typographyStyle}>{date?.format("LL")}</Typography>

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
          <DirectionsWalkIcon sx={{ fontSize: "30px" }} />
          {stepCount > 0 ? (
            <div>
              <Typography mt={1} sx={{ fontSize: "18px", textAlign: "center" }}>
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
    </Box>
  );
};

export default OverviewRecord;
