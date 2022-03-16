import { ThemeProvider } from "@material-ui/styles";
import { Paper, makeStyles } from "@material-ui/core";
import theme from "./styles/Theme";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/nav/Nav";
import Routes from "./Routes";
import Module from "./components/banking/survival_constraint/chapter_2/Module";
const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#fdfbf7",
    width: "70vw",
    margin: "auto",
    marginTop: "14rem",
    padding: "25px",
    "@media (max-width: 620px)": {
      width: "95vw",
      padding: "5px",
      marginTop: "8rem",
    },
  },
}));
function App() {
  const classes = useStyles();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <Navbar />
          <Paper className={classes.paper}>
            <Routes />
          </Paper>
        </Router>
      </ThemeProvider>
      {/* <Module /> */}
    </>
  );
}

export default App;
