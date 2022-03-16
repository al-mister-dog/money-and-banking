import {
  TextField,
  IconButton,
  Tooltip,
  AccordionDetails,
  makeStyles,
} from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
const useStyles = makeStyles(() => ({
  details: {
    alignItems: "center",
  },
}));
export default function LoanGet({
  loanAmount,
  onChangeLoanAmount,
  getLoanDisabled,
  getLoan,
  setLoanAmount,
  sufficientReserves,
}) {
  const classes = useStyles();
  return (
    <AccordionDetails className={classes.details}>
      <TextField
        type="number"
        label="Take Out Loan"
        error={!sufficientReserves ? true : false}
        inputProps={{
          min: 0,
          // max: 100,
        }}
        value={loanAmount}
        onChange={onChangeLoanAmount}
      />

      <IconButton
        disabled={loanAmount < 1 || !sufficientReserves}
        onClick={() => {
          getLoan();
          setLoanAmount(0);
        }}
      >
        <Tooltip title="GET LOAN">
          <PaymentIcon />
        </Tooltip>
      </IconButton>
    </AccordionDetails>
  );
}
