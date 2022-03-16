import { useState, useEffect } from "react";
import taxAndSpending from "../data/taxAndSpending";
import Report from "../../../components/treasury/Report"
import Graph from "../../../components/treasury/GraphBudget";
import SetBudget from "../../../components/treasury/SetBudget";
import Calculator from "../../../components/treasury/CalculatorBudget";
import { Box, Typography, makeStyles } from "@material-ui/core";


const FIRST_YEAR = [
  {
    year: 1999,
    revenue: 349,
    expenditure: 349,
    deficit: 0,
    long_term_deficit: 0,
  },
];

const useStyles = makeStyles((theme) => ({
  title: {
    marginTop: "1rem",
    height: "5rem",
  },
  titleMenu: {
    color: "black",
    fontSize: "2.3rem",
    width: "3rem",
    height: "3rem",
  },

  container: {
    marginTop: "25px",
    display: "flex",
    height: "80vh",
    "@media (max-width: 620px)": {
      flexDirection: "column",
      height: "160vh",
    },
  },
  boxOne: {
    display: "flex",
    flexDirection: "column",
    width: "68%",
    height: "100%",
    "@media (max-width: 620px)": {
      width: "100%",
      height: "50%",
    },
  },
  boxTwo: {
    display: "flex",
    flexDirection: "column",
    width: "32%",
    height: "100%",
    "@media (max-width: 620px)": {
      width: "100%",
      height: "50%",
    },
  },

  boxReport: {
    backgroundColor: "#fdfbf7",
    border: "1px solid #d7d7d7",
    borderRadius: "5px",
    marginTop: "10px",
    padding: "10px",
    height: "20%",
    display: "flex",
    "@media (max-width: 620px)": {
      height: "25%",
      flexDirection: "column",
    },
  },
  boxGraph: {
    backgroundColor: "#fdfbf7",
    border: "1px solid #d7d7d7",
    borderRadius: "5px",
    marginTop: "10px",
    paddingTop: "10px",
    height: "80%",
    "@media (max-width: 620px)": {
      padding: "0px",
    },
  },
  boxBudgetCalculator: {
    backgroundColor: "#fdfbf7",
    border: "1px solid #d7d7d7",
    borderRadius: "5px",
    height: "100%",
    margin: "10px",
    marginBottom: "0px",
    padding: "10px",
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 620px)": {
      width: "88%",
      height: "100%",
    },
  },
  setBudget: {
    height: "20%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-evenly",
    "@media (max-width: 620px)": {
      height: "20%",
      justifyContent: "space-evenly",
      alignItems: "space-evenly",
    },
  },
  calculator: {
    height: "70%",
    "@media (max-width: 620px)": {
      height: "80%",
    },
  },
  containerDeficit: {
    marginTop: "25px",
  },
}));

export default function Treasury() {
  const classes = useStyles();

  const [budget, setBudget] = useState(FIRST_YEAR);
  const [totalTax, setTotalTax] = useState(349);
  const [totalSpending, setTotalSpending] = useState(349);
  const [deficit, setDeficit] = useState(0);
  const [calcToggle, setCalcToggle] = useState(true);
  const [settingBudget, setSettingBudget] = useState(false);
  function setAnnualBudget() {
    setSettingBudget(!settingBudget);
  }
  function openTaxCalculator() {
    setCalcToggle(true);
  }
  function openSpendingCalculator() {
    setCalcToggle(false);
  }

  function calculateTotalAmount(amount, budgetType) {
    const total = amount.reduce((a, b) => ({
      amount: a.amount + b.amount,
    }));
    if (budgetType === "TAX") {
      setTotalTax(total.amount);
    }
    if (budgetType === "SPENDING") {
      setTotalSpending(total.amount);
    }
  }

  function calculateAnnualDeficit() {
    const deficit = totalTax - totalSpending;
    setDeficit(deficit);
  }
  const newYear = () => {
    return budget[budget.length - 1].year + 1;
  };
  const prevYear = () => {
    return budget[budget.length - 1];
  };

  function calculateDeficit(newRevenue, newExpenditure) {
    const deficit = newExpenditure - newRevenue;
    return -deficit;
  }

  function calculateLongTermDeficit(revenue, expenditure) {
    let deficit = calculateDeficit(revenue, expenditure);
    deficit >= prevYear().deficit
      ? (deficit += prevYear().long_term_deficit)
      : (deficit -= prevYear().long_term_deficit);
    return deficit;
  }

  function submitBudget(year, revenue, expenditure) {
    const deficit = calculateDeficit(revenue, expenditure);
    const long_term_deficit = calculateLongTermDeficit(revenue, expenditure);
    const newBudget = [
      ...budget,
      {
        year,
        revenue,
        expenditure,
        deficit,
        long_term_deficit,
      },
    ];
    setBudget(newBudget);
    setSettingBudget(false);
  }

  function onSubmitBudget(totalTax, totalSpending) {
    submitBudget(newYear(), totalTax, totalSpending);
  }

  useEffect(() => {
    calculateAnnualDeficit();
  }, [totalTax, totalSpending]);

  return (
    <>
      <Typography variant="h4" align="left">
        Budget
      </Typography>
      <Box className={classes.containerDeficit}>
        <Typography align="left" variant="h4" style={{ marginBottom: "25px" }}>
          Deficit
        </Typography>
        <Typography
          align="justify"
          style={{ marginBottom: "25px"}}
        >
          As of 2022 the national deficit of the UK stands at around one
          trillion. In 1999 the deficit was zero. A deficit is zero when
          government spending is the same amount as government revenue, (which
          is mostly through taxation.)
        </Typography>
        <Typography
          align="justify"
          style={{ marginBottom: "25px"}}
        >
          A country is in deficit when government spending is more than revenue.
          If annual revenue was £10 and annual spending was £15 pounds, the
          deficit would be £5. If revenue was £15 and spending was £10, the
          government would be in a surplus of £5.
        </Typography>
        <Typography
          align="justify"
          style={{ marginBottom: "25px"}}
        >
          A long term deficit is when the accumulated deficit of previous years
          has not been matched by revenue. If last years deficit was £5 and this
          years deficit was zero, the long term deficit would still be £5, even
          though this years deficit was nothing.
        </Typography>
      </Box>
      <Box className={classes.container}>
        <Box className={classes.boxOne}>
          <Box className={classes.boxReport}>
            <Report
              budget={budget}
              settingBudget={settingBudget}
              setAnnualBudget={setAnnualBudget}
            />
          </Box>
          <Box className={classes.boxGraph}>
            <Graph budget={budget} />
          </Box>
        </Box>
        <Box className={classes.boxTwo}>
          <Box className={classes.boxBudgetCalculator}>
            <Box className={classes.setBudget}>
              <SetBudget
                openSpendingCalculator={openSpendingCalculator}
                openTaxCalculator={openTaxCalculator}
                totalTax={totalTax}
                totalSpending={totalSpending}
                deficit={deficit}
                settingBudget={settingBudget}
                onSubmitBudget={onSubmitBudget}
                calcToggle={calcToggle}
              />
            </Box>
            <Box className={classes.calculator}>
              {calcToggle && (
                <Calculator
                  data={taxAndSpending.taxRevenueData}
                  settingBudget={settingBudget}
                  title={"Tax Revenues"}
                  budgetType={"TAX"}
                  calculateTotalAmount={calculateTotalAmount}
                />
              )}
              {!calcToggle && (
                <Calculator
                  data={taxAndSpending.spendingData}
                  settingBudget={settingBudget}
                  title={"Expenditures"}
                  budgetType={"SPENDING"}
                  calculateTotalAmount={calculateTotalAmount}
                />
              )}
            </Box>
          </Box>
        </Box>
      </Box>
      
    </>
  );
}
