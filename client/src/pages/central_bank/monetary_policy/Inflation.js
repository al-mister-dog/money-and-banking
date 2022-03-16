import { Box, makeStyles, Typography } from "@material-ui/core";

import CpiPriceCalculator from "../../../components/central_bank/inflation/CpiPriceCalculator";
import CpiWeightCalculator from "../../../components/central_bank/inflation/CpiWeightCalculator";
import InflationChange from "../../../components/central_bank/inflation/InflationChange";
import InflationRate from "../../../components/central_bank/inflation/InflationRate";
import InflationSandBox from "../../../components/central_bank/inflation/InflationSandBox";
const useStyles = makeStyles((theme) => ({
  textTitle: {
    padding: "25px",
    fontWeight: "bold",
    "@media (max-width: 620px)": {
      fontSize: "1.5rem",
    },
  },
  textSubHeading: {
    padding: "25px 0 25px 0",
    fontWeight: "bold",
    "@media (max-width: 620px)": {
      fontSize: "1.3rem",
    },
  },
  textIntro: {
    padding: "25px 0 25px 0",
    "@media (max-width: 620px)": {
      fontSize: "0.8rem",
    },
  },
  textArticle: {
    padding: "25px 0 25px 0",
    "@media (max-width: 620px)": {
      fontSize: "0.8rem",
    },
  },
  containerArticle: {
    padding: "0 6rem 0 6rem",
    "@media (max-width: 620px)": {
      padding: "0 1rem 0 1rem",
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
    display: "flex",
    flexDirection: "column",
    "@media (max-width: 620px)": {
      width: "90%",
    },
  },
  containerCharts: {
    display: "flex",
    border: "1px solid #d7d7d7",
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
export default function InflationHome() {
  const classes = useStyles();
  return (
    <>
      <Box className={classes.containerArticle}>
        <Typography variant="h4" className={classes.textTitle}>
          Inflation
        </Typography>
        <hr></hr>
        <Typography align="justify" className={classes.textIntro}>
          Inflation is the decline of purchasing power of a given currency over
          time. A quantitative estimate of the rate at which the decline in
          purchasing power occurs can be reflected in the increase of an average
          price level of a basket of selected goods and services in an economy
          over some period of time (eg. Consumer Price Index or CPI).
        </Typography>
      </Box>

      <Box className={classes.box}>
        <Box
          className={classes.containerCharts}
          style={{ marginBottom: "25px" }}
        >
          <InflationChange />
          <InflationRate />
        </Box>
        <Box
          className={classes.containerCpiWeight}
          style={{ marginBottom: "25px" }}
        >
          <Box className={classes.containerArticle}>
            <Typography
              className={classes.textSubHeading}
              align="left"
              variant="h4"
            >
              Consumer Price Index
            </Typography>
            <Typography align="justify" className={classes.textArticle}>
              The Consumer Price Index (CPI) is a measure that examines the
              weighted average of prices of a basket of consumer goods and
              services, such as transportation, food, and medical care. It is
              calculated by taking price changes for each item in the
              predetermined basket of goods and averaging them. Changes in the
              CPI are used to assess price changes associated with the cost of
              living. The CPI is one of the most frequently used statistics for
              identifying periods of inflation or deflation.
            </Typography>
            <Typography
              className={classes.textSubHeading}
              align="left"
              variant="h5"
            >
              CPI Price
            </Typography>
            <Typography align="justify" className={classes.textArticle}>
              Prices may increase for a number of reasons. They can be roughly
              divided into two categories: cost-push and demand-pull.
              Demand-pull inflation is when consumer demand outpaces the
              available supply of many types of consumer goods. Inflation sets
              in, forcing an overall increase in the cost of living. Cost-push
              inflation is when supply costs rise or supply levels fall. Either
              will drive up prices—as long as demand remains the same. Shortages
              or cost increases in labor, raw materials, and capital goods
              create cost-push inflation. These components of supply are also
              part of the four factors of production.
            </Typography>
          </Box>

          <CpiPriceCalculator />
          <Box className={classes.containerArticle}>
            <Typography
              className={classes.textSubHeading}
              align="left"
              variant="h5"
              style={{ marginTop: "25px" }}
            >
              CPI Weight
            </Typography>
            <Typography
              align="justify"
              className={classes.textArticle}
              style={{ marginBottom: "25px" }}
            >
              The weights are based on the relative importance of the product to
              households – for example, if a household spends 8% of their income
              on chocolate, and 25% on transport, the weights would be 8 and 25
              respectively. However this is usually an estimate by economists.
              At moments of structural change, it is the weighting schemes that
              are used to construct price indices that come under pressure.
              Price index numbers are based on the assumption that the
              proportion of spending on food, clothing, housing, travel etc
              remain relatively constant over time. Statisticians face a dilemma
              as to whether to hold the share of different goods in the
              consumption basket constant, or whether to adjust to the new
              circumstances. Transport spending is down, whereas other goods and
              services are up. Unsurprisingly, the prices for transport services
              are rising less fast than for everything else. If you adjust the
              weights to downgrade the lower level of spending on travel, you
              produce a higher inflation number.
            </Typography>
          </Box>

          <CpiWeightCalculator />
        </Box>
        <Box>
          <Typography
            align="justify"
            className={classes.paragraphText}
            style={{ margin: "25px 0 25px 0", fontWeight: "bold" }}
          >
            Try adjusting the price changes and cpi weight and see the effect on
            the inflation rate and change in future years.
          </Typography>
          <InflationSandBox />
        </Box>
      </Box>
    </>
  );
}
/**
 * show inflation rate over time
 * show cpi index
 * cpi index shows price change
 * toggle cpi index
 */
