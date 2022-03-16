import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import { Grid } from "@material-ui/core";
import { AccordionDetails } from "@material-ui/core";

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
  bankDisplay, bank
}) {
  const classes = useStyles()
  const depositsTotal = bankDisplay.liabilities.deposits.reduce(
    (x, y) => {
      return { amount: x.amount + y.amount };
    },
    { amount: 0 }
  );
  const loansTotal = bankDisplay.assets.loans.reduce(
    (x, y) => {
      return { amount: x.amount + y.amount };
    },
    { amount: 0 }
  );
  return (
    <div className={classes.root}>
      <Accordion >
        <AccordionSummary
        style={{backgroundColor: "#E0F5FC"}}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.columnOne}>
            <Typography className={classes.heading} align="left">
              Bank {bank.bankId}
            </Typography>
            
          </div>
          <div className={classes.columnTwo}>
            <Typography className={classes.secondaryHeading} align="right">
              Assets: £{(loansTotal.amount + bankDisplay.assets.reserves).toFixed(2)}
            </Typography>
            <Typography className={classes.secondaryHeading} align="right">
              Liabilities: £{(depositsTotal.amount).toFixed(2)}
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
          <Typography className={classes.secondaryHeading}>Assets</Typography>
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
          <Typography className={classes.secondaryHeading}>Liabilities</Typography>
        </Grid>
        <Grid
          item
          xs={6}
          style={{ padding: "5px", borderRight: "1px solid #757575" }}
        >
          <Typography className={classes.secondaryHeading} align="left">
            Reserves: £{bankDisplay.assets.reserves}
          </Typography>
          <Typography className={classes.secondaryHeading} align="left">Loans:</Typography>
          {bankDisplay.assets.loans.map((loan, index) => {
            return (
              <div key={index}>
                <Typography align="left" className={classes.secondaryHeading} style={{marginLeft: "10px", fontStyle: "italic"}}>
                  Customer {loan.customerId}: £{loan.amount}
                </Typography>
              </div>
            );
          })}
          
        </Grid>
        <Grid item xs={6} style={{ padding: "5px" }}>
          <Typography className={classes.secondaryHeading} align="left">Deposits:</Typography>
          {bankDisplay.liabilities.deposits.map((deposit, index) => {
            return (
              <div key={index}>
                <Typography align="left" className={classes.secondaryHeading} style={{marginLeft: "10px", fontStyle: "italic"}}>
                  Customer {deposit.customerId}: £{deposit.amount}
                </Typography>
              </div>
            );
          })}
          
        </Grid>
        <Grid item xs={6} className={classes.secondaryHeading} style={{ padding: "5px" }}><Typography>
            Total: £{(loansTotal.amount + bankDisplay.assets.reserves).toFixed(2)}
          </Typography></Grid>
        <Grid item xs={6} className={classes.secondaryHeading} style={{ padding: "5px" }}><Typography>Total: £{(depositsTotal.amount).toFixed(2)}</Typography></Grid>
      </Grid>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}
