import {
  Box,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
} from "@mui/material";
import React from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useSelector } from "react-redux";
import { getHistory } from "./store/historySlice";
import { Link } from "react-router-dom";
import { buttonStyle } from "./EditRecord";

const HistoryRecords = () => {
  const months = useSelector(getHistory);

  function Row(props) {
    const monthRecord = props.row;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        {/* 2nd level table */}
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="expand row"
              size="small"
              onClick={() => setOpen(!open)}
              sx={buttonStyle}
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
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell>Date</TableCell>
                      <TableCell align="right">Steps</TableCell>
                      <TableCell align="right">Km</TableCell>
                      <TableCell />
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
                        <TableCell align="right">
                          <Button component={Link} to={"/record/" + record.id}>
                            <EditIcon
                              sx={{ ...buttonStyle, fontSize: "20px" }}
                            />
                          </Button>
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
    <TableContainer>
      {/* 1st level table */}
      <Table aria-label="collapsible table" size="small">
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
  );
};

export default HistoryRecords;
