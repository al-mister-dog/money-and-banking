import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import LoanGet from "./LoanGet";

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
    color: theme.palette.text.secondary,
    fontWeight: "bold",
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
  helper: {
    borderLeft: `2px solid ${theme.palette.divider}`,
    padding: theme.spacing(1, 2),
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function CustomerComponent({
  customerDisplay,
  bank,
  customer,
  lookupCustomers,
  transferDeposits,
  sufficientReserves,
  setAll,
}) {
  const classes = useStyles();
  const [loanAmount, setLoanAmount] = useState(0);
  const [loan, setLoan] = useState(0);
  const [getLoanDisabled, setGetLoanDisabled] = useState(false);

  function getLoan() {
    const amt = parseFloat(loanAmount);
    bank.makeLoan(amt, customer);
    customer.receiveLoan(amt);
    setAll();
    setLoan(amt);
    setGetLoanDisabled(true);
  }

  function onChangeLoanAmount(e) {
    setLoanAmount(e.target.value);
  }

  return (
    <div className={classes.root}>
      <Accordion>
        <AccordionSummary
          style={{ backgroundColor: "#FCE8E0" }}
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1c-content"
          id="panel1c-header"
        >
          <div className={classes.columnOne}>
            <Typography className={classes.heading} align="left">
              Customer {customer.id}
            </Typography>
            <Typography
              className={classes.secondaryHeading}
              style={{ fontStyle: "italic" }}
              align="left"
            >
              Acc: Bank {bank.id}
            </Typography>
          </div>
          <div className={classes.columnTwo}>
            <Typography className={classes.secondaryHeading} align="right">
              Balance: £{customer.deposits.toFixed(2)}
            </Typography>
            <Typography className={classes.secondaryHeading} align="right">
              Cash: £{customer.cash.toFixed(2)}
            </Typography>
          </div>
        </AccordionSummary>
        {/* <CashDeposit
          depositInputError={depositInputError}
          customerDisplay={customerDisplay}
          depositAmount={depositAmount}
          onChangeDepositAmount={onChangeDepositAmount}
          depositCash={depositCash}
        />
        <CashWithdraw
          cashInputError={cashInputError}
          customerDisplay={customerDisplay}
          cashAmount={cashAmount}
          onChangeCashAmount={onChangeCashAmount}
          withdrawCash={withdrawCash}
        />
        <Transfer
          lookupCustomers={lookupCustomers}
          customer={customer}
          transferInputError={transferInputError}
          customerDisplay={customerDisplay}
          transferAmount={transferAmount}
          onChangeTransferAmount={onChangeTransferAmount}
          setTransferAmount={setTransferAmount}
          transferDeposits={transferDeposits}
          toPayee={toPayee}
          setToPayee={setToPayee}
        /> */}
        <LoanGet
          loanAmount={loanAmount}
          onChangeLoanAmount={onChangeLoanAmount}
          getLoanDisabled={getLoanDisabled}
          getLoan={getLoan}
          setLoanAmount={setLoanAmount}
          sufficientReserves={sufficientReserves}
        />
        {/* <LoanRepay
          repayLoanDisabled={repayLoanDisabled}
          repayLoan={repayLoan}
        /> */}
      </Accordion>
    </div>
  );
}
