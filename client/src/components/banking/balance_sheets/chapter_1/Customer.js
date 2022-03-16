import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import CashDeposit from "../buttons/CashDeposit";
import CashWithdraw from "../buttons/CashWithdraw";

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
  setAll,
}) {
  const classes = useStyles();
  const [depositAmount, setDepositAmount] = useState(0);
  const [cashAmount, setCashAmount] = useState(0);

  function depositCash() {
    const amt = parseFloat(depositAmount);
    if (amt > customer.cash || amt < 1) {
      return;
    }
    
    customer.deposit(amt, customer);
    bank.receiveDeposit(amt, customer);
    setAll();
    setDepositAmount(0);
  }

  function withdrawCash() {
    const amt = parseFloat(cashAmount);
    if (amt > customer.deposits || amt < 1) {
      return;
    }
    customer.withdraw(amt, customer);
    bank.redeemDeposit(amt, customer);
    setAll();
    setCashAmount(0);
  }

  function onChangeDepositAmount(e) {
    setDepositAmount(e.target.value);
  }
  function onChangeCashAmount(e) {
    setCashAmount(e.target.value);
  }

  const depositInputError = depositAmount > customer.cash;
  const cashInputError = cashAmount > customer.deposits;
  
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
              Customer {customer.customerId}
            </Typography>
            <Typography
              className={classes.secondaryHeading}
              style={{ fontStyle: "italic" }}
              align="left"
            >
              Acc: Bank {bank.bankId}
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
        <CashDeposit
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
      </Accordion>
    </div>
  );
}
