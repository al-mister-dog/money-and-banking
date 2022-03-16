import {useSelector} from "react-redux"
import {selectCentralBank} from "../../../features/central_bank/centralBankSlice"
import { Box } from "@material-ui/core";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
} from "recharts";

export default function InflationChart() {
  const {inflationByYear} = useSelector(selectCentralBank)
  return (
    <Box sx={{ width: "100%", height: 300 }}>
      <p>% Rate of Change</p>
      <ResponsiveContainer width="90%" height="100%">
        <BarChart
          width={500}
          height={300}
          data={inflationByYear}
          margin={{
            top: 5,
            right: 0,
            left: -15,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="year" />
          <YAxis />
          <Tooltip />
          {/* <Legend /> */}
          <ReferenceLine y={0} stroke="#000" />
          <Bar dataKey="change" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
}

