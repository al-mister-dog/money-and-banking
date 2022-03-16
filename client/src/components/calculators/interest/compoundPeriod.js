export default class InterestCalculator {
  constructor(principal, interestRate, inflationRate, compoundPeriod, times) {
    this.principal = principal;
    this.interestRate = interestRate;
    this.inflationRate = inflationRate;
    this.compoundPeriod = compoundPeriod;
    this.times = times;
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

  getCompoundInterest(principal, interest, frequency, callback) {
    let futures = [];
    for (let i = 0; i < frequency; i++) {
      principal += interest;

      futures = [...futures, principal.toFixed(2)];
      interest = callback(principal, this.interestRate, this.inflationRate);
    }
    return futures;
  }

  seriousLoop(principal, interest, frequency, callback) {
    let futures = [];
    let amount = principal;
    for (let i = 0; i < frequency; i++) {
      for (let i = 1; i < 12 + 1; i++) {
        let monthly = parseFloat(interest / 12);
        amount += monthly;
        if (i === 6) {
          interest = this.simpleInterestPercent(
            amount,
            this.realInterestRate(this.interestRate, this.inflationRate)
          );
        }
      }
      futures = [...futures, parseFloat(amount.toFixed(2))];
      interest = callback(amount, this.interestRate, this.inflationRate);
    }
    return futures;
  }

  evenMoreSeriousLoop(
    principal,
    interest,
    frequency,
    compoundPeriod,
    callback
  ) {
    function returnCompoundPeriod(
      interest,
      compoundPeriod,
      interestRate,
      inflationRate,
      i
    ) {
      function simpleInterestPercent(amount, rate) {
        return (amount * rate) / 100;
      }
      function realInterestRate(interestRate, inflationRate) {
        return interestRate - inflationRate;
      }
      if (compoundPeriod === 0) {
        return interest;
      }
      if (compoundPeriod === 1) {
        if (i === 6) {
          interest = simpleInterestPercent(
            amount,
            realInterestRate(interestRate, inflationRate)
          );
        }
        return interest;
      }
      if (compoundPeriod === 2) {
        if (i === 3 || i === 6 || i === 9) {
          interest = simpleInterestPercent(
            amount,
            realInterestRate(interestRate, inflationRate)
          );
        }
        return interest;
      }
      if (compoundPeriod === 3) {
        interest = simpleInterestPercent(
          amount,
          realInterestRate(interestRate, inflationRate)
        );

        return interest;
      }
    }
    let futures = [];
    let amount = principal;
    for (let i = 0; i < frequency; i++) {
      for (let i = 1; i < 12 + 1; i++) {
        let monthly = parseFloat(interest / 12);
        amount += monthly;
        interest = returnCompoundPeriod(
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
    return this.getCompoundInterest(this.principal, interest, this.times);
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
  getRealCompoundInterestPercent() {
    const interest = this.simpleInterestPercent(
      this.principal,
      this.realInterestRate(this.interestRate, this.inflationRate)
    );

    return this.getCompoundInterest(
      this.principal,
      interest,
      this.times,
      this.realInterestPercent
    );
  }

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
  getEvenMoreSerious() {
    const interest = this.simpleInterestPercent(
      this.principal,
      this.realInterestRate(this.interestRate, this.inflationRate)
    );

    return this.evenMoreSeriousLoop(
      this.principal,
      interest,
      this.times,
      this.compoundPeriod,
      this.realInterestPercent
    );
  }
}

const futures = new InterestCalculator(10000, 10, 0, 3, 10);

const compoundPeriods = ['Annually', 'Semi-annually', 'Quarterly', 'Monthly']
const foo = futures.getEvenMoreSerious();
