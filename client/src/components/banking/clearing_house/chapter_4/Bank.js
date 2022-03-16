import { Box, makeStyles } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BankDisplay from "./BankDisplay";
import ClearingHouseDues from "./ClearingHouseDues";
import { Grid } from "@material-ui/core";
import { AccordionDetails } from "@material-ui/core";
import NetAccounts from "../forms_bank/NetAccounts";
import TotalAccounts from "../forms_bank/TotalAccounts";
import DebitAccount from "../forms_bank/DebitAccount";
import CreditAccount from "../forms_bank/CreditAccount";
import TotalAll from "../forms_bank/TotalAll";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "20rem",
    marginTop: "25px",
    "@media (max-width: 620px)": {
      width: "85%",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "bold",
    color: theme.palette.text.secondary,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  columnOne: {
    flexBasis: "35%",
  },
  columnTwo: {
    flexBasis: "65%",
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function BankComponent({
  bankDisplay,
  bankOne,
  bankTwo,
  bankThree,
  bankFour,
  clearingHouse,
  setAll,
}) {
  const classes = useStyles();

  const totals = (account) => {
    let newAccount = { ...account };
    let totals = [];
    for (const instrument in newAccount) {
      if (typeof newAccount[instrument] === "number") {
        newAccount[instrument] = [{ amount: newAccount[instrument] }];
      }
      const total = newAccount[instrument].reduce(
        (x, y) => {
          return { amount: x.amount + y.amount };
        },
        { amount: 0 }
      );
      totals = [...totals, total];
    }
    const total = totals.reduce(
      (x, y) => {
        return { amount: x.amount + y.amount };
      },
      { amount: 0 }
    );
    return total.amount;
  };

  function totalAccount(array) {
    return array.reduce(
      (x, y) => {
        return { amount: x.amount + y.amount };
      },
      { amount: 0 }
    ).amount;
  }
  const depositsTotal = totalAccount(bankDisplay.liabilities.deposits);

  const loansTotal = totalAccount(bankDisplay.assets.loans);
  // let overdraftsTotal = { amount: 0 };
  // if (bankDisplay.assets.overdrafts) {
  //   overdraftsTotal = bankDisplay.assets.overdrafts.reduce(
  //     (x, y) => {
  //       return { amount: x.amount + y.amount };
  //     },
  //     { amount: 0 }
  //   );
  // }
  const netFrom =
    bankDisplay.assets.netFrom > bankDisplay.liabilities.netTo
      ? bankDisplay.assets.netFrom - bankDisplay.liabilities.netTo
      : 0;
  const netTo =
    bankDisplay.liabilities.netTo > bankDisplay.assets.netFrom
      ? bankDisplay.liabilities.netTo - bankDisplay.assets.netFrom
      : 0;
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          style={{ backgroundColor: "#E0F5FC" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.columnOne}>
            <Typography className={classes.heading} align="left">
              Bank {bankOne.id}
            </Typography>
          </div>
          <div className={classes.columnTwo}>
            <Typography className={classes.secondaryHeading} align="right">
              Assets: £
              {bankDisplay.assets.reserveDeposits // loansTotal.amount + // overdraftsTotal.amount +
                .toFixed(2)}
            </Typography>
            <Typography className={classes.secondaryHeading} align="right">
              Liabilities: £{depositsTotal.toFixed(2)}
            </Typography>
          </div>
        </AccordionSummary>
        <AccordionDetails>
          <Grid container spacing={3}>
            <Grid
              item
              style={{
                borderBottom: "1px solid #757575",
                padding: "0px",
                marginTop: "10px",
              }}
              xs={6}
            >
              <Typography className={classes.secondaryHeading}>
                Assets
              </Typography>
            </Grid>
            <Grid
              item
              style={{
                borderBottom: "1px solid #757575",
                padding: "0px",
                marginTop: "10px",
              }}
              xs={6}
            >
              <Typography className={classes.secondaryHeading}>
                Liabilities
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              style={{
                padding: "5px",
                borderRight: "1px solid #757575",
              }}
            >
              <Typography className={classes.secondaryHeading} align="left">
                Reserve Deposits: £{bankDisplay.assets.reserveDeposits}
              </Typography>
              {bankDisplay.assets.netFrom > bankDisplay.liabilities.netTo && (
                <ClearingHouseDues
                  bankDisplay={
                    bankDisplay.assets.netFrom - bankDisplay.liabilities.netTo
                  }
                  title="Owed from Clearing House"
                />
              )}

              {bankDisplay.assets.bankDeposits.length > 0 && (
                <BankDisplay
                  bankDisplay={bankDisplay.assets.bankDeposits}
                  title="Bank Deposits"
                />
              )}
              {bankDisplay.assets.overdrafts.length > 0 && (
                <BankDisplay
                  bankDisplay={bankDisplay.assets.overdrafts}
                  title="Overdrafts"
                />
              )}
              {bankDisplay.assets.loans.length > 0 && (
                <BankDisplay
                  bankDisplay={bankDisplay.assets.loans}
                  title="Loans"
                />
              )}
              {bankDisplay.assets.dueFroms.length > 0 && (
                <BankDisplay
                  bankDisplay={bankDisplay.assets.dueFroms}
                  title="Due From"
                />
              )}
            </Grid>
            <Grid item xs={6} style={{ padding: "5px" }}>
              {bankDisplay.liabilities.netTo > bankDisplay.assets.netFrom && (
                <ClearingHouseDues
                  bankDisplay={
                    bankDisplay.liabilities.netTo - bankDisplay.assets.netFrom
                  }
                  title="Owed to Clearing House"
                />
              )}
              {bankDisplay.liabilities.bankDeposits.length > 0 && (
                <BankDisplay
                  bankDisplay={bankDisplay.liabilities.bankDeposits}
                  title="Bank Deposits"
                />
              )}
              {bankDisplay.liabilities.deposits.length > 0 && (
                <BankDisplay
                  bankDisplay={bankDisplay.liabilities.deposits}
                  title="Deposits"
                />
              )}
              {bankDisplay.liabilities.dueTos.length > 0 && (
                <BankDisplay
                  bankDisplay={bankDisplay.liabilities.dueTos}
                  title="Due To"
                />
              )}
            </Grid>
            <Grid
              item
              xs={6}
              className={classes.secondaryHeading}
              style={{ padding: "5px" }}
            >
              <Typography>
                Total: £
                {bankDisplay.assets.reserveDeposits + netFrom}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              className={classes.secondaryHeading}
              style={{ padding: "5px" }}
            >
              <Typography>Total: £{parseInt(depositsTotal) + netTo}</Typography>
              {/* <Typography>Total: £{totals(bankDisplay.liabilities) + netTo}</Typography> */}
            </Grid>
          </Grid>
        </AccordionDetails>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          {/* <NetAccounts bank={bankOne} setAll={setAll}/>   */}
          {/* <TotalAccounts bank={bankOne} setAll={setAll}/> */}
          <TotalAll
            bank={bankOne}
            clearingHouse={clearingHouse}
            setAll={setAll}
          />
          {/* <DebitAccount bankOne={bank} bankTwo={bankTwo} setAll={setAll}/> */}
          {/* <CreditAccount bankOne={bank} bankTwo={reserveBank} /> */}
        </Box>
      </Accordion>
    </div>
  );
}
