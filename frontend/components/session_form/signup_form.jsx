import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { List, ListItem } from "@material-ui/core";
import theme from "../theme/theme";
import useStyles from "./form-style";

export default function SignUp({ errors, signup, login, clearErrors }) {
  const classes = useStyles();
  const history = useHistory();
  useEffect(() => {
    if (errors.length) clearErrors();
  }, []);
  const [state, setState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(state);
      history.push("/trips");
    } catch (e) {
      console.log(e);
    }
  };

  const handleChange = (e) => {
    const { id, value } = e.currentTarget;
    setState((prevState) => ({
      ...prevState,
      [id]: value,
    }));
  };

  const demoLogin = async () => {
    const user = {
      email: window.demo_email,
      password: window.demo_password,
    };
    try {
      await login(user);
      history.push("/trips");
    } catch (e) {
      console.log(e);
    }
  };

  // const renderErrors = () => {
  //   if (!errors) {
  //     return;
  //   }
  //   return errors.map((error, i) => (
  //     <ListItem className={classes.errorItem} key={`error-${i}`}>
  //       {error}
  //     </ListItem>
  //   ));
  // };
  const renderErrors = () => {
    if (!errors.length) {
      return;
    }
    return (
      <List style={theme.palette.errorList}>
        <ListItem style={theme.palette.errorItem}>{errors[0]}</ListItem>
      </List>
    );
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <List className={classes.errorList}>{renderErrors()}</List>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="username"
                name="username"
                variant="outlined"
                required
                fullWidth
                id="username"
                label="Username"
                autoFocus
                value={state.username}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                value={state.email}
                onChange={handleChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={state.password}
                onChange={handleChange}
              />
            </Grid>
          </Grid>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            onClick={demoLogin}
            className={classes.demo}
          >
            Demo User Login
          </Button>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            style={theme.palette.gradientPrimary}
            className={classes.submit}
            color="secondary"
          >
            Sign Up
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link href="/login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
}
