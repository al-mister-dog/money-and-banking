const keysData = {
  govFinance: [
    {
      name: "generalGovTotalExp",
      label: "General Government Total Expenditure",
      unit: "percent",
      category: "government finance",
    }, 
    { 
      name: "generalGovRevenue",
      label: "General Government Revenue",
      unit: "percent",
      category: "government finance"
    },
    { 
      name: "generalGovNetLendBorrow",
      label: "General Government Net Lending/Borrowing",
      unit: "percent",
      category: "government finance"
    },
    { 
      name: "generalGovStrucBal",
      label: "General Government Structural Balance",
      unit: "percent",
      category: "government finance"
    },
    { 
      name: "genGovNetPriLenBor",
      label: "General Government Net Primary Lending/Borrowing",
      unit: "percent",
      category: "government finance"
    },
    { 
      name: "generalGovGrossDebt",
      label: "General Government Gross Debt",
      unit: "percent",
      category: "government finance"
    },
  ],
  balanceOfPayments: [
    { 
      name: "currentAccBal",
      label: "Current Account Balance",
      unit: "billion",
      category: "balance of payments"
    },
    { 
      name: "currentAccBalGDP",
      label: "Current Account Balance GDP",
      unit: "percent",
      category: "balance of payments"    
    },
  ],
  monetary: [
    {
      name: "inflationAvgCP",
      label: "Inflation Average Consumer Prices",
      unit: "percent",
      category: "monetary",
    },
    {
      name: "inflationEndOfPeriodCP",
      label: "Inflation Average End of Period Consumer Prices",
      unit: "percent",
      category: "monetary",
    },
  ],
  nationalAccounts: [
    {
      name: "gdpConstPricePct",
      label: "Real GDP Growth",
      unit: "percent",
      category: "national accounts",
    },
    {
      name: "ppp",
      label: "Purchasing Power Parity",
      unit: "billion",
      category: "national accounts",
    },
    {
      name: "gdpConstPrice",
      label: "Gross Domestic Product",
      unit: "billion",
      category: "national account",
    },
  ],
  trade: [
    {
      name: "exportVolGdsSvcs",
      label: "Export Volume of Goods and Services",
      unit: "percentChange",
      category: "trade",
    },
    {
      name: "exportVolGds",
      label: "Export Volume of Goods",
      unit: "percentChange",
      category: "trade",
    },
    {
      name: "importVolGdsSvcs",
      label: "Import Volume of Goods and Services",
      unit: "percentChange",
      category: "trade",
    },
    {
      name: "importVolGds",
      label: "Import Volume of Goods",
      unit: "percentChange",
      category: "trade",
    },
  ],
  people: [
    {
      name: "unemployment",
      label: "Unemployment: Percent of Labor Force",
      unit: "percent",
      category: "people",
    },
  ]
}

export default keysData