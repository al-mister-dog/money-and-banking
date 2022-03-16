class Bank {
  constructor(assets, liabilities, records) {
    this.assets = assets;
    this.liabilities = liabilities;
    this.records = records;
  }
  interestRate(amount) {
    return amount / 10
  }
  createAccount(id, amount, account) {
    const { category, instrument } = account;
    const newAccount = {
      id,
      amount,
    };
    this[category][instrument] = [...this[category][instrument], newAccount];
  }
  findAccount(id, account) {
    const { category, instrument } = account;
    return this[category][instrument].find((acc) => acc.id === id);
  }
  findAccountIndex(id, acc) {
    const { category, instrument } = acc;
    let account = this[category][instrument].find((acc) => acc.id === id);
    const accountIndex = this[category][instrument].indexOf(account);
    return accountIndex;
  }
  deleteAccount(id, acc) {
    const { category, instrument } = acc;
    const accountIndex = this.findAccountIndex(id, acc);
    this[category][instrument].splice(accountIndex, 1);
  }

  add(id, num, acc) {
    const { category, instrument } = acc;
    const accountIndex = this.findAccountIndex(id, acc);
    this[category][instrument][accountIndex].amount =
      this[category][instrument][accountIndex].amount + num;
  }
  subtract(id, num, acc) {
    const { category, instrument } = acc;
    const accountIndex = this.findAccountIndex(id, acc);
    this[category][instrument][accountIndex].amount =
      this[category][instrument][accountIndex].amount - num;
  }

  addReserves(num) {
    this.assets.reserves += num;
  }
  minusReserves(num) {
    this.assets.reserves -= num;
  }

  increaseInstrument(id, num, acc1) {
    this.add(id, num, acc1);
  }
  decreaseInstrument(id, num, acc1, acc2, account) {
    const amountAfterAction = account.amount - num;
    if (amountAfterAction < 0) {
      this.deleteAccount(id, acc1);
      this.createAccount(id, 0, acc2);
      this.add(id, -amountAfterAction, acc2);
    } else {
      this.subtract(id, num, acc1);
    }
  }

  transactIn(id, amount, inst1, inst2) {
    let account = this.findAccount(id, this.financialInstruments()[inst1]);
    account
      ? this.increaseInstrument(id, amount, this.financialInstruments()[inst1])
      : this.decreaseInstrument(
          id,
          amount,
          this.financialInstruments()[inst2],
          this.financialInstruments()[inst1],
          this.findAccount(id, this.financialInstruments()[inst2])
        );
  }
  transactOut(id, amount, inst1, inst2) {
    let account = this.findAccount(id, this.financialInstruments()[inst1]);
    account
      ? this.decreaseInstrument(
          id,
          amount,
          this.financialInstruments()[inst1],
          this.financialInstruments()[inst2],
          account
        )
      : this.increaseInstrument(id, amount, this.financialInstruments()[inst2]);
  }

  totalAccounts() {
    this.liabilities.netTo = this.liabilities.dueTos.reduce(
      (acc, cur) => {
        return { amount: acc.amount + cur.amount };
      },
      { amount: 0 }
    ).amount;
    this.assets.netFrom = this.assets.dueFroms.reduce(
      (acc, cur) => {
        return { amount: acc.amount + cur.amount };
      },
      { amount: 0 }
    ).amount;
  }
  financialInstruments() {
    return {
      assetsDeposits: {
        category: "assets",
        instrument: "deposits",
      },
      liabilitiesDeposits: {
        category: "liabilities",
        instrument: "deposits",
      },
      assetsOverdrafts: {
        category: "assets",
        instrument: "overdrafts",
      },
      liabilitiesOverdrafts: {
        category: "liabilities",
        instrument: "overdrafts",
      },
      assetsReserveDeposits: {
        category: "assets",
        instrument: "reserveDeposits",
      },
      liabilitiesReserveDeposits: {
        category: "liabilities",
        instrument: "reserveDeposits",
      },
      assetsReserveOverdrafts: {
        category: "assets",
        instrument: "reserveOverdrafts",
      },
      liabilitiesReserveOverdrafts: {
        category: "liabilities",
        instrument: "reserveOverdrafts",
      },
      assetsLoans: {
        category: "assets",
        instrument: "loans",
      },
      liabilitiesLoans: {
        category: "liabilities",
        instrument: "loans",
      },
    };
  }
}

class ClearingHouse extends Bank {
  constructor(assets, liabilities, records, members, id) {
    super(assets, liabilities, records, members, id);
    this.assets = {
      reserves: 10000,
      receiveFrom: [],
    };
    this.liabilities = {
      payTo: [],
    };
    this.records = [];
    this.members = members;
    this.id = id;
  }
  clearAccounts(accounts) {
    accounts.forEach((account) => {
      if (account.action.hasOwnProperty("pay")) {
        this.assets.reserves += account.action.pay;
        this.records = [...this.records, account];
      } else if (account.action.hasOwnProperty("receive")) {
        this.assets.reserves -= account.action.receive;
        this.records = [...this.records, account];
      } else {
        this.records = [...this.records, account];
      }
    });
  }
}

class NationalBank extends Bank {
  constructor(assets, liabilities, records, id) {
    super(assets, liabilities, records);
    this.assets = {
      reserves: 0,
      reserveDeposits: [],
      loans: [],
      loanInterest: [],
      overdrafts: [],
      overdraftFees: [],
      dueFroms: [],
      netFrom: 0,
    };
    this.liabilities = {
      deposits: [],
      loans: [],
      loanInterest: [],
      reserveOverdrafts: [],
      dueTos: [],
      netTo: 0,
    };
    this.records = {
      loans: [],
      overdrafts: [],
    };
    this.id = id;
  }

  openBankAccount(id, amount) {
    this.createAccount(
      id,
      amount,
      this.financialInstruments().assetsReserveDeposits
    );
  }
  createCustomerAccount(id, amount) {
    this.createAccount(
      id,
      amount,
      this.financialInstruments().liabilitiesDeposits
    );
    this.addReserves(amount);
  }

  bankDepositReserves(id, amount) {
    this.transactIn(
      id,
      amount,
      "assetsReserveDeposits",
      "liabilitiesReserveOverdrafts"
    );
    this.assets.reserves -= amount;
  }
  bankWithdrawReserves(id, amount) {
    this.transactOut(
      id,
      amount,
      "assetsReserveDeposits",
      "liabilitiesReserveOverdrafts"
    );
    this.assets.reserves += amount;
  }
  customerDepositCash(id, amount) {
    this.transactIn(id, amount, "liabilitiesDeposits", "assetsOverdrafts");
    this.addReserves(amount);
  }
  customerWithdrawCash(id, amount) {
    this.transactOut(id, amount, "liabilitiesDeposits", "assetsOverdrafts");
    this.minusReserves(amount);
  }
  customerSendTransfer(id, amount) {
    this.transactOut(id, amount, "liabilitiesDeposits", "assetsOverdrafts");
  }
  customerReceiveTransfer(id, amount) {
    this.transactIn(id, amount, "liabilitiesDeposits", "assetsOverdrafts");
  }
  customerSendInterbankTransfer(customerId, bankId, amount) {
    this.transactOut(
      customerId,
      amount,
      "liabilitiesDeposits",
      "assetsOverdrafts"
    );
    this.createAccount(bankId, amount, {
      category: "liabilities",
      instrument: "dueTos",
    });
  }
  customerReceiveInterbankTransfer(customerId, bankId, amount) {
    this.transactIn(
      customerId,
      amount,
      "liabilitiesDeposits",
      "assetsOverdrafts"
    );
    this.createAccount(bankId, amount, {
      category: "assets",
      instrument: "dueFroms",
    });
  }
  customerAddLoan(id, amount) {
    let loanAccount = {
      category: "assets",
      instrument: "loans",
    };
    let loanRecords = {
      category: "records",
      instrument: "loans",
    };
    let foundAccount = this.assets.loans.find((acc) => acc.id === id);
    if (!foundAccount) {
      this.createAccount(id, amount, loanAccount);
      this.createAccount(id, amount, loanRecords);
      // this.add(id, amount, loanRecords);
      this.transactIn(id, amount, "liabilitiesDeposits", "assetsOverdrafts");
    } else {
      this.transactIn(id, amount, "liabilitiesDeposits", "assetsOverdrafts");
      this.add(id, amount, loanAccount);
    }
  }
  customerRepayLoan(id, amount, paymentType) {
    if (paymentType === "CARD") {
      this.transactOut(id, amount, "liabilitiesDeposits", "assetsOverdrafts");
      this.minusCustomerLoan(id, amount, paymentType);
    }
    if (paymentType === "CASH") {
      this.minusCustomerLoan(id, amount, paymentType);
      this.addReserves(amount);
    }
  }
  minusCustomerLoan(id, num, paymentType) {
    let foundAccount = this.assets.loans.find((acc) => acc.id === id);

    const loanAfterRepayment = foundAccount.amount - num;
    if (loanAfterRepayment === 0) {
      this.deleteAccount(id, {
        category: "assets",
        instrument: "loans",
      });
      let foundAccount = this.records.loans.find((acc) => acc.id === id);

      this.charge(id, foundAccount, paymentType);
    } else {
      foundAccount.amount -= num;
    }
  }
  eligibleToCharge(id, account, interest) {
    let customersAccount = this.findAccount(
      id,
      this.financialInstruments()["liabilitiesDeposits"]
    );
    if (customersAccount.amount > interest) {
      return true;
    } else {
      return false;
    }
  }
  charge(id, account, paymentType) {
    const interest = account.amount / 10;
    if (paymentType === "CARD") {
      const eligibleToCharge = this.eligibleToCharge(id, account, interest);
      if (eligibleToCharge) {
        this.transactOut(
          id,
          interest,
          "liabilitiesDeposits",
          "assetsOverdrafts"
        );
      }
    }
    if (paymentType === "CASH") {
      this.assets.reserves += interest;
    }
  }
  clearAccounts() {
    const netTo = this.liabilities.netTo;
    const netFrom = this.assets.netFrom;
    this.liabilities.netTo = 0;
    this.assets.netFrom = 0;
    this.assets.dueFroms = [];
    this.liabilities.dueTos = [];
    if (netTo === netFrom) {
      this.assets.reserves += 0;
      return { id: this.id, action: {} };
    }
    if (netTo > netFrom) {
      const amount = netTo - netFrom;
      this.assets.reserves -= amount;
      return { id: this.id, action: { pay: amount } };
    }
    if (netFrom > netTo) {
      const amount = netFrom - netTo;
      this.assets.reserves += amount;
      return { id: this.id, action: { receive: amount } };
    }
  }
}

class ReserveBank extends Bank {
  constructor(assets, liabilities, records, id) {
    super(assets, liabilities, records);
    this.assets = {
      reserves: 0,
      reserveOverdrafts: [],
      loans: [],
      loanInterest: [],
      overdrafts: [],
      overdraftFees: [],
    };
    this.liabilities = {
      reserveDeposits: [],
      loans: [],
      loanInterest: [],
    };
    this.records = {
      loans: [],
      overdrafts: [],
    };
    this.id = id;
  }

  createBankAccount(id, amount) {
    this.createAccount(
      id,
      amount,
      this.financialInstruments().liabilitiesReserveDeposits
    );
    this.addReserves(amount);
  }

  bankDepositReserves(id, amount) {
    this.transactIn(
      id,
      amount,
      "liabilitiesReserveDeposits",
      "assetsReserveOverdrafts"
    );
    this.addReserves(amount);
  }
  bankWithdrawReserves(id, amount) {
    this.transactOut(
      id,
      amount,
      "liabilitiesReserveDeposits",
      "assetsReserveOverdrafts"
    );
    this.minusReserves(amount);
  }
}

class Customer extends Bank {
  constructor(assets, liabilities, records, id) {
    super(assets, liabilities, records);
    this.assets = {
      deposits: [],
    };
    this.liabilities = {
      overdrafts: [],
      loans: [],
    };
    this.records = {
      loans: [],
      overdrafts: [],
    };
    this.id = id;
    this.cash = 0;
  }
  openBankAccount(id, amount) {
    this.createAccount(id, amount, this.financialInstruments().assetsDeposits);
  }
  depositCash(id, amount) {
    this.transactIn(id, amount, "assetsDeposits", "liabilitiesOverdrafts");
    this.cash -= amount;
  }
  withdrawCash(id, amount) {
    this.transactOut(id, amount, "assetsDeposits", "liabilitiesOverdrafts");
    this.cash += amount;
  }
  sendTransfer(id, amount) {
    this.transactOut(id, amount, "assetsDeposits", "liabilitiesOverdrafts");
  }
  receiveTransfer(id, amount) {
    this.transactIn(id, amount, "assetsDeposits", "liabilitiesOverdrafts");
  }
  addLoan(id, amount) {
    let loanAccount = {
      category: "liabilities",
      instrument: "loans",
    };
    let loanRecords = {
      category: "records",
      instrument: "loans",
    };
    let foundAccount = this.liabilities.loans.find((acc) => acc.id === id);
    if (!foundAccount) {
      this.createAccount(id, amount, loanAccount);
      this.createAccount(id, amount, loanRecords);
      this.transactIn(id, amount, "assetsDeposits", "liabilitiesOverdrafts");
    } else {
      this.transactIn(id, amount, "assetsDeposits", "liabilitiesOverdrafts");
    }
  }
  repayLoan(id, amount, paymentType) {
    if (paymentType === "CARD") {
      this.transactOut(id, amount, "assetsDeposits", "liabilitiesOverdrafts");
      this.minusCustomerLoan(id, amount, paymentType)
    }
    if (paymentType === "CASH") {
      this.minusCustomerLoan(id, amount, paymentType);
      this.cash -= amount;
    }
  }
  minusCustomerLoan(id, num, paymentType) {
    let foundAccount = this.liabilities.loans.find((acc) => acc.id === id);
    const loanAfterRepayment = foundAccount.amount - num;
    if (loanAfterRepayment === 0) {
      this.deleteAccount(id, {
        category: "liabilities",
        instrument: "loans",
      });
      let foundAccount = this.records.loans.find((acc) => acc.id === id);
      this.charge(id, foundAccount, paymentType);
    } else {
      foundAccount.amount -= num;
    }
  }
  eligibleToCharge(id, interest, paymentType) {
    let customersAccount = this.findAccount(
      id,
      this.financialInstruments()["assetsDeposits"]
    );
    if (customersAccount.amount > interest) {
      return true;
    } else {
      return false;
    }
  }
  charge(id, account, paymentType) {
    const interest = this.interestRate(account.amount);
    if (paymentType === "CARD") {
      const eligibleToCharge = this.eligibleToCharge(id, interest);
      if (eligibleToCharge) {
        this.transactOut(
          id,
          interest,
          "assetsDeposits",
          "liabilitiesOverdrafts"
        );
      }
      // this.deleteAccount(id, {category: "records", instrument: "loans"})
    }
    if (paymentType === "CASH") {

      this.assets.cash -= interest;
    }
  }
}



export { Bank, NationalBank, ReserveBank, Customer, ClearingHouse };
