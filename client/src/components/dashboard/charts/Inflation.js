import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { Box, Typography } from "@material-ui/core";

const ourData = {
  2017: 2,
  2018: 4,
  2019: 3,
  2020: 5,
  2021: 6,
};

// const data = [
//   { year: 2017, num: 2 },
//   { year: 2018, num: 4 },
//   { year: 2019, num: 3 },
//   { year: 2020, num: 5 },
//   { year: 2021, num: 6 },
// ];

export default function Inflation() {
  const data = Object.keys(ourData).map((y) =>( {
    year: y, num: ourData[y]
  }))
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "35%",
          height: "35%",
          margin: "10px",
        }}
      >
        <Typography style={{ fontWeight: "bold" }}>Inflation: 4.3%</Typography>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis />
            <YAxis />
            <Tooltip />
            <Line
              type="monotone"
              dataKey="num"
              stroke="#8884d8"
              strokeWidth={2}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
}
