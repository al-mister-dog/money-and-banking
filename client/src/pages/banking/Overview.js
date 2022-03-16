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
        Overview: Banking
      </Typography>
      <hr></hr>
      <Typography align="justify" className={classes.textIntro}>
        This section aims to demystify the banking system. Take these
        introductory courses to familiarise yourself with how the system works,
        and use the knowledge you've gained to try out your skills in the Trial
        of the Pyx game!
      </Typography>
      <Typography align="justify" className={classes.textIntro}>
        The first module will introduce you to the general mechanics and
        relationships of banks and its customers. By thinking in terms of
        balance sheets, you will see how banks keep track of money being
        deposited and transfered to customers and other banks. You will also
        begin to get an idea of how a bank maybe unable to fulfil its payments
        to its customers!
      </Typography>
      <Typography align="justify" className={classes.textIntro}>
        The second module will explore the idea of the survival constraint,
        making sure a bank has enough money to survive. We will see various ways
        banks deal with the survival constraint, including reserve requirements,
        interbank lending, and central banking.
      </Typography>
    </Box>
  );
}
