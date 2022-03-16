import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";
import { Box, Typography } from "@material-ui/core";

const data = [
  {
    name: "Foreign Currency Reserves",
    value: 104214,
    fill: "#003f5c",
  },
  {
    name: "IMF reserve (tranche)",
    value: 7426,
    fill: "#7a5195",
  },
  {
    name: "Special Drawing Rights",
    value: 10346,
    fill: "#ef5675",
  },
  {
    name: "Gold",
    value: 12333,
    fill: "#ffa600",
  },
];

export default function Reserves() {
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
        <Typography style={{ fontWeight: "bold" }}>
          Reserves: $135000mn
        </Typography>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={50}
              fill="fill"
              // label
            />
            <Tooltip
              // itemStyle={{ backgroundColor: "blue" }}
              contentStyle={{ borderRadius: "5px" }}
            />

            {/* <Pie
    data={data02}
    dataKey="value"
    nameKey="name"
    cx="50%"
    cy="50%"
    innerRadius={60}
    outerRadius={80}
    fill="#82ca9d"
    label
  /> */}
          </PieChart>
        </ResponsiveContainer>
      </Box>
    </>
  );
}
