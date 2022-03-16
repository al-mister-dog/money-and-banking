class Customer {
  constructor(deposits, cash, id, bankId) {
    this.deposits = deposits;
    this.cash = cash;
    this.id = id;
    this.bankId = bankId;
  }
  incurFee(num) {
    this.deposits = this.deposits - num;
  }
  _customerWithdrawCash(num) {}
  spend(num) {
    this.cash -= num;
  }
  deposit(num) {
    this.cash = this.cash - num;
    this.deposits = this.deposits + num;
  }
  withdraw(num) {
    this.cash = this.cash + num;
    this.deposits = this.deposits - num;
  }
  sendTransfer(num) {
    this.deposits -= num;
  }
  receiveTransfer(num) {
    this.deposits += num;
  }
  receiveLoan(num) {
    this.deposits = this.deposits + num;
  }
  repayLoan(num, paymentType) {
    if (paymentType === "CARD") {
      this.deposits = this.deposits - num;
    }
    if (paymentType === "CASH") {
      this.cash = this.cash - num;
    }
  }
}
/**
 * Assets and Liabilities have instruments
 * assets.instrument {id: holder of instrument, amount: amount of this instrument}
 * liabilities.instrument {id: holder of instrument, amount: amount of this instrument}
 *
 * each instance of an instrument can be added to or subtracted from.
 * once instrument reaches zero the instance is deleted.
 *
 * certain instances will carry charges, such as a fee or interest payment
 *
 */

//EACH NATIONAL BANK WILL HAVE THE FOLLOWING ASSETS AND LIABILITIES

class Bank {
  constructor(assets, liabilities) {
    this.assets = assets;
    this.liabilities = liabilities;
  }
  _addReserves(num) {
    this.assets.reserves += num;
  }
  _minusReserves(num) {
    this.assets.reserves -= num;
  }
  _createAccount(id, acc) {
    const { category, instrument } = acc;
    const newAccount = {
      id,
      amount: 0,
    };
    this[category][instrument] = [...this[category][instrument], newAccount];
  }
  _findAccountIndex(id, acc) {
    const { category, instrument } = acc;
    let account = this[category][instrument].find((acc) => acc.id === id);
    const accountIndex = this[category][instrument].indexOf(account);
    return accountIndex;
  }
  _deleteAccount(id, acc) {
    const { category, instrument } = acc;
    const accountIndex = this._findAccountIndex(id, acc);
    this[category][instrument].splice(accountIndex, 1);
  }
  _add(id, num, acc) {
    const { category, instrument } = acc;
    const accountIndex = this._findAccountIndex(id, acc);
    this[category][instrument][accountIndex].amount =
      this[category][instrument][accountIndex].amount + num;
  }
  _minus(id, num, acc) {
    const { category, instrument } = acc;
    const accountIndex = this._findAccountIndex(id, acc);
    this[category][instrument][accountIndex].amount =
      this[category][instrument][accountIndex].amount - num;
  }
}

class NationalBank extends Bank {
  constructor(assets, liabilities, id) {
    super(assets, liabilities);
    this.assets = {
      reserves: 0,
      reserveDeposits: 0,
      loans: [],
      loanInterest: [],
      overdrafts: [],
      overdraftFees: [],
    };
    this.liabilities = {
      deposits: [],
      loans: [],
      loanInterest: [],
    };
    this.id = id;
  }
  createCustomerAccount(id, amount) {
    const newCustomer = {
      id,
      amount,
    };
    this._addReserves(amount);
    this.liabilities.deposits = [...this.liabilities.deposits, newCustomer];
  }

  accountAdd(id, num, acc1, acc2, account) {
    account
      ? this._add(id, num, acc1)
      : this.reduceAccount(id, num, acc2, acc1, account.amount - num);
  }
  accountMinus(id, num, acc1, acc2, account) {
    account
      ? this.reduceAccount(id, num, acc1, acc2, account.amount - num)
      : this._add(id, num, acc2);
  }

  reduceAccount(id, num, acc1, acc2, balanceAfterWithdrawal) {
    if (balanceAfterWithdrawal < 0) {
      this._deleteAccount(id, acc1);
      this._createAccount(id, acc2);
      this._add(id, -balanceAfterWithdrawal, acc2);
    } else {
      this._minus(id, num, acc1);
    }
  }

  customerDepositCash(id, num) {
    this.customerAdd(id, num);
    this._addReserves(num);
  }
  customerWithdrawCash(id, num) {
    this.customerMinus(id, num);
    this._minusReserves(num);
  }
  customerReceiveTransfer(id, num) {
    this.customerAdd(id, num);
  }
  customerSendTransfer(id, num) {
    this.customerMinus(id, num);
  }
  customerRepayLoan(id, num, paymentType) {
    if (paymentType === "CARD") {
      this.minusCustomerLoan(id, num);
      this.customerMinus(id, num);
    }
    if (paymentType === "CASH") {
      this.minusCustomerLoan(id, num);
      this._addReserves(num);
    }
  }
  addCustomerLoan(id, num) {
    let loanAccount = {
      category: "assets",
      instrument: "loans",
    };
    let foundAccount = this.assets.loans.find((acc) => acc.id === id);
    if (!foundAccount) {
      this._createAccount(id, loanAccount);
    }
    this.customerAdd(id, num);
    this._add(id, num, loanAccount);
  }
  minusCustomerLoan(id, num) {
    let foundAccount = this.assets.loans.find((acc) => acc.id === id);
    const loanAfterRepayment = foundAccount.amount - num;
    if (loanAfterRepayment === 0) {
      this._deleteAccount(id, {
        category: "assets",
        instrument: "loans",
      });
    } else {
      foundAccount.amount -= num;
    }
  }

  depositAccount(id) {
    return this.liabilities.deposits.find((acc) => acc.id === id);
  }
  overdraftAccount(id) {
    return this.assets.overdrafts.find((acc) => acc.id === id);
  }

  customerAdd(id, num) {
    const depositAccount = this.depositAccount(id);
    const depositKeys = {
      category: "liabilities",
      instrument: "deposits",
    };
    const overdraftKeys = { category: "assets", instrument: "overdrafts" };
    this.accountAdd(id, num, depositKeys, overdraftKeys, depositAccount);
  }
  customerMinus(id, num) {
    const depositAccount = this.depositAccount(id);
    const depositKeys = {
      category: "liabilities",
      instrument: "deposits",
    };
    const overdraftKeys = { category: "assets", instrument: "overdrafts" };
    this.accountMinus(id, num, depositKeys, overdraftKeys, depositAccount);
  }

  // sellLoan(num) {
  //   this.liabilities = this.liabilities - num;
  // }
  // callLoan(num, interest, customer, paymentType) {
  //   if (paymentType === "CARD") {
  //     this._retrieveLoanByDeposit(customer);
  //     this._minusDeposit(num, customer);
  //   }
  //   if (paymentType === "CASH") {
  //     this._retrieveLoanByCash(customer, num);
  //     this._addReserves(num);
  //   }
  // }
  depositReserves(num) {
    this.assets.reserveDeposits += num;
    this.assets.reserves -= num;
  }
  withdrawReserves(num) {
    this.assets.reserves += num; 
    this.assets.reserveDeposits -= num;
  }
  receiveBankLoan(id, num) {
    this.assets.reserves += num;
    this.liabilities.loans = [...this.liabilities.loans, {id, amount: num}]
  }
}

class ReserveBank extends NationalBank {
  //may extend national bank
  constructor(assets, liabilities, id) {
    super(assets, liabilities);
    this.assets = {
      reserves: 0,
      reserveDeposits: [],
      bankLoans: [],
      bankLoanInterest: [],
      daylightOverdrafts: [],
    };
    this.liabilities = {
      reserveDeposits: [],
      loans: [],
      loanInterest: [],
    };
    this.id = id;
  }
  createNationalBankAccount(id, amount) {
    const newNationalBank = {
      id,
      amount,
    };
    this._addReserves(amount);
    this.liabilities.reserveDeposits = [
      ...this.liabilities.reserveDeposits,
      newNationalBank,
    ];
  }
  addReserveDeposit(id, account, num) {
    this._add(id, account, num);
  }
  minusReserveDeposit(id, account, num) {
    this._minus(id, account, num);
  }
  bankDepositReserves(id, num) {
    this.bankAdd(id, num);
    this._addReserves(num);
  }
  bankWithdrawReserves(id, num) {
    this.bankMinus(id, num);
    this._minusReserves(num);
  }
  reserveAccount(id) {
    return this.liabilities.reserveDeposits.find((acc) => acc.id === id);
  }
  daylightOverdraftAccount(id) {
    return this.assets.daylightOverdrafts.find((acc) => acc.id === id);
  }
  bankAdd(id, num) {
    const depositAccount = this.reserveAccount(id);
    const depositKeys = {
      category: "liabilities",
      instrument: "reserveDeposits",
    };
    const overdraftKeys = { category: "assets", instrument: "daylightOverdrafts" };
    this.accountAdd(id, num, depositKeys, overdraftKeys, depositAccount);
  }
  bankMinus(id, num) {
    const depositAccount = this.reserveAccount(id);
    const depositKeys = {
      category: "liabilities",
      instrument: "reserveDeposits",
    };
    const overdraftKeys = { category: "assets", instrument: "daylightOverdrafts" };
    this.accountMinus(id, num, depositKeys, overdraftKeys, depositAccount);
  }

  bankRepayLoan(id, num, paymentType) {
    // if (paymentType === "CARD") {
    //   this.minusCustomerLoan(id, num);
    //   this.customerMinus(id, num);
    // }
    // if (paymentType === "CASH") {
      this.minusBankLoan(id, num);
      this._addReserves(num);
    // }
  }
  addBankLoan(id, num) {
    let bankLoanAccount = {
      category: "assets",
      instrument: "bankLoans",
    };
    let foundAccount = this.assets.bankLoans.find((acc) => acc.id === id);
    if (!foundAccount) {
      this._createAccount(id, bankLoanAccount);
    }
    this.bankAdd(id, num);
    this._add(id, num, bankLoanAccount);
  }
  minusBankLoan(id, num) {
    let foundAccount = this.assets.bankLoans.find((acc) => acc.id === id);
    const loanAfterRepayment = foundAccount.amount - num;
    if (loanAfterRepayment === 0) {
      this._deleteAccount(id, {
        category: "assets",
        instrument: "bankLoans",
      });
    } else {
      foundAccount.amount -= num;
    }
  }
}



//SYSTEM FUNCTIONS (OUTSIDE INDIVIDUAL BANKS)
const customerActions = {
  depositCash(customer, bank, num) {
    const id = customer.id;
    bank.customerDepositCash(id, num);
    customer.deposit(num);
  },
  withdrawCash(customer, bank, num) {
    const id = customer.id;
    bank.customerWithdrawCash(id, num);
    customer.withdraw(num);
  },
  bankTransfer(c1, c2, b1, num) {
    const id1 = c1.id;
    const id2 = c2.id;
    b1.customerSendTransfer(id1, num);
    c1.sendTransfer(num);
    b1.customerReceiveTransfer(id2, num);
    c2.receiveTransfer(num);
  },
  interbankTransfer(c1, c2, b1, b2, num) {
    const id1 = c1.id;
    const id2 = c2.id;
    b1.customerSendTransfer(id1, num);
    c1.sendTransfer(num);
    b2.customerReceiveTransfer(id2, num);
    c2.receiveTransfer(num);
  },
  getLoan(customer, bank, num) {
    const id = customer.id;
    bank.addCustomerLoan(id, num);
    customer.receiveLoan(num);
  },
  repayLoan(customer, bank, num, paymentType) {
    const id = customer.id;
    bank.customerRepayLoan(id, num, paymentType);
    customer.repayLoan(num, paymentType);
  },
  chargeFee(customer, num) {
    customer.incurFee(num);
  },
};



const bankActions = {
  linkBanks(b, rb, num) {
    rb.createNationalBankAccount(b.id, num);
    b.depositReserves(num);
  },
  depositReserves(b, rb, num) {
    const id = b.id;
    rb.bankDepositReserves(id, num);
    b.depositReserves(num);
  },
  withdrawReserves(b, rb, num) {
    const id = b.id;
    rb.bankWithdrawReserves(id, num);
    b.withdrawReserves(num);
  },
  getLoan(b, rb, num) {
    const id = b.id;
    const rbId = rb.id
    rb.addBankLoan(id, num);
    b.receiveBankLoan(rbId, num);
  },
  repayLoan(b, rb, num, paymentType) {
    const id = b.id;
    rb.bankRepayLoan(id, num, paymentType);
    b.repayBankLoan(num, paymentType);
  },
};
const bid1 = Date.now()
const bid2 = Date.now()
const bid3 = Date.now()
const cid1 = Date.now()
const cid2 = Date.now()
const cid3 = Date.now()

//CREATE BANKS
const nationalBankOne = new NationalBank(null, null, bid1);
const nationalBankTwo = new NationalBank(null, null, bid2);
const reserveBankOne = new ReserveBank(null, null, bid3);

//INITIALISE RESERVES
reserveBankOne.assets.reserves = 1000
nationalBankOne.assets.reserves = 200
//CREATE CUSTOMER AND ADD ACCOUNT
const customerOne = new Customer(50, 50, cid1, bid1);
nationalBankOne.createCustomerAccount(customerOne.id, customerOne.deposits);
const customerTwo = new Customer(50, 50, cid2, bid2);
nationalBankOne.createCustomerAccount(customerTwo.id, customerTwo.deposits);
const customerThree = new Customer(50, 50, cid3, bid2);
nationalBankTwo.createCustomerAccount(customerThree.id, customerThree.deposits);

//EXAMPLES AND ACTIONS
// console.log(nationalBankOne.assets)
// console.log(nationalBankOne.liabilities)
// console.log(reserveBankOne.assets)
// console.log(reserveBankOne.liabilities)
// bankActions.linkBanks(nationalBankOne, reserveBankOne, 100)
// console.log(nationalBankOne.assets)
// console.log(nationalBankOne.liabilities)
// console.log(reserveBankOne.assets)
// console.log(reserveBankOne.liabilities)
// console.log(nationalBankOne.assets)
// bankActions.depositReserves(nationalBankOne, reserveBankOne, 50)
// console.log(nationalBankOne.assets)
// console.log(reserveBankOne.liabilities)

// console.log(nationalBankOne.assets)
// console.log(reserveBankOne.assets)
// bankActions.getLoan(nationalBankOne, reserveBankOne, 50)
// console.log(nationalBankOne.assets)
// console.log(nationalBankOne.liabilities)
// console.log(reserveBankOne.assets)
// console.log(reserveBankOne.liabilities)
// bankActions.withdrawReserves(nationalBankOne, reserveBankOne, 250)