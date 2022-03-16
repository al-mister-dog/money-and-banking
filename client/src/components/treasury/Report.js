import { Box, Typography, Button, makeStyles } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  hmReportTitle: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    width: "75%",
    "@media (max-width: 620px)": {
      width: "100%"
    },
  },
  logoAndButton: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    // fontWeight: "bold",
    // fontSize: "1.6rem",
    marginLeft: 10,
    overflow: "hidden",
    "@media (max-width: 620px)": {
      fontSize: "1rem",
      marginBottom: "5px",
      height: "50%",
    },
  },
  totals: {
    display: "flex",
    justifyContent: "space-around",
    "@media (max-width: 620px)": {
      // flexDirection: "column",
      flexWrap: "wrap",
      margin: "auto",
      marginTop: "15px"
    },
  },
  text: {
    fontWeight: "bold",
    color: "#808080",
    "@media (max-width: 620px)": {
      justifyContent: "space-between",
      fontSize: "0.6rem",
      marginLeft: "25px"
    },
  },
  textNum: {
    fontWeight: "bold",
    fontSize: "1.2rem",
    "@media (max-width: 620px)": {
      justifyContent: "space-between",
      fontSize: "0.6rem",
      marginLeft: "25px"
    },
  },
  submitBtn: {
    minWidth: "10rem",
    "@media (max-width: 620px)": {
      marginTop: "25px"
    },
  },
}));
export default function HmReport({ budget, settingBudget, setAnnualBudget }) {
  const classes = useStyles();
  const { year, revenue, expenditure, deficit, long_term_deficit } =
    budget[budget.length - 1];
  return (
    <>
      <Box className={classes.hmReportTitle}>
        <Typography variant="h4" className={classes.title} align="left">
          Year: {year}
        </Typography>
        <Box className={classes.totals}>
          <Box>
            <Typography
              className={classes.text}
              variant="subtitle1"
              align="left"
            >
              Tax Revenue
            </Typography>
            <Typography
              className={classes.textNum}
              variant="subtitle1"
              align="left"
            >
              £{revenue || 349} bn
            </Typography>
          </Box>
          <Box>
            <Typography
              className={classes.text}
              variant="subtitle1"
              align="left"
            >
              Expenditure
            </Typography>
            <Typography
              className={classes.textNum}
              variant="subtitle1"
              align="left"
            >
              £{expenditure || 349} bn
            </Typography>
          </Box>
          <Box>
            <Typography
              className={classes.text}
              variant="subtitle1"
              align="left"
            >
              {deficit > 0 ? "Surplus" : "Deficit"}
            </Typography>
            <Typography
              className={classes.textNum}
              variant="subtitle1"
              align="left"
            >
              £{deficit} bn
            </Typography>
          </Box>
          <Box>
            <Typography
              className={classes.text}
              variant="subtitle1"
              align="left"
            >
              {long_term_deficit > 0
                ? "Long Term Surplus"
                : "Long Term Deficit"}
            </Typography>
            <Typography
              className={classes.textNum}
              variant="subtitle1"
              align="left"
            >
              £{long_term_deficit} bn
            </Typography>
          </Box>
        </Box>
      </Box>
      <Box className={classes.logoAndButton}>
        <Button
          className={classes.submitBtn}
          variant="outlined"
          color="primary"
          onClick={() => setAnnualBudget()}
        >
          {settingBudget ? "Cancel" : "Set Budget"}
        </Button>
      </Box>
    </>
  );
}
