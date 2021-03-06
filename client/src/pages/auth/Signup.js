import { useSelector, useDispatch } from "react-redux";
import {
  signupUser,
  userSelector,
  clearState,
} from "../../features/user/userSlice";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import {
  Button,
  TextField,
  Grid,
  Box,
  Typography,
  LinearProgress,
  makeStyles,
} from "@material-ui/core";
import owl from "../../styles/pics/__owl.jpeg";
const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    "@media (max-width: 620px)": {
      flexDirection: "column",
    },
  },
  welcome: {
    width: "50%",
    "@media (max-width: 620px)": {
      padding: "10px",
      // display: "flex",
      // alignItems: "center",
      width: "90%",
      margin: "auto",
    },
  },
  img: {
    "@media (max-width: 620px)": {
      width: "10rem",
    },
  },
  title: {
    "@media (max-width: 620px)": {
      // fontSize: "1.5rem"
      display: "none",
    },
  },
  auth: {
    width: "50%",
    marginTop: 8,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media (max-width: 620px)": {
      marginTop: 4,
      width: "90%",
      margin: "auto",
    },
  },
}));

const formFields = [
  { name: "username", type: "text", label: "Username" },
  { name: "email", type: "email", label: "Email" },
  { name: "password", type: "password", label: "Password" },
  { name: "passwordRepeat", type: "password", label: "Repeat Password" },
];

export default function SignUp() {
  const classes = useStyles();
  const { isFetching, isSuccess, successMessage, isError, errorMessage } =
    useSelector(userSelector);
  const dispatch = useDispatch();
  const [isSignedUp, setIsSignedUp] = useState(false);
  const [helperText, setHelperText] = useState("");
  const [helperTextColor, setHelperTextColor] = useState("");
  const [signupValues, setSignupValues] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "",
  });
  const [errors, setErrors] = useState({
    username: false,
    email: false,
    password: false,
    passwordRepeat: false,
  });
  const [errorMessages, setErrorMessages] = useState({
    username: "",
    email: "",
    password: "",
    passwordRepeat: "Please include number",
  });

  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
  const validPassword = /^(?=.*[a-z])(?=.*\d).*$/;

  const checkErrors = {
    username(name, event) {
      if (event.target.value.length < 3) {
        setErrors({ ...errors, [name]: true });
        setErrorMessages({
          ...errorMessages,
          [name]: "Must be at least 3 characters",
        });
      } else {
        setErrors({ ...errors, [name]: false });
        setErrorMessages({ ...errorMessages, [name]: "" });
      }
    },
    email(name, event) {
      if (!validEmail.test(event.target.value)) {
        setErrors({ ...errors, [name]: true });
        setErrorMessages({ ...errorMessages, [name]: "Must be valid email" });
      } else {
        setErrors({ ...errors, [name]: false });
        setErrorMessages({ ...errorMessages, [name]: "" });
      }
    },
    password(name, event) {
      if (!validPassword.test(event.target.value)) {
        setErrors({ ...errors, [name]: true });
        setErrorMessages({ ...errorMessages, [name]: "must include number" });
      } else if (event.target.value.length < 6) {
        setErrors({ ...errors, [name]: true });
        setErrorMessages({
          ...errorMessages,
          [name]: "must be at least 6 characters",
        });
      } else {
        setErrors({ ...errors, [name]: false });
        setErrorMessages({ ...errorMessages, [name]: "" });
      }
    },
    passwordRepeat(name, event) {
      if (event.target.value !== signupValues.password) {
        setErrors({ ...errors, [name]: true });
        setErrorMessages({ ...errorMessages, [name]: "passwords must match" });
      } else {
        setErrors({ ...errors, [name]: false });
        setErrorMessages({ ...errorMessages, [name]: "" });
      }
    },
  };

  const handleChange = (name) => (event) => {
    setSignupValues({ ...signupValues, [name]: event.target.value });
    setErrors({ ...signupValues, [name]: false });
    setErrorMessages({ ...signupValues, [name]: "" });
    checkErrors[name](name, event);
  };

  const handleKeypressSignup = (e) => {
    if (e.code === "Enter") {
      onClickSignup();
    }
  };
  const onClickSignup = () => {
    submitUserInfo();
  };

  const submitUserInfo = () => {
    const { username, email, password } = signupValues;
    dispatch(signupUser({ username, email, password }));
  };

  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isFetching) {
      dispatch(clearState());
    }
    if (isSuccess) {
      dispatch(clearState());
      setHelperText(successMessage);
      setHelperTextColor("black");
      setIsSignedUp(true);
    }
    if (isError) {
      dispatch(clearState());
      setHelperText(errorMessage);
      setHelperTextColor("red");
    }
  }, [isSuccess, isError]);

  const fieldsAreValid =
    Object.values(errors).every((error) => error === false) &&
    Object.values(signupValues).every((value) => value);

  return (
    <>
      <Box className={classes.container}>
        <Box className={classes.welcome}>
          <img className={classes.img} src={owl} alt="owl" />
          <Typography variant="h3" className={classes.title}>
            Trial of the Pyx
          </Typography>
        </Box>
        <Box className={classes.auth}>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box noValidate sx={{ mt: 2 }}>
            <Grid container spacing={2}>
              {formFields.map((field) => {
                const { name, type, label } = field;
                return (
                  <Grid item xs={12} key={name}>
                    <TextField
                      required
                      fullWidth
                      error={errors[name] ? true : false}
                      helperText={errorMessages[name]}
                      id={name}
                      type={type}
                      label={label}
                      value={signupValues[name]}
                      onChange={handleChange(name)}
                      onKeyPress={handleKeypressSignup}
                    />
                  </Grid>
                );
              })}
            </Grid>
            {isFetching && <LinearProgress />}
            <Typography
              variant="body1"
              style={{
                textAlign: "center",
                margin: "35px 0 5px 0",
                fontWeight: "bold",
                color: helperTextColor,
              }}
            >
              {helperText}
            </Typography>
            <Button
              id="signup-btn"
              type="submit"
              fullWidth
              variant="contained"
              disabled={!fieldsAreValid || isSignedUp}
              onClick={onClickSignup}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item style={{ marginTop: "20px" }}>
                <Link to="/login" style={{ textDecoration: "none" }}>
                  <Typography variant="body2">
                    Already have an account? Log in
                  </Typography>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>
    </>
  );
}
