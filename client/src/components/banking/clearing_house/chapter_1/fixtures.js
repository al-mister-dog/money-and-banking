import { NationalBank, ReserveBank, Customer, ClearingHouse } from "./Objects"

const reserveBank1id = 934;
const nationalBank1id = 1;
const nationalBank2id = 2;
const nationalBank3id = 3;
const customer1id = 1;
const customer2id = 2;
const customer3id = 3;

const customerActions = {
  linkAccount(customer, bank, amount) {
    bank.createCustomerAccount(customer.id, amount);
    customer.openBankAccount(bank.id, amount);
    customer.cash = 100;
  },
  deposit(customer, bank, amount) {
    customer.depositCash(bank.id, amount);
    bank.customerDepositCash(customer.id, amount);
  },
  withdraw(customer, bank, amount) {
    customer.withdrawCash(bank.id, amount);
    bank.customerWithdrawCash(customer.id, amount);
  },
  getLoan(customer, bank, amount) {
    customer.addLoan(bank.id, amount);
    bank.customerAddLoan(customer.id, amount);
  },
  repayLoan(customer, bank, amount, paymentType) {
    customer.repayLoan(bank.id, amount, paymentType);
    bank.customerRepayLoan(customer.id, amount, paymentType);
  },
  interbankTransfer(c1, c2, b1, b2, amount) {
    b1.customerSendInterbankTransfer(c1.id, b2.id, amount);
    c1.sendTransfer(b1.id, amount);
    b2.customerReceiveInterbankTransfer(c2.id, b1.id, amount);
    c2.receiveTransfer(b2.id, amount);
  }
};

const bankActions = {
  linkAccount(b, rb, amount) {
    rb.createBankAccount(b.id, amount);
    b.openBankAccount(rb.id, amount);
  },
  deposit(b, rb, amount) {
    b.bankDepositReserves(rb.id, amount);
    rb.bankDepositReserves(b.id, amount);
    // b.bankDepositReserves(b.id, amount);
    // rb.bankDepositReserves(rb.id, amount);
  },
  withdraw(b, rb, amount) {
    b.bankWithdrawReserves(rb.id, amount);
    rb.bankWithdrawReserves(b.id, amount);
  },
  totalAccounts(b) {
    b.totalAccounts(b);
  },
  clearAccounts(banks, clearingHouse) {
    let payments = [];
    for (const bank in banks) {
      this.totalAccounts(banks[bank]);
      payments = [...payments, banks[bank].clearAccounts()];
    }
    clearingHouse.clearAccounts(payments);
  },
};

const bankSystem1 = () => {
  const reserveBank = new ReserveBank(null, null, null, reserveBank1id);
  const nationalBank = new NationalBank(null, null, null, nationalBank1id);
  nationalBank.assets.reserves = 100;
  bankActions.linkAccount(nationalBank, reserveBank, 500);
  return { reserveBank, nationalBank };
};
const bankSystem2 = () => {
  const reserveBank = new ReserveBank(null, null, null, reserveBank1id);
  const nationalBank = new NationalBank(null, null, null, nationalBank1id);
  nationalBank.assets.reserves = 100;
  return { reserveBank, nationalBank };
};
const customerSystem = () => {
  const nationalBank = new NationalBank(null, null, null, nationalBank1id);
  const customer = new Customer(null, null, null, customer1id);
  customer.cash = 500;
  customerActions.linkAccount(customer, nationalBank, 500);
  customer.cash = 500;
  return { nationalBank, customer };
};

const singleBankSystem = () => {
  const nationalBank1 = new NationalBank(null, null, null, nationalBank1id);
  const customer1 = new Customer(null, null, null, customer1id);
  const customer2 = new Customer(null, null, null, customer2id);
  nationalBank1.assets.reserves = 1000;
  customerActions.linkAccount(customer1, nationalBank1, 500);
  customerActions.linkAccount(customer2, nationalBank1, 500);
  return { nationalBank1, customer1, customer2 };
};
const multiBankSystem = () => {
  const nationalBank1 = new NationalBank(null, null, null, nationalBank1id);
  const nationalBank2 = new NationalBank(null, null, null, nationalBank2id);
  const nationalBank3 = new NationalBank(null, null, null, nationalBank3id);
  const customer1 = new Customer(null, null, null, customer1id);
  const customer2 = new Customer(null, null, null, customer2id);
  const customer3 = new Customer(null, null, null, customer3id);
  nationalBank1.assets.reserves = 1000;
  nationalBank2.assets.reserves = 1000;
  nationalBank3.assets.reserves = 1000;
  customerActions.linkAccount(customer1, nationalBank1, 500);
  customerActions.linkAccount(customer2, nationalBank2, 500);
  customerActions.linkAccount(customer3, nationalBank3, 500);
  return {
    nationalBank1,
    nationalBank2,
    nationalBank3,
    customer1,
    customer2,
    customer3,
  };
};
const clearingHouseSystem = () => {
  const nationalBank1 = new NationalBank(null, null, null, nationalBank1id);
  const nationalBank2 = new NationalBank(null, null, null, nationalBank2id);
  const nationalBank3 = new NationalBank(null, null, null, nationalBank3id);
  const customer1 = new Customer(null, null, null, customer1id);
  const customer2 = new Customer(null, null, null, customer2id);
  const customer3 = new Customer(null, null, null, customer3id);
  nationalBank1.assets.reserves = 1000;
  nationalBank2.assets.reserves = 1000;
  nationalBank3.assets.reserves = 1000;
  customerActions.linkAccount(customer1, nationalBank1, 500);
  customerActions.linkAccount(customer2, nationalBank2, 500);
  customerActions.linkAccount(customer3, nationalBank3, 500);
  const clearingHouse = new ClearingHouse();
  clearingHouse.members = [nationalBank1, nationalBank2, nationalBank3];

  const banks = {
    nationalBank1,
    nationalBank2,
    nationalBank3,
  };
  return {
    clearingHouse,
    nationalBank1,
    nationalBank2,
    nationalBank3,
    customer1,
    customer2,
    customer3,
    banks,
  };
};

export {
  customerActions, bankActions, bankSystem1, bankSystem2, customerSystem, singleBankSystem, multiBankSystem, clearingHouseSystem
}