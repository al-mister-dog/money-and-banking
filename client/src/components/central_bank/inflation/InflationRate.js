import { Box, makeStyles } from "@material-ui/core";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const data = [
  { year: 1999, rate: 1.753, change: -0.07 },
  { year: 2000, rate: 1.183, change: -0.57 },
  { year: 2001, rate: 1.5323, change: 0.35 },
  { year: 2002, rate: 1.5204, change: -0.01 },
  { year: 2003, rate: 1.3765, change: -0.14 },
  { year: 2004, rate: 1.3904, change: 0.01 },
  { year: 2005, rate: 2.0891, change: 0.7 },
  { year: 2006, rate: 2.4557, change: 0.37 },
  { year: 2007, rate: 2.3866, change: -0.07 },
  { year: 2008, rate: 3.5214, change: 1.13 },
  { year: 2009, rate: 1.9617, change: -1.56 },
  { year: 2010, rate: 2.4927, change: 0.53 },
  { year: 2011, rate: 3.8561, change: 1.36 },
  { year: 2012, rate: 2.5732, change: -1.28 },
  { year: 2013, rate: 2.2917, change: -0.28 },
  { year: 2014, rate: 1.4511, change: -0.84 },
  { year: 2015, rate: 0.368, change: -1.08 },
  { year: 2016, rate: 1.0084, change: 0.64 },
  { year: 2017, rate: 2.5578, change: 1.55 },
  { year: 2018, rate: 2.2928, change: -0.27 },
  { year: 2019, rate: 1.7381, change: -0.55 },
  { year: 2020, rate: 0.9895, change: -0.75 },
];

const useStyles = makeStyles(() => ({
  box: {
    width: "100%", height: 300,
    "@media (max-width: 620px)": {
      marginTop: "50px"
    }
  }
}))

export default function InflationRate() {
  const classes = useStyles()
  return (
    <Box className={classes.box}>
      <p>% Rate of Inflation</p>
      <ResponsiveContainer width="90%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 0,
            left: -20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <Line
            type="monotone"
            dataKey="rate"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
}
