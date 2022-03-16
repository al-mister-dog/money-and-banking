import { Box, Typography } from "@material-ui/core";

const ChapterOne = () => {
  return (
    <>
      <Box style={{ padding: "25px", width: "80%", margin: "auto" }}>
        <Typography variant="h5" style={{marginBottom: "25px"}}>1: Balance Sheets and Deposits</Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          We will first examine a very simplified bank balance sheet. It looks
          like a T, and on either side of this T, is the bank’s assets and the
          bank’s liabilities. Assets are what the bank owns, and liabilities are
          what the bank owes to others. In this example, a bank’s assets are
          cash and its liabilities are deposits. What is the difference between
          cash and deposits?
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          It seems like common sense to assume when we deposit cash at the bank,
          the money is waiting there for us somewhere as cash to withdraw. The
          truth is a little more complicated, but not too much. When a customer
          puts their money in a bank, they receive a deposit in return. A
          deposit is actually different to the cash that the customer puts in
          the bank. A deposit means money that the bank owes to its customer,
          and which the customer can demand at any point to be redeemed in cash.
          Deposits and cash exchange at par, which means one pound deposit is
          worth one pound sterling (UK), which is why they appear the same to us
          (in truth they only exchange at par thanks to a lot of work going on
          behind the scenes). According to the Bank of England, only 4% of the
          money in the UK is cash; 96% is deposits.
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          What makes the cash that the bank receives an asset? When the bank
          receives a customer’s cash, it becomes an asset of the bank, meaning
          they can use it to invest in various ways and return a profit. On the
          balance sheet below we see that a bank’s asset is cash, and a bank’s
          liability is the deposit. In this example, assets and liabilities
          equal the same amount.
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
          Here we have a bank with a customer, who has 100 pounds in cash ready
          to be deposited at the bank. Watch what happens to the bank’s balance
          sheet and the customer’s account when they deposit or withdraw their
          money.
        </Typography>
      </Box>
    </>
  );
};

export default ChapterOne;
