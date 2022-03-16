import { Box, Typography } from "@material-ui/core";
import {
  ResponsiveContainer,
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from "recharts";

const data = [
  {
    name: "Page A",
    export: 4000,
    import: 2400,
  },
  {
    name: "Page B",
    export: 3000,
    import: 1398,
  },
  {
    name: "Page C",
    export: 2000,
    import: 9800,
  },
  {
    name: "Page D",
    export: 2780,
    import: 3908,
  },
  {
    name: "Page E",
    export: 1890,
    import: 4800,
  },
  {
    name: "Page F",
    export: 2390,
    import: 3800,
  },
  {
    name: "Page G",
    export: 3490,
    import: 4300,
  },
];

export default function TradeBalance() {
  return (
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
      <Typography style={{ fontWeight: "bold" }}>Balance of Trade</Typography>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart  data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          <Legend />
          <Bar dataKey="import" fill="#8884d8" />
          <Bar dataKey="export" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}
