import React from "react";
import { Link } from "react-router-dom";

class SessionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      password: "",
    };
    this.update = this.update.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  update(property) {
    return (e) => {
      this.setState({ [property]: e.currentTarget.value });
    };
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.submit(this.state);
  }

  renderErrors() {
    if (!this.props.errors) {
      return;
    }
    return (
      <ul>
        {this.props.errors.map((error, i) => (
          <li key={`error-${i}`}>{error}</li>
        ))}
      </ul>
    );
  }

  render() {
    const NavLink = () => {
      if (this.props.type === "Sign Up") {
        return (
          <div>
            Already Registered? <Link to={"/login"}>Log in</Link>
          </div>
        );
      } else {
        return (
          <div>
            New User? <Link to={"/signup"}>Sign up</Link>
          </div>
        );
      }
    };
    return (
      <fieldset>
        <form onSubmit={this.handleSubmit}>
          {this.renderErrors()}
          <label htmlFor="username">
            Username
            <input
              id="username"
              type="text"
              value={this.state.username}
              onChange={this.update("username")}
            ></input>
          </label>
          <br />
          <label htmlFor="password">
            Password
            <input
              type="password"
              value={this.state.password}
              onChange={this.update("password")}
            ></input>
          </label>
          <br />
          <button type="submit">{this.props.type}</button>
          <br />
          <NavLink type={this.props.type} />
        </form>
      </fieldset>
    );
  }
}

export default SessionForm;
