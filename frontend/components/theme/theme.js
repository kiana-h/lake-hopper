import { createMuiTheme } from "@material-ui/core/styles";

const Theme = createMuiTheme({
  palette: {
    primary: {
      main: "#6FCF97",
    },
    secondary: {
      main: "#BC9CFF",
    },
    gradientPrimary: {
      background: "linear-gradient(180deg, #6FCF97 0%, #66D2EA 100%)",
      color: "#fff",
    },
    gradientSecondary: {
      background: "linear-gradient(180deg, #BC9CFF 0%, #8BA4F9 100%)",
      color: "#fff",
    },
    gradientSecondaryOutline: {
      borderColor: "#BC9CFF",
      color: "#BC9CFF",
    },
    gradientPrimaryOutline: {
      borderColor: "#6FCF97",
      color: "#6FCF97",
    },
  },
});

export default Theme;
