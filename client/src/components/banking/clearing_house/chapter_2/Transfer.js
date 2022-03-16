import { useState } from "react";
import { customerActions } from "./fixtures";
import {
  TextField,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
  Tooltip,
  AccordionDetails,
} from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(() => ({
  details: {
    alignItems: "center",
  },
}));

export default function Transfer({
  customerOne,
  customerTwo,
  bankOne,
  bankTwo,
  transferAmount,
  onChangeTransferAmount,
  setTransferAmount,
  depositInputError,
  transferInputError,
  transferDeposits,
  toPayee,
  setToPayee,
  setAll
}) {
  const classes = useStyles();
  

  function makeTransfer() {
    const amount = parseInt(transferAmount);
    customerActions.interbankTransfer(customerOne, customerTwo, bankOne, bankTwo, amount)
    setAll()
  }


  return (
    <AccordionDetails className={classes.details}>
      <TextField
        type="number"
        label={`Transfer Deposits`}
        error={transferInputError || depositInputError ? true : false}
        inputProps={{
          min: 0,
          // max: customerDisplay.deposits,
        }}
        value={transferAmount}
        onChange={onChangeTransferAmount}
      />
      <IconButton
        onClick={() => {
          makeTransfer(transferAmount);
          setTransferAmount(0);
        }}
        disabled={transferInputError || depositInputError || transferAmount <= 0 ? true : false}
      >
        <Tooltip title="TRANSFER">
          <PaymentIcon />
        </Tooltip>
      </IconButton>
    </AccordionDetails>
  );
}
