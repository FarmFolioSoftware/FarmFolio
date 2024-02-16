import React, { Component } from "react";
import "../../assets/styles/register.css";

class RegisterComponent extends Component {
  render() {
    return (
      <div className="backgroundImage">
        <div className="card bg-dark text-white scroll-card">
          <div className="card-body p-5 text-center">
            <div className="mt-md-2 mb-5">
              <h2 className="fw-bold mb-2 text-uppercase">FarmFolio</h2>
              <p className="text-white-50">Welcome To FarmFolio!</p>
              <hr />

              <form onSubmit={this.props.handleRegister}>

                {/* Personal Information */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="First Name"
                    value={this.props.strFirstName}
                    name="strFirstName"
                    onChange={this.props.handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Last Name"
                    value={this.props.strLastName}
                    name="strLastName"
                    onChange={this.props.handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Email"
                    value={this.props.strEmail}
                    name="strEmail"
                    onChange={this.props.handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Password"
                    value={this.props.strPassword}
                    name="strPassword"
                    onChange={this.props.handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    className="form-control"
                    placeholder="Confirm Password"
                    value={this.props.strConfirmPassword}
                    name="strConfirmPassword"
                    onChange={this.props.handleInputChange}
                    required
                  />
                </div>

                {/* Personal Details */}
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Race"
                    value={this.props.strRace}
                    name="strRace"
                    onChange={this.props.handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-control"
                    value={this.props.strSex}
                    name="strSex"
                    onChange={this.props.handleInputChange}
                    required
                  >
                    <option value="" disabled>Sex</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div className="mb-3">
                  <input
                    type="date"
                    className="form-control"
                    placeholder="Birthday"
                    value={this.props.strBirthday}
                    name="strBirthday"
                    onChange={this.props.handleInputChange}
                    required
                  />
                </div>

                {/* Farm Information */}
                <p className="text-white-50 mb-3">Farm Information</p>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Farm Name"
                    value={this.props.strFarmName}
                    name="strFarmName"
                    onChange={this.props.handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Street Address"
                    value={this.props.strStreetAddress}
                    name="strStreetAddress"
                    onChange={this.props.handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="City"
                    value={this.props.strCity}
                    name="strCity"
                    onChange={this.props.handleInputChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <select
                    className="form-control"
                    value={this.props.strState}
                    name="strState"
                    onChange={this.props.handleInputChange}
                    required
                  >
                    <option value="" disabled>State</option>
                    <option value="AL">Alabama</option>
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
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Zip Code"
                    value={this.props.strZipCode}
                    name="strZipCode"
                    onChange={this.props.handleInputChange}
                    required
                  />
                </div>

                <button
                  className="btn btn-outline-light btn-lg px-5 mt-4"
                  type="submit"
                >
                  Register
                </button>
              </form>
            </div>

            <p className="text-white-50 mt-3">
              Already have an account?{" "}
              <a
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