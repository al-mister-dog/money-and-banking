import { useState, useEffect } from "react";
import Customer from "./Customer";
import NationalBank from "./NationalBank";
import ReserveBank from "./ReserveBank";

import { Box, Typography, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  wrapper: {
    display: "flex",
    justifyContent: "space-evenly",
    width: "55vw",
    margin: "auto",

    "@media (max-width: 620px)": {
      flexDirection: "column",
      width: "100vw",
    },
  },
  containerBank: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "@media (max-width: 620px)": {
      width: "100%",
      margin: "auto",
    },
  },
  containerCustomer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",

    "@media (max-width: 620px)": {
      width: "100%",
      margin: "auto",
    },
  },
}));

export default function System({
  banks,
  customers,
  bankOne,
  bankTwo,
  customerOne,
  customerTwo,
  customerThree,
  lookupBanks,
  lookupCustomers,
}) {
  const classes = useStyles();
  const [message, setMessage] = useState("");
  const [sufficientReserves, setSufficientReserves] = useState(false);
  const [bankOneDisplay, setBankOneDisplay] = useState({
    assets: bankOne.assets,
    liabilities: bankOne.liabilities,
  });
  const [bankTwoDisplay, setBankTwoDisplay] = useState({
    assets: bankTwo.assets,
    liabilities: bankTwo.liabilities,
  });
  const [customerOneDisplay, setCustomerOneDisplay] = useState({
    deposits: customerOne.deposits,
    cash: customerOne.cash,
  });

  function setAll() {
    setBankOneDisplay({
      assets: bankOne.assets,
      liabilities: bankOne.liabilities,
    });
    setBankTwoDisplay({
      assets: bankTwo.assets,
      liabilities: bankTwo.liabilities,
    });
    setCustomerOneDisplay({
      deposits: customerOne.deposits,
      cash: customerOne.cash,
    });
  }
  function transferDeposits(c1, c2, amt) {
    const amount = parseInt(amt);
    const customerOne = customers[lookupCustomers[c1]];
    const customerTwo = customers[lookupCustomers[c2]];
    const bankOne = banks[lookupBanks[customers[lookupCustomers[c1]].bankId]];
    const bankTwo = banks[lookupBanks[customers[lookupCustomers[c2]].bankId]];
    customerOne.makeTransfer(amount);
    customerTwo.receiveTransfer(amount);
    bankOne.makeTransfer(amount, customerOne);
    bankTwo.receiveTransfer(amount, customerTwo);
    setAll();
  }
  function withdrawCash(num) {
    const amount = parseInt(num);
    bankOne.receiveDepositBank(amount, bankTwo);
    bankTwo.redeemDepositBank(amount, bankOne);
    setAll();
  }
  const reserveRequirement = () => {
    const reserves = bankOne.assets.reserves;
    const totalLiabilities = bankOne.liabilities.deposits.reduce(
      (x, y) => {
        return { amount: x.amount + y.amount };
      },
      { amount: 0 }
    );
    if (reserves <= totalLiabilities.amount / 4) {
      setMessage(
        "ANNOUNCEMENT: Bank does not have sufficient reserve requirements to offer loans!"
      );
      setSufficientReserves(false);
    } else {
      setMessage("ANNOUNCEMENT: Bank has sufficient reserve requirements to offer loans again!");
      setSufficientReserves(true);
    }
  };
  useEffect(() => {
    reserveRequirement();
  }, [bankOneDisplay]);
  return (
    <>
      <Typography>{message}</Typography>
      <Box className={classes.wrapper}>
        <Box className={classes.containerBank}>
          <NationalBank
            bank={bankOne}
            bankDisplay={bankOneDisplay}
            withdrawCash={withdrawCash}
          />
          <ReserveBank bank={bankTwo} bankDisplay={bankTwoDisplay} />
        </Box>
        <Box className={classes.containerCustomer}>
          <Customer
            customerDisplay={customerOneDisplay}
            bank={bankOne}
            customer={customerOne}
            lookupCustomers={lookupCustomers}
            transferDeposits={transferDeposits}
            sufficientReserves={sufficientReserves}
            setAll={setAll}
          />
        </Box>
      </Box>
    </>
  );
}
