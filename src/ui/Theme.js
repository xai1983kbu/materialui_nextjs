import { createMuiTheme } from '@material-ui/core/styles';

const geoolandBlue = "#0B72B9";
const geoolandOrange = "#FFBA00";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: `${geoolandBlue}`,
    },
    secondary: {
      main: `${geoolandOrange}`,
    },
  },
  typography: {
      tab: {
          fontFamily: "Ralweway",
          textTransform: "none",
          fontWeight: 700,
          fontSize: "1rem",
      },
      estimate: {
          fontFamily: "Pacifico",
          fontSize: "1rem",
          textTransform: "none",
          color: "white"
      }
  }
});

export default theme;
