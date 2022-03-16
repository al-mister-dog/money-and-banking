import {
  TextField,
  IconButton,
  makeStyles,
  Tooltip,
  AccordionDetails,
} from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import { useEffect } from "react";

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
  insolvent
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
        disabled={cashAmount < 1 || insolvent ? true : false}
        onClick={()=> withdrawCash(cashAmount)}
      >
        <Tooltip title="WITHDRAW">
          <PaymentIcon />
        </Tooltip>
      </IconButton>
    </AccordionDetails>
  );
}
