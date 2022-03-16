import { useSelector } from "react-redux";
import { countriesSelector } from "../../features/countries/countriesSlice";
import { Typography, makeStyles } from "@material-ui/core";
import PerformanceMapChart from "../../components/performance/MapChart";

const useStyles = makeStyles(() => ({
  title: {
    overflow: "hidden",
    "@media (max-width: 620px)": {
      fontSize: "1.7rem",
    },
  },
}));

export default function BalanceOfPayments({ keysData }) {
  const classes = useStyles();
  const { countries } = useSelector(countriesSelector);
  const keys = keysData.balanceOfPayments;
  return (
    <>
      <Typography variant="h4" align="left" className={classes.title}>
        Balance of Payments
      </Typography>

      <PerformanceMapChart countries={countries} keys={keys} />
    </>
  );
}
