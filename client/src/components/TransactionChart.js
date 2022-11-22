import * as React from "react";
import Paper from "@mui/material/Paper";
import { Chart, BarSeries } from "@devexpress/dx-react-chart-material-ui";
import { scaleBand } from "@devexpress/dx-chart-core";
import { ArgumentScale } from "@devexpress/dx-react-chart";

import { Animation } from "@devexpress/dx-react-chart";
import dayjs from "dayjs";
import {
  ArgumentAxis,
  ValueAxis,
  Tooltip,
} from "@devexpress/dx-react-chart-material-ui";

import { EventTracker } from "@devexpress/dx-react-chart";

export default function TransactionChart({ data }) {
  const chatData = data.map((item) => {
    item.month = dayjs()
      .month(item._id - 1)
      .format("MMMM");
    return item;
  });
  return (
    <Paper sx={{ marginTop: 5 }}>
      <Chart data={chatData}>
        <ArgumentScale factory={scaleBand} />
        <ArgumentAxis />
        <ValueAxis />
        <BarSeries valueField="totalExpenses" argumentField="month" />
        <Animation />
        <EventTracker />
        <Tooltip />
      </Chart>
    </Paper>
  );
}
