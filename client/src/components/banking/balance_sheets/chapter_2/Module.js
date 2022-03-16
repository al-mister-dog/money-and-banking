import Bank from "../BankClass";
import Customer from "../CustomerClass";
import BankSystem from "./System";
import Chapter from "./Chapter";

const banks = {
  bankOne: new Bank({ loans: [], reserves: 0 }, { deposits: [] }, 1),
};
const customers = {
  customerOne: new Customer(0, 100, 1, 1),
  customerTwo: new Customer(0, 100, 2, 1),
};
const lookupBanks = {
  1: "bankOne",
};
const lookupCustomers = {
  1: "customerOne",
  2: "customerTwo",
};

const BankingHome = () => {
  return (
    <>
      <Chapter />
      <BankSystem
        banks={banks}
        customers={customers}
        bankOne={banks.bankOne}
        customerOne={customers.customerOne}
        customerTwo={customers.customerTwo}
        lookupBanks={lookupBanks}
        lookupCustomers={lookupCustomers}
      />
    </>
  );
};

export default BankingHome;
