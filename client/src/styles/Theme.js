import { createTheme } from "@material-ui/core/styles";

const lightPrimary = "#ECDBBA";
const lightSecondary = "#C84B31";
const darkPrimary = "#191919";
const darkSecondary = "#2D4263";
export default createTheme({
  palette: {
    common: {
      lightPrimary: `${lightPrimary}`,
      darkPrimary: `${darkPrimary}`,
      lightSecondary: `${lightSecondary}`,
      darkSecondary: `${darkSecondary}`,
    },
    primary: {
      main: `${darkPrimary}`,
    },
    secondary: {
      main: `${darkSecondary}`,
    },
    active: {
      primary: "rgba(192, 202, 51, 0.1)",
      secondary: "rgba(255, 179, 0, 0.1)",
    },
  },
  typography: {
    fontFamily: "Open Sans",
  },
  components: {
    styleOverrides: {
      paper: {
        root: {
          backgroundColor: "#fdfbf7",
          width: "70vw",
          margin: "auto",
          marginTop: "2rem",
          padding: "20px",
        },
      },
    },
  },
});
