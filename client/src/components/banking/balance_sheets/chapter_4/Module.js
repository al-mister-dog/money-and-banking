import Bank from "../BankClass";
import Customer from "../CustomerClass";
import Chapter from "./Chapter";
import System from "./System";

const banks = {
  bankOne: new Bank({ loans: [], reserves: 0 }, { deposits: [] }, 1),
};
const customers = {
  customerOne: new Customer(0, 100, 1, 1),
};
const lookupBanks = {
  1: "bankOne",
};
const lookupCustomers = {
  1: "customerOne",
};

const BankingHome = () => {
  return (
    <>
    <Chapter />
    <System
      banks={banks}
      customers={customers}
      bankOne={banks.bankOne}
      customerOne={customers.customerOne}
      lookupBanks={lookupBanks}
      lookupCustomers={lookupCustomers}
    />
    </>
    
  );
};

export default BankingHome;
