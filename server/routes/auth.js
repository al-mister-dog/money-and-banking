const express = require("express");
const router = express.Router();

const { signup, activateAccount, login, forgotPassword, authorizeResetPassword, resetPassword } = require("../controllers/auth");
const {
  userSignupValidator,
  userLoginValidator,
  forgotPasswordValidator,
  resetPasswordValidator
} = require("../middleware/validators/auth");
const { runValidation } = require("../middleware/validators");

router.post("/signup", userSignupValidator, runValidation, signup);
router.post("/activate-account", activateAccount);
router.post("/login", userLoginValidator, runValidation, login);

router.put("/forgot-password", forgotPasswordValidator, runValidation, forgotPassword);
router.get("/authorize-reset-password", authorizeResetPassword)
router.put("/reset-password", resetPasswordValidator, runValidation, resetPassword);


module.exports = router;
