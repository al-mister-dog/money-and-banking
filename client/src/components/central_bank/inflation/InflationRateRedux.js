import {useSelector} from "react-redux"
import {selectCentralBank} from "../../../features/central_bank/centralBankSlice"

import { Box, makeStyles } from "@material-ui/core";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const useStyles = makeStyles(() => ({
  box: {
    width: "100%", height: 300,
    "@media (max-width: 620px)": {
      marginTop: "50px"
    }
  }
}))

export default function InflationRate() {
  const {inflationByYear} = useSelector(selectCentralBank)
  const classes = useStyles()
  return (
    <Box className={classes.box}>
      <p>% Rate of Inflation</p>
      <ResponsiveContainer width="90%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={inflationByYear}
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

