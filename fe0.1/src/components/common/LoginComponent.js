import React, { Component } from "react";

class LoginComponent extends Component {
  render() {
    return (
      <div className="card bg-dark text-white">
        <div className="card-body p-5 text-center">
          <div className="mb-md-5 mt-md-4 pb-5">
            <h2 className="fw-bold mb-2 text-uppercase">FarmFolio</h2>
            <p className="text-white-50 mb-5">Please enter your login and password!</p>

            <form className="form-outline form-white-4" onSubmit={this.props.handleLogin}>
              <input
                type="text"
                id="txtLoginEmail"
                className=" form-control-lg"
                placeholder="Email"
                aria-label="Email"
                value={this.props.strEmail}
                name="strEmail" // add a name attribute to the input
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
                name="strPassword" // add a name attribute to the input
                onChange={this.props.handleInputChange}
                required
              />
              <p className="small">
                <a className="text-white-50" href="#forgotPass">Forgot password?</a>
              </p>
              <button
                className="btn btn-outline-light btn-lg px-5 mt-5 pt-lg-2"
                type="submit"
              >
                Login
              </button>
            </form>
            <div>
              <button
                className="btn btn-outline-light btn-lg px-5 mt-3 pt-lg-2"
                type="button"
                onClick={this.props.statusCheck}
              >
                Check Backend Status
              </button>
            </div>
          </div>
          <div>
            <p className="mb-0">Don't have an account?{" "}
              <a href="#cardRegister" className="text-white-50 fw-bold" onClick={this.props.switchToRegister}>Sign Up</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default LoginComponent;