import { Box, Typography } from "@material-ui/core";

const ChapterThree = () => {
  return (
    <>
      <Box style={{ padding: "25px", width: "80%", margin: "auto" }}>
      <Typography variant="h5" style={{marginBottom: "25px"}}>3: Transfering Deposits Between Different Banks</Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          We have seen how two customers of the same bank can transfer deposits
          with eachother without an increase or decrease in the bank's assets or
          liabilities. But what happens when a customer from one bank transfers
          deposits to a customer from another bank?
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          The bank of the customer sending the deposits (Bank One) transfers
          them to the bank of the customer receiving the deposits (Bank Two),
          finally into their account. This deposit is removed from the
          liabilities of Bank One, meaning they now owe less deposits than
          previously. Their assets however remain the same. Bank Two however
          adds the deposits to their liabilities, meaning they owe more deposits
          than previously, while their assets also remain the same. This means
          that Bank One has a surplus of assets while Bank Two has a deficit.
          This also means that potenitally, Bank Two will not have enough
          reserves to pay its customers on demand. This is key to banking, and
          will be covered later.
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
          Here we have a bank with three customers, who have 100 pounds in cash
          ready to be deposited at their respective banks. Watch what happens to the banks'
          balance sheets and the customers' accounts when they transfer their
          money to eachother and across different banks.
        </Typography>
      </Box>
    </>
  );
};

export default ChapterThree;
