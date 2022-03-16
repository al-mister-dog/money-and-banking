import { useSelector } from "react-redux";
import { navSelector } from "../../features/nav/navSlice";
import { useState } from "react";
import { Link } from "react-router-dom";

import {
  Button,
  Typography,
  Menu,
  MenuItem,
  makeStyles,
} from "@material-ui/core";
import ArrowDropDownIcon from "@material-ui/icons/ArrowDropDown";

const darkPrimary = "#191919";
const useStyles = makeStyles(() => ({
  button: {
    color: "white",
    fontSize: "1rem",
    "@media (max-width: 620px)": {
      fontSize: "0.7rem",
    },
  },
  menu: {
    "& .MuiPaper-root": {
      backgroundColor: darkPrimary,
      boxShadow: "none",
    },
  },
}));

export default function DepartmentOps() {
  const { department, departmentOperation } = useSelector(navSelector);
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);
  const handleOpenMenu = Boolean(anchorEl);
  const handleClickMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickMenuItem = () => {
    handleCloseMenu();
  };

  return (
    <>
      <Typography variant="h6">{`/`}</Typography>
      <Button
        color="primary"
        variant="outlined"
        className={classes.button}
        onClick={handleClickMenu}
      >
        {departmentOperation.title}
        {departmentOperation.menuItems.length > 0 && <ArrowDropDownIcon />}
      </Button>
      {departmentOperation.menuItems.length > 0 && (
        <Menu
          id="menudepartment"
          className={classes.menu}
          anchorEl={anchorEl}
          open={handleOpenMenu}
          onClose={handleCloseMenu}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {departmentOperation.menuItems.map((menuItem) => {
            return (
              <Link
                key={menuItem.title}
                style={{ textDecoration: "none", color: "black" }}
                to={`${department.path}/${departmentOperation.path}/${menuItem.path}`}
              >
                <MenuItem
                  key={menuItem.title}
                  style={{ color: "white" }}
                  onClick={() => handleClickMenuItem(menuItem)}
                >
                  {menuItem.title}
                </MenuItem>
              </Link>
            );
          })}
        </Menu>
      )}
    </>
  );
}
