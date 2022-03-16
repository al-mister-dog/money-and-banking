import { Link, useNavigate } from "react-router-dom";
import { isAuth, logout } from "../../utils/cookies";
import { useDispatch, useSelector } from "react-redux";
import { clearUser } from "../../features/user/userSlice";
import { setDepartment, navSelector } from "../../features/nav/navSlice";
import { useState } from "react";
import {
  Box,
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  SwipeableDrawer,
  makeStyles,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";
import MainMenu from "./MainMenu";
import SubNav from "./SubNav";

const useStyles = makeStyles(() => ({
  toolbar: {
    margin: "0 1.5rem 0 1.5rem",
    display: "flex",
    justifyContent: "space-between",
    borderBottom: "1px solid white",
    "@media (max-width: 620px)": {
      margin: "0px 0px 0px 0px",
    },
  },

  title: {
    flexGrow: 1,
    marginLeft: "0rem",
    fontWeight: "bold",
    "@media (max-width: 620px)": {
      fontSize: "1rem",
      marginLeft: "0px",
    },
  },
  btns: {
    "@media (max-width: 620px)": {
      display: "flex",
      flexDirection: "column",
    },
  },
  btn: {
    "@media (max-width: 620px)": {
      fontSize: "0.5rem",
      margin: "0px",
      padding: "0px",
      width: "10px",
    },
  },
}));

export default function Nav() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const classes = useStyles();
  const { departments } = useSelector(navSelector);
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
  const mainMenu = () => (
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
    <>
      <Box style={{ flexGrow: 1 }}>
        <AppBar position="fixed">
          <Toolbar className={classes.toolbar}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
            <Box>
              <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                <Typography
                  variant="h4"
                  className={classes.title}
                >
                  Trial of the Pyx
                </Typography>
              </Link>
            </Box>

            {isAuth() && (
              <Box>
                <Link
                  to={isAuth().role === "admin" ? "/admin" : "/dashboard"}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button color="inherit" className={classes.btn}>
                    {isAuth().name}
                  </Button>
                </Link>
                <Button
                  className={classes.btn}
                  color="inherit"
                  onClick={() => {
                    logout(() => {
                      dispatch(clearUser());
                      navigate("/");
                    });
                  }}
                >
                  Logout
                </Button>
              </Box>
            )}
            {!isAuth() && (
              <>
                <Link
                  to="/login"
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Button color="inherit" className={classes.btn}>
                    Login
                  </Button>
                </Link>
              </>
            )}
          </Toolbar>
          <SubNav />
          <SwipeableDrawer
            anchor={"left"}
            open={isOpen}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
          >
            {mainMenu("left")}
          </SwipeableDrawer>
        </AppBar>
      </Box>
    </>
  );
}
