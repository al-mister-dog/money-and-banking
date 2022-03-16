import { clearingHouseSystem } from "../fixtures";
import BankSystem from "./System";
import Chapter from "./Chapter";
import { useState } from "react";
import { Button } from "@material-ui/core";

const BankingHome = () => {
  const [system, setSystem] = useState(clearingHouseSystem);
  

  const [bankDisplays, setBankDisplays] = useState({
    ...clearingHouseSystem.system.banks
  });
  const [customerDisplays, setCustomerDisplays] = useState({
    ...clearingHouseSystem.system.customers
  });
  const [clearingHouseDisplay, setClearingHouseDisplay] = useState({
    ...clearingHouseSystem.clearingHouse
  });
  const banks = {...clearingHouseSystem.system.banks}
  const customers = {...clearingHouseSystem.system.customers}
  const clearingHouse = {...clearingHouseSystem.clearingHouse}
  function setAll() {
    setBankDisplays({
      ...clearingHouseSystem.system.banks
    });
    setCustomerDisplays({
      ...clearingHouseSystem.system.customers
    });

    setClearingHouseDisplay({
      ...clearingHouseSystem.clearingHouse
    });
  }


  return (
    <>
      <Chapter />
      {/* <Button
        variant="outlined"
        color="primary"
        style={{ marginBottom: "5px" }}
        onClick={resetAll}
      >
        Reset
      </Button> */}
      <BankSystem
        banks={banks}
        customers={customers}
        clearingHouse={clearingHouse}
        bankDisplay={bankDisplays}
        customerDisplays={customerDisplays}
        clearingHouseDisplay={clearingHouseDisplay}
        setAll={setAll}
      />
    </>
  );
};

export default BankingHome;
