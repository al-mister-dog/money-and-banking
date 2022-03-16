// class Bank {
//   constructor(assets, liabilities, id) {
//     this.assets = assets;
//     this.liabilities = liabilities;
//     this.id = id;
//   }
//   receiveDeposit(num) {
//     this.assets = this.assets + num;
//     this.liabilities = this.liabilities + num;
//   }
//   redeemDeposit(num) {
//     this.assets = this.assets - num;
//     this.liabilities = this.liabilities - num;
//   }
//   makeTransfer(num) {
//     this.liabilities = this.liabilities - num;
//   }
//   receiveTransfer(num) {
//     this.liabilities = this.liabilities + num;
//   }
//   makeLoan(num) {
//     this.assets = this.assets + num;
//     this.liabilities = this.liabilities + num;
//   }
//   sellLoan(num) {
//     this.liabilities = this.liabilities - num;
//   }
//   callLoan(num) {
//     this.assets = this.assets + num;
//     this.liabilities = this.liabilities - num;
//   }
// }

class Bank {
  constructor(assets, liabilities, bankId) {
    this.assets = assets;
    this.liabilities = liabilities;
    this.bankId = bankId;
  }
  findCustomerDepositsIndex(customer) {
    const customerDeposits = this.liabilities.deposits.find(
      (x) => x.customerId === parseInt(customer.customerId)
    );
    const customerIndex = this.liabilities.deposits.indexOf(customerDeposits);
    return customerIndex
  }
  _addDeposit(num, customer) {
    if (!this.liabilities.deposits) {
      this.liabilities.deposits = [];
    }

    const customerDeposits = this.liabilities.deposits.find(
      (x) => x.customerId === customer.customerId
    );

    if (!customerDeposits) {
      const newCustomerDeposits = {
        customerId: customer.customerId,
        amount: num,
      };

      this.liabilities.deposits = [
        ...this.liabilities.deposits,
        newCustomerDeposits,
      ];
    } else {
      const customerIndex = this.liabilities.deposits.indexOf(customerDeposits);
      this.liabilities.deposits[customerIndex].amount =
        this.liabilities.deposits[customerIndex].amount + num;
    }
  }
  _minusDeposit(num, customer) {
    const customerDeposits = this.liabilities.deposits.find(
      (x) => x.customerId === parseInt(customer.customerId)
    );

    const customerIndex = this.liabilities.deposits.indexOf(customerDeposits);

    this.liabilities.deposits[customerIndex].amount =
      this.liabilities.deposits[customerIndex].amount - num;
  }
  _addLoan(num, customer) {
    if (!this.assets.loans) {
      this.assets.loans = [];
    }
    const customerLoan = this.assets.loans.find(
      (x) => x.customerId === customer.customerId
    );
    if (!customerLoan) {
      const newCustomerLoan = {
        customerId: customer.customerId,
        amount: num,
      };
      this.assets.loans = [...this.assets.loans, newCustomerLoan];
    } else {
      const customerIndex = this.assets.loans.indexOf(customerLoan);
      this.assets.loans[customerIndex].amount =
        this.assets.loans[customerIndex].amount + num;
    }
  }
  _retrieveLoan(num, customer) {
    if (!this.assets.reserves) {
      this.assets.reserves = 0;
    }
    const customerLoan = this.assets.loans.find(
      (x) => x.customerId === customer.customerId
    );
    if (!customerLoan) {
      console.log("error in bank");
    } else {
      const customerIndex = this.assets.loans.indexOf(customerLoan);

      // this.assets.reserves = this.assets.loans[customerIndex].amount =
      //   this.assets.loans[customerIndex].amount + num;
      this.assets.loans.splice(customerIndex, 1);
      // this._minusDeposit(num, customer);
    }
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
  receiveDeposit(num, customer) {
    this._addDeposit(num, customer);
    this._addReserves(parseFloat(num));
  }
  redeemDeposit(num, customer) {
    this._minusDeposit(num, customer);
    this._minusReserves(parseFloat(num));
  }
  makeTransfer(num, customer) {
    this._minusDeposit(num, customer);
  }
  receiveTransfer(num, customer) {
    this._addDeposit(num, customer);
    // this._addReserves(parseFloat(num));
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
      this._retrieveLoan(num, customer);
      this._minusDeposit(num, customer);
    }
    if (paymentType === "CASH") {
      const customerIndex = this.findCustomerDepositsIndex(customer)
      
      this.assets.reserves = this.assets.loans[customerIndex].amount =
      this.assets.loans[customerIndex].amount + num;
      this.assets.loans.splice(customerIndex, 1);
    }
  }
}

export default Bank;
