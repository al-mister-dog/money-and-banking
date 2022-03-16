import { useState } from "react";

import {
  TextField,
  IconButton,
  Menu,
  MenuItem,
  makeStyles,
  Tooltip,
  AccordionDetails,
} from "@material-ui/core";
import PaymentIcon from "@material-ui/icons/Payment";
import SearchIcon from "@material-ui/icons/Search";

const useStyles = makeStyles(() => ({
  details: {
    alignItems: "center",
  },
}));

export default function Transfer({
  customer,
  lookupCustomers,
  transferInputError,
  customerDisplay,
  transferAmount,
  onChangeTransferAmount,
  setTransferAmount,
  transferDeposits,
  toPayee,
  setToPayee,
}) {
  const classes = useStyles();
  
  const [payeeNum, setPayeeNum] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const payees = Object.keys(lookupCustomers).filter(
    (c) => c != customer.customerId
  );
  const thisCustomer = Object.keys(lookupCustomers).filter(
    (c) => c == customer.customerId
  );
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const chooseCustomer = (c) => {
    setPayeeNum(c);
    handleClose();
  };
  return (
    <AccordionDetails className={classes.details}>
      <TextField
        type="number"
        label={`Transfer: ${toPayee}`}
        error={transferInputError ? true : false}
        inputProps={{
          min: 0,
          // max: customerDisplay.deposits,
        }}
        value={transferAmount}
        onChange={onChangeTransferAmount}
      />
      <IconButton
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
      >
        <Tooltip title="SEARCH PAYEE">
          <SearchIcon />
        </Tooltip>
      </IconButton>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        {payees.map((payee, index) => (
          <MenuItem
            key={index}
            onClick={() => {
              chooseCustomer(payee);
              setToPayee(`Customer ${payee}`);
            }}
          >
            Customer {payee}
          </MenuItem>
        ))}
      </Menu>
      <IconButton
        disabled={transferInputError || toPayee === "" || transferAmount < 1 ? true : false}
        onClick={() => {
          transferDeposits(thisCustomer[0], payeeNum, transferAmount);
          setTransferAmount(0);
          setToPayee("");
        }}
      >
        <Tooltip title="TRANSFER">
          <PaymentIcon />
        </Tooltip>
      </IconButton>
    </AccordionDetails>
  );
}
