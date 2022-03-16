import {
  IconButton,
  makeStyles,
  Tooltip,
  AccordionDetails,
  Typography,
} from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import MoneyIcon from '@material-ui/icons/Money';

const useStyles = makeStyles(() => ({
  details: {
    alignItems: "center",
  },
}));

export default function LoanRepay({ repayLoanDisabled, repayLoan }) {
  const classes = useStyles();
  return (
    <AccordionDetails className={classes.details}>
      <Typography style={{color: "#757575"}}>Repay Loan</Typography>
      <IconButton disabled={repayLoanDisabled} onClick={() => repayLoan("CARD")}>
        <Tooltip title="CARD">
          <PaymentIcon />
        </Tooltip>
      </IconButton>
      <IconButton disabled={repayLoanDisabled} onClick={() => repayLoan("CASH")}>
        <Tooltip title="CASH">
          <MoneyIcon />
        </Tooltip>
      </IconButton>
    </AccordionDetails>
  );
}
