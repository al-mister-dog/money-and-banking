// import { useState } from "react";
import { bankActions } from "../fixtures";
import AccountBalanceIcon from "@material-ui/icons/AccountBalance";
import {
  Button,
  makeStyles,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import { useState } from "react";

const useStyles = makeStyles(() => ({
  details: {
    alignItems: "center",
  },
}));

export default function NetAccounts({
  bankOne,
  bankTwo,
  bankThree,
  bankFour,
  clearingHouseDisplay,
  clearingHouse,
  setAll,
}) {
  const classes = useStyles();
  function clearAccounts() {
    const banks = {
      bankOne,
      bankTwo,
      bankThree,
      bankFour,
    };
    bankActions.clearAccounts(banks, clearingHouse);
    setAll();
  }

  return (
    <AccordionDetails className={classes.details}>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<AccountBalanceIcon />}
        onClick={clearAccounts}
        style={{ fontSize: "0.6rem" }}
      >
        Clear Accounts
      </Button>
    </AccordionDetails>
  );
}
