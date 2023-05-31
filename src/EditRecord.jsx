import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, TextField, Typography, Grid, Button } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "./firebase";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { getRecordById } from "./firebaseService";
import { useSelector } from "react-redux";
import { getHistory, createMonthId } from "./store/historySlice";

const STEPS_TO_KM = 1312.33595801;

export const buttonStyle = {
  color: "#001B5E",
  fontSize: "25px",
};

const EditRecord = () => {
  const { id } = useParams();
  const isCreateMode = !id;
  const navigate = useNavigate();
  const months = useSelector(getHistory);
  const [steps, setSteps] = useState("");
  const [route, setRoute] = useState("");

  const [selectedDate, setSelectedDate] = useState(dayjs());

  const distance = convertStepsToKm(steps);

  const ok = async (e) => {
    if (steps <= 0 || route === "" || checkExistingDate(selectedDate, months)) {
      alert("Enter valid data");
      return;
    }

    let targetId;
    const payload = {
      timestamp: selectedDate.toDate(),
      stepsCount: +steps,
      distanceCount: distance,
      route: route,
    };

    if (isCreateMode) {
      const newDoc = await addDoc(collection(db, "dailyRecord"), payload);

      targetId = newDoc.id;
    } else {
      await updateDoc(doc(db, "dailyRecord", id), payload);
      targetId = id;
    }
    navigate("/record/" + targetId);
  };

  useEffect(() => {
    if (isCreateMode) return;

    getRecordById(id)
      .then((record) => {
        setSelectedDate(dayjs.unix(record.timestamp.seconds));
        setSteps(record.stepsCount);
        setRoute(record.route);
      })
      .catch();
  }, [id, isCreateMode]);

  const deleteRecord = async (id) => {
    try {
      const documentRef = doc(db, "dailyRecord", id);
      await deleteDoc(documentRef);
      console.log("Document successfully deleted!");
    } catch (error) {
      console.error("Error deleting document: ", error);
    }

    navigate("/history");
  };

  const themeCalender = createTheme({
    palette: { primary: { main: "#001B5E" } },
  });

  const textFieldStyle = {
    "& label.Mui-focused": {
      color: "#001B5E",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#001B5E",
      },
      "&:hover fieldset": {
        borderColor: "#001B5E",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#001B5E",
      },
    },
  };

  const datepickerStyle = {
    "& label.Mui-focused": {
      color: "#001B5E",
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "#001B5E",
      },
      "&:hover fieldset": {
        borderColor: "#001B5E",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#001B5E",
      },
      "& .MuiIconButton-root": {
        color: "#001B5E",
      },
    },
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
      <Box component="form">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={themeCalender}>
            <DemoContainer components={["DatePicker"]} sx={datepickerStyle}>
              <DatePicker
                value={selectedDate}
                label="Date"
                onChange={(date) => setSelectedDate(date)}
                slotProps={{ textField: { fullWidth: true } }}
              />
            </DemoContainer>
          </ThemeProvider>
        </LocalizationProvider>

        <TextField
          sx={textFieldStyle}
          required
          id="custom-css-outlined-input"
          label="Steps"
          fullWidth
          type="number"
          margin="normal"
          value={steps}
          onChange={(e) => setSteps(+e.target.value)}
        />
        <Box
          sx={{
            color: "#001B5E",
            fontStyle: "italic",
            display: "flex",
            justifyContent: "space-between",
            "@media (max-width:576px)": {
              flexDirection: "column",
              fontSize: "14px",
              marginBottom: "10px",
            },
          }}
        >
          <Typography sx={{ color: "#7A7A7B", marginBottom: "10px" }}>
            1 Step = 0.000762 km
          </Typography>
          <Typography>
            {steps > 0 ? `Distance: ${distance.toFixed(2)} km` : null}
          </Typography>
        </Box>

        <TextField
          sx={textFieldStyle}
          required
          label="Route"
          fullWidth
          margin="normal"
          value={route}
          onChange={(e) => setRoute(e.target.value)}
        />
      </Box>
      <Box mt={6}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button
            sx={{
              ...buttonStyle,
              paddingLeft: 0,
              justifyContent: "flex-start",
            }}
            onClick={() => deleteRecord(id)}
          >
            <DeleteForeverIcon />
          </Button>

          <Grid>
            <Button sx={buttonStyle} component={Link} to={"/"}>
              <ClearIcon />
            </Button>
            <Button
              sx={{
                ...buttonStyle,
                justifyContent: "flex-end",
              }}
              onClick={ok}
            >
              <DoneIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EditRecord;

function convertStepsToKm(steps) {
  return steps / STEPS_TO_KM;
}

function checkExistingDate(date, monthHistory) {
  const monthId = createMonthId(date);
  return monthHistory.some(
    (monthRecord) =>
      monthRecord.monthId === monthId &&
      monthRecord.dayRecords.some((day) => day.date.isSame(date, "day"))
  );
}
