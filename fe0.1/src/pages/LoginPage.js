import React, { Component } from "react";
import LoginComponent from "../components/common/LoginComponent";
import RegisterComponent from "../components/common/RegisterComponent";
import withRouter from "../components/withRouter";

class LoginPage extends Component {
  constructor(props) {
    super(props);
    // sets username, password, and password confirmation to empty values
    this.state = {
      strFirstName: "",
      strLastName: "",
      strEmail: "",
      strPassword: "",
      strConfirmPassword: "",
      strRace: "",
      strSex: "",
      strBirthday: "",
      strFarmName: "",
      strStreetAddress: "",
      strCity: "",
      strState: "",
      strZipCode: "",
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
    this.setState({ strFirstName: "" });
    this.setState({ strLastName: "" });
    this.setState({ strEmail: "" });
    this.setState({ strPassword: "" });
    this.setState({ strConfirmPassword: "" });
    this.setState({ strRace: "" });
    this.setState({ strSex: "" });
    this.setState({ strBirthday: "" });
    this.setState({ strFarmName: "" });
    this.setState({ strStreetAddress: "" });
    this.setState({ strCity: "" });
    this.setState({ strState: "" });
    this.setState({ strZipCode: "" });
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
        if (data.status === 202) {
          alert(data.message);
          navigate('/home');
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
        strFirstName: this.state.strFirstName,
        strLastName: this.state.strLastName,
        strEmail: this.state.strEmail,
        strPassword: this.state.strPassword,
        strRace: this.state.strRace,
        strSex: this.state.strSex,
        strBirthday: this.state.strBirthday,
        strFarmName: this.state.strFarmName,
        strStreetAddress: this.state.strStreetAddress,
        strCity: this.state.strCity,
        strState: this.state.strState,
        strZipCode: this.state.strZipCode,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // handle successful registration here
        if (data.status === 202) {
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
        if (data.status === 418) {
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
      <section className="gradient-custom min-height-100vh">
        <div className="container py-5 h-100">
          <div className="row d-flex justify-content-center align-items-center h-100">
            <div className="col-12 col-md-9 col-lg-7 col-xl-6 col-xxl-5">
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
                  strFirstName={this.state.strFirstName}
                  strLastName={this.state.strLastName}
                  strEmail={this.state.strEmail}
                  strPassword={this.state.strPassword}
                  strConfirmPassword={this.state.strConfirmPassword}
                  strRace={this.state.strRace}
                  strSex={this.state.strSex}
                  strBirthday={this.state.strBirthday}
                  strFarmName={this.state.strFarmName}
                  strStreetAddress={this.state.strStreetAddress}
                  strCity={this.state.strCity}
                  strState={this.state.strState}
                  strZipCode={this.state.strZipCode}
                  switchToLogin={this.switchToLogin}
                />
              )}
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default withRouter(LoginPage);