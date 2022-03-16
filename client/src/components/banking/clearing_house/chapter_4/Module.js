import { clearingHouseSystem } from "../fixtures";
import BankSystem from "./System";
import Chapter from "./Chapter";
import { useState } from "react";
import { Button } from "@material-ui/core";

const BankingHome = () => {
  const [system, setSystem] = useState(clearingHouseSystem);

  const [clearingHouse, setClearingHouse] = useState(system.clearingHouse);
  const [nationalBank1, setNationalBank1] = useState(system.nationalBank1);
  const [nationalBank2, setNationalBank2] = useState(system.nationalBank2);
  const [nationalBank3, setNationalBank3] = useState(system.nationalBank3);
  const [nationalBank4, setNationalBank4] = useState(system.nationalBank4);

  const [bankOneDisplay, setBankOneDisplay] = useState({
    assets: nationalBank1.assets,
    liabilities: nationalBank1.liabilities,
  });
  const [bankTwoDisplay, setBankTwoDisplay] = useState({
    assets: nationalBank2.assets,
    liabilities: nationalBank2.liabilities,
  });
  const [bankThreeDisplay, setBankThreeDisplay] = useState({
    assets: nationalBank3.assets,
    liabilities: nationalBank3.liabilities,
  });
  const [bankFourDisplay, setBankFourDisplay] = useState({
    assets: nationalBank4.assets,
    liabilities: nationalBank4.liabilities,
  });
  const [clearingHouseDisplay, setClearingHouseDisplay] = useState({
    assets: clearingHouse.assets,
    liabilities: clearingHouse.liabilities,
  });

  function setAll() {
    setBankOneDisplay({
      assets: nationalBank1.assets,
      liabilities: nationalBank1.liabilities,
    });
    setBankTwoDisplay({
      assets: nationalBank2.assets,
      liabilities: nationalBank2.liabilities,
    });
    setBankThreeDisplay({
      assets: nationalBank3.assets,
      liabilities: nationalBank3.liabilities,
    });
    setBankFourDisplay({
      assets: nationalBank4.assets,
      liabilities: nationalBank4.liabilities,
    });
    setClearingHouseDisplay({
      assets: clearingHouse.assets,
      liabilities: clearingHouse.liabilities,
    });
  }

  function resetAll() {
    setSystem(clearingHouseSystem);
    setClearingHouse(system.clearingHouse);
    setNationalBank1(system.nationalBank1);
    setNationalBank2(system.nationalBank2);
    setNationalBank3(system.nationalBank3);
    setNationalBank4(system.nationalBank4);
    setAll();
  }

  return (
    <>
      <Chapter />
      <Button
        variant="outlined"
        color="primary"
        style={{ marginBottom: "5px" }}
        onClick={resetAll}
      >
        Reset
      </Button>
      <BankSystem
        bankOne={nationalBank1}
        bankTwo={nationalBank2}
        bankThree={nationalBank3}
        bankFour={nationalBank4}
        bankOneDisplay={bankOneDisplay}
        bankTwoDisplay={bankTwoDisplay}
        bankThreeDisplay={bankThreeDisplay}
        bankFourDisplay={bankFourDisplay}
        clearingHouseDisplay={clearingHouseDisplay}
        clearingHouse={clearingHouse}
        setAll={setAll}
      />
    </>
  );
};

export default BankingHome;
