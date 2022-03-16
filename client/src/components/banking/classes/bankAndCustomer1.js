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
  _minusCash(num) {}
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
      reserveDeposits: [],
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
  customerAdd(id, num) {
    const depositAccount = {
      category: "liabilities",
      instrument: "deposits",
    };
    const overdraftAccount = { category: "assets", instrument: "overdrafts" };
    this.depositAccount(id)
      ? this._add(id, num, depositAccount)
      : this.reduceAccount(
          id,
          num,
          overdraftAccount,
          depositAccount,
          this.overdraftAccount(id).amount - num
        );
  }
  customerMinus(id, num) {
    const depositAccount = {
      category: "liabilities",
      instrument: "deposits",
    };
    const overdraftAccount = { category: "assets", instrument: "overdrafts" };
    this.depositAccount(id)
      ? this.reduceAccount(
          id,
          num,
          depositAccount,
          overdraftAccount,
          this.depositAccount(id).amount - num
        )
      : this._add(id, num, overdraftAccount);
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
  customerReceiveTransfer(id, num) {
    this.customerAdd(id, num);
  }
  customerSendTransfer(id, num) {
    this.customerMinus(id, num);
  }
  customerDepositCash(id, num) {
    this.customerAdd(id, num);
    this._addReserves(num);
  }
  customerWithdrawCash(id, num) {
    this.customerMinus(id, num);
    this.minusReserves(num);
  }
  depositAccount(id) {
    return this.liabilities.deposits.find((acc) => acc.id === id);
  }
  overdraftAccount(id) {
    return this.assets.overdrafts.find((acc) => acc.id === id);
  }

  customerMinusLoan(id, num) {
    let foundAccount = this.assets.loans.find((acc) => acc.id === id);
    const loanAfterRepayment = foundAccount.amount - num;
    if (loanAfterRepayment === 0) {
      this._deleteAccount(id, {
        category: "assets",
        instrument: "loans",
      });
      // this.customerMinus(id, num);
    } else {
      foundAccount.amount -= num;
      // this.customerMinus(id, num);
    }
  }
  customerAddLoan(id, num) {
    let account = {
      category: "assets",
      instrument: "loans",
    };
    let foundAccount = this.assets.loans.find((acc) => acc.id === id);
    if (!foundAccount) {
      this._createAccount(id, account);
    }
    this._add(id, num, account);
    this.customerAdd(id, num);
  }
  customerRepayLoan(id, num, paymentType) {
    if (paymentType === "CARD") {
      this.customerMinusLoan(id, num);
      this.customerMinus(id, num);
    }
    if (paymentType === "CASH") {
      this.customerMinusLoan(id, num);
      this._addReserves(num);
    }
  }

  sellLoan(num) {
    this.liabilities = this.liabilities - num;
  }
}

//CREATE BANKS
const nationalBankOne = new NationalBank(null, null, 1);
const nationalBankTwo = new NationalBank(null, null, 2);
// const reserveBankOne = new ReserveBank(null, null, 1);

//CREATE CUSTOMER AND ADD ACCOUNT
const customerOne = new Customer(50, 50, 1, 1);
nationalBankOne.createCustomerAccount(customerOne.id, customerOne.deposits);
const customerTwo = new Customer(50, 50, 2, 1);
nationalBankOne.createCustomerAccount(customerTwo.id, customerTwo.deposits);
const customerThree = new Customer(50, 50, 2, 2);
nationalBankTwo.createCustomerAccount(customerThree.id, customerThree.deposits);
//SYSTEM FUNCTIONS (OUTSIDE INDIVIDUAL BANKS)
const depositCash = (c, b, num) => {
  const id = c.id;
  b.customerDepositCash(id, num);
  c.deposit(num);
};
const withdrawCash = (c, b, num) => {
  const id = c.id;
  b.customerWithdrawCash(id, num);
  c.withdraw(num);
};
const bankTransfer = (c1, c2, b1, num) => {
  const id1 = c1.id;
  const id2 = c2.id;
  b1.customerSendTransfer(id1, num);
  c1.sendTransfer(num);
  b1.customerReceiveTransfer(id2, num);
  c2.receiveTransfer(num);
};
const interbankTransfer = (c1, c2, b1, b2, num) => {
  const id1 = c1.id;
  const id2 = c2.id;
  b1.customerSendTransfer(id1, num);
  c1.sendTransfer(num);
  b2.customerReceiveTransfer(id2, num);
  c2.receiveTransfer(num);
};
const makeCustomerLoan = (c, b, num) => {
  const id = c.id;
  b.customerAddLoan(id, num);
  c.deposit(num);
};
const payCustomerLoan = (c, b) => {
  const id = c.id;
  b.customerMinusLoan(id);
};
const repayCustomerLoan = (c, b, num, paymentType) => {
  const id = c.id;
  b.customerRepayLoan(id, num, paymentType);
  c.repayLoan(num, paymentType)
};
