import { useSelector, useDispatch } from "react-redux";
import { setDepartment, navSelector } from "../../features/nav/navSlice";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainMenu from "./MainMenu";
import SubNav from "./SubNav";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  SwipeableDrawer,
  Box,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
const darkPrimary = "#191919";

const useStyles = makeStyles(() => ({
  nav: {
    backgroundColor: darkPrimary,
    color: "white",
    boxShadow: "none",
  },
  toolbar: {
    margin: "0 1.5rem 0 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid white",
    "@media (max-width: 620px)": {
      margin: "0px 0px 0px 0px",
    },
  },
  mainMenu: {
    // "& .MuiPaper-root": {
    //   backgroundColor: darkSecondary
    // }
  },

  title: {
    fontFamily: "Open Sans",
    fontWeight: "bold",
    "@media (max-width: 620px)": {
      fontSize: "1rem",
    },
  },
  trial: {
    fontFamily: "Open Sans",
    "@media (max-width: 620px)": {
      fontSize: "0.9rem",
    },
    "&:hover": {
      cursor: "pointer",
    },
  },
}));

export default function Navbar() {
  const dispatch = useDispatch();
  const { departments } = useSelector(navSelector);
  const navigate = useNavigate();
  const onLogOut = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  const loggedin = false;
  const classes = useStyles();

  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = (bool) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    
    setIsOpen(bool);
  };
  const mainMenu = (anchor) => (
    <Box
      role="presentation"
      onClick={toggleDrawer()}
      onKeyDown={toggleDrawer()}
      sx={{ width: 200 }}
    >
      <MainMenu departments={departments} getDepartment={getDepartment} />
    </Box>
  );

  function getDepartment(department) {
    dispatch(setDepartment(department));
  }

  return (
    <AppBar className={classes.nav} position="sticky">
      <Toolbar className={classes.toolbar}>
        <IconButton
          // size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={toggleDrawer(true)}
        >
          <MenuIcon />
        </IconButton>
        <Link to="/" style={{ textDecoration: "none", color: "white" }}>
          <Typography variant="h4" className={classes.title}>
            Trial of the Pyx
          </Typography>
        </Link>

        <Link
          to={loggedin ? `user` : `login`}
          style={{ textDecoration: "none", color: "white" }}
        >
          <Typography variant="h6" className={classes.trial}></Typography>
        </Link>
      </Toolbar>
      <SubNav />
      <SwipeableDrawer
        anchor={"left"}
        open={isOpen}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
        className={classes.mainMenu}
      >
        {mainMenu("left")}
      </SwipeableDrawer>
    </AppBar>
  );
}
