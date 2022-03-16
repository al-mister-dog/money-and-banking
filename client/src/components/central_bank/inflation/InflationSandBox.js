import { Box, makeStyles, Typography } from "@material-ui/core";
import CpiWeightAndPrice from "./CpiWeightAndPrice";
import InflationChangeRedux from "./InflationChangeRedux";
import InflationRateRedux from "./InflationRateRedux";

const useStyles = makeStyles((theme) => ({
  textTitle: {
    padding: "25px",
  },
  textIntro: {
    padding: "25px 0 25px 0",
    "@media (max-width: 620px)": {
      fontSize: "0.8rem",
    },
  },
  paragraphText: {
    fontSize: "1rem",
    "@media (max-width: 620px)": {
      padding: "5px",
      fontSize: "0.7rem",
    },
  },
  box: {
    width: "100%",
    border: "1px solid #d7d7d7",
    borderRadius: "5px",
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 620px)": {
      width: "100%",
    },
  },
  containerCharts: {
    display: "flex",
    borderRadius: "5px",
    paddingBottom: "70px",
    "@media (max-width: 620px)": {
      flexDirection: "column",
    },
  },
  containerCpiWeight: {
    // marginTop: "30px",
    display: "flex",
    flexDirection: "column",
  },
}));
export default function InflationSandBox() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.box}>
      <CpiWeightAndPrice />
        
        <Box
          className={classes.containerCharts}
          style={{ marginBottom: "25px" }}
        >
          <InflationChangeRedux />
          <InflationRateRedux />
        </Box>
        
      </Box>
    </>
  );
}
