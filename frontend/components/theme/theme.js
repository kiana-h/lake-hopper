import createMuiTheme from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: "blue",
  },
  overrides: {
    MuiButton: {
      raisedPrimary: {
        color: "white",
      },
    },
  },
});

export default theme;
