import React, { Component } from "react";

class RegisterComponent extends Component {
  render() {
    return (
      <div className="card bg-dark text-white">
        <div className="card-body p-5 text-center">
          <div className=" mt-md-4 mb-5">
            <h2 className="fw-bold mb-2 text-uppercase">FarmFolio</h2>
            <p className="text-white-50">Welcome To FarmFolio!</p>
            <hr />

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
                  id="txtStreetAddress"
                  className="form-control-lg mt-2"
                  placeholder="Street Address"
                  aria-label="Street Address"
                  value={this.props.strStreetAddress}
                  name="strStreetAddress"
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
                  <option value="" disabled>
                    State
                  </option>
                  <option value="AL">AL</option>
                  <option value="AK">AK</option>
                  <option value="AZ">AZ</option>
                  <option value="AR">AR</option>
                  <option value="CA">CA</option>
                  <option value="CO">CO</option>
                  <option value="CT">CT</option>
                  <option value="DE">DE</option>
                  <option value="FL">FL</option>
                  <option value="GA">GA</option>
                  <option value="HI">HI</option>
                  <option value="ID">ID</option>
                  <option value="IL">IL</option>
                  <option value="IN">IN</option>
                  <option value="IA">IA</option>
                  <option value="KS">KS</option>
                  <option value="KY">KY</option>
                  <option value="LA">LA</option>
                  <option value="ME">ME</option>
                  <option value="MD">MD</option>
                  <option value="MA">MA</option>
                  <option value="MI">MI</option>
                  <option value="MN">MN</option>
                  <option value="MS">MS</option>
                  <option value="MO">MO</option>
                  <option value="MT">MT</option>
                  <option value="NE">NE</option>
                  <option value="NV">NV</option>
                  <option value="NH">NH</option>
                  <option value="NJ">NJ</option>
                  <option value="NM">NM</option>
                  <option value="NY">NY</option>
                  <option value="NC">NC</option>
                  <option value="ND">ND</option>
                  <option value="OH">OH</option>
                  <option value="OK">OK</option>
                  <option value="OR">OR</option>
                  <option value="PA">PA</option>
                  <option value="RI">RI</option>
                  <option value="SC">SC</option>
                  <option value="SD">SD</option>
                  <option value="TN">TN</option>
                  <option value="TX">TX</option>
                  <option value="UT">UT</option>
                  <option value="VT">VT</option>
                  <option value="VA">VA</option>
                  <option value="WA">WA</option>
                  <option value="WV">WV</option>
                  <option value="WI">WI</option>
                  <option value="WY">WY</option>
                </select>
                <input
                  type="text"
                  id="txtZipCode"
                  className="form-control-lg mt-2"
                  placeholder="Zip Code"
                  aria-label="Zip Code"
                  value={this.props.strZipCode}
                  name="strZipCode"
                  onChange={this.props.handleInputChange}
                  required
                />
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
