import { correspondentSystem } from "../fixtures";
import BankSystem from "./System";
import Chapter from "./Chapter";

const { customer1, customer2, nationalBank1, reserveBank1 } =
  correspondentSystem();

const BankingHome = () => {
  return (
    <>
      <Chapter />
      <BankSystem
        bankOne={nationalBank1}
        reserveBankOne={reserveBank1}
        customerOne={customer1}
        customerTwo={customer2}
      />
    </>
  );
};

export default BankingHome;
