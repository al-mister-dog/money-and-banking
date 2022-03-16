import { useEffect } from "react";
import { isAuth } from "../utils/cookies";
import { Link, useNavigate } from "react-router-dom";
import { Paper, Button, Box, Typography, makeStyles } from "@material-ui/core";
import owl from "../styles/pics/__owl.jpeg";

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
      margin: "auto",
      padding: "10px",
      width: "90%",
    },
  },
  img: {
    "@media (max-width: 620px)": {
      width: "10rem",
    },
  },
  title: {
    "@media (max-width: 620px)": {
      fontSize: "1.4rem",
    },
  },
  auth: {
    width: "50%",
    margin: "auto",
    
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "@media (max-width: 620px)": {
      marginTop: 0,
      width: "90%",
      margin: "auto",
    },
  },
  slogan: {
    padding: "25px",
    fontSize: "1.4rem",
    "@media (max-width: 620px)": {
      fontSize: "0.8rem",
    },
  },
  sloganLatin: {
    fontStyle: "italic",
    margin: "10px",
    "@media (max-width: 620px)": {
      fontSize: "0.6rem",
      color: "f7f7f7",
    },
  },
}));

export default function Home() {
  const classes = useStyles();
  const text =
    "What is money? Take control of the monetary and financial system and find out.";
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth()) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <Box className={classes.container}>
      <Box className={classes.welcome}>
        <img className={classes.img} src={owl} alt="owl" />
        <Typography variant="h3" className={classes.title}>
          Trial of the Pyx
        </Typography>
      </Box>
      <Box className={classes.auth}>
        <Typography className={classes.slogan} align="center">
          {text}
        </Typography>
        <Box sx={{ display: "flex" }}>
          <Link to="login" style={{ textDecoration: "none", color: "white" }}>
            <Button color="primary" variant="contained" style={{ margin: 10 }}>
              Login
            </Button>
          </Link>
          <Link to="signup" style={{ textDecoration: "none", color: "white" }}>
            <Button color="primary" variant="contained" style={{ margin: 10 }}>
              Signup
            </Button>
          </Link>
        </Box>
        <Typography className={classes.sloganLatin} variant="body1">
          pecunia, si uti scis, ancilla est; si nescis, domina
        </Typography>
      </Box>
    </Box>
  );
}
