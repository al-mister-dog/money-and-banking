import { Box, Typography } from "@material-ui/core";

const ChapterOne = () => {
  return (
    <>
      <Box style={{ padding: "25px", width: "80%", margin: "auto" }}>
        <Typography variant="h5" style={{ marginBottom: "25px" }}>
          2: Reserve Requirement
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          One way to avoid this problem is to have a legally mandated reserve.
          In America before the Federal Reserve Act, banks were required to have
          in their reserves an amount of money equal to a quarter of their
          liabilities. If a bank had $10,000 of liabilities, it would be legally
          required to have on site $2,500 in reserves, which was considered a
          sufficient amount to meet daily requirements.
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          In such a system, a bank may have much of its assets stored as
          deposits in a larger bank. The smaller bank could redeem these
          deposits as cash from the larger bank, much in the same way a customer
          can redeem their deposits from the smaller bank.
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          If the bank went below this minimum requirement, it would be unable to
          give out loans to customers until its reserves went back above the
          legal requirement. One way to replenish its reserves would be to
          redeem its deposits at the larger bank.
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
          Here we have two banks. Bank 1 (in this system a Country Bank or
          National Bank), and a larger reserve bank. Bank 1 needs to withdraw
          some of its reserves that it is holding at the reserve bank in order
          to have the legal requirements of reserves neccessary to dole out
          loans to its customers again. Let's try it out. In this world, the
          legal minimum reserve is 25% (1/4 of total deposits).
        </Typography>
      </Box>
    </>
  );
};

export default ChapterOne;
