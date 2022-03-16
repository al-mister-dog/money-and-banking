import { useState } from "react";
import { Box, Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  grid: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
  },
}));
export default function Balances() {
  const classes = useStyles();
  const [balances, setBalances] = useState([
    {
      asset: {
        name: "initial deposit",
        type: "liquid",
        amount: 250000,
      },
      liability: {
        name: "initial deposit",
        type: "liquid",
        amount: 250000,
      },
    },
  ]);

  function buy() {
    const asset = {
      name: "truck",
      type: "long term",
      amount: 250000,
    };
    const liability = {
      name: "credit",
      type: "liquid",
      amount: 250000,
    };
    setBalances([...balances, { asset, liability }]);
  }
  return (
    <>
      <Typography>Balances</Typography>
      <Box className={classes.grid}>
        <Typography>Assets</Typography>
        <Typography>Liabilities</Typography>
      </Box>
      <Box className={classes.grid}>
        {balances.map((balance) => {
          const { asset, liability } = balance;
          return (
            <>
              <Typography>
                {asset.name}: {asset.amount}
              </Typography>
              <Typography>
                {liability.name}: {liability.amount}
              </Typography>
            </>
          );
        })}
      </Box>

      <Button onClick={buy}>Buy Truck</Button>
    </>
  );
}
