import React, { Component } from "react";
import { Grid } from "@mui/material";
import "../../assets/styles/login.css";

class LoginComponent extends Component {
  render() {
    return (
      <Grid container justifyContent="center" alignItems="center" className="login-content-container">
        <Grid item xs={5} sm={8} md={7} lg={7} xl={7}>
          <div className="login-card">
            <div className="card bg-dark text-white">
              <div className="card-body text-center p-3">
                <div className="mt-md-4 mb-5">
                  <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                  <p className="text-white-50">Please enter your login and password!</p>
                  <hr />

                  <form
                    className="form-outline form-white-4"
                    onSubmit={this.props.handleLogin}
                  >
                    <input
                      type="text"
                      id="txtLoginEmail"
                      className="form-control-lg mt-2"
                      placeholder="Email"
                      aria-label="Email"
                      value={this.props.strEmail}
                      name="strEmail"
                      onChange={this.props.handleInputChange}
                      required
                    />
                    <input
                      type="password"
                      id="txtLoginPassword"
                      className="form-control-lg mt-2"
                      placeholder="Password"
                      aria-label="Password"
                      value={this.props.strPassword}
                      name="strPassword"
                      onChange={this.props.handleInputChange}
                      required
                    />
                    <p className="small">
                      <a className="text-white-50" href="#forgotPass">Forgot password?</a>              
                    </p>
                    <button
                      className="btn btn-outline-light btn-lg px-5 mt-3 pt-lg-2"
                      type="submit"
                    >
                      Login
                    </button>
                  </form>
                </div>

                <div className="mb-4">
                  <button
                    className="btn btn-outline-light btn-lg px-5 pt-lg-2"
                    type="button"
                    onClick={this.props.statusCheck}
                  >
                    Check Backend Status
                  </button>
                </div>

                <div>
                  <p id="btnRegister" className="mb-0">
                    Don't have an account?{" "}
                    <a
                      id="linkRegister"
                      href="#cardRegister"
                      className="text-white-50 fw-bold"
                      onClick={this.props.switchToRegister}
                    >
                      Sign Up
                    </a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Grid>
    );
  }
}

export default LoginComponent;