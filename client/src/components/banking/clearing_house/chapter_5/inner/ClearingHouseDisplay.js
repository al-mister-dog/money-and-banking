import { makeStyles } from "@material-ui/core/styles";

import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "20rem",
    marginTop: "25px",
    "@media (max-width: 620px)": {
      width: "85%",
    },
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: "bold",
    color: theme.palette.text.secondary,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(10),
    fontWeight: "bold",
    color: theme.palette.text.secondary,
  },
  amount: {
    fontSize: theme.typography.pxToRem(13),
    color: theme.palette.text.secondary,
  },
  icon: {
    verticalAlign: "bottom",
    height: 20,
    width: 20,
  },
  details: {
    alignItems: "center",
  },
  columnOne: {
    flexBasis: "35%",
  },
  columnTwo: {
    flexBasis: "65%",
  },
  link: {
    color: theme.palette.primary.main,
    textDecoration: "none",
    "&:hover": {
      textDecoration: "underline",
    },
  },
}));

export default function ClearingHouseDisplay({clearingHouseDisplay, title}) {
  const classes = useStyles();
  return (
    <>
      <Typography className={classes.secondaryHeading} align="left">
        {title}:
      </Typography>

      {clearingHouseDisplay.map((instrument, index) => {
        return (
          <div key={index}>
            <Typography
              align="left"
              className={classes.amount}
              style={{ marginLeft: "10px", fontStyle: "italic" }}
            >
             Bank {instrument.id}: £{instrument.amount}
            </Typography>
          </div>
        );
      })}
    </>
  );
}
