class Customer {
  constructor(deposits, cash, customerId, bankId) {
    this.deposits = deposits;
    this.cash = cash;
    this.customerId = customerId;
    this.bankId = bankId;
  }
  spend(num) {
    this.cash -= num;
  }
  deposit(num) {
    this.cash -= num;
    this.deposits += num;
  }
  withdraw(num) {
    this.cash += num;
    this.deposits -= num;
  }
  makeTransfer(num) {
    this.deposits -= num;
  }
  receiveTransfer(num) {
    this.deposits += num;
  }
  receiveLoan(num) {
    this.deposits = this.deposits + num;
  }
  repayLoan(num) {
    this.deposits = this.deposits - num
  }
}

export default Customer;
