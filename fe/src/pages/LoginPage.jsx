import React, { Component } from "react";
import LoginComponent from "../components/common/LoginComponent";
import RegisterComponent from "../components/common/RegisterComponent";
import withRouter from "../components/withRouter";
import { Grid } from "@mui/material";
import "../assets/styles/nav-footer.css";

class LoginPage extends Component {
  constructor(props) {
    super(props);
	
    // sets username, password, and password confirmation to empty values
    this.state = {
      strEmail: "",
      strFirstName: "",
      strLastName: "",
      strPassword: "",
      strConfirmPassword: "",
      strRace: "",
      strBirthday: "",
      strSex: "",
      strStreetAddress: "",
      strZipCode: "",
      strCity: "",
      strState: "",
      strFarmName: "",
      isLogin: true,
      navbarActive: false,
    };
	
	if (localStorage.getItem("uuidSessionToken")) window.location.href = ("/home");
  }

  handleInputChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value,
    });
  };

  handleNavbarClick = () => {
    this.setState((prevState) => ({
      navbarActive: !prevState.navbarActive, // Toggle navbar active state
    }));
  };

  clearFields = () => {
    this.setState({ strEmail: "" });
    this.setState({ strFirstName: "" });
    this.setState({ strLastName: "" });
    this.setState({ strPassword: "" });
    this.setState({ strConfirmPassword: "" });
    this.setState({ strRace: "" });
    this.setState({ strBirthday: "" });
    this.setState({ strSex: "" });
    this.setState({ strStreetAddress: "" });
    this.setState({ strZipCode: "" });
    this.setState({ strCity: "" });
    this.setState({ strState: "" });
    this.setState({ strFarmName: "" });
  };

  validatePasswords = () => {
    if (this.state.strConfirmPassword === "") {
      return true;
    }
    const { strPassword, strConfirmPassword } = this.state;
    return strPassword === strConfirmPassword;
  };

  handleLogin = (event) => {
    const { navigate } = this.props;
    event.preventDefault();

    console.log("Submit Pressed for Login");
    // You can replace the alert with actual logic to send data to the server for authentication
    fetch("http://34.201.138.60:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        strEmail: this.state.strEmail,
        strPassword: this.state.strPassword,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // handle successful authentication here
        if (data.status === 200) {
          alert(data.message);
          navigate('/home');
          localStorage.setItem("uuidSessionToken", data.uuidSessionToken); // please explain why i had to be the one to do this
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
        strEmail: this.state.strEmail,
        strFirstName: this.state.strFirstName,
        strLastName: this.state.strLastName,
        strPassword: this.state.strPassword,
        strRace: this.state.strRace,
        strBirthday: this.state.strBirthday,
        strSex: this.state.strSex,
        strStreetAddress: this.state.strStreetAddress,
        strZipCode: this.state.strZipCode,
        strCity: this.state.strCity,
        strState: this.state.strState,
        strFarmName: this.state.strFarmName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // handle successful registration here
        if (data.status === 200) {
          alert(data.message);
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // handle registration error here
        alert("Registration Failed");
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
        if (data.status === 200) {
          alert(data.message);
        } else {
          throw new Error();
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        // handle authentication error here
        alert("Backend Status: Down");
      });
  };

  switchToRegister = () => {
    this.clearFields();
    this.setState({ isLogin: false });
  };

  switchToLogin = () => {
    this.clearFields();
    this.setState({ isLogin: true });
  };

  render() {
    return (
      <section className="LoginPage-background min-height-100%">
        <div
          className={`navbar ${this.state.navbarActive ? "active" : ""}`}
          onClick={this.handleNavbarClick} // Handle navbar click event
        >
          <a>FARMFOLIO</a>
        </div>
        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="center"
          style={{ minHeight: "100vh" }}
        >
          <Grid item xs={11} md={8} lg={7} xl={6}>
            {this.state.isLogin ? (
              <LoginComponent
                handleLogin={this.handleLogin}
                handleInputChange={this.handleInputChange}
                strEmail={this.state.strEmail}
                strPassword={this.state.strPassword}
                statusCheck={this.statusCheck}
                switchToRegister={this.switchToRegister}
              />
            ) : (
              <RegisterComponent
                handleRegister={this.handleRegister}
                handleInputChange={this.handleInputChange}
                strPassword={this.state.strPassword}
                strFirstName={this.state.strFirstName}
                strLastName={this.state.strLastName}
                strConfirmPassword={this.state.strConfirmPassword}
                strRace={this.state.strRace}
                strBirthday={this.state.strBirthday}
                strSex={this.state.strSex}
                strStreetAddress={this.state.strStreetAddress}
                strZipCode={this.state.strZipCode}
                strCity={this.state.strCity}
                strState={this.state.strState}
                strFarmName={this.state.strFarmName}
                switchToLogin={this.switchToLogin}
              />
            )}
          </Grid>
        </Grid>
        <div className="footer">
          <div>
            <a href="#termsOfUse">Terms of Use</a>
            <span className="footer-separator">|</span>
            <span>Trademark/Logo Here</span>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(LoginPage);
