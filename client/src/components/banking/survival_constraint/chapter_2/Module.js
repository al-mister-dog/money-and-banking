import Bank from "./bankClass";
import Customer from "./customerClass";
import BankSystem from "./System";
import Chapter from "./Chapter";
const banks = {
  bankOne: new Bank(
    { reserveDeposits: [{ id: 2, amount: 100 }], loans: [], reserves: 50 },
    {
      deposits: [
        {
          id: 1,
          amount: 50,
        },
        {
          id: 2,
          amount: 150,
        },
        {
          id: 3,
          amount: 100,
        },
      ],
    },
    1
  ),
  bankTwo: new Bank(
    {
      reserveDeposits: [{ id: "Central", amount: 1000 }],
      loans: [],
      reserves: 500,
    },
    {
      deposits: [
        {
          customerId: 1,
          amount: 100,
        },
      ],
    },
    2
  ),
};
const customers = {
  customerOne: new Customer(0, 100, 1, 1),
  customerTwo: new Customer(0, 100, 2, 1),
  customerThree: new Customer(0, 100, 3, 2),
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
        bankTwo={banks.bankTwo}
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
