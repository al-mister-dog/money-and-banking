import { useState, useEffect } from "react";
import Customer from "./Customer";
import Bank from "./Bank";

import { Box, makeStyles } from "@material-ui/core";

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
  const [insolvent, setInsolvent] = useState(false)
  const [bankOneDisplay, setBankOneDisplay] = useState({
    assets: bankOne.assets,
    liabilities: bankOne.liabilities,
  });
  const [customerOneDisplay, setCustomerOneDisplay] = useState({
    deposits: customerOne.deposits,
    cash: customerOne.cash,
  });
  const [customerTwoDisplay, setCustomerTwoDisplay] = useState({
    deposits: customerTwo.deposits,
    cash: customerTwo.cash,
  });
  const [customerThreeDisplay, setCustomerThreeDisplay] = useState({
    deposits: customerThree.deposits,
    cash: customerThree.cash,
  });
  function setAll() {
    setBankOneDisplay({
      assets: bankOne.assets,
      liabilities: bankOne.liabilities,
    });
    setCustomerOneDisplay({
      deposits: customerOne.deposits,
      cash: customerOne.cash,
    });
    setCustomerTwoDisplay({
      deposits: customerTwo.deposits,
      cash: customerTwo.cash,
    });
    setCustomerThreeDisplay({
      deposits: customerThree.deposits,
      cash: customerThree.cash,
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
  useEffect(() => {
    if (bankOneDisplay.assets.reserves < 1) {
      setInsolvent(true)
    }
  }, [bankOneDisplay.assets.reserves])
  return (
    <>
      <Box className={classes.wrapper}>
        <Box className={classes.containerBank}>
          <Bank bank={bankOne} bankDisplay={bankOneDisplay} insolvent={insolvent}/>
          <Customer
            customerDisplay={customerOneDisplay}
            bank={bankOne}
            customer={customerOne}
            lookupCustomers={lookupCustomers}
            transferDeposits={transferDeposits}
            setAll={setAll}
            insolvent={insolvent}
          />
        </Box>
        <Box className={classes.containerCustomer}>

          <Customer
            customerDisplay={customerTwoDisplay}
            bank={bankOne}
            customer={customerTwo}
            lookupCustomers={lookupCustomers}
            transferDeposits={transferDeposits}
            setAll={setAll}
            insolvent={insolvent}
          />
          <Customer
            customerDisplay={customerThreeDisplay}
            bank={bankOne}
            customer={customerThree}
            lookupCustomers={lookupCustomers}
            transferDeposits={transferDeposits}
            setAll={setAll}
            insolvent={insolvent}
          />
        </Box>
      </Box>
    </>
  );
}
