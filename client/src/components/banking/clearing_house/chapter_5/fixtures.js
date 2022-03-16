import { NationalBank, Customer, ClearingHouse } from "./Objects";

const customerActions = {
  linkAccount(customer, bank, amount) {
    bank.createCustomerAccount(customer.id, amount);
    customer.openBankAccount(bank.id, amount);
    customer.bankId = bank.id;
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
  },
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
  increaseCorrespondingAccounts(bank1, bank2) {
    bank1.netEach();
    bank2.netEach();
    const amount = bank1.assets.dueFroms.find(
      (acc) => acc.id === bank2.id
    ).amount;
    bank1.increaseAssetsDeposits(bank2.id, amount);
    bank2.increaseLiabilitiesDeposits(bank1.id, amount);
  },
  decreaseCorrespondingAccounts(bank1, bank2) {
    bank1.netEach();
    bank2.netEach();

    const bank1Account = bank1.assets.dueFroms.find(
      (acc) => acc.id === bank2.id
    );
    const bank2Account = bank2.assets.dueFroms.find(
      (acc) => acc.id === bank1.id
    );

    if (bank1Account) {
      bank2.decreaseAssetsDeposits(bank1.id, bank1Account.amount);
      bank1.decreaseLiabilitiesDeposits(bank2.id, bank1Account.amount);
    }
    if (bank2Account) {
      bank1.decreaseAssetsDeposits(bank2.id, bank2Account.amount);
      bank2.decreaseLiabilitiesDeposits(bank1.id, bank2Account.amount);
    }
  },
  totalAccounts(b) {
    b.totalAccounts(b);
  },
  clearAccounts(banks, clearingHouse) {
    let payments = [];
    for (const bank in banks) {
      payments = [...payments, banks[bank].clearAccounts()];
    }
    clearingHouse.clearAccounts();
  },
};

const clearingHouseSystem = (num) => {
  const system = {
    banks: {},
    customers: {},
  };
  for (let i = 0; i < num; i++) {
    system.banks[`bank${i}`] = new NationalBank(
      null,
      null,
      null,
      parseInt(Math.random() * 10000000)
    );
    system.customers[`customer${i}`] = new Customer(
      null,
      null,
      null,
      parseInt(Math.random() * 10000000)
    );
    system.customers[`customer${i}${i}`] = new Customer(
      null,
      null,
      null,
      parseInt(Math.random() * 10000000)
    );
    system.banks[`bank${i}`].assets.reserves = 1000;
    customerActions.linkAccount(
      system.customers[`customer${i}`],
      system.banks[`bank${i}`],
      500
    );
    customerActions.linkAccount(
      system.customers[`customer${i}${i}`],
      system.banks[`bank${i}`],
      500
    );
  }

  const clearingHouse = new ClearingHouse();
  clearingHouse.members = [];
  for (const bank in system.banks) {
    clearingHouse.members = [...clearingHouse.members, system.banks[bank]];
  }

  return {
    clearingHouse,
    system,
  };
};

const chs = clearingHouseSystem(10);
export default chs