import { Link } from "react-router-dom";
import {
  List,
  Divider,
  ListItem,
  ListItemIcon,
  ListItemText,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles(() => ({
  menuItem: {
    alignText: "left"
    // color: "white",
    // fontWeight: "bold"
  },
}));
export default function MainMenu({ departments, getDepartment }) {
  const classes = useStyles();
  return (
    <>
      <List>
        {departments.map((department, index) => (
          <Link
            key={index}
            style={{ textDecoration: "none", color: "black" }}
            to={department.path}
          >
            <ListItem
              button
              key={index}
              className={classes.menuItem}
              onClick={() => getDepartment(department)}
            >
              <ListItemText
                primary={
                  /*<p style={{fontWeight: bold  margin: "0px"}}>{text}</p>}*/ department.name
                }
              />
            </ListItem>
          </Link>
        ))}
      </List>
    </>
  );
}
