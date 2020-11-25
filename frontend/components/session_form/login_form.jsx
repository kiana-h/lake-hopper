import React, { useState } from "react";
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

function SignIn({ errors, login }) {
  const classes = useStyles();
  const history = useHistory();
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(state);
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

  const demoLogin = () => {
    const user = {
      email: window.demo_email,
      password: window.demo_password,
    };
    login(user);
    history.push("/trips");
  };

  const renderErrors = () => {
    if (!errors) {
      return;
    }
    return errors.map((error, i) => (
      <ListItem className={classes.errorItem} key={`error-${i}`}>
        {error}
      </ListItem>
    ));
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <List className={classes.errorList}>{renderErrors()}</List>
        <form className={classes.form} onSubmit={handleSubmit} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            value={state.email}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
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
            Log In
          </Button>

          <Grid container justify="flex-end" className={classes.bottomLink}>
            <Grid item>
              <Link href="#/signup" variant="body2">
                Don't have an account? Sign Up
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      {/* <Box mt={8}>
        <Copyright />
      </Box> */}
    </Container>
  );
}

export default SignIn;
