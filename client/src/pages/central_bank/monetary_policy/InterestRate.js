import { useSelector, useDispatch } from "react-redux";
import {
  setBankRate,
  selectCentralBank,
} from "../../../features/central_bank/centralBankSlice";
import { useState } from "react";
import Chart from "../../../components/central_bank/interest_rate/Chart";

import {
  Box,
  TextField,
  Button,
  makeStyles,
  Typography,
  Tooltip,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  box: {
    width: "100%",
    overflowX: "hidden",
  },
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  objective: {
    "@media (max-width: 620px)": {
      fontSize: "0.8rem",
    },
  },
  containerInterestRate: {
    margin: "10px",
    marginTop: "20px",
    border: "1px solid #d7d7d7",
    borderRadius: "5px",
    padding: "20px",
    display: "flex",
    "@media (max-width: 620px)": {
      margin: 0,
      flexDirection: "column",
    },
  },
  containerSetRate: {
    width: "30%",
    height: "80%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    "@media (max-width: 620px)": {
      width: "100%",
      flexDirection: "row",
      flexWrap: "wrap",
    },
  },
  containerChart: {
    width: "70%",
    height: "30vh",
    marginLeft: "20px",
    "@media (max-width: 620px)": {
      height: "40vh",
      width: "100%",
      marginLeft: "0px",
    },
  },
  tooltip: {
    fontSize: "2rem",
  },
  form: {
    width: 300,
    padding: 25,
  },
  textField: {
    width: 200,
    marginBottom: 10,
    "@media (max-width: 620px)": {
      width: "45%",
    },
  },
  submitBtn: {
    width: 200,
    marginTop: 25,
    "@media (max-width: 620px)": {
      fontSize: "0.6rem",
      width: "45%",
      margin: "10px 0 10px 0",
    },
  },
  setRateText: {
    "@media (max-width: 620px)": {
      fontSize: "0.7rem",
      marginBottom: "10px",
    },
  },
}));

export default function InterestRate() {
  const dispatch = useDispatch();
  const { bankRate, inflationRate, inflationTarget } =
    useSelector(selectCentralBank);

  const classes = useStyles();

  const [formBankRate, setFormBankRate] = useState(0.25);
  const minBankRate = 0.01;
  const maxBankRate = 0.5;
  const step = 0.01;
  function handleChangeBankRate(e, value) {
    setFormBankRate(e.target.value);
  }

  return (
    <>
      <Box>
        <Typography align="left" variant="h4" style={{ marginBottom: "25px" }}>
          Interest Rate
        </Typography>
        <Typography
          align="justify"
          style={{ marginBottom: "25px" }}
          className={classes.objective}
        >
          The interest rate (or bank rate) is the interest rate that banks and
          lenders pay when they borrow from the Bank of England. It influences
          most interest rates, including savings accounts, credit cards, loans
          and mortgages. Usually mortgage rates go up or down quite soon after
          the base rate changes. The inflation target is currently set at %2. If
          the inflation rate is above this number it may be wise to set the
          interest rate higher.
        </Typography>
        <Box className={classes.containerInterestRate}>
          <Box className={classes.containerSetRate}>
            <Tooltip
              align="left"
              title={
                <h3>
                  The rate that the Central Bank will charge other banks and
                  financial institutions for loans with a maturity of 1 day.
                </h3>
              }
            >
              <Typography className={classes.setRateText}>
                Bank Rate: %{bankRate}
              </Typography>
            </Tooltip>
            <Tooltip
              align="left"
              title={
                <h3>
                  The total increase percentage of prices in the Consumer
                  Product Index (CPI). Click INFLATION tab for more details.
                </h3>
              }
            >
              <Typography className={classes.setRateText}>
                Inflation Rate: %{inflationRate}
              </Typography>
            </Tooltip>
            <Tooltip
              align="left"
              title={
                <h3>
                  An expected rise in inflation can motivate consumers to spend
                  more now to avoid future price increases. This can boost
                  growth.
                </h3>
              }
            >
              <Typography className={classes.setRateText}>
                Inflation Target: %{inflationTarget}
              </Typography>
            </Tooltip>
            <TextField
              className={classes.textField}
              type="number"
              defaultValue={bankRate}
              label="Change Bank Rate"
              onChange={handleChangeBankRate}
              inputProps={{
                min: minBankRate,
                max: maxBankRate,
                step: { step },
              }}
            />
            <Button
              className={classes.submitBtn}
              variant="outlined"
              color="primary"
              onClick={() => dispatch(setBankRate(formBankRate))}
            >
              submit
            </Button>
          </Box>
          <Box className={classes.containerChart}>
            <Chart />
          </Box>
        </Box>
      </Box>
    </>
  );
}
