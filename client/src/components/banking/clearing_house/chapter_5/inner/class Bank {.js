// class Bank {
//   constructor(assets, liabilities, records) {
//     this.assets = assets;
//     this.liabilities = liabilities;
//     this.records = records;
//   }
//   interestRate(amount) {
//     return amount / 10;
//   }
//   createAccount(id, amount, account) {
//     const { category, instrument } = account;
//     const newAccount = {
//       id,
//       amount,
//     };
//     this[category][instrument] = [...this[category][instrument], newAccount];
//   }
//   findAccount(id, account) {
//     const { category, instrument } = account;
//     return this[category][instrument].find((acc) => acc.id === id);
//   }
//   findAccountIndex(id, acc) {
//     const { category, instrument } = acc;
//     let account = this[category][instrument].find((acc) => acc.id === id);
//     const accountIndex = this[category][instrument].indexOf(account);
//     return accountIndex;
//   }
//   deleteAccount(id, acc) {
//     const { category, instrument } = acc;
//     const accountIndex = this.findAccountIndex(id, acc);
//     this[category][instrument].splice(accountIndex, 1);
//   }

//   add(id, num, acc) {
//     const { category, instrument } = acc;
//     const accountIndex = this.findAccountIndex(id, acc);
//     this[category][instrument][accountIndex].amount =
//       this[category][instrument][accountIndex].amount + num;
//   }
//   subtract(id, num, acc) {
//     const { category, instrument } = acc;
//     const accountIndex = this.findAccountIndex(id, acc);
//     this[category][instrument][accountIndex].amount =
//       this[category][instrument][accountIndex].amount - num;
//   }

//   addReserves(num) {
//     this.assets.reserves += num;
//   }
//   minusReserves(num) {
//     this.assets.reserves -= num;
//   }

//   increaseInstrument(id, num, acc1) {
//     this.add(id, num, acc1);
//   }
//   decreaseInstrument(id, num, acc1, acc2, account) {
//     const amountAfterAction = account.amount - num;
//     if (amountAfterAction < 0) {
//       this.deleteAccount(id, acc1);
//       this.createAccount(id, 0, acc2);
//       this.add(id, -amountAfterAction, acc2);
//     } else {
//       this.subtract(id, num, acc1);
//     }
//   }

//   transactIn(id, amount, inst1, inst2) {
//     let account = this.findAccount(id, this.financialInstruments()[inst1]);
//     account
//       ? this.increaseInstrument(id, amount, this.financialInstruments()[inst1])
//       : this.decreaseInstrument(
//           id,
//           amount,
//           this.financialInstruments()[inst2],
//           this.financialInstruments()[inst1],
//           this.findAccount(id, this.financialInstruments()[inst2])
//         );
//   }
//   transactOut(id, amount, inst1, inst2) {
//     let account = this.findAccount(id, this.financialInstruments()[inst1]);
//     account
//       ? this.decreaseInstrument(
//           id,
//           amount,
//           this.financialInstruments()[inst1],
//           this.financialInstruments()[inst2],
//           account
//         )
//       : this.increaseInstrument(id, amount, this.financialInstruments()[inst2]);
//   }

//   totalAccounts() {
//     this.liabilities.netTo = this.liabilities.dueTos.reduce(
//       (acc, cur) => {
//         return { amount: acc.amount + cur.amount };
//       },
//       { amount: 0 }
//     ).amount;
//     this.assets.netFrom = this.assets.dueFroms.reduce(
//       (acc, cur) => {
//         return { amount: acc.amount + cur.amount };
//       },
//       { amount: 0 }
//     ).amount;
//     this.liabilities.dueTos = [];
//     this.assets.dueFroms = [];
//   }
//   financialInstruments() {
//     return {
//       assetsDeposits: {
//         category: "assets",
//         instrument: "deposits",
//       },
//       liabilitiesDeposits: {
//         category: "liabilities",
//         instrument: "deposits",
//       },
//       assetsOverdrafts: {
//         category: "assets",
//         instrument: "overdrafts",
//       },
//       liabilitiesOverdrafts: {
//         category: "liabilities",
//         instrument: "overdrafts",
//       },
//       assetsBankDeposits: {
//         category: "assets",
//         instrument: "bankDeposits",
//       },
//       liabilitiesBankDeposits: {
//         category: "liabilities",
//         instrument: "bankDeposits",
//       },
//       assetsBankOverdrafts: {
//         category: "assets",
//         instrument: "bankOverdrafts",
//       },
//       liabilitiesBankOverdrafts: {
//         category: "liabilities",
//         instrument: "bankOverdrafts",
//       },
//       assetsReserveDeposits: {
//         category: "assets",
//         instrument: "reserveDeposits",
//       },
//       liabilitiesReserveDeposits: {
//         category: "liabilities",
//         instrument: "reserveDeposits",
//       },
//       assetsReserveOverdrafts: {
//         category: "assets",
//         instrument: "reserveOverdrafts",
//       },
//       liabilitiesReserveOverdrafts: {
//         category: "liabilities",
//         instrument: "reserveOverdrafts",
//       },
//       assetsLoans: {
//         category: "assets",
//         instrument: "loans",
//       },
//       liabilitiesLoans: {
//         category: "liabilities",
//         instrument: "loans",
//       },
//     };
//   }
// }

// class ClearingHouse extends Bank {
//   constructor(assets, liabilities, records, members, id) {
//     super(assets, liabilities, records, members, id);
//     this.assets = {
//       reserves: 10000,
//       receiveFrom: [],
//     };
//     this.liabilities = {
//       payTo: [],
//     };
//     this.records = [];
//     this.members = members;
//     this.id = id;
//     this.to = 0;
//     this.from = 0;
//   }
//   // clearAccounts(accounts) {
//   //   accounts.forEach((account) => {
//   //     if (account.action.hasOwnProperty("pay")) {
//   //       this.assets.reserves += account.action.pay;
//   //       this.records = [...this.records, account];
//   //       this.from += account.action.pay;
//   //     } else if (account.action.hasOwnProperty("receive")) {
//   //       this.assets.reserves -= account.action.receive;
//   //       this.to += account.action.receive;
//   //       this.records = [...this.records, account];
//   //     } else {
//   //       this.records = [...this.records, account];
//   //     }
//   //   });
//   // }
//   clearAccount(account) {
//     if (account.action.hasOwnProperty("pay")) {
//       this.liabilities.payTo = [...this.liabilities.payTo, account];
//       this.records = [...this.records, account];
//       this.from += account.action.pay;
//     } else if (account.action.hasOwnProperty("receive")) {
//       this.assets.receiveFrom = [...this.assets.receiveFrom, account];
//       this.to += account.action.receive;
//       this.records = [...this.records, account];
//     } else {
//       this.records = [...this.records, account];
//     }
//   }
//   clearAccounts() {
//     this.liabilities.payTo = [];
//     this.assets.receiveFrom = [];
//   }
//   sortPayments(bank) {
//     bank.assets.netFrom > bank.liabilities.netTo
//       ? (this.liabilities.payTo = [
//           ...this.liabilities.payTo,
//           { id: bank.id, amount: bank.assets.netFrom - bank.liabilities.netTo },
//         ])
//       : (this.assets.receiveFrom = [
//           ...this.assets.receiveFrom,
//           { id: bank.id, amount: bank.liabilities.netTo - bank.assets.netFrom },
//         ]);
//   }
// }

// class NationalBank extends Bank {
//   constructor(assets, liabilities, records, id) {
//     super(assets, liabilities, records);
//     this.assets = {
//       reserves: 0,
//       reserveDeposits: 1000,
//       bankDeposits: [],
//       bankOverdrafts: [],
//       loans: [],
//       loanInterest: [],
//       overdrafts: [],
//       overdraftFees: [],
//       dueFroms: [],
//       netFrom: 0,
//     };
//     this.liabilities = {
//       deposits: [],
//       bankDeposits: [],
//       loans: [],
//       loanInterest: [],
//       reserveOverdrafts: [],
//       dueTos: [],
//       netTo: 0,
//     };
//     this.records = {
//       loans: [],
//       overdrafts: [],
//     };
//     this.id = id;
//     this.title = "bank";
//   }

//   // openBankAccount(id, amount) {
//   //   this.createAccount(
//   //     id,
//   //     amount,
//   //     this.financialInstruments().assetsReserveDeposits
//   //   );
//   // }
//   openBankAccount(id, amount) {
//     this.createAccount(
//       id,
//       amount,
//       this.financialInstruments().assetsBankDeposits
//     );
//     this.createAccount(
//       id,
//       amount,
//       this.financialInstruments().liabilitiesBankDeposits
//     );
//     // this.addReserves(amount);
//   }
//   createCustomerAccount(id, amount) {
//     this.createAccount(
//       id,
//       amount,
//       this.financialInstruments().liabilitiesDeposits
//     );
//     this.addReserves(amount);
//   }

//   bankDepositReserves(id, amount) {
//     this.transactIn(
//       id,
//       amount,
//       "assetsReserveDeposits",
//       "liabilitiesReserveOverdrafts"
//     );
//     this.assets.reserves -= amount;
//   }
//   bankWithdrawReserves(id, amount) {
//     this.transactOut(
//       id,
//       amount,
//       "assetsReserveDeposits",
//       "liabilitiesReserveOverdrafts"
//     );
//     this.assets.reserves += amount;
//   }
//   increaseLiabilitiesDeposits(id, amount) {
//     // let foundAccount = this.assets.dueFroms.find((acc) => acc.id === id);
//     // const amount = foundAccount.amount;
//     this.transactIn(
//       id,
//       amount,
//       "liabilitiesBankDeposits",
//       "assetsBankOverdrafts"
//     );
//     this.deleteAccount(id, {
//       category: "liabilities",
//       instrument: "dueTos",
//     });
//   }
//   decreaseLiabilitiesDeposits(id) {
//     let foundAccount = this.assets.dueFroms.find((acc) => acc.id === id);
//     const amount = foundAccount.amount;

//     this.transactOut(
//       id,
//       amount,
//       "liabilitiesBankDeposits",
//       "assetsBankOverdrafts"
//     );
//     this.deleteAccount(id, {
//       category: "assets",
//       instrument: "dueFroms",
//     });
//   }
//   decreaseAssetsDeposits(id, amount) {
//     console.log(id);
//     this.transactOut(
//       id,
//       amount,
//       "assetsBankDeposits",
//       "liabilitiesBankOverdrafts"
//     );
//     this.deleteAccount(id, {
//       category: "liabilities",
//       instrument: "dueTos",
//     });
//   }
//   customerDepositCash(id, amount) {
//     this.transactIn(id, amount, "liabilitiesDeposits", "assetsOverdrafts");
//     this.addReserves(amount);
//   }
//   customerWithdrawCash(id, amount) {
//     this.transactOut(id, amount, "liabilitiesDeposits", "assetsOverdrafts");
//     this.minusReserves(amount);
//   }
//   customerSendTransfer(id, amount) {
//     this.transactOut(id, amount, "liabilitiesDeposits", "assetsOverdrafts");
//   }
//   customerReceiveTransfer(id, amount) {
//     this.transactIn(id, amount, "liabilitiesDeposits", "assetsOverdrafts");
//   }
//   customerSendInterbankTransfer(customerId, bankId, amount) {
//     this.transactOut(
//       customerId,
//       amount,
//       "liabilitiesDeposits",
//       "assetsOverdrafts"
//     );
//     this.createAccount(bankId, amount, {
//       category: "liabilities",
//       instrument: "dueTos",
//     });
//   }
//   customerReceiveInterbankTransfer(customerId, bankId, amount) {
//     this.transactIn(
//       customerId,
//       amount,
//       "liabilitiesDeposits",
//       "assetsOverdrafts"
//     );
//     this.createAccount(bankId, amount, {
//       category: "assets",
//       instrument: "dueFroms",
//     });
//   }
//   customerAddLoan(id, amount) {
//     let loanAccount = {
//       category: "assets",
//       instrument: "loans",
//     };
//     let loanRecords = {
//       category: "records",
//       instrument: "loans",
//     };
//     let foundAccount = this.assets.loans.find((acc) => acc.id === id);
//     if (!foundAccount) {
//       this.createAccount(id, amount, loanAccount);
//       this.createAccount(id, amount, loanRecords);
//       // this.add(id, amount, loanRecords);
//       this.transactIn(id, amount, "liabilitiesDeposits", "assetsOverdrafts");
//     } else {
//       this.transactIn(id, amount, "liabilitiesDeposits", "assetsOverdrafts");
//       this.add(id, amount, loanAccount);
//     }
//   }
//   customerRepayLoan(id, amount, paymentType) {
//     if (paymentType === "CARD") {
//       this.transactOut(id, amount, "liabilitiesDeposits", "assetsOverdrafts");
//       this.minusCustomerLoan(id, amount, paymentType);
//     }
//     if (paymentType === "CASH") {
//       this.minusCustomerLoan(id, amount, paymentType);
//       this.addReserves(amount);
//     }
//   }
//   minusCustomerLoan(id, num, paymentType) {
//     let foundAccount = this.assets.loans.find((acc) => acc.id === id);

//     const loanAfterRepayment = foundAccount.amount - num;
//     if (loanAfterRepayment === 0) {
//       this.deleteAccount(id, {
//         category: "assets",
//         instrument: "loans",
//       });
//       let foundAccount = this.records.loans.find((acc) => acc.id === id);

//       this.charge(id, foundAccount, paymentType);
//     } else {
//       foundAccount.amount -= num;
//     }
//   }
//   eligibleToCharge(id, account, interest) {
//     let customersAccount = this.findAccount(
//       id,
//       this.financialInstruments()["liabilitiesDeposits"]
//     );
//     if (customersAccount.amount > interest) {
//       return true;
//     } else {
//       return false;
//     }
//   }
//   charge(id, account, paymentType) {
//     const interest = account.amount / 10;
//     if (paymentType === "CARD") {
//       const eligibleToCharge = this.eligibleToCharge(id, account, interest);
//       if (eligibleToCharge) {
//         this.transactOut(
//           id,
//           interest,
//           "liabilitiesDeposits",
//           "assetsOverdrafts"
//         );
//       }
//     }
//     if (paymentType === "CASH") {
//       this.assets.reserves += interest;
//     }
//   }
//   netEach() {
//     console.log(this.liabilities.dueTos);
//     console.log(this.assets.dueFroms);
//     const banksDueTo = [
//       ...new Set(this.liabilities.dueTos.map((dueTo) => dueTo.id)),
//     ];
//     const banksDueFrom = [
//       ...new Set(this.assets.dueFroms.map((dueFrom) => dueFrom.id)),
//     ];

//     let orderedDueTos = [];
//     banksDueTo.forEach((b) => {
//       const bankDueTo = this.liabilities.dueTos.filter((c) => c.id === b);
//       orderedDueTos = [...orderedDueTos, bankDueTo];
//     });
//     const newDueTos = orderedDueTos.map((bank) => {
//       return {
//         id: bank[0].id,
//         amount: bank.reduce(
//           (acc, cur) => {
//             return { amount: acc.amount + cur.amount };
//           },
//           { amount: 0 }
//         ).amount,
//       };
//     });
//     let orderedDueFroms = [];
//     banksDueFrom.forEach((b) => {
//       const bankDueFrom = this.assets.dueFroms.filter((c) => c.id === b);
//       orderedDueFroms = [...orderedDueFroms, bankDueFrom];
//     });
//     const newDueFroms = orderedDueFroms.map((bank) => {
//       return {
//         id: bank[0].id,
//         amount: bank.reduce(
//           (acc, cur) => {
//             return { amount: acc.amount + cur.amount };
//           },
//           { amount: 0 }
//         ).amount,
//       };
//     });

//     if (newDueTos[0].amount > newDueFroms[0].amount) {
//       newDueTos[0].amount = newDueTos[0].amount - newDueFroms[0].amount;
//       this.liabilities.dueTos = newDueTos;
//       this.assets.dueFroms = [];
//     }
//     if (newDueFroms[0].amount > newDueTos[0].amount) {
//       newDueFroms[0].amount = newDueFroms[0].amount - newDueTos[0].amount;
//       this.assets.dueFroms = newDueFroms;
//       this.liabilities.dueTos = [];
//     }
//     if (newDueFroms[0].amount === newDueTos[0].amount) {
//       return;
//     }
//   }
//   totalEach() {
//     const banksDueTo = [
//       ...new Set(this.liabilities.dueTos.map((dueTo) => dueTo.id)),
//     ];
//     const banksDueFrom = [
//       ...new Set(this.assets.dueFroms.map((dueFrom) => dueFrom.id)),
//     ];

//     let orderedDueTos = [];
//     banksDueTo.forEach((b) => {
//       const bankDueTo = this.liabilities.dueTos.filter((c) => c.id === b);
//       orderedDueTos = [...orderedDueTos, bankDueTo];
//     });
//     const newDueTos = orderedDueTos.map((bank) => {
//       return {
//         id: bank[0].id,
//         amount: bank.reduce(
//           (acc, cur) => {
//             return { amount: acc.amount + cur.amount };
//           },
//           { amount: 0 }
//         ).amount,
//       };
//     });
//     let orderedDueFroms = [];
//     banksDueFrom.forEach((b) => {
//       const bankDueFrom = this.assets.dueFroms.filter((c) => c.id === b);
//       orderedDueFroms = [...orderedDueFroms, bankDueFrom];
//     });
//     const newDueFroms = orderedDueFroms.map((bank) => {
//       return {
//         id: bank[0].id,
//         amount: bank.reduce(
//           (acc, cur) => {
//             return { amount: acc.amount + cur.amount };
//           },
//           { amount: 0 }
//         ).amount,
//       };
//     });
//     this.liabilities.dueTos = newDueTos;
//     this.assets.dueFroms = newDueFroms;
//   }
//   clearAccounts() {
//     const netTo = this.liabilities.netTo;
//     const netFrom = this.assets.netFrom;
//     this.liabilities.netTo = 0;
//     this.assets.netFrom = 0;
//     this.assets.dueFroms = [];
//     this.liabilities.dueTos = [];
//     if (netTo === netFrom) {
//       this.assets.reserveDeposits += 0;
//       return { id: this.id, action: {} };
//     }
//     if (netTo > netFrom) {
//       const amount = netTo - netFrom;
//       this.assets.reserveDeposits -= amount;
//       return { id: this.id, action: { pay: amount } };
//     }
//     if (netFrom > netTo) {
//       const amount = netFrom - netTo;

//       this.assets.reserveDeposits += amount;
//       return { id: this.id, action: { receive: amount } };
//     }
//   }
//   clearAccount() {
//     const netTo = this.liabilities.netTo;
//     const netFrom = this.assets.netFrom;
//     this.liabilities.netTo = 0;
//     this.assets.netFrom = 0;
//     this.assets.dueFroms = [];
//     this.liabilities.dueTos = [];
//     if (netTo === netFrom) {
//       this.assets.reserveDeposits += 0;
//       return { id: this.id, action: {} };
//     }
//     if (netTo > netFrom) {
//       const amount = netTo - netFrom;
//       this.assets.reserveDeposits -= amount;
//       return { id: this.id, action: { pay: amount } };
//     }
//     if (netFrom > netTo) {
//       const amount = netFrom - netTo;
//       this.assets.reserveDeposits += amount;
//       return { id: this.id, action: { receive: amount } };
//     }
//   }
// }

// class ReserveBank extends NationalBank {
//   constructor(assets, liabilities, records, id) {
//     super(assets, liabilities, records);
//     this.assets = {
//       reserves: 0,
//       reserveOverdrafts: [],
//       bankDeposits: [],
//       dueFroms: [],
//       loans: [],
//       loanInterest: [],
//       overdrafts: [],
//       overdraftFees: [],
//       netFrom: 0,
//     };
//     this.liabilities = {
//       deposits: [],
//       dueTos: [],
//       bankDeposits: [],
//       reserveDeposits: [],
//       bankOverdrafts: [],
//       loans: [],
//       loanInterest: [],
//       netTo: 0,
//     };
//     this.records = {
//       loans: [],
//       overdrafts: [],
//     };
//     this.id = id;
//     this.title = "Reserve Bank";
//   }

//   // createBankAccount(id, amount) {
//   //   this.createAccount(
//   //     id,
//   //     amount,
//   //     this.financialInstruments().liabilitiesReserveDeposits
//   //   );
//   //   this.addReserves(amount);
//   // }
//   createBankAccount(id, amount) {
//     this.createAccount(
//       id,
//       amount,
//       this.financialInstruments().assetsBankDeposits
//     );
//     this.createAccount(
//       id,
//       amount,
//       this.financialInstruments().liabilitiesBankDeposits
//     );
//     // this.addReserves(amount);
//   }

//   createCustomerAccount(id, amount) {
//     this.createAccount(
//       id,
//       amount,
//       this.financialInstruments().liabilitiesDeposits
//     );
//     this.addReserves(amount);
//   }

//   bankDepositReserves(id, amount) {
//     this.transactIn(
//       id,
//       amount,
//       "liabilitiesReserveDeposits",
//       "assetsReserveOverdrafts"
//     );
//     this.addReserves(amount);
//   }
//   bankWithdrawReserves(id, amount) {
//     this.transactOut(
//       id,
//       amount,
//       "liabilitiesReserveDeposits",
//       "assetsReserveOverdrafts"
//     );
//     this.minusReserves(amount);
//   }
//   increaseAssetsDeposits(id, amount) {
//     this.transactIn(
//       id,
//       amount,
//       "assetsBankDeposits",
//       "liabilitiesBankOverdrafts"
//     );
//     this.deleteAccount(id, {
//       category: "assets",
//       instrument: "dueFroms",
//     });
//   }
//   decreaseAssetsDeposits(id, amount) {
//     this.transactOut(
//       id,
//       amount,
//       "assetsBankDeposits",
//       "liabilitiesBankOverdrafts"
//     );
//     this.deleteAccount(id, {
//       category: "liabilities",
//       instrument: "dueTos",
//     });
//   }
//   decreaseLiabilitiesDeposits(id, amount) {
//     this.transactOut(
//       id,
//       amount,
//       "liabilitiesBankDeposits",
//       "assetsBankOverdrafts"
//     );
//     this.deleteAccount(id, {
//       category: "assets",
//       instrument: "dueFroms",
//     });
//   }
// }

// class Customer extends Bank {
//   constructor(assets, liabilities, records, id, bankId) {
//     super(assets, liabilities, records, bankId);
//     this.assets = {
//       deposits: [],
//     };
//     this.liabilities = {
//       overdrafts: [],
//       loans: [],
//     };
//     this.records = {
//       loans: [],
//       overdrafts: [],
//     };
//     this.id = id;
//     this.bankId = bankId;
//     this.cash = 0;
//     this.title = "Customer";
//   }
//   openBankAccount(id, amount) {
//     this.createAccount(id, amount, this.financialInstruments().assetsDeposits);
//   }
//   depositCash(id, amount) {
//     this.transactIn(id, amount, "assetsDeposits", "liabilitiesOverdrafts");
//     this.cash -= amount;
//   }
//   withdrawCash(id, amount) {
//     this.transactOut(id, amount, "assetsDeposits", "liabilitiesOverdrafts");
//     this.cash += amount;
//   }
//   sendTransfer(id, amount) {
//     this.transactOut(id, amount, "assetsDeposits", "liabilitiesOverdrafts");
//   }
//   receiveTransfer(id, amount) {
//     this.transactIn(id, amount, "assetsDeposits", "liabilitiesOverdrafts");
//   }
//   addLoan(id, amount) {
//     let loanAccount = {
//       category: "liabilities",
//       instrument: "loans",
//     };
//     let loanRecords = {
//       category: "records",
//       instrument: "loans",
//     };
//     let foundAccount = this.liabilities.loans.find((acc) => acc.id === id);
//     if (!foundAccount) {
//       this.createAccount(id, amount, loanAccount);
//       this.createAccount(id, amount, loanRecords);
//       this.transactIn(id, amount, "assetsDeposits", "liabilitiesOverdrafts");
//     } else {
//       this.transactIn(id, amount, "assetsDeposits", "liabilitiesOverdrafts");
//     }
//   }
//   repayLoan(id, amount, paymentType) {
//     if (paymentType === "CARD") {
//       this.transactOut(id, amount, "assetsDeposits", "liabilitiesOverdrafts");
//       this.minusCustomerLoan(id, amount, paymentType);
//     }
//     if (paymentType === "CASH") {
//       this.minusCustomerLoan(id, amount, paymentType);
//       this.cash -= amount;
//     }
//   }
//   minusCustomerLoan(id, num, paymentType) {
//     let foundAccount = this.liabilities.loans.find((acc) => acc.id === id);
//     const loanAfterRepayment = foundAccount.amount - num;
//     if (loanAfterRepayment === 0) {
//       this.deleteAccount(id, {
//         category: "liabilities",
//         instrument: "loans",
//       });
//       let foundAccount = this.records.loans.find((acc) => acc.id === id);
//       this.charge(id, foundAccount, paymentType);
//     } else {
//       foundAccount.amount -= num;
//     }
//   }
//   eligibleToCharge(id, interest, paymentType) {
//     let customersAccount = this.findAccount(
//       id,
//       this.financialInstruments()["assetsDeposits"]
//     );
//     if (customersAccount.amount > interest) {
//       return true;
//     } else {
//       return false;
//     }
//   }
//   charge(id, account, paymentType) {
//     const interest = this.interestRate(account.amount);
//     if (paymentType === "CARD") {
//       const eligibleToCharge = this.eligibleToCharge(id, interest);
//       if (eligibleToCharge) {
//         this.transactOut(
//           id,
//           interest,
//           "assetsDeposits",
//           "liabilitiesOverdrafts"
//         );
//       }
//       // this.deleteAccount(id, {category: "records", instrument: "loans"})
//     }
//     if (paymentType === "CASH") {
//       this.assets.cash -= interest;
//     }
//   }
// }

// const customerActions = {
//   linkAccount(customer, bank, amount) {
//     bank.createCustomerAccount(customer.id, amount);
//     customer.openBankAccount(bank.id, amount);
//     customer.bankId = bank.id;
//     customer.cash = 100;
//   },
//   deposit(customer, bank, amount) {
//     customer.depositCash(bank.id, amount);
//     bank.customerDepositCash(customer.id, amount);
//   },
//   withdraw(customer, bank, amount) {
//     customer.withdrawCash(bank.id, amount);
//     bank.customerWithdrawCash(customer.id, amount);
//   },
//   getLoan(customer, bank, amount) {
//     customer.addLoan(bank.id, amount);
//     bank.customerAddLoan(customer.id, amount);
//   },
//   repayLoan(customer, bank, amount, paymentType) {
//     customer.repayLoan(bank.id, amount, paymentType);
//     bank.customerRepayLoan(customer.id, amount, paymentType);
//   },
//   interbankTransfer(c1, c2, b1, b2, amount) {
//     b1.customerSendInterbankTransfer(c1.id, b2.id, amount);
//     c1.sendTransfer(b1.id, amount);
//     b2.customerReceiveInterbankTransfer(c2.id, b1.id, amount);
//     c2.receiveTransfer(b2.id, amount);
//   },
// };

// const bankActions = {
//   linkAccount(b, rb, amount) {
//     rb.createBankAccount(b.id, amount);
//     b.openBankAccount(rb.id, amount);
//   },
//   deposit(b, rb, amount) {
//     b.bankDepositReserves(rb.id, amount);
//     rb.bankDepositReserves(b.id, amount);
//     // b.bankDepositReserves(b.id, amount);
//     // rb.bankDepositReserves(rb.id, amount);
//   },
//   withdraw(b, rb, amount) {
//     b.bankWithdrawReserves(rb.id, amount);
//     rb.bankWithdrawReserves(b.id, amount);
//   },
//   increaseCorrespondingAccounts(bank1, bank2) {
//     bank1.netEach();
//     bank2.netEach();
//     const amount = bank1.assets.dueFroms.find(
//       (acc) => acc.id === bank2.id
//     ).amount;
//     bank1.increaseAssetsDeposits(bank2.id, amount);
//     bank2.increaseLiabilitiesDeposits(bank1.id, amount);
//   },
//   decreaseCorrespondingAccounts(bank1, bank2) {
//     console.log(bank1);
//     console.log(bank2);
//     bank1.netEach();
//     bank2.netEach();

//     const bank1Account = bank1.assets.dueFroms.find(
//       (acc) => acc.id === bank2.id
//     );
//     const bank2Account = bank2.assets.dueFroms.find(
//       (acc) => acc.id === bank1.id
//     );

//     if (bank1Account) {
//       bank2.decreaseAssetsDeposits(bank1.id, bank1Account.amount);
//       bank1.decreaseLiabilitiesDeposits(bank2.id, bank1Account.amount);
//     }
//     if (bank2Account) {
//       bank1.decreaseAssetsDeposits(bank2.id, bank2Account.amount);
//       bank2.decreaseLiabilitiesDeposits(bank1.id, bank2Account.amount);
//     }
//   },
//   totalAccounts(b) {
//     b.totalAccounts(b);
//   },
//   clearAccounts(banks, clearingHouse) {
//     let payments = [];
//     for (const bank in banks) {
//       payments = [...payments, banks[bank].clearAccounts()];
//     }
//     clearingHouse.clearAccounts();
//   },
// };

// const clearingHouseSystem = (num) => {
//   const system = {
//     banks: {},
//     customers: {},
//   };
//   for (let i = 0; i < num; i++) {
//     system.banks[`bank${i}`] = new NationalBank(
//       null,
//       null,
//       null,
//       parseInt(Math.random() * 10000000)
//     );
//     system.customers[`customer${i}`] = new Customer(
//       null,
//       null,
//       null,
//       parseInt(Math.random() * 10000000)
//     );
//     system.customers[`customer${i}${i}`] = new Customer(
//       null,
//       null,
//       null,
//       parseInt(Math.random() * 10000000)
//     );
//     system.banks[`bank${i}`].assets.reserves = 1000;
//     customerActions.linkAccount(
//       system.customers[`customer${i}`],
//       system.banks[`bank${i}`],
//       500
//     );
//     customerActions.linkAccount(
//       system.customers[`customer${i}${i}`],
//       system.banks[`bank${i}`],
//       500
//     );
//   }

//   const clearingHouse = new ClearingHouse();
//   clearingHouse.members = [];
//   for (const bank in system.banks) {
//     clearingHouse.members = [...clearingHouse.members, system.banks[bank]];
//   }

//   return {
//     clearingHouse,
//     system,
//   };
// };

// const chs = clearingHouseSystem(10);
// for (const foo in chs.system.banks) {
//   console.log(foo)
// }
// for (const foo in chs.system.customers) {
//   console.log(foo)
// }

// function toUse() {
//   const random = (thisCustomer, thisBank) => {
//     let customersArray = [];
//     let banksArray = [];
//     for (const customer in chs.system.customers) {
//       customersArray = [...customersArray, chs.system.customers[customer]];
//     }
//     for (const bank in chs.system.banks) {
//       banksArray = [...banksArray, chs.system.banks[bank]];
//     }
//     const randomIndex = Math.round(Math.random() * 2);
//     const otherCustomers = customersArray.filter(
//       (bank) => bank.id !== thisCustomer.id
//     );
//     const otherBanks = banksArray.filter((bank) => bank.id !== thisBank.id);
//     const randomCustomer = otherCustomers[randomIndex];
//     const randomBank = otherBanks[randomIndex];
//     return { randomCustomer, randomBank };
//   };

//   for (let i = 0; i < 5; i++) {
//     const getRandom1 = random(customer1, nationalBank1);
//     const getRandom2 = random(customer2, nationalBank2);
//     const getRandom3 = random(customer3, nationalBank3);
//     const getRandom4 = random(customer4, nationalBank4);
//     customerActions.interbankTransfer(
//       customer1,
//       getRandom1.randomCustomer,
//       nationalBank1,
//       getRandom1.randomBank,
//       Math.round(Math.random() * 150) + 1
//     );
//     customerActions.interbankTransfer(
//       customer2,
//       getRandom2.randomCustomer,
//       nationalBank2,
//       getRandom2.randomBank,
//       Math.round(Math.random() * 150) + 1
//     );
//     customerActions.interbankTransfer(
//       customer3,
//       getRandom3.randomCustomer,
//       nationalBank3,
//       getRandom3.randomBank,
//       Math.round(Math.random() * 150) + 1
//     );
//     customerActions.interbankTransfer(
//       customer4,
//       getRandom4.randomCustomer,
//       nationalBank4,
//       getRandom4.randomBank,
//       Math.round(Math.random() * 150) + 1
//     );
//   }
// }
