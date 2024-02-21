//   ./pages/MainPage.js

import React, { Component } from "react";
import withRouter from "../components/withRouter";
import "../assets/styles/main.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

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

    if (localStorage.getItem("uuidSessionToken") === null) {
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
        <nav className="col-12 d-flex justify-content-between position-relative">
          <div className="bg-dark px-5 rounded-br d-flex align-items-center">
            <h1 className="text-white m-0 lh-1 py-2">FarmFolio</h1>
          </div>
          <div className="bg-dark rounded-br rounded-bl h-75 px-5 py-2 d-flex align-items-center center">
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

        <div className="d-flex my-4 align-items-center">
          <div className="col-3">
            <div className="card bg-dark col-11 mx-auto p-3">
              <h2 className="text-white text-center mb-4">Profile Info</h2>
              <p className="text-white">Farm:</p>
              <p className="text-white">User:</p>
              <p className="text-white">Clocked In?:</p>
              <img
                className="mx-1 mb-5 mt-3"
                src="/images/login-reg-bg.jpg"
                alt="Image of your farm"
              />
            </div>
          </div>
          <div className="col-6">
            <Tabs>
              <TabList>
                <Tab>Plots</Tab>
                <Tab>Actions</Tab>
                <Tab>Time</Tab>
              </TabList>

              <TabPanel>
                <div className="card bg-dark p-5">
                  {/*Placeholder*/}
                  <img src="/images/login-reg-bg.jpg" alt="" />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card bg-dark p-5">
                  {/*Placeholder*/}
                  <img src="/images/farmfolioLogo.png" alt="" />
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card bg-dark p-5">
                  {/*Placeholder*/}
                  <img src="/images/login-reg-bg.jpg" alt="" />
                </div>
              </TabPanel>
            </Tabs>
          </div>
          <div className="col-3 d-flex flex-column justify-content-between">
            <div className="card bg-dark col-11 mx-auto p-3 mb-3">
              <h2 className="text-white text-center">Weather</h2>
              {/*Placeholder*/}
              <img src="/images/login-reg-bg.jpg" alt="" />
            </div>
            <div className="card bg-dark col-11 mx-auto p-3 mt-3">
              <h2 className="text-white text-center">Finances</h2>
              {/*Placeholder*/}
              <img src="/images/login-reg-bg.jpg" alt="" />
            </div>
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
