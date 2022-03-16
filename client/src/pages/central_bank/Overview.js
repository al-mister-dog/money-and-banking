import { Box, Typography, makeStyles } from "@material-ui/core";


const useStyles = makeStyles(() => ({
  textTitle: {
    padding: "25px",
    fontWeight: "bold",
    "@media (max-width: 620px)": {
      fontSize: "1.5rem",
    },
  },
  textIntro: {
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
}));

export default function Overview() {
  const classes = useStyles();
  return (
    <Box className={classes.containerArticle}>
      <Typography variant="h4" className={classes.textTitle}>
        Overview: Central Bank
      </Typography>
      <hr></hr>
      <Typography align="justify" className={classes.textIntro}>
      The central bank manages the currency and monetary policy of a country. The central bank possesses a monopoly on increasing the monetary base. Most central banks also have supervisory and regulatory powers to ensure the stability of member institutions, to prevent bank runs, and to discourage reckless or fraudulent behaviour by member banks.
      </Typography>
    </Box>
  );
}