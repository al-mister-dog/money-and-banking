import { useEffect, useState } from "react";
import { customerActions } from "../fixtures";
import Bank from "./Bank";
import ClearingHouse from "./ClearingHouse";

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
  containerClearingHouse: {
    width: "100%",
  },
}));

export default function System({
  banks,
  customers,
  clearingHouse,
  bankDisplay,
  customerDisplays,
  clearingHouseDisplay,
  setAll,
}) {
  const classes = useStyles();


  return (
    <>
      <Box className={classes.containerClearingHouse}>
        <ClearingHouse
          banks={banks}
          clearingHouse={clearingHouse}
          clearingHouseDisplay={clearingHouseDisplay}
          setAll={setAll}
        />
      </Box>
      <Box className={classes.wrapper}>
        <Box className={classes.containerBank}>
          <Bank
            bankOne={bankOne}
            bankTwo={bankTwo}
            bankThree={bankThree}
            bankFour={bankFour}
            bankDisplay={bankOneDisplay}
            clearingHouse={clearingHouse}
            setAll={setAll}
          />
        </Box>
        {/* <Box className={classes.containerCustomer}> */}
        {/* <Customer
            customerDisplay={customerOneDisplay}
            bankOne={bankOne}
            bankTwo={bankTwo}
            bankThree={bankThree}
            bankFour={bankFour}
            customerOne={customerOne}
            customerTwo={customerTwo}
            customerThree={customerOne}
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
        </Box> */}
      </Box>
    </>
  );
}
