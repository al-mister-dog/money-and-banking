// import { useState } from "react";
import { bankActions } from "../fixtures";
import AccountBalanceIcon from '@material-ui/icons/AccountBalance';
import { IconButton } from "@material-ui/core";
import {
  Button,
  makeStyles,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import { useEffect, useState } from "react";

const useStyles = makeStyles(() => ({
  details: {
    alignItems: "center",
  },
}));

export default function DebitAccount({ bankOne, bankTwo, setAll }) {
  const classes = useStyles();
  function debitAccount() {
    bankActions.decreaseCorrespondingAccounts(bankTwo, bankOne)
    setAll();
  }
  const [isCreditor, setIsCreditor] = useState(true);

  function checkIsCreditor() {
    if (bankOne.liabilities.dueTos.length === 0 || bankOne.assets.dueFroms.length === 0) {
      return
    }
    const banksDueTo = [
      ...new Set(bankOne.liabilities.dueTos.map((dueTo) => dueTo.id)),
    ];
    const banksDueFrom = [
      ...new Set(bankOne.assets.dueFroms.map((dueFrom) => dueFrom.id)),
    ];

    let orderedDueTos = [];
    banksDueTo.forEach((b) => {
      const bankDueTo = bankOne.liabilities.dueTos.filter((c) => c.id === b);
      orderedDueTos = [...orderedDueTos, bankDueTo];
    });
    const newDueTos = orderedDueTos.map((bank) => {
      return {
        id: bank[0].id,
        amount: bank.reduce(
          (acc, cur) => {
            return { amount: acc.amount + cur.amount };
          },
          { amount: 0 }
        ).amount,
      };
    });
    let orderedDueFroms = [];
    banksDueFrom.forEach((b) => {
      const bankDueFrom = bankOne.assets.dueFroms.filter((c) => c.id === b);
      orderedDueFroms = [...orderedDueFroms, bankDueFrom];
    });
    const newDueFroms = orderedDueFroms.map((bank) => {
      return {
        id: bank[0].id,
        amount: bank.reduce(
          (acc, cur) => {
            return { amount: acc.amount + cur.amount };
          },
          { amount: 0 }
        ).amount,
      };
    });

    if (newDueTos[0].amount > newDueFroms[0].amount) {
      setIsCreditor(true)
    }
    if (newDueFroms[0].amount > newDueTos[0].amount) {
      setIsCreditor(false)
    }
    if (newDueFroms[0].amount === newDueTos[0].amount) {
      setIsCreditor(true)
    }
  }

  useEffect(() => {
    checkIsCreditor()
  }, [bankOne.assets.dueFroms, bankOne.liabilities.dueTos])

  return (
    <AccordionDetails className={classes.details}>
      <Button
        variant="contained"
        color="secondary"
        size="small"
        style={{fontSize: "0.6rem"}}
        disabled={isCreditor}
        startIcon={<AccountBalanceIcon />}
        onClick={debitAccount}
      >
        Debit Account
      </Button>
    </AccordionDetails>
  );
}
