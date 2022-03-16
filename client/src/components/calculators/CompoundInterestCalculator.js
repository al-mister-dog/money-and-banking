import { useState } from "react";
import InterestCalculator from "../../../calculators/interest/interestClass";
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
import {
  Paper,
  Box,
  TextField,
  MenuItem,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  paper: {
    backgroundColor: "#fdfbf7",
    width: "70vw",
    height: "80vh",
    padding: "25px",
    margin: "auto",
    marginTop: "2rem",
    display: "flex",
    alignItems: "flex-start",
  },
  form: {
    width: 300,
    // margin: "auto",
    padding: 25,
  },
  textField: {
    width: 200,
    marginBottom: 10
  },
  calculateBtn: {
    width: 200,
    marginTop: 25
  }
}));
export default function CentralBank() {
  const classes = useStyles();

  const [principal, setPrincipal] = useState("1000");
  const [interestRate, setInterestRate] = useState("0.05");
  const [inflationRate, setInflationRate] = useState("0.02");
  const [compoundPeriod, setCompoundPeriod] = useState("0");
  const [years, setYears] = useState("10");
  const [graphResult, setGraphResult] = useState([]);
  const compoundPeriods = [
    {
      value: 0,
      label: "Annually",
    },
    {
      value: 1,
      label: "Semi-annually",
    },
    {
      value: 2,
      label: "Quarterly",
    },
    {
      value: 3,
      label: "Monthly",
    },
  ];

  function handleChangePrincipal(e) {
    setPrincipal(e.target.value);
  }
  function handleChangeInterestRate(e) {
    setInterestRate(e.target.value);
  }
  function handleChangeInflationRate(e) {
    setInflationRate(e.target.value);
  }
  function handleChangeYears(e) {
    setYears(e.target.value);
  }
  function handleChangeCompoundPeriod(e) {
    setCompoundPeriod(e.target.value);
  }

  function getCompoundInterest() {
    const futures = new InterestCalculator(
      parseFloat(principal),
      parseFloat(interestRate),
      parseFloat(inflationRate),
      parseFloat(years),
      parseFloat(compoundPeriod)
    );
    const eachYear = Array.from({ length: years }, (_, i) => i + 2020);
    const compoundRealInterest = futures.getRealCompoundInterestPercent();
    const compoundInterest = futures.getCompoundInterestPercent();
    const simpleInterest = futures.getNominalInterestPercent();
    const graphData = eachYear.map((_, index) => {
      return {
        year: eachYear[index],
        "real interest": parseFloat(compoundRealInterest[index]),
        interest: parseFloat(compoundInterest[index]),
        "simple interest": parseFloat(simpleInterest[index]),
      };
    });
    setGraphResult(graphData);
  }
  return (
    <>
      <Paper className={classes.paper}>
        <Box
          sx={{
            width: "30%",
            margin: "auto",
            marginBottom: 190,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <TextField
            className={classes.textField}
            type="number"
            placeholder={principal}
            label="Principal"
            onChange={handleChangePrincipal}
            inputProps={{ min: 0 }}
          />
          <TextField
            className={classes.textField}
            type="number"
            placeholder={interestRate}
            label="Interest Rate (%)"
            onChange={handleChangeInterestRate}
            inputProps={{ min: -100, max: 100 }}
          />
          <TextField
            className={classes.textField}
            type="number"
            placeholder={inflationRate}
            label="Inflation Rate (%)"
            onChange={handleChangeInflationRate}
            inputProps={{ min: -100, max: 100 }}
          />
          <TextField
            className={classes.textField}
            type="number"
            placeholder={years}
            label="Years"
            onChange={handleChangeYears}
            inputProps={{ min: 1, max: 10 }}
          />
          <TextField
            className={classes.textField}
            select
            label="Select Compound Period"
            onChange={handleChangeCompoundPeriod}
          >
            {compoundPeriods.map((option, index) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>
          <Button
            color="secondary"
            variant="contained"
            className={classes.calculateBtn}
            onClick={getCompoundInterest}
          >
            Calculate
          </Button>
        </Box>
        <Box sx={{ height: 600, width: "70%", margin: "auto" }}>
          <ResponsiveContainer width="93%" height="80%">
            <LineChart data={graphResult}>
              <CartesianGrid strokeDasharray="3 3" strokeWidth={2} />
              <XAxis dataKey="year" strokeWidth={2} />
              <YAxis
                type="number"
                domain={[
                  (dataMin) => Math.round(dataMin) - 10,
                  (dataMax) => Math.round(dataMax) + 10,
                ]}
                strokeWidth={2}
              />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                // animationDuration={duration}
                dataKey="real interest"
                stroke="red"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                // animationDuration={duration}
                dataKey="interest"
                stroke="blue"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
              <Line
                type="monotone"
                // animationDuration={duration}
                dataKey="simple interest"
                stroke="orange"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </Box>
      </Paper>
    </>
  );
}
