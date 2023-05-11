import React, { useState } from "react";
import { Box, TextField, Typography, Grid, Button } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";
import { addDoc, collection } from "firebase/firestore";
import { db } from "./firebase";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const themeCalender = createTheme({
  palette: { primary: { main: "#001B5E" } },
});

const EditRecord = () => {
  const [steps, setSteps] = useState("");
  const [route, setRoute] = useState("");

  const addRecord = async (e) => {
    if (steps === "" || route === "") {
      alert("Enter valid data");
      return;
    }
    await addDoc(collection(db, "dailyRecord"), {
      stepsCount: steps,
      // distance: distance,
      route: route,
    });
    setSteps("");
    setRoute("");
  };

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

  const buttonStyle = {
    color: "#001B5E",
    fontSize: "28px",
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
    <Box sx={{ width: "inherit" }}>
      <Box component="form">
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <ThemeProvider theme={themeCalender}>
            <DemoContainer components={["DatePicker"]} sx={datepickerStyle}>
              <DatePicker
                label="Date"
                defaultValue={dayjs("2022-04-17")}
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
          margin="normal"
          value={steps}
          onChange={(e) => setSteps(e.target.value)}
        />
        <Typography sx={{ color: "#001B5E", fontStyle: "italic" }}>
          1 Step = 0.000762 km
          <br />
          Distance: {(steps * 0.000762).toFixed(2)} km
        </Typography>
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
          <Button sx={buttonStyle}>
            <DeleteForeverIcon />
          </Button>

          <Grid>
            <Button sx={buttonStyle}>
              <ClearIcon />
            </Button>
            <Button sx={{ ...buttonStyle, ml: "20px" }} onClick={addRecord}>
              <DoneIcon />
            </Button>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default EditRecord;
