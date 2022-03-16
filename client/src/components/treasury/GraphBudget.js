import { Typography, makeStyles } from "@material-ui/core";
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

const colorScheme = {
  red: "#a71919",
  green: "#043e0e",
  blue: "#39033a",
  orange: "#c19a23",
};

const useStyles = makeStyles(() => ({
  title: {
    color: "#808080",
    fontWeight: "bold",
    "@media (max-width: 620px)": {
      fontSize: "0.6rem",
    },
  },
}));

export default function Treasury({ budget }) {
  const classes = useStyles();
  const duration = 300;

  return (
    <>
      <Typography className={classes.title} variant="subtitle1">
        UK revenue, expenditure and deficit/surplus (Billion GBP)
      </Typography>
      <ResponsiveContainer width="93%" height="80%">
        <LineChart data={budget} height="" width=""  margin={{
            top: 15,
            right: 0,
            left: -10,
            // bottom: 5,
          }}>
          <CartesianGrid strokeDasharray="3 3" strokeWidth={2} />
          <XAxis dataKey="year" strokeWidth={2} />
          <YAxis strokeWidth={2} />
          <Tooltip />
          <Legend />
          <Line
            type="monotone"
            animationDuration={duration}
            dataKey="revenue"
            stroke={colorScheme.red}
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            animationDuration={duration}
            dataKey="deficit"
            stroke={colorScheme.green}
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            animationDuration={duration}
            dataKey="long_term_deficit"
            stroke={colorScheme.blue}
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            animationDuration={duration}
            dataKey="expenditure"
            stroke={colorScheme.orange}
            strokeWidth={3}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
}
