import { Box, Typography } from "@material-ui/core";

const ChapterOne = () => {
  return (
    <>
      <Box style={{ padding: "25px", width: "80%", margin: "auto" }}>
        <Typography variant="h5" style={{ marginBottom: "25px" }}>
          4: Clearing House
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          In a system of bilateral bank payments, any individual bank may at the
          same time be making payments to one bank while receiving payments from
          another. Obviously it would advantageous to devise a system where the
          bank only had to pay the net across all its correspondents. One simple
          way that kind of system develops is when all banks hold correspondent
          balances in only one bank, and use those balances to clear. You can
          see how that goes some way toward creating a one-bank payment system.
        </Typography>
        <Typography
          component="div"
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          This system utilizes the clearinghouse, in which banks of
          approximately equal stature in the hierarchy come together to form a
          mutual organization, owned by their members in proportion to capital
          subscribed. A real example, founded in 1853, is the New York
          Clearinghouse Association (now CHIPS). Capital is subscribed in gold
          or other legal reserve, and determines initial holdings of of money
          (which in this case are clearinghouse certificates, more on this
          later). Subsequently, members treat all sums due to or from other
          members as due to or from the clearinghouse. During the day all
          members net payments multilaterally with all other members, building
          up intraday credit or debit balances against the clearinghouse. At the
          end of the day each member makes or receives only a net payment,
          depending on whether the net is negative or positive.
        </Typography>
        <Typography
          component="div"
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        ></Typography>
        <Typography
          component="div"
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          This is no different than what happens when customers transfer
          deposits to other customers of the same bank, because no deposits ever
          leave the bank. Rather, the proportions of the customer accounts
          change. The amount of total deposits of the bank remain static. In the
          Clearing House - Member Bank system, the amount of reserve deposits in
          the clearing house remain the same, while just the proportion of
          reserve deposits change among the member banks. The clearing house
          acts like a bank for other banks, it is a bank that is a step above in
          the hierarchy of financial institutions.
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
          Here we have four banks, that have received a number of transfers
          between them throughout the day. First of all net the totals and see
          whether a bank is owed or due payment. Then clear this amount at the
          Clearing House. Notice that the Clearing House's assets and
          liabilities will always equal the same amount.
        </Typography>
      </Box>
    </>
  );
};

export default ChapterOne;
