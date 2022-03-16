import Bank from "../creditBank";
import Customer from "../customer";
import BankSystem from "./System";
import Chapter from "./Chapter";
const banks = {
  bankOne: new Bank(
    { overdrafts: [], loans: [], reserves: 100 },
    {
      deposits: [
        { customerId: 1, amount: 50 },
        { customerId: 2, amount: 50 },
        { customerId: 3, amount: 50 },
      ],
    },
    1
  ),
};
const customers = {
  customerOne: new Customer(50, 100, 1, 1),
  customerTwo: new Customer(50, 100, 2, 1),
  customerThree: new Customer(50, 100, 3, 1),
};
const lookupBanks = {
  1: "bankOne",
  2: "bankTwo",
};
const lookupCustomers = {
  1: "customerOne",
  2: "customerTwo",
  3: "customerThree",
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
        customerThree={customers.customerThree}
        lookupBanks={lookupBanks}
        lookupCustomers={lookupCustomers}
      />
    </>
  );
};

export default BankingHome;
