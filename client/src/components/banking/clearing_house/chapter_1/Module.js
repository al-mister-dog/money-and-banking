import { clearingHouseSystem } from "./fixtures";
import BankSystem from "./System";
import Chapter from "./Chapter";

const { customer1, customer2, nationalBank1, nationalBank2 } =
  clearingHouseSystem();

const BankingHome = () => {
  return (
    <>
      <Chapter />
      <BankSystem
        bankOne={nationalBank1}
        bankTwo={nationalBank2}
        customerOne={customer1}
        customerTwo={customer2}
      />
    </>
  );
};

export default BankingHome;
