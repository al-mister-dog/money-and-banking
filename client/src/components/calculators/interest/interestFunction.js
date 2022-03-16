export default function EmployeeDetails(
  principal,
  interestRate,
  inflationRate,
  times
) {
  function realInterestRate(interestRate, inflationRate) {
    return interestRate - inflationRate;
  }
  function simpleInterestDecimal(amount, rate) {
    return amount * rate;
  }
  function simpleInterestPercent(amount, rate) {
    return (amount * rate) / 100;
  }
  function realInterestDecimal(amount, rate, inflationRate) {
    function simpleInterestDecimal(amount, rate) {
      return amount * rate;
    }
    const realInterestRate = rate - inflationRate;
    return simpleInterestDecimal(amount, realInterestRate);
  }
  function realInterestPercent(amount, rate, inflationRate) {
    function simpleInterestPercent(amount, rate) {
      return (amount * rate) / 100;
    }
    const realInterestRate = rate - inflationRate;
    return simpleInterestPercent(amount, realInterestRate);
  }

  function getSimpleInterest(principal, interest, frequency) {
    let returns = [];
    for (let i = 0; i < frequency; i++) {
      principal += interest;
      returns = [...returns, principal.toFixed(2)];
    }
    return returns;
  }
  function getCompoundInterest(principal, interest, frequency, callback) {
    let futures = [];
    for (let i = 0; i < frequency; i++) {
      principal += interest;
      let newAmount = parseFloat(principal).toFixed(2)
      futures = [...futures, newAmount];
      interest = callback(principal, interestRate, inflationRate);
    }
    return futures;
  }

  function getNominalInterestDecimal() {
    const interest = simpleInterestDecimal(principal, interestRate);
    return getSimpleInterest(principal, interest, times);
  }
  function getNominalInterestPercent() {
    const interest = simpleInterestPercent(principal, interestRate);
    return getSimpleInterest(principal, interest, times);
  }
  function getRealInterestDecimal() {
    const interest = simpleInterestDecimal(
      principal,
      realInterestRate(interestRate, inflationRate)
    );
    return getCompoundInterest(principal, interest, times);
  }
  function getRealInterestPercent() {
    const interest = simpleInterestPercent(
      principal,
      realInterestRate(interestRate, inflationRate)
    );
    return getCompoundInterest(principal, interest, times);
  }
  function getCompoundInterestDecimal() {
    const interest = simpleInterestDecimal(principal, interestRate);
    return getCompoundInterest(
      principal,
      interest,
      times,
      simpleInterestDecimal
    );
  }
  function getCompoundInterestPercent() {
    const interest = simpleInterestPercent(principal, interestRate);
    return getCompoundInterest(
      principal,
      interest,
      times,
      simpleInterestPercent
    );
  }
  function getRealCompoundInterestDecimal() {
    const interest = simpleInterestDecimal(
      principal,
      realInterestRate(interestRate, inflationRate)
    );

    return getCompoundInterest(principal, interest, times, realInterestDecimal);
  }
  function getRealCompoundInterestPercent() {
    
    const interest = simpleInterestPercent(
      principal,
      realInterestRate(interestRate, inflationRate)
    );
    return getCompoundInterest(principal, interest, times, realInterestPercent);
  }

  return {
    getNominalInterestDecimal,
    getNominalInterestPercent,
    getRealInterestDecimal,
    getRealInterestPercent,
    getCompoundInterestDecimal,
    getCompoundInterestPercent,
    getRealCompoundInterestDecimal,
    getRealCompoundInterestPercent,
  };
}
