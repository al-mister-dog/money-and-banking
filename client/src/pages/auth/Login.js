import { useSelector, useDispatch } from "react-redux";
import {
  loginUser,
  userSelector,
  clearState,
} from "../../features/user/userSlice";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { isAuth } from "../../utils/cookies";
import {
  Button,
  TextField,
  FormControlLabel,
  Checkbox,
  Grid,
  Box,
  Typography,
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

export default function LogIn() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isFetching, isSuccess, isError, errorMessage } =
    useSelector(userSelector);
  const [helperText, setHelperText] = useState("");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisabled, setIsDisabled] = useState(true);
  const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

  const handleChangeEmail = (event) => {
    setEmail(event.target.value);
    validateLogin();
  };
  const handleChangePassword = (event) => {
    setPassword(event.target.value);
    validateLogin();
  };

  const validateLogin = () => {
    if (validEmail.test(email) && password.length > 4) {
      setIsDisabled(false);
    } else {
      setIsDisabled(true);
    }
  };

  const handleKeypressLogin = (e) => {
    if (e.code === "Enter") {
      onClickLogin();
    }
  };

  const onClickLogin = async () => {
    const data = { email, password };
    dispatch(loginUser(data));
  };

  const navigate = useNavigate();
  useEffect(() => {
    return () => {
      dispatch(clearState());
    };
  }, []);

  useEffect(() => {
    if (isError) {
      setHelperText(errorMessage);
      dispatch(clearState());
    }

    if (isSuccess) {
      dispatch(clearState());
      if (isAuth() && isAuth().role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [isError, isSuccess]);
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
            Log in
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              data-testid="email"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              type="email"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onKeyPress={handleKeypressLogin}
              onChange={handleChangeEmail}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={password}
              onKeyPress={handleKeypressLogin}
              onChange={handleChangePassword}
            />
            <FormControlLabel
              control={
                <Checkbox
                  data-testid="checkbox"
                  value="remember"
                  color="primary"
                />
              }
              label="Remember me"
            />
            <Typography
              variant="body1"
              style={{
                textAlign: "center",
                margin: "35px 0 5px 0",
                fontWeight: "bold",
              }}
            >
              {helperText}
            </Typography>
            <Button
              fullWidth
              id="login-btn"
              variant="contained"
              disabled={isDisabled}
              onClick={onClickLogin}
            >
              Log In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link
                  to="/auth/password/forgot"
                  style={{ textDecoration: "none" }}
                >
                  <Typography
                    align="left"
                    variant="body2"
                    style={{ marginTop: "5px" }}
                  >
                    Forgot password?
                  </Typography>
                </Link>
              </Grid>
              <Grid item>
                <Link to="/signup" style={{ textDecoration: "none" }}>
                  <Typography variant="body2" style={{ marginTop: "5px" }}>
                    {"Don't have an account? Sign Up"}
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
