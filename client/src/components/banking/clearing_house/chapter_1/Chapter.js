import { Box, Typography } from "@material-ui/core";

const ChapterOne = () => {
  return (
    <>
      <Box style={{ padding: "25px", width: "80%", margin: "auto" }}>
        <Typography variant="h5" style={{ marginBottom: "25px" }}>
          1: Transfers Revisited
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          In the first module we had a brief look at transfers between banks and
          noted that although the customer's deposits have changed, the banks
          reserves remain the same. This is obviously due to the fact that when
          a bank transfer takes place, whether by cheque or electronically, the
          cash doesn't magically travel to the bank along with the deposits! But
          the bank that receives the transfer now has the added responsibility
          of having those extra deposits as liabilities on its balance sheet.
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          Instead of having to take the cash from one bank to another, the bank
          receiving the transfer will keep a record of the bank that transfered
          over the deposits along with the amount. The bank that transfered the
          deposit now owes the same amount to the other bank in reserves, and
          keeps a record of this too. Each time a transaction takes place, a new
          record is created. In the next section we will explore how the two
          banks will settle their accounts.
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
          Here we have two customers, each with an account in a separate bank.
          Get them to transfer each other deposits and see which bank owes what
          to who...
        </Typography>
      </Box>
    </>
  );
};

export default ChapterOne;
