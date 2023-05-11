import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import IconButton from "@mui/material/IconButton";
import PropTypes from "prop-types";

const HistoryRecords = () => {
  const [value, setValue] = React.useState("year");

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  function createData(month, steps, km) {
    return {
      month,
      steps,
      km,
      history: [
        {
          date: "2020-01-05",
          steps: 1500,
          km: 2.5,
        },
        {
          date: "2020-01-06",
          steps: 1500,
          km: 2.5,
        },
      ],
    };
  }

  function Row(props) {
    const { row } = props;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
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
          <TableCell component="th" scope="row">
            {row.month}
          </TableCell>
          <TableCell align="right">{row.steps}</TableCell>
          <TableCell align="right">{row.km}</TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Typography variant="h6" gutterBottom component="div">
                  History
                </Typography>
                <Table size="small" aria-label="purchases">
                  <TableHead>
                    <TableRow>
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Steps</TableCell>
                      <TableCell align="right">Km</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {row.history.map((historyRow) => (
                      <TableRow key={historyRow.date}>
                        <TableCell component="th" scope="row">
                          {historyRow.date}
                        </TableCell>
                        <TableCell align="right">{historyRow.steps}</TableCell>
                        <TableCell align="right">{historyRow.km}</TableCell>
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

  Row.propTypes = {
    row: PropTypes.shape({
      month: PropTypes.string.isRequired,
      steps: PropTypes.number.isRequired,
      km: PropTypes.number.isRequired,
      history: PropTypes.arrayOf(
        PropTypes.shape({
          steps: PropTypes.number.isRequired,
          km: PropTypes.number.isRequired,
          date: PropTypes.string.isRequired,
        })
      ).isRequired,
    }).isRequired,
  };

  const rows = [createData("April", 3000, 5)];
  return (
    <Box>
      <Box sx={{ position: "absolute", top: "50px", right: "5px" }}>
        <FormControl>
          <RadioGroup row value={value} onChange={handleChange}>
            <FormControlLabel value="Year" control={<Radio />} label="Year" />
            <FormControlLabel value="Month" control={<Radio />} label="Month" />
          </RadioGroup>
        </FormControl>
      </Box>
      <Box>
        <TableContainer>
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
              {rows.map((row) => (
                <Row key={row.month} row={row} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default HistoryRecords;
