import { connect } from "react-redux";
import {
  Paper,
  Box,
  Typography,
  makeStyles,
} from "@material-ui/core";

import PerformanceMapChart from "../../components/performance/MapChart";

const useStyles = makeStyles(() => ({
  container: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    overflowX: "hidden",
  },
  title: {
    overflow: "hidden",
    "@media (max-width: 620px)": {
      fontSize: "1.7rem",
    },
  },
  tab: {
    "@media (max-width: 620px)": {
      width: "0.5rem",
      fontSize: "0.4rem",
    },
  },
  paper: {
    backgroundColor: "#fdfbf7",
    width: "70vw",
    margin: "auto",
    marginTop: "2rem",
    padding: "25px",
    "@media (max-width: 620px)": {
      width: "100vw",
      padding: "5px",
    },
  },
  box: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
  },
}));

function GovernmentFinance({countries, keysData}) {
  const classes = useStyles();
  const keys = keysData.govFinance
  return (
    <>
    <Typography variant="h4" align="left" className={classes.title}>
      Government Finance
    </Typography>

    <PerformanceMapChart countries={countries} keys={keys} />
  </>
  );
}
const mapStateToProps = (state, ownProps) => {
  return {
    countries: state.countriesData,
    keysData: ownProps.keysData,
    inflationTarget: state.inflationTarget,
  };
};

export default connect(mapStateToProps)(GovernmentFinance);