import React from "react";
import { Box, TextField, Typography, Grid, Button } from "@mui/material";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import ClearIcon from "@mui/icons-material/Clear";
import DoneIcon from "@mui/icons-material/Done";

const EditRecord = () => {
  return (
    <Box sx={{ width: "inherit" }}>
      <Box
        component="form"

        // noValidate
        // autoComplete="off"
      >
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DemoContainer components={["DatePicker"]}>
            <DatePicker label="Date" defaultValue={dayjs("2022-04-17")} />
          </DemoContainer>
        </LocalizationProvider>

        <TextField
          required
          id="outlined-required"
          label="Steps"
          fullWidth
          margin="normal"
        />
        <Typography>1 Step = 0.0056 km</Typography>
        <TextField label="Route" fullWidth margin="normal" />
      </Box>
      <Box mt={6}>
        <Grid
          container
          direction="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <Button>
            <DeleteForeverIcon />
          </Button>

          <Grid>
            <Button>
              <ClearIcon />
            </Button>
            <Button
              sx={{
                ml: "20px",
              }}
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
