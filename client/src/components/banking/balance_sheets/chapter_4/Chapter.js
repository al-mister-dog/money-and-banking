import { Box, Typography } from "@material-ui/core";

const ModuleThree = () => {
  return (
    <>
      <Box style={{ padding: "25px", width: "75%", margin: "auto" }}>
        <Typography variant="h5" style={{marginBottom: "25px"}}>4: Loans and Repayments</Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          We have seen two ways that banks can increase or decrease their assets
          and liabilities. But there is one more way, which is through a loan.
          There are many types of loan, but we will begin with a simple customer
          loan plus interest. When a bank agrees to give a customer a loan, they
          add deposits into the customer's account, which the customer can use
          to spend or to invest. This loan results in extra deposits on the
          bank's liability side of the balance sheet. But it is also an asset.
          This is because the loan represents future money at interest.
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          In this example the loan given to the borrower has a simple interest
          of 10%, meaning the borrower will eventually have to pay the original
          amount (the principal) plus an extra tenth of the principal (10%) back
          to the bank. If the borrower pays back the loan plus interest from
          their deposit account, then the bank's balance sheet represents that
          as a reduction in liabilities, which is also represented as a
          reduction in deposits in the borrower's account. If the borrower pays
          back the loan plus interest in cash not from their account, the
          cash becomes an asset of the bank.
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          You may notice that when the loan is taken out, the total money of the
          bank and borrower increases. And when the loan is paid back, that
          amount decreases. This is called an expansion and contraction of
          credit, or an expansion and contraction of the total money supply.
          Contraction occurs on redemption of credit.
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{
            marginBottom: "15px",
            fontWeight: "bold",
            fontSize: "0.8rem",
          }}
        >
          Here we have a bank with one customer, who has 100 pounds in cash
          ready to be deposited at their bank. Watch what happens to the bank's
          balance sheet and the customer's account when they take out a loan and
          (eventually) repay it.
        </Typography>
      </Box>
    </>
  );
};

export default ModuleThree;
