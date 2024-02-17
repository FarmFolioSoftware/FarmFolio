//   ./pages/MainPage.js

import React, { Component } from "react";
import withRouter from "../components/withRouter";
import "../assets/styles/main.css";

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      strDisplayData: "Default Data",
    };
  }
  //Function that checks for a sessionID in local storage. If no sessionID is found, redirect to the login page for reauthentication.
  checkSessionID = () => {
    //Whenever the user tries to perform an action such as viewing data, add this to check for a sessionID first

    const { navigate } = this.props;

    if (localStorage.getItem("sessionID") === null) {
      navigate("/");
    }
  };

  handlePastHarvest = (event) => {
    event.preventDefault();

    fetch("http://34.201.138.60:8000/dataTest", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.setState({ strDisplayData: JSON.stringify(data) });
      });
  };

  render() {
    return (
      <div className="min-height-100vh gradient-custom d-flex flex-column justify-content-between">
        <nav className="col-12 d-flex justify-content-between">
          <div className="bg-dark px-5 rounded-br d-flex align-items-center">
            <h1 className="text-white m-0 lh-1 py-2">FarmFolio</h1>
          </div>
          <div className="bg-dark rounded-br rounded-bl h-100 px-5 py-2 d-flex align-items-center">
            <p className="text-white m-0 px-5">Online Status</p>
          </div>
          <div className="bg-dark px-3 rounded-bl d-flex align-items-center">
            <a className="text-white text-decoration-none" href="">
              Settings
            </a>
            <p className="text-white mx-3 my-0 lh-1">|</p>
            <a className="text-white text-decoration-none" href="">
              Log Out
            </a>
          </div>
        </nav>
        <div className="d-flex my-5">
          <div className="col-3">
            <div
              className="card bg-dark col-11 mx-auto"
              style={{ height: "400px" }}
            ></div>
          </div>
          <div className="col-6">
            <div
              className="card bg-dark col-11 mx-auto"
              style={{ height: "400px" }}
            ></div>
          </div>
          <div className="col-3 d-flex flex-column justify-content-between">
            <div
              className="card bg-dark col-11 mx-auto"
              style={{ height: "180px" }}
            ></div>
            <div
              className="card bg-dark col-11 mx-auto"
              style={{ height: "180px" }}
            ></div>
          </div>
        </div>
        <footer className="bg-dark py-4">
          <p className="text-center text-white m-0">FarmFolio</p>
        </footer>
      </div>
    );
  }
}

export default withRouter(MainPage);
