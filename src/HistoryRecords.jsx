import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import { getHistory } from "./store/historySlice";

const HistoryRecords = () => {
  const months = useSelector(getHistory);
  const [value, setValue] = React.useState("year");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function Row(props) {
    const monthRecord = props.row;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        {/* 2nd level table */}
        <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell>{monthRecord.month}</TableCell>
          <TableCell align="right">{monthRecord.stepsTotal}</TableCell>
          <TableCell align="right">
            {monthRecord.distanceTotal.toFixed(2)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Steps</TableCell>
                      <TableCell align="right">Km</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {monthRecord.dayRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell />
                        <TableCell>{record.date.format("L")}</TableCell>
                        <TableCell align="right">{record.stepsCount}</TableCell>
                        <TableCell align="right">
                          {record.distanceCount.toFixed(2)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </Box>
            </Collapse>
          </TableCell>
        </TableRow>
      </React.Fragment>
    );
  }

  return (
    <Box>
      <Box sx={{ position: "absolute", top: "50px", right: "5px" }}>
        <FormControl>
          <RadioGroup row value={value} onChange={handleChange}>
            <FormControlLabel value="year" control={<Radio />} label="Year" />
            <FormControlLabel value="month" control={<Radio />} label="Month" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <TableContainer>
          {/* 1st level table */}
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Month</TableCell>
                <TableCell align="right">Steps</TableCell>
                <TableCell align="right">Kilometers</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {months.map((monthRecord) => (
                <Row key={monthRecord.monthId} row={monthRecord} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default HistoryRecords;
