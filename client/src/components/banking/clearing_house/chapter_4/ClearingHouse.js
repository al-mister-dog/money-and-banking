import { Box, makeStyles } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import BankDisplay from "./BankDisplay";
import ClearingHouseDisplay from "./ClearingHouseDisplay";
import { Grid } from "@material-ui/core";
import { AccordionDetails } from "@material-ui/core";
import ClearAccounts from "../forms_bank/ClearAccounts";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "20rem",
    margin: "auto",
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

export default function ClearingHouse({
  bankDisplay,
  bankOne,
  bankTwo,
  bankThree,
  bankFour,
  clearingHouseDisplay,
  clearingHouse,
  setAll,
}) {
  const classes = useStyles();
  const totalAccounts = () => {
    const receiveFromTotal = clearingHouseDisplay.assets.receiveFrom.reduce(
      (x, y) => {
        return { amount: x.amount + y.amount };
      },
      { amount: 0 }
    ).amount;
    const payToTotal = clearingHouseDisplay.liabilities.payTo.reduce(
      (x, y) => {
        return { amount: x.amount + y.amount };
      },
      { amount: 0 }
    ).amount;
    return {
      receiveFromTotal,
      payToTotal,
    };
  };

  
  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          style={{ backgroundColor: "#FAF6C5" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.columnOne}>
            <Typography className={classes.heading} align="left">
              Clearing House
              {/* {bankOne.id} */}
            </Typography>
          </div>
          <div className={classes.columnTwo}>
            <Typography className={classes.secondaryHeading} align="right">
              Reserve Deposits: £10000
              {/* {(
                overdraftsTotal.amount +
                loansTotal.amount +
                bankDisplay.assets.reserves
              ).toFixed(2)} */}
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
              {clearingHouseDisplay.assets.receiveFrom.length > 0 && (
                <ClearingHouseDisplay
                  clearingHouseDisplay={clearingHouseDisplay.assets.receiveFrom}
                  title="Owed From"
                />
              )}
              {/* <Typography className={classes.secondaryHeading} align="left">
                Reserves: £{bankDisplay.assets.reserves}
              </Typography>
              
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
              )} */}
            </Grid>
            <Grid item xs={6} style={{ padding: "5px" }}>
              {clearingHouseDisplay.liabilities.payTo.length > 0 && (
                <ClearingHouseDisplay
                  clearingHouseDisplay={clearingHouseDisplay.liabilities.payTo}
                  title="Owed To"
                />
              )}
              {/* {bankDisplay.liabilities.bankDeposits.length > 0 && (
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
              )} */}
            </Grid>
            <Grid
              item
              xs={6}
              className={classes.secondaryHeading}
              style={{ padding: "5px" }}
            >
              <Typography>
                Total: £
                {clearingHouseDisplay.liabilities.payTo.length > 0 ||
                clearingHouseDisplay.liabilities.payTo.length > 0
                  ? `${totalAccounts().receiveFromTotal}`
                  : `0`}
              </Typography>
            </Grid>
            <Grid
              item
              xs={6}
              className={classes.secondaryHeading}
              style={{ padding: "5px" }}
            >
              <Typography>
                Total: £
                {clearingHouseDisplay.liabilities.payTo.length > 0 ||
                clearingHouseDisplay.liabilities.payTo.length > 0
                  ? `${totalAccounts().payToTotal}`
                  : `0`}
              </Typography>
            </Grid>
          </Grid>
        </AccordionDetails>
        <Box style={{ display: "flex", justifyContent: "center" }}>
          <ClearAccounts
            bankOne={bankOne}
            bankTwo={bankTwo}
            bankThree={bankThree}
            bankFour={bankFour}
            clearingHouseDisplay={clearingHouseDisplay}
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
