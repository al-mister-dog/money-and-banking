import { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { customerActions } from "./fixtures";
import Transfer from "./Transfer";

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
  bankOne,
  bankTwo,
  customerOne,
  customerTwo,
  setAll,
}) {
  const classes = useStyles();
  const [depositAmount, setDepositAmount] = useState(0);
  const [transferAmount, setTransferAmount] = useState(0);
  const [toPayee, setToPayee] = useState("");
  const balance = customerOne.assets.deposits[0].amount;

  function onChangeTransferAmount(e) {
    setTransferAmount(e.target.value);
  }

  const depositInputError = depositAmount > customerOne.cash || depositAmount > customerOne.assets.deposits[0].amount;
  const transferInputError =
    transferAmount > customerOne.assets.deposits[0].amount;

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
              Customer {customerOne.id}
            </Typography>
            <Typography
              className={classes.secondaryHeading}
              style={{ fontStyle: "italic" }}
              align="left"
            >
              Acc: Bank {bankOne.id}
            </Typography>
          </div>
          <div className={classes.columnTwo}>
            <Typography className={classes.secondaryHeading} align="right">
              Balance: £{customerOne.assets.deposits[0].amount}
            </Typography>
            <Typography className={classes.secondaryHeading} align="right">
              Cash: £{customerOne.cash.toFixed(2)}
            </Typography>
          </div>
        </AccordionSummary>
        <Transfer
          customerOne={customerOne}
          customerTwo={customerTwo}
          bankOne={bankOne}
          bankTwo={bankTwo}
          depositInputError={depositInputError}
          transferInputError={transferInputError}
          customerDisplay={customerDisplay}
          transferAmount={transferAmount}
          onChangeTransferAmount={onChangeTransferAmount}
          setTransferAmount={setTransferAmount}
          toPayee={toPayee}
          setAll={setAll}
        />
      </Accordion>
    </div>
  );
}
