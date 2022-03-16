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
export default function CashDeposit({
  depositInputError,
  customerDisplay,
  depositAmount,
  onChangeDepositAmount,
  depositCash,
}) {
  const classes = useStyles();
  return (
    <AccordionDetails className={classes.details}>
      <TextField
        type="number"
        label="Deposit Cash"
        error={depositInputError}
        inputProps={{
          min: 0,
          // max: customerDisplay.cash,
        }}
        value={depositAmount}
        onChange={onChangeDepositAmount}
      />
      <IconButton disabled={depositInputError || depositAmount < 1} onClick={depositCash}>
        <Tooltip title="DEPOSIT">
          <PaymentIcon />
        </Tooltip>
      </IconButton>
    </AccordionDetails>
  );
}
