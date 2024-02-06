import React, { Component } from "react";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    // sets username, password, and password confirmation to empty values
    this.state = {
      strUsername: "",
      strPassword: "",
      strConfirmPassword: "",
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
    this.setState({ strUsername: "" });
    this.setState({ strPassword: "" });
    this.setState({ strConfirmPassword: "" });
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
      <section className="vh-100 gradient-custom">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-8 col-lg-6 col-xl-5">
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
                        <a className="text-white-50">Forgot password?</a>
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
                        className="btn btn-outline-light btn-lg px-5 mt-4 pt-lg-2"
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
                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">FarmFolio</h2>
                    <p className="text-white-50 mb-5">Welcome To FarmFolio!</p>

                    <form
                      className="form-outline form-white-4"
                      onSubmit={this.handleRegister}
                    >
                      <input
                        type="text"
                        id="txtRegistrationEmail"
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
                        s
                        name="strConfirmPassword" // add a name attribute to the input
                        onChange={this.handleInputChange}
                        required
                      />
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
