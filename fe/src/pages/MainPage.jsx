//   ./pages/MainPage.js

import React, { Component } from "react";
import withRouter from "../components/withRouter";
import "../assets/styles/main.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      strWeatherTemp: "",
      strWeatherDesc: "",
      strCity: "",
      strState: ""
    };
  }
  //Function that checks for a sessionID in local storage. If no sessionID is found, redirect to the login page for reauthentication.
  checkSessionID = () => {
    //Whenever the user tries to perform an action such as viewing data, add this to check for a sessionID first

    const { navigate } = this.props;

    const uuidRegex = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/;

    if (!uuidRegex.test(localStorage.getItem("uuidSessionToken"))) {
      navigate("/");
    }
  };

  getWeatherData() {
    //make sure to host backend using node index.js in the backend folder
    var token = localStorage.getItem('uuidSessionToken');
    fetch("http://34.201.138.60:8000/getWeather?uuidSessionToken=" + token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);

        // Uncomment the following lines if you want to update the component's state
        this.setState({
          strWeatherDesc: JSON.stringify(data.weather_description),
          strWeatherTemp: JSON.stringify(data.weather_temp),
          strCity: JSON.stringify(data.city),
          strState: JSON.stringify(data.state),
        });
      })
      .catch((error) => {
        console.error("Error in MainPage.jsx:", error);
        if (error.response && error.response.text) {
          console.log("Raw Response Text:", error.response.text());
        }
        // Handle error as needed
      });
  }

  logoutCall = (event) => {
    const { navigate } = this.props;
    event.preventDefault();

    fetch("http://34.201.138.60:8000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uuidSessionToken: localStorage.getItem("uuidSessionToken")
      }),
    })
      .then((data) => {
        console.log(data)
      })
    localStorage.removeItem("uuidSessionToken");
    navigate("/");
  }

  componentDidMount() {
    // Call the function initially
    // this.getWeatherData();

    // Set up an interval to call the function every 5 seconds
    this.intervalId = setInterval(() => {
      this.getWeatherData();
    }, 10000);
  }

  componentWillUnmount() {
    // Clear the interval when the component is unmounted
    clearInterval(this.intervalId);
  }

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
            <a className="text-white text-decoration-none" onClick={this.logoutCall}>
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
              <button className="btn btn-outline-light col-8 offset-2 clockButton mb-3">Clock In</button>
              <button className="btn btn-outline-light col-8 offset-2 clockButton">Clock Out</button>
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
                <div className="card bg-dark p-5 text-white">
                  <div className="card-body col-4">
                    <h1>Plots</h1>
                    <hr/>
                    <button className="btn btn-outline-light col-12 mb-3">Add Plot</button>
                    <select className="form-select" multiple aria-label="Plots">

                    </select>
                  </div>
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
              <div className="d-flex justify-content-between px-2 mt-2">
                <div>
                  <p className="text-white fw-light">{this.state.strWeatherDesc}</p>
                </div>
                <div className="d-flex">

                  <hr className="vr me-4"></hr>
                  <div>
                    <div className="mb-2">
                      <p className="text-white m-0">{this.state.strCity + ", " + this.state.strState}</p>
                      <p className="text-white m-0 small fw-light">Monday</p>
                    </div>
                    <p className="text-white h2">{this.state.strWeatherTemp + " °F"}</p>
                  </div>
                </div>
              </div>
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
      </div >
    );
  }
}

export default withRouter(MainPage);