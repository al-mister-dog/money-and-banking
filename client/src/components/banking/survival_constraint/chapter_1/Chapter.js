import { Box, Typography } from "@material-ui/core";

const ChapterOne = () => {
  return (
    <>
      <Box style={{ padding: "25px", width: "80%", margin: "auto" }}>
        <Typography variant="h5" style={{ marginBottom: "25px" }}>
          1: Bank Runs
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          The first banking system we looked at was very simple. Customers would
          deposit their cash, which was stored in the bank as reserves, ready to
          give back to customers on demand. This is all well and good for the
          customers but in the real world the bank would gain nothing from this
          situation. A commercial bank exists to make a profit for its owners
          and shareholders, and uses its assets to sell or to invest in the hope
          of gaining more profit. (A commerical bank may also store its cash
          reserves in a larger bank, like a central bank.)
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          With this being the case, banks run the risk of not having enough
          reserves to meet its customer's demands for redeeming their deposits
          in cash. A worst case scenario would be for every customer to demand
          their money at once, quickly draining the bank's reserves and making
          the bank insolvent (the bank would lose its customers, clients and
          have no money left to invest). This is known as a 'run on the bank'.
          This is unlikely, yet a bank still needs to make sure it has enough
          reserves to meet its customer's demands on a day to day basis. We will
          look at various ways banks can deal with such constraints.
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
          Let's simulate a run on the bank! Have the bank's customers withdraw
          all their money. After all, its theirs right?
        </Typography>
      </Box>
    </>
  );
};

export default ChapterOne;
