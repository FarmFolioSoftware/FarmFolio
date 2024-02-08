import React, { Component } from "react";

class RegisterComponent extends Component {
  render() {
    return (
      <div className="card bg-dark text-white">
        <div className="card-body p-5 text-center">
          <div className=" mt-md-4 mb-5">
            <h2 className="fw-bold mb-2 text-uppercase">FarmFolio</h2>
            <p className="text-white-50">Welcome To FarmFolio!</p>
            <hr/>

            <form className="form-outline form-white-4" onSubmit={this.props.handleRegister}>
              <input
                type="text"
                id="txtRegistrationEmail"
                className=" form-control-lg"
                placeholder="Email"
                aria-label="Email"
                value={this.props.strEmail}
                name="strEmail"
                onChange={this.props.handleInputChange}
                required
              />
              <input
                type="text"
                id="txtRegistrationFirstName"
                className=" form-control-lg mt-2"
                placeholder="First Name"
                aria-label="First Name"
                value={this.props.strFirstName}
                name="strFirstName"
                onChange={this.props.handleInputChange}
                required
              />
              <input
                type="text"
                id="txtRegistrationLastName"
                className=" form-control-lg mt-2"
                placeholder="Last Name"
                aria-label="Last Name"
                value={this.props.strLastName}
                name="strLastName"
                onChange={this.props.handleInputChange}
                required
              />
              <input
                type="password"
                id="txtRegistrationPassword"
                className="form-control-lg mt-2"
                placeholder="Password"
                aria-label="Password"
                value={this.props.strPassword}
                name="strPassword"
                onChange={this.props.handleInputChange}
                required
              />
              <input
                type="password"
                id="txtRegistrationPassword2"
                className="form-control-lg mt-2"
                placeholder="Confirm Password"
                aria-label="Confirm Password"
                value={this.props.strConfirmPassword}
                name="strConfirmPassword"
                onChange={this.props.handleInputChange}
                required
              />
              <p className="text-white-50 mt-3">Farm Information</p>
              <div className="form-row">
                <input
                  type="text"
                  id="txtFarmName"
                  className="form-control-lg mt-2"
                  placeholder="Farm Name"
                  aria-label="Farm Name"
                  value={this.props.strFarmName}
                  name="strFarmName"
                  onChange={this.props.handleInputChange}
                  required
                />
                <input
                  type="text"
                  id="txtRegistrationCity"
                  className="form-control-lg mt-2"
                  placeholder="City"
                  aria-label="City"
                  value={this.props.strCity}
                  name="strCity"
                  onChange={this.props.handleInputChange}
                  required
                />
                <select
                  id="txtRegistrationState"
                  className="form-control-lg ms-2"
                  aria-label="State"
                  value={this.props.strState}
                  name="strState"
                  onChange={this.props.handleInputChange}
                  required
                >
                  {/* Add options for states here */}
                </select>
              </div>
              <button
                className="btn btn-outline-light btn-lg px-5 mt-4 pt-lg-2"
                type="submit"
              >
                Register
              </button>
            </form>
          </div>

          <div>
            <p id="btnRegister" className="mb-0">Already have an account?{" "}
              <a id="linkLogin" href="#cardLogin" className="text-white-50 fw-bold" onClick={this.props.switchToLogin}>Login</a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterComponent;