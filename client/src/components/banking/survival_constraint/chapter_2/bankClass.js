class Bank {
  constructor(assets, liabilities, id) {
    this.assets = assets;
    this.liabilities = liabilities;
    this.id = id;
  }

  //CUSTOMER METHODS
  createAccount(customer) {
    const newCustomer = {
      id: customer.id,
      amount: 0,
    };
    this.liabilities.deposits = [...this.liabilities.deposits, newCustomer];
  }
  _create(keys) {
    const { k1, k2 } = keys;
    this[k1][k2] = [];
  }
  _createAccount(customer, keys) {
    const { k1, k2 } = keys;
    const newAccount = {
      id: customer.customerId || customer.id,
      amount: 0,
    };
    this[k1][k2] = [...this[k1][k2], newAccount];
  }
  _findAccount(customer, keys) {
    const { k1, k2 } = keys;
    if (!this[k1][k2]) {
      this._create(keys);
    }

    let account = this[k1][k2].find(
      (acc) => acc.id === customer.id || customer.id
    );

    if (!account) {
      this._createAccount(customer, keys);
      account = this[k1][k2].find((acc) => acc.id === customer.id);
    }
    const customerIndex = this[k1][k2].indexOf(account);

    return customerIndex;
  }
  _addLoan(num, customer) {
    const customerIndex = this._findAccount(customer, {
      k1: "assets",
      k2: "loans",
    });

    this.assets.loans[customerIndex].amount =
      this.assets.loans[customerIndex].amount + num;
  }
  _retrieveLoanByDeposit(customer) {
    const customerIndex = this._findAccount(customer, {
      k1: "assets",
      k2: "loans",
    });
    this.assets.loans.splice(customerIndex, 1);
  }
  _retrieveLoanByCash(customer, num) {
    const customerIndex = this._findAccount(customer, {
      k1: "liabilities",
      k2: "deposits",
    });
    this.assets.reserves = this.assets.loans[customerIndex].amount + num;
    this.assets.loans.splice(customerIndex, 1);
  }

  _addDeposit(num, customer) {
    const customerIndex = this._findAccount(customer, {
      k1: "liabilities",
      k2: "deposits",
    });

    this.liabilities.deposits[customerIndex].amount =
      this.liabilities.deposits[customerIndex].amount + num;
  }
  _minusDeposit(num, customer) {
    const customerIndex = this._findAccount(customer, {
      k1: "liabilities",
      k2: "deposits",
    });

    this.liabilities.deposits[customerIndex].amount =
      this.liabilities.deposits[customerIndex].amount - num;
  }
  _addOverdraft(num, customer) {
    const customerIndex = this._findAccount(customer, {
      k1: "assets",
      k2: "overdrafts",
    });
    this.assets.overdrafts[customerIndex].amount =
      this.assets.overdrafts[customerIndex].amount + num;
  }
  _minusOverdraft(num, customer) {
    const customerIndex = this._findAccount(customer, {
      k1: "assets",
      k2: "overdrafts",
    });

    this.assets.overdrafts[customerIndex].amount =
      this.assets.overdrafts[customerIndex].amount - num;
  }

  _addReserves(num) {
    if (!this.assets.reserves) {
      this.assets.reserves = 0;
    }
    this.assets.reserves = this.assets.reserves + num;
  }
  _minusReserves(num) {
    if (!this.assets.reserves) {
      this.assets.reserves = 0;
    }
    this.assets.reserves = this.assets.reserves - num;
  }
  _incurFee(num, customer) {
    if (!this.assets.overdraftFees) {
      this.assets.overdraftFees = [];
    }
    const newFee = {
      id: customer.id,
      amount: 5,
    };
    this.assets.overdraftFees = [...this.assets.overdraftFees, newFee];
  }
  _chargeFee(num, customer) {
    const customerIndex = this._findAccount(customer, {
      k1: "liabilities",
      k2: "deposits",
    });
    const overdraftFeeIndex = this._findAccount(customer, {
      k1: "liabilities",
      k2: "deposits",
    });
    const depositAmount = this.liabilities.deposits[customerIndex].amount;
    if (depositAmount > 5) {
      this._minusDeposit(5, customer);
      // this._addReserves(5) //bank lowers its liabilities rather than increases its assets
      this.assets.overdraftFees.splice(overdraftFeeIndex, 1);
      return "charged";
    }
  }
  addToCustomerDepositAccount(num, customer) {
    this._addDeposit(num, customer);
  }
  addToCustomerOverdraftAccount(num, customer) {
    this._addOverdraft(num, customer);
  }
  minusFromCustomerDepositAccount(num, customer) {
    const customerIndex = this._findAccount(customer, {
      k1: "liabilities",
      k2: "deposits",
    });
    const depositAmount = this.liabilities.deposits[customerIndex].amount;
    const amountAfterWithdrawal = depositAmount - num;
    if (amountAfterWithdrawal < 0) {
      this.liabilities.deposits.splice(customerIndex, 1);
      this._addOverdraft(-amountAfterWithdrawal, customer);
      this._incurFee(num, customer);
    } else {
      this._minusDeposit(num, customer);
    }
  }

  minusFromCustomerOverdraftAccount(num, customer) {
    const customerIndex = this._findAccount(customer, {
      k1: "assets",
      k2: "overdrafts",
    });
    const overdraftAmount = this.assets.overdrafts[customerIndex].amount;
    const amountAfterDeposit = overdraftAmount - num;

    if (amountAfterDeposit < 0) {
      this.assets.overdrafts.splice(customerIndex, 1);
      this._addDeposit(-amountAfterDeposit, customer);
      const result = this._chargeFee(num, customer);
      return result;
    } else {
      this._minusOverdraft(num, customer);
    }
  }
  checkAccountDeposit(num, customer) {
    const customerDepositAccount = this.liabilities.deposits.find(
      (acc) => acc.id === customer.id
    );
    const customerOverdraftAccount = this.assets.overdrafts.find(
      (acc) => acc.id === customer.id
    );
    let customerOverdraftFeeAccount;
    if (this.assets.overdraftFees) {
      customerOverdraftFeeAccount = this.assets.overdraftFees.find(
        (acc) => acc.id === customer.id
      );
    }

    if (customerDepositAccount) {
      this.addToCustomerDepositAccount(num, customer);
    }
    if (customerOverdraftAccount) {
      const result = this.minusFromCustomerOverdraftAccount(num, customer);
      return result;
    }
    if (customerDepositAccount && customerOverdraftFeeAccount) {
      const result = this._chargeFee(num, customer);
      return result;
    }
  }
  checkAccountWithdraw(num, customer) {
    const customerDepositAccount = this.liabilities.deposits.find(
      (acc) => acc.id === customer.id
    );
    const customerOverdraftAccount = this.assets.overdrafts.find(
      (acc) => acc.id === customer.id
    );

    if (customerDepositAccount) {
      this.minusFromCustomerDepositAccount(num, customer);
    }
    if (customerOverdraftAccount) {
      this.addToCustomerOverdraftAccount(num, customer);
    }
  }
  receiveDeposit(num, customer) {
    const result = this.checkAccountDeposit(num, customer);
    this._addReserves(num);
    return result;
  }
  redeemDeposit(num, customer) {
    this.checkAccountWithdraw(num, customer);
    this._minusReserves(num);
  }
  makeTransfer(num, customer) {
    this._minusDeposit(num, customer);
  }
  receiveTransfer(num, customer) {
    this._addDeposit(num, customer);
  }

  makeLoan(num, customer) {
    this._addDeposit(num, customer);
    this._addLoan(num, customer);
  }
  sellLoan(num) {
    this.liabilities = this.liabilities - num;
  }
  callLoan(num, interest, customer, paymentType) {
    if (paymentType === "CARD") {
      this._retrieveLoanByDeposit(customer);
      this._minusDeposit(num, customer);
    }
    if (paymentType === "CASH") {
      this._retrieveLoanByCash(customer, num);
    }
  }

  //INTERBANK FUNCTIONS
  // _addReservesBank(num) {
  //   if (!this.assets.reserves) {
  //     this.assets.reserves = 0;
  //   }
  //   this.assets.reserves = this.assets.reserves + num;
  // }
  // _minusReservesBank(num) {
  //   if (!this.assets.reserves) {
  //     this.assets.reserves = 0;
  //   }
  //   this.assets.reserves = this.assets.reserves - num;
  // }

  // receiveDepositBank(num, bank) {
  //   // this.checkAccountDepositBank(num, customer);
  //   this._addReservesBank(num);
  //   return result;
  // }
  // redeemDepositBank(num, bank) {
  //   // this.checkAccountWithdraw(num, customer);
  //   this._minusReservesBank(num);
  // }

  _addDepositBank(num, customer) {
    const customerIndex = this._findAccount(customer, {
      k1: "liabilities",
      k2: "bankDeposits",
    });
    this.liabilities.deposits[customerIndex].amount =
      this.liabilities.deposits[customerIndex].amount + num;
  }
  _minusDepositBank(num, customer) {
    const customerIndex = this._findAccount(customer, {
      k1: "liabilities",
      k2: "bankDeposits",
    });
    this.liabilities.bankDeposits[customerIndex].amount =
      this.liabilities.bankDeposits[customerIndex].amount - num;
  }
  _minusReserveDeposits(num, customer) {
    const customerIndex = this._findAccount(customer, {
      k1: "liabilities",
      k2: "reserveDeposits",
    });
    this.assets.reserveDeposits[customerIndex].amount =
      this.assets.reserveDeposits[customerIndex].amount - num;
  }
  _addReservesBank(num) {
    this.assets.reserves += num;
  }
  _minusReservesBank(num) {
    this.assets.reserves -= num;
  }
  receiveDepositBank(num, bank) {
    this._addReservesBank(num);
    this._minusReserveDeposits(num, bank);
  }
  redeemDepositBank(num, customer) {
    this._minusDepositBank(num, customer);
    this._minusReservesBank(num);
  }
}

const banks = {
  bankOne: new Bank(
    { reserveDeposits: [{ id: 2, amount: 100 }], loans: [], reserves: 50 },
    {
      deposits: [
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
      bankDeposits: [
        {
          id: 1,
          amount: 100,
        },
      ],
    },
    2
  ),
};

export default Bank;
