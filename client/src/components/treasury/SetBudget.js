import { Box, Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  totals: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "space-around",
  },
  total: {
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center",
  },
  totalBtn: {
    fontSize: "0.8rem",
    // width: "3rem",
    marginRight: "5px",
  },
  totalBtnTitle: {
    color: "#808080",
  },
  totalBtnNum: {
    fontWeight: "bold",
    fontSize: "0.8rem",
  },
  totalBtnSelected: {
    fontWeight: "bold",
    fontSize: "0.8rem",
    backgroundColor: "pink"
  }
}));

export default function SetBudget({
  openSpendingCalculator,
  openTaxCalculator,
  totalTax,
  totalSpending,
  deficit,
  settingBudget,
  onSubmitBudget,
  calcToggle
}) {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.totals}>
        <Box className={classes.total}>
          <Button
            color="secondary"
            variant={calcToggle ? `contained` : `outlined`}
            className={classes.totalBtn}
            onClick={openTaxCalculator}
          >
            Tax
          </Button>
          <Typography className={classes.totalBtnNum}>
            £{totalTax} bn
          </Typography>
        </Box>
        <Box className={classes.total}>
          <Button
            color="secondary"
            variant={!calcToggle ? `contained` : `outlined`}
            className={classes.totalBtn}
            onClick={openSpendingCalculator}
          >
            Spend
          </Button>
          <Typography className={classes.totalBtnNum}>
            £{totalSpending} bn
          </Typography>
        </Box>
      </Box>
      <Typography variant="h6" align="left">
        {deficit > 0 ? "Surplus" : "Deficit"}: £{deficit}bn
      </Typography>
      <Button
        variant="outlined"
        color="primary"
        disabled={!settingBudget}
        onClick={() => onSubmitBudget(totalTax, totalSpending)}
      >
        Submit Annual Budget
      </Button>
    </>
  );
}
