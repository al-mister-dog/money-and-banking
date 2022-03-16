import { Box, Typography } from "@material-ui/core";

const ChapterOne = () => {
  return (
    <>
      <Box style={{ padding: "25px", width: "80%", margin: "auto" }}>
        <Typography variant="h5" style={{ marginBottom: "25px" }}>
          2: Netting Accounts
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          As more customers make more transfers to customers from other banks,
          the more records of moneys due to and from different banks add up. It
          would be tiresome if the banks had to honour these payments every day,
          especially as when all the transfers to and from have been added up
          Bank A may not even technically owe Bank B anything!
        </Typography>
        <Typography
          component="div"
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          Instead, Bank A could sum up the total of transfers to and from Bank
          B, netting the payments to and from, then if due tos are more than due
          froms, Bank A pays only the net. The vice versa would be true for Bank
          B. For example if the total of transfers{" "}
          <Box fontStyle="italic" fontWeight="bold" display="inline">
            to
          </Box>{" "}
          Bank B were £2500 and the total of transfers{" "}
          <Box fontStyle="italic" fontWeight="bold" display="inline">
            from
          </Box>{" "}
          bank B were £2000, Bank A would just pay Bank B £500. This could be
          called “bilateral intraday netting”, or "correspondent banking".
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
          Make some transfers and look at the due tos and due froms on the banks' balance sheets. Then net these accounts to reduce them to their totals.
        </Typography>
      </Box>
    </>
  );
};

export default ChapterOne;
