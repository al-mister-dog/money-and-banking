import { NationalBank, ReserveBank, Customer, ClearingHouse } from "./Objects";

// const reserveBank1id = parseInt(Math.random() * 10000000);
// const nationalBank1id = parseInt(Math.random() * 10000000);
// const nationalBank2id = parseInt(Math.random() * 10000000);
// const nationalBank3id = parseInt(Math.random() * 10000000);
// const nationalBank4id = parseInt(Math.random() * 10000000);
// const customer1id = parseInt(Math.random() * 10000000);
// const customer2id = parseInt(Math.random() * 10000000);
// const customer3id = parseInt(Math.random() * 10000000);
// const customer4id = parseInt(Math.random() * 10000000);

const reserveBank1id = parseInt(Math.random() * 10000000);
const nationalBank1id = 1;
const nationalBank2id = 2;
const nationalBank3id = 3;
const nationalBank4id = 4;
const customer1id = 1;
const customer2id = 2;
const customer3id = 3;
const customer4id = 4;
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

const correspondentSystem = () => {
  const nationalBank1 = new NationalBank(null, null, null, nationalBank1id);
  const reserveBank1 = new ReserveBank(null, null, null, reserveBank1id);
  const customer1 = new Customer(null, null, null, customer1id);
  const customer2 = new Customer(null, null, null, customer2id);
  nationalBank1.assets.reserves = 1000;
  reserveBank1.assets.reserves = 1000;
  customerActions.linkAccount(customer1, nationalBank1, 500);
  customerActions.linkAccount(customer2, reserveBank1, 500);
  bankActions.linkAccount(nationalBank1, reserveBank1, 1000);
  return { nationalBank1, reserveBank1, customer1, customer2 };
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
  const nationalBank4 = new NationalBank(null, null, null, nationalBank4id);
  const customer1 = new Customer(null, null, null, customer1id);
  const customer2 = new Customer(null, null, null, customer2id);
  const customer3 = new Customer(null, null, null, customer3id);
  const customer4 = new Customer(null, null, null, customer4id);
  nationalBank1.assets.reserves = 1000;
  nationalBank2.assets.reserves = 1000;
  nationalBank3.assets.reserves = 1000;
  nationalBank4.assets.reserves = 1000;
  customerActions.linkAccount(customer1, nationalBank1, 500);
  customerActions.linkAccount(customer2, nationalBank2, 500);
  customerActions.linkAccount(customer3, nationalBank3, 500);
  customerActions.linkAccount(customer4, nationalBank4, 500);
  const banksArray = [
    nationalBank1,
    nationalBank2,
    nationalBank3,
    nationalBank4,
  ];
  const customersArray = [customer1, customer2, customer3, customer4];
  const random = (thisCustomer, thisBank) => {
    const randomIndex = Math.round(Math.random() * 2);
    const otherCustomers = customersArray.filter(
      (bank) => bank.id !== thisCustomer.id
    );
    const otherBanks = banksArray.filter((bank) => bank.id !== thisBank.id);
    const randomCustomer = otherCustomers[randomIndex];
    const randomBank = otherBanks[randomIndex];
    return { randomCustomer, randomBank };
  };

  for (let i = 0; i < 5; i++) {
    const getRandom1 = random(customer1, nationalBank1);
    const getRandom2 = random(customer2, nationalBank2);
    const getRandom3 = random(customer3, nationalBank3);
    const getRandom4 = random(customer4, nationalBank4);
    customerActions.interbankTransfer(
      customer1,
      getRandom1.randomCustomer,
      nationalBank1,
      getRandom1.randomBank,
      Math.round(Math.random() * 150) + 1
    );
    customerActions.interbankTransfer(
      customer2,
      getRandom2.randomCustomer,
      nationalBank2,
      getRandom2.randomBank,
      Math.round(Math.random() * 150) + 1
    );
    customerActions.interbankTransfer(
      customer3,
      getRandom3.randomCustomer,
      nationalBank3,
      getRandom3.randomBank,
      Math.round(Math.random() * 150) + 1
    );
    customerActions.interbankTransfer(
      customer4,
      getRandom4.randomCustomer,
      nationalBank4,
      getRandom4.randomBank,
      Math.round(Math.random() * 150) + 1
    );
  }

  const clearingHouse = new ClearingHouse();
  clearingHouse.members = [
    nationalBank1,
    nationalBank2,
    nationalBank3,
    nationalBank4,
  ];

  const banks = {
    nationalBank1,
    nationalBank2,
    nationalBank3,
    nationalBank4,
  };
  return {
    clearingHouse,
    nationalBank1,
    nationalBank2,
    nationalBank3,
    nationalBank4,
    customer1,
    customer2,
    customer3,
    customer4,
    banks,
  };
};

export {
  customerActions,
  bankActions,
  bankSystem1,
  bankSystem2,
  customerSystem,
  singleBankSystem,
  multiBankSystem,
  correspondentSystem,
  clearingHouseSystem,
};
