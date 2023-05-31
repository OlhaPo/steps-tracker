import {
  Box,
  Button,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { styled } from "@mui/material/styles";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import { buttonStyle } from "./EditRecord";
import TablePagination from "@mui/material/TablePagination";
import { linkStyle } from "./HistoryLink";
import { Link } from "react-router-dom";
import { getHistory, fetchHistory } from "./store/historySlice";
import { useSelector, useDispatch } from "react-redux";

const HistoryRecords = () => {
  const navigate = useNavigate();
  const months = useSelector(getHistory);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchHistory());
  }, [dispatch]);

  function Row(props) {
    const monthRecord = props.row;
    const [open, setOpen] = React.useState(false);

    return (
      <React.Fragment>
        {/* 2nd level table */}
        <TableRow>
          <TableCell width="10%">
            <IconButton
              size="small"
              onClick={() => setOpen(!open)}
              sx={buttonStyle}
            >
              {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
          </TableCell>
          <TableCell align="left">{monthRecord.month}</TableCell>
          <TableCell align="left">{monthRecord.stepsTotal}</TableCell>
          <TableCell align="left">
            {monthRecord.distanceTotal.toFixed(2)}
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell sx={{ padding: 0 }} colSpan={4}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1 }}>
                <Table size="small">
                  <TableHead>
                    <TableRow>
                      <TableCell />
                      <TableCell align="left">Date</TableCell>
                      <TableCell align="right">Steps</TableCell>
                      <TableCell align="right">Km</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {monthRecord.dayRecords.map((record) => (
                      <TableRow key={record.id}>
                        <TableCell width="10%">
                          <IconButton
                            size="small"
                            onClick={() => navigate("/record/" + record.id)}
                          >
                            <EditIcon
                              sx={{ ...buttonStyle, fontSize: "20px" }}
                            />
                          </IconButton>
                        </TableCell>
                        <TableCell>{record.date.format("ddd DD")}</TableCell>
                        <TableCell align="right">{record.stepsCount}</TableCell>
                        <TableCell align="right">
                          {record.distanceCount.toFixed(2)}
                        </TableCell>
                        {/* <TableCell align="right"></TableCell> */}
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

  const Div = styled("div")(({ theme }) => ({
    ...theme.typography.button,
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(1),
  }));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Box
      sx={{
        width: "500px",
        "@media (max-width:576px)": {
          width: "325px",
        },
      }}
    >
      <TableContainer sx={{ maxHeight: 500 }}>
        {/* 1st level table */}
        <Table size="small" stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Month</TableCell>
              <TableCell>Steps</TableCell>
              <TableCell align="left">Km</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {months
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((monthRecord) => (
                <Row key={monthRecord.monthId} row={monthRecord} />
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[3, 10, 25, 100]}
        component="div"
        count={months.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
        size="small"
      />
      <Box component={Link} to={"/"}>
        <Button sx={linkStyle}>Home</Button>
      </Box>
    </Box>
  );
};

export default HistoryRecords;
