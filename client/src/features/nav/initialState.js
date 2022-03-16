const initialState = {
  departments: [
    {
      name: "Treasury",
      path: "treasury",
      menuItems: [
        { title: "Overview", path: "overview", menuItems: [] },
        { title: "Budget", path: "budget", menuItems: [] },
        // { title: "Balances", path: "balances", menuItems: [] },
      ],
    },
    { name: "Banking", path: "banking", title: "Banking",
  menuItems: [
    { title: "Overview", path: "overview", menuItems: [] },
    { title: "1: Balance Sheets", path: "balance-sheets", menuItems: []},
    { title: "2: Survival Constraint", path: "survival-constraint", menuItems: []},
    { title: "3: A Clearing House", path: "clearing-house", menuItems: []},
  ]},
    {
      name: "Central Bank",
      path: "centralbank",
      title: "Central Bank",
      menuItems: [
        { title: "Overview", path: "overview", menuItems: [] },
        {
          title: "Monetary Policy",
          path: "monetarypolicy",
          menuItems: [
            { title: "Desk", path: "desk" },
            { title: "Interest", path: "interest" },
            { title: "Inflation", path: "inflation" },
            // { title: "Quantitative Easing", path: "quantitativeeasing" },
            // { title: "Forward Guidance", path: "forwardguidance" },
          ],
        },
        // {
        //   title: "Financial Policy",
        //   path: "financialpolicy",
        //   menuItems: [],
        // },
        // { title: "Regulation", path: "regulation", menuItems: [] },
        // { title: "Reserves", path: "reserves", menuItems: [] },
      ],
    },
    {
      name: "Bloc",
      path: "bloc",
      title: "Bloc",
      menuItems: [
        { title: "Overview", path: "overview", menuItems: [] },
        { title: "Trade", path: "trade", menuItems: [] },
        { title: "Alliance", path: "alliance", menuItems: [] },
      ],
    },
    {
      name: "Performance",
      path: "performance",
      menuItems: [
        { title: "Overview", path: "overview", menuItems: [] },
        {
          title: "Balance of Payments",
          path: "balanceofpayments",
          menuItems: [],
        },
        {
          title: "Government Finance",
          path: "governmentfinance",
          menuItems: [],
        },
        { title: "Monetary", path: "monetary", menuItems: [] },
        { title: "National Accounts", path: "nationalaccounts", menuItems: [] },
        { title: "People", path: "people", menuItems: [] },
        { title: "Trade", path: "trade", menuItems: [] },
      ],
    },
  ],
  department: "",
  departmentOperation: "",
};

export default initialState;
