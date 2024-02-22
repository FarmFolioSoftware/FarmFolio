import React, { Component } from "react";
import "../../assets/styles/register.css";

class RegisterComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      strPassword: '',
      strConfirmPassword: '',
    };
  }

  handleInputChange(event, field) {
    this.setState({
      [field]: event.target.value
    });
  }

  handleConfirmPasswordChange(event, confirmPassword) {
    const password = this.state.strPassword;
    const passwordsMatch = password === confirmPassword;
    this.setState({ 
      strConfirmPassword: confirmPassword,
      passwordsMatch 
    });
  }
  render() {
    return (
      <div className="reg-content-container">
        <div className="register-card">
          <div className="card bg-dark scroll-card text-white">
            <div className="card-body text-center p-3">
              <div className=" mt-md-3 mb-4">
                <h2 className="fw-bold mb-2 text-uppercase">Register</h2>
                <p className="text-white-50">Welcome To FarmFolio!</p>
                <hr />

                <form
                  className="form-outline form-white-4"
                  onSubmit={this.props.handleRegister}
                >
                  <input
                    type="text"
                    pattern = "[A-Za-z]+"
                    id="txtRegistrationFirstName"
                    className=" form-control-lg"
                    aria-label="First Name"
                    placeholder = "FirstName"
                    value={this.props.strFirstName}
                    name="strFirstName"
                    onChange={this.props.handleInputChange}
                    required 
                    onInvalid={(e) => e.target.setCustomValidity('Please enter First Name (Letters Only)')}
                    onInput={(e) => e.target.setCustomValidity('')}
                  />
                  <input
                    type="text"
                    pattern = "[A-Za-z]+"
                    id="txtRegistrationLastName"
                    className=" form-control-lg mt-2"
                    placeholder="Last Name"
                    aria-label="Last Name"
                    value={this.props.strLastName}
                    name="strLastName"
                    onChange={this.props.handleInputChange}
                    required
                    onInvalid={(e) => e.target.setCustomValidity('Please enter Last Name (Letters Only)')}
                    onInput={(e) => e.target.setCustomValidity('')}
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
                    onInvalid={(e) => e.target.setCustomValidity('Please enter Valid Email')}
                    onInput={(e) => e.target.setCustomValidity('')}
                  />
                  <div>
                  <input
                    type="password"
                    id="txtRegistrationPassword"
                    className="form-control-lg mt-2"
                    placeholder="Password"
                    aria-label="Password"
                    value={this.state.strPassword}
                    name="strPassword"
                    onChange={(event) => this.handleInputChange(event, 'strPassword')}
                    required
                  />
                  <input
                    type="password"
                    id="txtRegistrationPassword2"
                    className="form-control-lg mt-2"
                    placeholder="Confirm Password"
                    aria-label="Confirm Password"
                    value={this.state.strConfirmPassword}
                    name="strConfirmPassword"
                    onChange={(event) => this.handleConfirmPasswordChange(event, event.target.value)}
                    required
                  />
                  {!this.state.passwordsMatch && <p>Passwords do not match. Please re-enter.</p>}
                  </div>
                  <select
                    id="txtRegistrationRace"
                    className="form-control-lg mt-2 custom-input-size"
                    placeholder=""
                    aria-label="Race"
                    value={this.props.strRace}
                    name="strRace"
                    onChange={this.props.handleInputChange}
                    required
                    onInvalid={(e) => e.target.setCustomValidity('Required')}
                    onInput={(e) => e.target.setCustomValidity('')}
                  >
                    <option value="" disabled>  
                      Race
                    </option>
                    <option value="American Indian or Alaska Native">American Indian or Alaska Native</option>
                    <option value="Asian">Asian</option>
                    <option value="Black or African American">Black or African American</option>
                    <option value="Native Hawaiian or Other Pacific Islander">Native Hawaiian or Other Pacific Islander</option>
                    <option value="White">White</option>
                    <option value="Other">Other</option>
                    <option value="I Prefer not to answer">I Prefer not to answer</option> 
                  </select>
                  <select
                    id="txtRegistrationSex"
                    className="form-control-lg mt-2 custom-input-size"
                    placeholder=""
                    aria-label="Sex"
                    value={this.props.strSex}
                    name="strSex"
                    onChange={this.props.handleInputChange}
                    required
                    onInvalid={(e) => e.target.setCustomValidity('Required')}
                    onInput={(e) => e.target.setCustomValidity('')}
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
                    onInvalid={(e) => e.target.setCustomValidity('Please Enter your Birthday')}
                    onInput={(e) => e.target.setCustomValidity('')}
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
                      onInvalid={(e) => e.target.setCustomValidity('Please enter a Farm Name')}
                      onInput={(e) => e.target.setCustomValidity('')}
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
                      onInvalid={(e) => e.target.setCustomValidity('Please Enter a valid Address')}
                      onInput={(e) => e.target.setCustomValidity('')}
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
                      onInvalid={(e) => e.target.setCustomValidity('Please enter a valid City')}
                      onInput={(e) => e.target.setCustomValidity('')}
                    />
                    <select
                      id="txtRegistrationState"
                      className="form-control-lg mt-2 custom-input-size"
                      aria-label="State"
                      value={this.props.strState}
                      name="strState"
                      onChange={this.props.handleInputChange}
                      required
                      onInvalid={(e) => e.target.setCustomValidity('Required')}
                      onInput={(e) => e.target.setCustomValidity('')}
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
                      pattern = "(^\d{5}$)|(^\d{5}-\d{4}$)"
                      className="form-control-lg mt-2"
                      placeholder="Zip Code"
                      aria-label="Zip Code"
                      value={this.props.strZipCode}
                      name="strZipCode"
                      onChange={this.props.handleInputChange}
                      required
                      onInvalid={(e) => e.target.setCustomValidity('Please Enter Valid Zip code')}
                      onInput={(e) => e.target.setCustomValidity('')}
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
        </div>
      </div>
    );
  }
}

export default RegisterComponent;