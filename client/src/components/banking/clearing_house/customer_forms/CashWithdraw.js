import {
  TextField,
  IconButton,
  makeStyles,
  Tooltip,
  AccordionDetails,
} from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";

const useStyles = makeStyles(() => ({
  details: {
    alignItems: "center",
  },
}));

export default function CashWithdraw({
  cashInputError,
  customerDisplay,
  cashAmount,
  onChangeCashAmount,
  withdrawCash,
}) {
  const classes = useStyles();
  return (
    <AccordionDetails className={classes.details}>
      <TextField
        type="number"
        label="Withdraw Cash"
        // error={cashInputError ? true : false}
        inputProps={{
          min: 0,
        }}
        value={cashAmount}
        onChange={onChangeCashAmount}
      />

      <IconButton
        disabled={cashAmount < 1 ? true : false}
        onClick={withdrawCash}
      >
        <Tooltip title="WITHDRAW">
          <PaymentIcon />
        </Tooltip>
      </IconButton>
    </AccordionDetails>
  );
}
