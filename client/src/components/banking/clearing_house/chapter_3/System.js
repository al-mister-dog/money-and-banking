import { useState } from "react";
import Customer from "./Customer";
import Bank from "./Bank";
import ReserveBank from "./ReserveBank";

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

export default function System({ bankOne, reserveBankOne, customerOne, customerTwo }) {
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
    assets: reserveBankOne.assets,
    liabilities: reserveBankOne.liabilities,
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
      assets: reserveBankOne.assets,
      liabilities: reserveBankOne.liabilities,
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
          <Bank bank={bankOne} bankTwo={reserveBankOne} bankDisplay={bankOneDisplay} setAll={setAll}/>
          <ReserveBank bankOne={reserveBankOne} bankTwo={bankOne} bankDisplay={bankTwoDisplay} setAll={setAll}/>
        </Box>
        <Box className={classes.containerCustomer}>
          <Customer
            customerDisplay={customerOneDisplay}
            bankOne={bankOne}
            bankTwo={reserveBankOne}
            customerOne={customerOne}
            customerTwo={customerTwo}
            setAll={setAll}
          />
          <Customer
            customerDisplay={customerTwoDisplay}
            bankOne={reserveBankOne}
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
