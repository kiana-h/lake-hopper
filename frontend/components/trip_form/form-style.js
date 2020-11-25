import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "30px",
  },
  paper: {
    // marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: "0 auto",
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "400px", // Fix IE 11 issue.
    height: "600px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "spaceEvenly",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 1),
  },
  number: { marginTop: theme.spacing(3) },
  adornment: {
    color: "grey",
    fontSize: ".8em",
  },
  textField: {
    width: "180px",
  },
}));

export default useStyles;

// paper: {
//     marginTop: theme.spacing(8),
//     display: "flex",
//     flexDirection: "column",
//     alignItems: "center",
//   },
//   avatar: {
//     margin: theme.spacing(1),
//     backgroundColor: theme.palette.secondary.main,
//   },
//   form: {
//     width: "100%", // Fix IE 11 issue.
//     marginTop: theme.spacing(1),
//   },
//   submit: {
//     margin: theme.spacing(0, 0, 2),
//   },
//   bottomLink: {
//     marginTop: "20px",
//   },
//   demo: {
//     margin: theme.spacing(4, 0, 2),
//   },
//   errorList: {
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     color: "#f50157",
//     height: "70px",
//     padding: "0",
//   },
//   errorItem: {
//     padding: 0,
//   },
