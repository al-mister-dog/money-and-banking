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
  bankOne,
  bankTwo,
  bankThree,
  bankFour,
  bankOneDisplay,
  bankTwoDisplay,
  bankThreeDisplay,
  bankFourDisplay,
  clearingHouseDisplay,
  clearingHouse,
  setAll,
}) {
  const classes = useStyles();

  // const [bankOneDisplay, setBankOneDisplay] = useState({
  //   assets: bankOne.assets,
  //   liabilities: bankOne.liabilities,
  // });
  // const [bankTwoDisplay, setBankTwoDisplay] = useState({
  //   assets: bankTwo.assets,
  //   liabilities: bankTwo.liabilities,
  // });
  // const [bankThreeDisplay, setBankThreeDisplay] = useState({
  //   assets: bankThree.assets,
  //   liabilities: bankThree.liabilities,
  // });
  // const [bankFourDisplay, setBankFourDisplay] = useState({
  //   assets: bankFour.assets,
  //   liabilities: bankFour.liabilities,
  // });
  // const [clearingHouseDisplay, setClearingHouseDisplay] = useState({
  //   assets: clearingHouse.assets,
  //   liabilities: clearingHouse.liabilities,
  // });

  // function setAll() {
  //   setBankOneDisplay({
  //     assets: bankOne.assets,
  //     liabilities: bankOne.liabilities,
  //   });
  //   setBankTwoDisplay({
  //     assets: bankTwo.assets,
  //     liabilities: bankTwo.liabilities,
  //   });
  //   setBankThreeDisplay({
  //     assets: bankThree.assets,
  //     liabilities: bankThree.liabilities,
  //   });
  //   setBankFourDisplay({
  //     assets: bankFour.assets,
  //     liabilities: bankFour.liabilities,
  //   });
  //   setClearingHouseDisplay({
  //     assets: clearingHouse.assets,
  //     liabilities: clearingHouse.liabilities,
  //   });
  // }

  return (
    <>
      <Box className={classes.containerClearingHouse}>
        <ClearingHouse
          bankOne={bankOne}
          bankTwo={bankTwo}
          bankThree={bankThree}
          bankFour={bankFour}
          clearingHouseDisplay={clearingHouseDisplay}
          clearingHouse={clearingHouse}
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
          <Bank
            bankOne={bankTwo}
            bankTwo={bankThree}
            bankThree={bankFour}
            bankFour={bankOne}
            bankDisplay={bankTwoDisplay}
            clearingHouse={clearingHouse}
            setAll={setAll}
          />
        </Box>
        <Box className={classes.containerBank}>
          <Bank
            bankOne={bankThree}
            bankTwo={bankFour}
            bankThree={bankOne}
            bankFour={bankTwo}
            bankDisplay={bankThreeDisplay}
            clearingHouse={clearingHouse}
            setAll={setAll}
          />
          <Bank
            bankOne={bankFour}
            bankTwo={bankOne}
            bankThree={bankTwo}
            bankFour={bankThree}
            bankDisplay={bankFourDisplay}
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
