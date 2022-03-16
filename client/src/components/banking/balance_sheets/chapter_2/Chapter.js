import { Box, Typography } from "@material-ui/core";

const ChapterTwo = () => {
  return (
    <>
      <Box style={{ padding: "25px", width: "80%", margin: "auto" }}>
      <Typography variant="h5" style={{marginBottom: "25px"}}>2: Deposit Transfers</Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          We have seen how a bank takes a customer's money and exchanges them
          for deposits. On the bank's balance sheet, the deposits are counted as
          liabilities and the cash is part of the reserves on the assets side of
          the balance sheet.
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          If a bank has two customers, both depositing £100, the bank would have
          £200 in reserves and £200 of deposits, which the bank owes to its
          customers. If Customer One transfered some of their deposits to
          Customer Two, no change would occur in the bank's total assets or
          liabilities, even though a change between the accounts of customer One
          and customer Two has occured.
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
          Here we have a bank with two customers, who have 100 pounds in cash
          ready to be deposited at the bank. Watch what happens to the bank’s
          balance sheet and the customers' accounts when they transfer their
          money to eachother.
        </Typography>
      </Box>
    </>
  );
};

export default ChapterTwo;
