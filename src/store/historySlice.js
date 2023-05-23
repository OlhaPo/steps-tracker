import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchCollectionData } from "../firebaseService";
import dayjs from "dayjs";

const MONTH_ID_FORMAT = "YYYY-MM";

export const fetchHistory = createAsyncThunk(
  "history/fetchHistory",
  async (_, { dispatch }) => {
    try {
      const response = await fetchCollectionData();
      const months = groupByMonth(response);
      dispatch(historySlice.actions.updateMonths(months));
    } catch (error) {
      console.log("Error fetching history:", error);
      return null;
    }
  }
);

export const historySlice = createSlice({
  name: "history",

  initialState: {
    months: [],
  },
  reducers: {
    updateMonths: (state, action) => {
      state.months = action.payload;
    },
  },
});

// Selector
export const getHistory = (state) => {
  return state.history.months;
};

export const getCurrentMonthStats = (state) => {
  const monthId = dayjs().format(MONTH_ID_FORMAT);
  return state.history.months.find((m) => m.monthId === monthId);
};

// Action creators are generated for each case reducer function
export const { updateMonths } = historySlice.actions;

export default historySlice.reducer;

function groupByMonth(response) {
  const result = [];
  response
    .map((r) => {
      return { ...r, date: dayjs.unix(r.timestamp.seconds) };
    })
    .forEach((r) => {
      // 1. Get month and year formatted from timestamp
      const monthId = r.date.format(MONTH_ID_FORMAT);
      const existingMonthIndex = result.findIndex((m) => m.monthId === monthId);
      if (existingMonthIndex > -1) {
        // add km and steps
        result[existingMonthIndex].dayRecords.push(r);
        result[existingMonthIndex].stepsTotal += r.stepsCount;
        result[existingMonthIndex].distanceTotal += r.distanceCount;
      } else {
        //    push new month
        result.push({
          monthId,
          year: r.date.format("YYYY"),
          month: r.date.format("MMM YYYY"),
          dayRecords: [r],
          stepsTotal: r.stepsCount,
          distanceTotal: r.distanceCount,
        });
      }
    });
  return result;
}
