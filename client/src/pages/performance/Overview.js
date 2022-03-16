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
      Overview: Performance
      </Typography>
      <hr></hr>
      <Typography align="justify" className={classes.textIntro}>
      The performance of countries is measured in various ways, from economic output to rate of employment
      </Typography>
    </Box>
  );
}
