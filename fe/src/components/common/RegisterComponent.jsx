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

            <form
              className="form-outline form-white-4"
              onSubmit={this.props.handleRegister}
            >
              <input
                type="text"
                id="txtRegistrationFirstName"
                className=" form-control-lg"
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
                type="text"
                id="txtRegistrationEmail"
                className=" form-control-lg mt-2"
                placeholder="Email"
                aria-label="Email"
                value={this.props.strEmail}
                name="strEmail"
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
              <input
                type="text"
                id="txtRegistrationRace"
                className=" form-control-lg mt-2"
                placeholder="Race"
                aria-label="Race"
                value={this.props.strRace}
                name="strRace"
                onChange={this.props.handleInputChange}
                required
              />
              <select
                id="txtRegistrationSex"
                className="form-control-lg mt-2 custom-input-size"
                placeholder=""
                aria-label="Sex"
                value={this.props.strSex}
                name="strSex"
                onChange={this.props.handleInputChange}
                required
              >
                <option value="" disabled>
                  Sex
                </option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              <input
                type="text"
                id="txtRegistrationBirthday"
                className=" form-control-lg mt-2 custom-input-size"
                placeholder="Birthday"
                aria-label="Birthday"
                value={this.props.strBirthday}
                name="strBirthday"
                onChange={this.props.handleInputChange}
                required
                onFocus={(event) => (event.target.type = "date")}
                onBlur={(event) => (event.target.type = "text")}
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
                  className="form-control-lg mt-2 custom-input-size"
                  aria-label="State"
                  value={this.props.strState}
                  name="strState"
                  onChange={this.props.handleInputChange}
                  required
                >
                  <option value="" disabled>
                    State
                  </option>
                  <option value="AL">Alabama</option>
                  <option value="AK">Alaska</option>
                  <option value="AZ">Arizona</option>
                  <option value="AR">Arkansas</option>
                  <option value="CA">California</option>
                  <option value="CO">Colorado</option>
                  <option value="CT">Connecticut</option>
                  <option value="DE">Delaware</option>
                  <option value="FL">Florida</option>
                  <option value="GA">Georgia</option>
                  <option value="HI">Hawaii</option>
                  <option value="ID">Idaho</option>
                  <option value="IL">Illinois</option>
                  <option value="IN">Indiana</option>
                  <option value="IA">Iowa</option>
                  <option value="KS">Kansas</option>
                  <option value="KY">Kentucky</option>
                  <option value="LA">Louisiana</option>
                  <option value="ME">Maine</option>
                  <option value="MD">Maryland</option>
                  <option value="MA">Massachusetts</option>
                  <option value="MI">Michigan</option>
                  <option value="MN">Minnesota</option>
                  <option value="MS">Mississippi</option>
                  <option value="MO">Missouri</option>
                  <option value="MT">Montana</option>
                  <option value="NE">Nebraska</option>
                  <option value="NV">Nevada</option>
                  <option value="NH">New Hampshire</option>
                  <option value="NJ">New Jersey</option>
                  <option value="NM">New Mexico</option>
                  <option value="NY">New York</option>
                  <option value="NC">North Carolina</option>
                  <option value="ND">North Dakota</option>
                  <option value="OH">Ohio</option>
                  <option value="OK">Oklahoma</option>
                  <option value="OR">Oregon</option>
                  <option value="PA">Pennsylvania</option>
                  <option value="RI">Rhode Island</option>
                  <option value="SC">South Carolina</option>
                  <option value="SD">South Dakota</option>
                  <option value="TN">Tennessee</option>
                  <option value="TX">Texas</option>
                  <option value="UT">Utah</option>
                  <option value="VT">Vermont</option>
                  <option value="VA">Virginia</option>
                  <option value="WA">Washington</option>
                  <option value="WV">West Virginia</option>
                  <option value="WI">Wisconsin</option>
                  <option value="WY">Wyoming</option>
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
            <p id="btnRegister" className="mb-0">
              Already have an account?{" "}
              <a
                id="linkLogin"
                href="#cardLogin"
                className="text-white-50 fw-bold"
                onClick={this.props.switchToLogin}
              >
                Login
              </a>
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterComponent;