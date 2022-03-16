import { useState } from "react";
import { customerActions } from "./fixtures";

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
  // customer,
  // depositInputError,
  // transferInputError,
  // customerDisplay,
  // transferAmount,
  // onChangeTransferAmount,
  // setTransferAmount,
  // transferDeposits,
  // toPayee,
  // setToPayee,
  // setAll,

  // customerOne,
  // customerTwo,
  // bankOne,
  // bankTwo,
  // transferAmount,
  // onChangeTransferAmount,
  // setTransferAmount,
  // depositInputError,
  // transferInputError,
  // transferDeposits,
  // toPayee,
  // setToPayee,
  // setAll

  customerOne,
customerTwo,
customerThree,
bankOne,
bankTwo,
depositInputError,
transferInputError,
customerDisplay,
transferAmount,
onChangeTransferAmount,
setTransferAmount,
// toPayee,
setAll,
}) {
  const classes = useStyles();
  
  const [payeeNum, setPayeeNum] = useState("");
  const [toPayee, setToPayee] = useState("")
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const customers = [customerOne, customerTwo]
  const banks = [bankOne, bankTwo]
  const payees = customers.filter(
    (c) => parseInt(c.id) !== parseInt(customerOne.id)
  );
  customers.forEach((c) => parseInt(c.id) === parseInt(customerOne.id))
  const thisCustomer = customers.filter(
    (c) => parseInt(c.id) === parseInt(customerOne.id)
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

  function makeTransfer() {
    const amount = parseInt(transferAmount);
    const bank1 = findBankById(customerOne)
    const bank2 = findBankById(customerTwo)
    customerActions.interbankTransfer(customerOne, customerTwo, bank1, bank2, amount)
    setAll()
  }
  function findBankById(customer) {
    return banks.find(bank => bank.id === customer.bankId)
  }
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
              setToPayee(`Customer ${payee.id}`);
            }}
          >
            Customer{payee.id}
          </MenuItem>
        ))}
      </Menu>
      <IconButton
        disabled={transferInputError || depositInputError || transferAmount <= 0  || toPayee === "" || transferAmount < 1 ? true : false}
        onClick={() => {
          // transferDeposits(thisCustomer[0], payeeNum, transferAmount);
          makeTransfer(thisCustomer, toPayee, transferAmount);
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








// export function Transfer2({
//   customerOne,
//   customerTwo,
//   bankOne,
//   bankTwo,
//   transferAmount,
//   onChangeTransferAmount,
//   setTransferAmount,
//   depositInputError,
//   transferInputError,
//   transferDeposits,
//   toPayee,
//   setToPayee,
//   setAll
// }) {
//   const classes = useStyles();
  

//   function makeTransfer() {
//     const amount = parseInt(transferAmount);
//     customerActions.interbankTransfer(customerOne, customerTwo, bankOne, bankTwo, amount)
//     setAll()
//   }


//   return (
//     <AccordionDetails className={classes.details}>
//       <TextField
//         type="number"
//         label={`Transfer Deposits`}
//         error={transferInputError || depositInputError ? true : false}
//         inputProps={{
//           min: 0,
//           // max: customerDisplay.deposits,
//         }}
//         value={transferAmount}
//         onChange={onChangeTransferAmount}
//       />
//       <IconButton
//         onClick={() => {
//           makeTransfer(transferAmount);
//           setTransferAmount(0);
//         }}
//         disabled={transferInputError || depositInputError || transferAmount <= 0 ? true : false}
//       >
//         <Tooltip title="TRANSFER">
//           <PaymentIcon />
//         </Tooltip>
//       </IconButton>
//     </AccordionDetails>
//   );
// }
