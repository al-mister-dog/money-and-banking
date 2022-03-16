import { Box, Typography } from "@material-ui/core";

const ChapterOne = () => {
  return (
    <>
      <Box style={{ padding: "25px", width: "80%", margin: "auto" }}>
        <Typography variant="h5" style={{ marginBottom: "25px" }}>
          3: Interbank Loans
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          Another way to deal with insufficient reserves it to borrow from the
          interbank lending market. These are short term loans made between
          banks to help banks maintain liquidity. Liquidity means having quick
          access to liquid assets like cash which banks need to meet customer
          demands. An asset is liquid when it can be used as a fast and
          efficient form of payment. Cash is the most liquid asset while
          something like a house is less liquid.
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          Every day a bank will check its ratio of liquid assets to predicted
          customer demand, and if the bank thinks it will not be able to meet
          these requirements it will borrow money from another bank on the
          overnight market (an interbank market for short term money loans).
          Conversely if a bank thinks it has a comfortable surplus of liquid
          assets, it will loan/sell money on the overnight market and gain a
          small interest payment. (These interest payments are based on the
          interbank interest rate, a large topic which will be covered later and
          has been the center of financial controversies!.)
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
          Here are some banks, with varying degrees of liquidity. Some might
          want to borrow on the overnight market, and some may want to sell on
          the overnight market. In this world the hand is invisible and the
          regulation non existent. Set interest rates to whatever you please and
          let chaos reign!
        </Typography>
      </Box>
    </>
  );
};

export default ChapterOne;
