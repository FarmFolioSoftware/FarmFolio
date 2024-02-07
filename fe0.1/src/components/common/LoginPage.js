//   ./components/common/LoginPage.js

import React, { Component } from "react";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    // sets username, password, and password confirmation to empty values
    this.state = {
      strEmail: "",
      strFirstName: "",
      strLastName: "",
      strUsername: "",
      strPassword: "",
      strConfirmPassword: "",
      strCity: "",
      strState: "",
      strFarmName: "",
    };
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  clearFields = () => {
    this.setState({ strEmail: "" });
    this.setState({ strFirstName: "" });
    this.setState({ strLastName: "" });
    this.setState({ strUsername: "" });
    this.setState({ strPassword: "" });
    this.setState({ strConfirmPassword: "" });
    this.setState({ strFirstName: "" });
    this.setState({ strCity: "" });
    this.setState({ strState: "" });
  };

  validatePasswords = () => {
    if (this.state.strConfirmPassword === "") {
      return true;
    }
    const { strPassword, strConfirmPassword } = this.state;
    return strPassword === strConfirmPassword;
  };

  handleLogin = (event) => {
    event.preventDefault();

    console.log("Submit Pressed");
    // You can replace the alert with actual logic to send data to the server for authentication
    fetch("http://34.201.138.60:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        strUsername: this.state.strUsername,
        strPassword: this.state.strPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // handle successful authentication here
        if (data.status === 202) {
          alert(data.message);
          window.location.href = "home.html";
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // handle authentication error here
        alert("Authentication Failed");
      });
  };

  handleRegister = (event) => {
    event.preventDefault();

    if (!this.validatePasswords()) {
      alert("Passwords do not match");
      return;
    }

    console.log("Submit Pressed");
    // You can replace the alert with actual logic to send data to the server for authentication
    fetch("http://34.201.138.60:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        strUsername: this.state.strUsername,
        strPassword: this.state.strPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // handle successful authentication here
        if (data.status === 202) {
          alert(data.message);
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // handle authentication error here
        alert("Authentication Failed");
      });
  };

  statusCheck = (event) => {
    fetch("http://34.201.138.60:8000", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // handle successful authentication here
        if (data.status === 418) {
          alert(data.message);
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // handle authentication error here
        alert("Backend Down");
      });
  };

  render() {
    return (
      <section className="gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
              <div id="cardLogin" className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">FarmFolio</h2>
                    <p className="text-white-50 mb-5">
                      Please enter your login and password!
                    </p>

                    <form
                      className="form-outline form-white-4"
                      onSubmit={this.handleLogin}
                    >
                      <input
                        type="text"
                        id="txtLoginEmail"
                        className=" form-control-lg"
                        placeholder="Username"
                        aria-label="Username"
                        value={this.state.strUsername}
                        name="strUsername" // add a name attribute to the input
                        onChange={this.handleInputChange}
                        required
                      />
                      <input
                        type="password"
                        id="txtLoginPassword"
                        className="form-control-lg mt-2"
                        placeholder="Password"
                        aria-label="Password"
                        value={this.state.strPassword}
                        name="strPassword" // add a name attribute to the input
                        onChange={this.handleInputChange}
                        required
                      />
                      <p className="small">
                        <a className="text-white-50" href="#forgotPass">
                          Forgot password?
                        </a>
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
                        onClick={this.statusCheck}
                      >
                        Check Backend Status
                      </button>
                    </div>
                  </div>

                  <div>
                    <p className="mb-0">
                      Don't have an account?{" "}
                      <a
                        href="#cardRegister"
                        className="text-white-50 fw-bold"
                        onClick={() => {
                          document.getElementById("cardLogin").style.display =
                            "none";
                          document.getElementById(
                            "cardRegister"
                          ).style.display = "block";
                          this.clearFields();
                        }}
                      >
                        Sign Up
                      </a>
                    </p>
                  </div>
                </div>
              </div>

              <div id="cardRegister" className="card bg-dark text-white">
                <div className="card-body p-5 text-center">
                  <div className=" mt-md-4 mb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">FarmFolio</h2>
                    <p className="text-white-50">Welcome To FarmFolio!</p>
                    <hr/>

                    <form
                      className="form-outline form-white-4"
                      onSubmit={this.handleRegister}
                    >
                      <input
                        type="text"
                        id="txtRegistrationEmail"
                        className=" form-control-lg"
                        placeholder="Email"
                        aria-label="Email"
                        value={this.state.strEmail}
                        name="strEmail" // add a name attribute to the input
                        onChange={this.handleInputChange}
                        required
                      />
                      <input
                        type="text"
                        id="txtRegistrationFirstName"
                        className=" form-control-lg mt-2"
                        placeholder="First Name"
                        aria-label="First Name"
                        value={this.state.strFirstName}
                        name="strFirstName" // add a name attribute to the input
                        onChange={this.handleInputChange}
                        required
                      />
                      <input
                        type="text"
                        id="txtRegistrationLastName"
                        className=" form-control-lg mt-2"
                        placeholder="Last Name"
                        aria-label="Last Name"
                        value={this.state.strLastName}
                        name="strLastName" // add a name attribute to the input
                        onChange={this.handleInputChange}
                        required
                      />
                      <input
                        type="text"
                        id="txtRegistrationUsername"
                        className=" form-control-lg mt-2"
                        placeholder="Username"
                        aria-label="Username"
                        value={this.state.strUsername}
                        name="strUsername" // add a name attribute to the input
                        onChange={this.handleInputChange}
                        required
                      />
                      <input
                        type="password"
                        id="txtRegistrationPassword"
                        className="form-control-lg mt-2"
                        placeholder="Password"
                        aria-label="Password"
                        value={this.state.strPassword}
                        name="strPassword" // add a name attribute to the input
                        onChange={this.handleInputChange}
                        required
                      />
                      <input
                        type="password"
                        id="txtRegistrationPassword2"
                        className="form-control-lg mt-2"
                        placeholder="Confirm Password"
                        aria-label="Confirm Password"
                        value={this.state.strConfirmPassword}
                        name="strConfirmPassword" // add a name attribute to the input
                        onChange={this.handleInputChange}
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
                          value={this.state.strFarmName}
                          name="strFarmName" // add a name attribute to the input
                          onChange={this.handleInputChange}
                          required
                        />
                        <input
                          type="text"
                          id="txtRegistrationCity"
                          className="form-control-lg mt-2"
                          placeholder="City"
                          aria-label="City"
                          value={this.state.strCity}
                          name="strCity" // add a name attribute to the input
                          onChange={this.handleInputChange}
                          required
                        />
                        <select
                          id="txtRegistrationState"
                          className="form-control-lg ms-2"
                          aria-label="State"
                          value={this.state.strState}
                          name="strState" // add a name attribute to the input
                          onChange={this.handleInputChange}
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
                        onClick={() => {
                          document.getElementById(
                            "cardRegister"
                          ).style.display = "none";
                          document.getElementById("cardLogin").style.display =
                            "block";
                          this.clearFields();
                        }}
                      >
                        Login
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default LoginPage;
