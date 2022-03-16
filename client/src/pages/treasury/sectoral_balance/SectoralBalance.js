// function getSectoralBalance(savings, investment, imports, exports, taxRevenue, outlays) {
//   return (savings - investment) + (imports - exports) + (taxRevenue - outlays)
// }

// const savings = 10
// const investment = 12
// const imports = 5
// const exports = 7
// const taxRevenue = 3
// const outlays = 12

// console.log(getSectoralBalance(savings, investment, imports, exports, taxRevenue, outlays))

function getGdp(consumption, investment, govSpending, exports, imports) {
  return consumption + investment + govSpending + (exports - imports);
}

const consumption = 10;
const investment = 10;
const govSpending = 10;
const exports = 10;
const imports = 10;

const saving = 10;
const taxation = 10;

function anotherApproach(consumption, saving, taxation) {
  return consumption + saving + taxation;
}
console.log(getGdp(consumption, investment, govSpending, exports, imports));
console.log(anotherApproach(consumption, saving, taxation));

const savingAndTaxation = investment + govSpending + (exports - imports);

const traditionalBank = {
  assets: [
    { asset: "loans" },
    { asset: "securities" },
    { asset: "cash", liquid: Boolean },
  ], //does the bank have the ability to make payments to depositors - sell securities
  liabilities: [
    { liability: "deposits" },
    { liability: "other borrowing" },
    { liability: "net worth", solvent: Boolean }, //are the assets worth more than the liabilities - net worth more than zero
  ],
};

const shadowBank = {
  assets: [
    { asset: "residential mortgage backed securities" }, //loans turned into a bond
    { asset: "interest rate swap" }, //getting rid of interest risk involved
    { asset: "credit default swap" },
  ], //getting rid of credit risk by selling it off - so you have collateral for wholsale in the money market
  liabilities: [
    { liability: "money market borrowing" }, //money market mutual funds - corporate investors - using repurchase agreements, eurodollars, asset back commercial paper
    { liability: "repurchase agreements" },
    { liability: "eurodollars" },
    { liability: "asset backed commercial paper" },
  ], //liquidity in shadow banks is about being able to roll over the funding. short term. if money market freezes you have to liquidate
};

const institutions = {
  centralBank: {
    assets: [{ asset: "gold" }],
    liabilities: [{ liability: "currency" }],
  },
  
  bankingSystem: {
    assets: [{ asset: "currency" }],
    liabilities: [{ liability: "deposits" }],
  },
  
  privateSector: {
    assets: [{ asset: "deposits" }],
    liabilities: [{ liability: "securities" }],
  },
}

/**
 * every variable appears twice except gold. 
 * OUTSIDE MONEY: gold is an asset which is no one's liability.
 * INSIDE MONEY: everything else. All of this money is someone elses liability.
 * in nation states you can think of national currency as outside money.
 * in a global context national currency is inside money
 */




const centralBank = {
  assets: [{ asset: "gold" }],
  liabilities: [{ liability: "currency" }],
};

const bankingSystem = {
  assets: [{ asset: "currency" }],
  liabilities: [{ liability: "deposits" }],
};

const privateSector = {
  assets: [{ asset: "deposits" }],
  liabilities: [{ liability: "securities" }],
};
//every variable  in 


/**
 * Bankers think more about liquidity. They have to clear their accounts
 * Economists think more about solvency
 */

//expanding both sides of the balance sheet - something from nothing (alchemy)
//outside money - inside money

/**
 * HIERARCHY OF FINANCIAL INSTRUMENTS
 * 1: "Gold"
 * 2: "Currency" (promise to pay gold)
 * 3: "Private Bank Deposits"
 * 4: "Credit/Securities"
 *
 * HIERARCHY OF INSTITUTIONS (BALANCE SHEETS)
 * 1: "Central Bank"
 * 2: "Banking System"
 * monetary systems are always hierarchical
 * money is better than credit
 * credit is a promise to pay money
 * money cancels a debt
 * during crises the hierarchy of money becomes clearer
 *
 * where is line drawn between money and credit??
 * 19th century line was drawn between currency and deposits
 * Banks clear payments with currency and gold
 *
 * In business or retail, deposits are included with currency and gold
 * what counts as money or credit depends on the situation
 */


 const gold = 100
 const currency = 200
 const deposits = 300
 const securities = 400
 
 const institutionsTwo = {
   centralBank: {
     assets: { asset: "gold", amount: 100 },
     liabilities: { liability: "currency", amount: 100 },
   },
   
   bankingSystem: {
     assets: { asset: "currency",  amount: 100},
     liabilities: { liability: "deposits", amount: 100 },
   },
   
   privateSector: {
     assets: { asset: "deposits", amount: 100 },
     liabilities: { liability: "securities", amount: 100 },
   },
 }
 
 function bankWithdrawal(amount) {
   const {bankingSystem, privateSector} = institutionsTwo
 
   privateSector.assets.amount = privateSector.assets.amount + amount
   bankingSystem.liabilities.amount = bankingSystem.liabilities.amount - amount
   return 
 }
 
 function bankDeposit(amount) {
   const {bankingSystem, privateSector} = institutionsTwo
   
   privateSector.assets.amount = privateSector.assets.amount - amount
   bankingSystem.liabilities.amount = bankingSystem.liabilities.amount + amount
   return 
 }
 
 console.log(institutionsTwo)
 bankWithdrawal(20)
 console.log(institutionsTwo)
 bankDeposit(20)
 console.log(institutionsTwo)
 
 //the bank is losing assets as these are used to pay off the liabilities to the customer
 //this loss must be equalled on the balance sheet otherwise the bank will become insolvent
 //the bank can gain more assets by either attracting more depositors or go to a lender of last resort


 /**
  * The scarcity of (ultimate) money
  * The elasticity of derivative credit (denominated in but NOT money)
  * If i say im going to get something from you and owe you later thats using credit. no gold needed
  * 
  */