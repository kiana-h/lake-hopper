import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(0, 0, 2),
  },
  bottomLink: {
    marginTop: "20px",
  },
  demo: {
    margin: theme.spacing(4, 0, 2),
  },
  errorList: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    color: "#f50157",
    height: "70px",
    padding: "0",
  },
  errorItem: {
    padding: "0",
  },
}));

export default useStyles;
