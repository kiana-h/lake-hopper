import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  button: {
    marginTop: "30px",
  },
  paper: {
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
