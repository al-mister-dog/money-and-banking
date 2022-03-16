// import { useState } from "react";
import { bankActions } from "../fixtures";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
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

export default function NetAccounts({ bank, setAll }) {
  const classes = useStyles();
  function totalAccounts() {
    bank.totalEach();
    setAll();
  }

  return (
    <AccordionDetails className={classes.details}>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        startIcon={<AccountBalanceIcon />}
        onClick={totalAccounts}
        style={{fontSize: "0.6rem"}}
        >
      
        Total Accounts
      </Button>
    </AccordionDetails>
  );
}
