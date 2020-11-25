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
      background: "rgba(250,250,250,.5)",
      color: "#BC9CFF",
    },
    gradientPrimaryOutline: {
      borderColor: "#6FCF97",
      color: "#6FCF97",
    },
    whiteBg: {
      borderColor: "#fafafa",
      backgroundOpacity: "0.1",
      color: "#BC9CFF",
    },
    noPadding: {
      padding: 0,
    },
    errorList: {
      display: "flex",
      width: "100%",
      flexDirection: "column",
      alignItems: "center",
      textAlign: "center",
      border: "1px solid #BC9CFF",
      borderRadius: "4px",
      color: "#BC9CFF",
      padding: "5px 15px",
      marginTop: "20px",
    },
    errorItem: {
      textAlign: "center",
      padding: "0",
    },
  },
});

export default Theme;
