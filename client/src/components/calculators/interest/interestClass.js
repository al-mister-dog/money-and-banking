export default class InterestCalculator {
  constructor(principal, interestRate, inflationRate, times, compoundPeriod,) {
    this.principal = principal;
    this.interestRate = interestRate;
    this.inflationRate = inflationRate;
    this.times = times;
    this.compoundPeriod = compoundPeriod;
  }
  realInterestRate(interestRate, inflationRate) {
    return interestRate - inflationRate;
  }
  simpleInterestDecimal(amount, rate) {
    return amount * rate;
  }
  simpleInterestPercent(amount, rate) {
    return (amount * rate) / 100;
  }
  realInterestDecimal(amount, rate, inflationRate) {
    function simpleInterestDecimal(amount, rate) {
      return amount * rate;
    }
    const realInterestRate = rate - inflationRate;
    return simpleInterestDecimal(amount, realInterestRate);
  }
  realInterestPercent(amount, rate, inflationRate) {
    function simpleInterestPercent(amount, rate) {
      return (amount * rate) / 100;
    }
    const realInterestRate = rate - inflationRate;
    return simpleInterestPercent(amount, realInterestRate);
  }

  getSimpleInterest(principal, interest, frequency) {
    let returns = [];
    for (let i = 0; i < frequency; i++) {
      principal += interest;
      returns = [...returns, parseFloat(principal).toFixed(2)];
    }
    return returns;
  }

  returnCompoundPeriod(
    amount,
    interest,
    compoundPeriod,
    interestRate,
    inflationRate,
    i
  ) {
    if (compoundPeriod === 0) {
      return interest;
    }
    if (compoundPeriod === 1) {
      if (i === 6) {
        interest = (amount * (interestRate - inflationRate)) / 100;
      }
      return interest;
    }
    if (compoundPeriod === 2) {
      if (i === 3 || i === 6 || i === 9) {
        interest = (amount * (interestRate - inflationRate)) / 100;
      }
      return interest;
    }
    if (compoundPeriod === 3) {
      interest = (amount * (interestRate - inflationRate)) / 100;
      return interest;
    }
  }

  getCompoundInterest(principal, interest, frequency, compoundPeriod, callback) {
    let futures = [];
    let amount = principal;
    for (let i = 0; i < frequency; i++) {
      for (let i = 1; i < 12 + 1; i++) {
        let monthly = parseFloat(interest / 12);
        amount += monthly;
        interest = this.returnCompoundPeriod(
          amount,
          interest,
          compoundPeriod,
          this.interestRate,
          this.inflationRate,
          i
        );
      }
      futures = [...futures, parseFloat(amount.toFixed(2))];
      interest = callback(amount, this.interestRate, this.inflationRate);
    }
    return futures;
  }

  getNominalInterestDecimal() {
    const interest = this.simpleInterestDecimal(
      this.principal,
      this.interestRate
    );
    return this.getCompoundInterest(this.principal, interest, this.times);
  }
  getNominalInterestPercent() {
    const interest = this.simpleInterestPercent(
      this.principal,
      this.interestRate
    );
    return this.getSimpleInterest(this.principal, interest, this.times);
  }

  getRealInterestDecimal() {
    const interest = this.simpleInterestDecimal(
      this.principal,
      this.realInterestRate(this.interestRate, this.inflationRate)
    );
    return this.getCompoundInterest(this.principal, interest, this.times);
  }
  getRealInterestPercent() {
    const interest = this.simpleInterestPercent(
      this.principal,
      this.realInterestRate(this.interestRate, this.inflationRate)
    );
    return this.getCompoundInterest(this.principal, interest, this.times);
  }
  getCompoundInterestDecimal() {
    const interest = this.simpleInterestDecimal(
      this.principal,
      this.interestRate
    );
    return this.getCompoundInterest(
      this.principal,
      interest,
      this.times,
      this.simpleInterestDecimal
    );
  }
  getCompoundInterestPercent() {
    const interest = this.simpleInterestPercent(
      this.principal,
      this.interestRate
    );
    return this.getCompoundInterest(
      this.principal,
      interest,
      this.times,
      this.compoundPeriod,
      this.simpleInterestPercent
    );
  }
  getRealCompoundInterestDecimal() {
    const interest = this.simpleInterestDecimal(
      this.principal,
      this.realInterestRate(this.interestRate, this.inflationRate)
    );
    return this.getCompoundInterest(
      this.principal,
      interest,
      this.times,
      this.realInterestDecimal
    );
  }
  // getRealCompoundInterestPercent() {
  //   const interest = this.simpleInterestPercent(
  //     this.principal,
  //     this.realInterestRate(this.interestRate, this.inflationRate)
  //   );

  //   return this.getCompoundInterest(
  //     this.principal,
  //     interest,
  //     this.times,
  //     this.realInterestPercent
  //   );
  // }

  getSerious() {
    const interest = this.simpleInterestPercent(
      this.principal,
      this.realInterestRate(this.interestRate, this.inflationRate)
    );

    return this.seriousLoop(
      this.principal,
      interest,
      this.times,
      this.realInterestPercent
    );
  }

  getRealCompoundInterestPercent() {
    const interest = this.simpleInterestPercent(
      this.principal,
      this.realInterestRate(this.interestRate, this.inflationRate)
    );
    return this.getCompoundInterest(
      this.principal,
      interest,
      this.times,
      this.compoundPeriod,
      this.realInterestPercent
    );
  }
}