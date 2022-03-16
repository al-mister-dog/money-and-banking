import { useState } from "react";
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

export default function System({ bankOne, bankTwo, customerOne, customerTwo }) {
  const classes = useStyles();
  const [bankOneDisplay, setBankOneDisplay] = useState({
    assets: bankOne.assets,
    liabilities: bankOne.liabilities,
  });
  const [customerOneDisplay, setCustomerOneDisplay] = useState({
    deposits: customerOne.assets.deposits,
    cash: customerOne.cash,
  });
  const [bankTwoDisplay, setBankTwoDisplay] = useState({
    assets: bankTwo.assets,
    liabilities: bankTwo.liabilities,
  });
  const [customerTwoDisplay, setCustomerTwoDisplay] = useState({
    deposits: customerOne.assets.deposits,
    cash: customerOne.cash,
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
    setBankTwoDisplay({
      assets: bankTwo.assets,
      liabilities: bankTwo.liabilities,
    });
    setCustomerTwoDisplay({
      deposits: customerOne.deposits,
      cash: customerOne.cash,
    });
  }

  return (
    <>
      <Box className={classes.wrapper}>
        <Box className={classes.containerBank}>
          <Bank bank={bankOne} bankDisplay={bankOneDisplay} setAll={setAll}/>
          <Bank bank={bankTwo} bankDisplay={bankTwoDisplay} setAll={setAll}/>
        </Box>
        <Box className={classes.containerCustomer}>
          <Customer
            customerDisplay={customerOneDisplay}
            bankOne={bankOne}
            bankTwo={bankTwo}
            customerOne={customerOne}
            customerTwo={customerTwo}
            setAll={setAll}
          />
          <Customer
            customerDisplay={customerTwoDisplay}
            bankOne={bankTwo}
            bankTwo={bankOne}
            customerOne={customerTwo}
            customerTwo={customerOne}
            setAll={setAll}
          />
        </Box>
      </Box>
    </>
  );
}
