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
  _minusDeposit(num) {}
  spend(num) {
    this.cash -= num;
  }
  deposit(num) {
    this.cash = this.cash - num;

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
  repayLoan(num, paymentType) {
    if (paymentType === "CARD") {
      this.deposits = this.deposits - num;
    }
    if (paymentType === "CASH") {
      this.cash = this.cash - num;
    }
  }
}

export default Customer