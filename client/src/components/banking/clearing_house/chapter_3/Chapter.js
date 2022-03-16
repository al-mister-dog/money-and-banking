import { Box, Typography } from "@material-ui/core";

const ChapterOne = () => {
  return (
    <>
      <Box style={{ padding: "25px", width: "80%", margin: "auto" }}>
        <Typography variant="h5" style={{ marginBottom: "25px" }}>
          3: Correspondent Banking
        </Typography>
        <Typography
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          Now the banks have sorted out who owes what in a more efficient manner
          it's time to settle these accounts. The first way we shall look at is
          called correspondent banking.
          <Box fontStyle="italic" fontSize="0.7rem" display="inline">
            {" "}
            (For this series, we are looking at correspondent banking as a trade
            between two banks in one country, specifically in America before
            central banking. But Correspondent Banking still exists today, for
            example by banks that trade internationally on behalf of companies
            in their respective countries, which usually falls outside the remit
            of central banks.)
          </Box>
        </Typography>
        <Typography
          component="div"
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          We now have two banks who have a list of transfers to and from each
          other, and now have to settle their accounts. Instead of shifting gold
          or currency across banks, "correspondent balances" will be
          transferred. The two banks could hold their own accounts with each
          other, and for as long as they are not in dire need of reserves
          straight away, they can debit or credit each others' bank deposit
          accounts. Bank deposits accounts are deposit accounts that banks hold
          with other banks. Just like Customer A can hold a bank account with
          Bank A, Bank A can hold a bank account with bank B.
        </Typography>
        <Typography
          component="div"
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          Let us say that Bank A has a deposit account with Bank B of £1000, and
          Bank B has a deposit account with Bank A of £1000. Both banks now owe
          each other bank £1000. If after netting their accounts, Bank A finds
          it owes Bank B, Bank A can pay Bank B by decreasing its balances held
          at Bank B. This would subtract bank deposits from Bank B's
          liabilities, making up for the increase in Bank B's customer deposits.
          In simple terms, Bank A makes it so Bank B owes Bank A less in so far
          as its bank deposits account. Alternatively, it could increase its own
          assets deposit account held by B, creating an increase in Bank B's
          bank deposits on the assets side of its balance sheet. In simple
          terms, Bank A makes it so Bank A owes Bank B more in so far as its
          bank deposits account. These are also knowns as 'swaps of IOUs'. In
          the next section we will see an even more efficent way of dealing with
          these accounts.
        </Typography>
        <Typography
          component="div"
          variant="body1"
          align="justify"
          style={{ marginBottom: "15px", fontSize: "0.8rem" }}
        >
          In practice, the choice between these two methods is always resolved
          so that the more central bank accepts deposits from the less central.
          In this case, the more central bank never owes the smaller bank any
          more than it had originally held in its account. In the US case before
          the Fed it was country banks holding deposits with city banks. In The
          US, these reserve cities survive as the cities with one of the twelve
          Federal Reserve Banks.
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
          One bank is a larger reserve bank. Make some transfers and net the
          totals due from and due to each bank. Then settle the accounts. If the
          larger bank owes the smaller bank, the balances can decrease. If the
          smaller bank owes the larger bank, the balances can decrease or
          increase.{" "}
          <Box fontStyle="italic" fontSize="0.7rem" display="inline">
            {" "}
            (Notice that debiting the accounts decreases the amount of credit
            that exists, and creditting the account increases the amount of
            credit that exists. This is one of the many ways that the amount of
            money in the system fluctuates. More on this later.)
          </Box>
        </Typography>
      </Box>
    </>
  );
};

export default ChapterOne;
