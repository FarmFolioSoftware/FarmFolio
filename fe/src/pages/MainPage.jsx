//   ./pages/MainPage.js

import React, { Component } from "react";
import withRouter from "../components/withRouter";
import "../assets/styles/main.css";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

class MainPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      strFullName: "",
      strFarmName: "",
      strWeatherTemp: "",
      strWeatherDesc: "",
      strWeatherIconURL: "",
      strCity: "",
      strState: "",
      strDay: "",
      strPlotOptions: [],
      strInOutHTML: [],
      blnClockedIn: false
    };
  }

  handleInputChange = event => {
    const target = event.target;
    const name = target.name;
    const value = target.value;

    this.setState({
      [name]: value
    });
  };

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
    const arrWeekday = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday"
    ];
    const d = new Date();

    var token = localStorage.getItem("uuidSessionToken");
    fetch("http://3.82.57.93:8000/getWeather?uuidSessionToken=" + token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        // Uncomment the following lines if you want to update the component's state
        this.setState({
          strWeatherDesc: JSON.parse(JSON.stringify(data.weather_description)),
          strWeatherTemp: JSON.parse(JSON.stringify(data.weather_temp)),
          strWeatherIconURL:
            "https://openweathermap.org/img/wn/" +
            JSON.parse(JSON.stringify(data.icon)) +
            "@2x.png",
          strCity: JSON.parse(JSON.stringify(data.city)),
          strState: JSON.parse(JSON.stringify(data.state)),
          strDay: arrWeekday[d.getDay()]
        });
      })
      .catch(error => {
        console.error("Error in MainPage.jsx:", error);
        if (error.response && error.response.text) {
          console.log("Raw Response Text:", error.response.text());
        }
        // Handle error as needed
      });
  }

  clock = event => {
    fetch("http://3.82.57.93:8000/clockButton", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uuidSessionToken: localStorage.getItem("uuidSessionToken"),
        clockinout: event.event
      })
    }).then(data => {
      console.log(data);
    });

    this.setState({ blnClockedIn: !this.state.blnClockedIn });
  };

  //CALL TO POPULATE PLOT BOX!!! NEEDS BACKEND CALL
  populatePlots = () => {
    var token = localStorage.getItem("uuidSessionToken");
    fetch("http://3.82.57.93:8000/listPlots?uuidSessionToken=" + token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        let plotOptions = [];
        data.plots.forEach(plot => {
          plotOptions.push(
            <option key={plot.plotID} value={plot.plotID}>
              {plot.plotName}
            </option>
          );
        });
        this.setState({
          strPlotOptions: plotOptions
        });
      });
  };

  populateTime = () => {
    var token = localStorage.getItem("uuidSessionToken");
    fetch("http://3.82.57.93:8000/getTimePunches?uuidSessionToken=" + token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        let strHTML = [];
        data.punches.forEach(inOut => {
          const timeInFormatted = new Date(inOut.timeIn).toLocaleString(
            "en-US",
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false
            }
          );
          const timeOutFormatted = new Date(inOut.timeOut).toLocaleString(
            "en-US",
            {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              second: "2-digit",
              hour12: false
            }
          );
          strHTML.push(
            <div className="card col-10 offset-1 bg-dark text-white mt-1">
              <p>Time In: {timeInFormatted}</p>
              <p>Time Out: {timeOutFormatted}</p>
            </div>
          );
        });
        this.setState({
          strInOutHTML: strHTML
        });
      });
  };

  getUserData() {
    //make sure to host backend using node index.js in the backend folder
    var token = localStorage.getItem("uuidSessionToken");
    fetch("http://3.82.57.93:8000/getUserInfo?uuidSessionToken=" + token, {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    })
      .then(response => response.json())
      .then(data => {
        console.log(data);

        this.setState({
          strFarmName: JSON.parse(JSON.stringify(data.farmName)),
          strFullName: JSON.parse(JSON.stringify(data.fullName))
        });
      })
      .catch(error => {
        console.error("Error in MainPage.jsx:", error);
        if (error.response && error.response.text) {
          console.log("Raw Response Text:", error.response.text());
        }
        // Handle error as needed
      });
  }

  logoutCall = event => {
    const { navigate } = this.props;
    event.preventDefault();

    fetch("http://3.82.57.93:8000/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        uuidSessionToken: localStorage.getItem("uuidSessionToken")
      })
    }).then(data => {
      console.log(data);
    });
    localStorage.removeItem("uuidSessionToken");
    navigate("/");
  };

  componentDidMount() {
    // Call the function initially
    setTimeout(() => {
      this.populatePlots();
      this.populateTime();
      this.getUserData();
      this.getWeatherData();
    }, 500);
    // this.getWeatherData();

    // Set up an interval to call the function every 5 seconds
    /*
    this.intervalId = setInterval(() => {
      this.getWeatherData();
    }, 10000);
    */
  }

  componentWillUnmount() {
    // Clear the interval when the component is unmounted
    clearInterval(this.intervalId);
  }

  render() {
    return (
      <div className="min-height-100vh gradient-custom d-flex flex-column">
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
            <a
              className="text-white text-decoration-none"
              onClick={this.logoutCall}
            >
              Log Out
            </a>
          </div>
        </nav>

        <div className="d-flex my-4 align-items-center justify-content-center">
          <div className="col-8">
            <Tabs>
              <TabList>
                <Tab>Plots</Tab>
                <Tab>Actions</Tab>
                <Tab>Time</Tab>
              </TabList>

              <TabPanel>
                <div className="card bg-dark p-5 text-white">
                  <h1>Plots</h1>
                  <hr />
                  <div className="card-body" style={{ display: "inline-flex" }}>
                    <div className="col-3">
                      <button className="btn btn-outline-light col-12 mb-3">
                        Add Plot
                      </button>
                      <select
                        className="form-select plotSelectBox text-white"
                        multiple
                        aria-label="Plots"
                      >
                        {this.state.strPlotOptions}
                      </select>
                    </div>
                    <div className="col-9">
                      <div
                        className="card bg-dark text-white col-11 offset-1"
                        style={{
                          outline: "white solid 2px",
                          display: "inline-flex"
                        }}
                      >
                        <div className="col-3 offset-1 mt-2">
                          <p>Plot Name</p>
                          <p>Plot Size: </p>
                          <p>Start Date: </p>
                          <p>End Date: </p>
                          <p>Last Updated: </p>
                          <p>Description: </p>
                          <button className="btn btn-outline-light mb-3">
                            Delete Plot
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card bg-dark p-5 text-white">
                  <h1>Actions</h1>
                  <hr />
                  <div className="card-body" style={{ display: "inline-flex" }}>
                    <div className="col-3">
                      <button className="btn btn-outline-light col-12 mb-3">
                        Add Action
                      </button>
                      <select
                        className="form-select plotSelectBox text-white"
                        multiple
                        aria-label="Actions"
                      ></select>
                    </div>
                    <div className="col-9">
                      <div
                        className="card bg-dark text-white col-11 offset-1"
                        style={{
                          outline: "white solid 2px",
                          display: "inline-flex"
                        }}
                      >
                        <div className="col-3 offset-1 mt-2"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
              <TabPanel>
                <div className="card bg-dark p-5 text-white">
                  <h1>Time Clock</h1>
                  <hr />
                  <div className="card-body" style={{ display: "inline-flex" }}>
                    <div className="col-12">
                      <div
                        className="card bg-dark text-white col-12"
                        style={{
                          outline: "white solid 2px",
                          display: "inline-flex"
                        }}
                      >
                        <div className="col-12 my-2 timeSheet">
                          <div className="divInOut">
                            {this.state.strInOutHTML}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </TabPanel>
            </Tabs>
          </div>
          <div className="col-3 d-flex flex-column justify-content-between">
            <div className="card bg-dark col-11 mx-auto p-3 mt-5">
              <h2 className="text-white text-center mb-4">Profile Info</h2>
              <p className="text-white">{"Farm: " + this.state.strFarmName}</p>
              <p className="text-white">{"User: " + this.state.strFullName}</p>
              <button
                disabled={this.state.blnClockedIn}
                className="btn btn-outline-light col-8 offset-2 clockButton mb-3"
                onClick={() => this.clock({ event: 0 })}
              >
                Clock In
              </button>
              <button
                disabled={!this.state.blnClockedIn}
                className="btn btn-outline-light col-8 offset-2 clockButton"
                onClick={() => this.clock({ event: 1 })}
              >
                Clock Out
              </button>
            </div>
            <div className="card bg-dark col-11 mx-auto p-3 mb-2 mt-4">
              <h2 className="text-white text-center">Weather</h2>
              <div className="d-flex justify-content-between px-2 mt-2">
                <div>
                  <p className="text-white fw-light">
                    {this.state.strWeatherDesc}
                  </p>
                  <img src={this.state.strWeatherIconURL} alt="" />
                </div>
                <div className="d-flex">
                  <hr className="vr me-4"></hr>
                  <div>
                    <div className="mb-2">
                      <p className="text-white m-0">
                        {this.state.strCity + ", " + this.state.strState}
                      </p>
                      <p className="text-white m-0 small fw-light">
                        {this.state.strDay}
                      </p>
                    </div>
                    <p className="text-white h2">
                      {this.state.strWeatherTemp + " °F"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="card bg-dark col-11 mx-auto p-3 mt-3 mb-3">
          <h2 className="text-white text-center">Finances</h2>
          {/*Placeholder*/}
          <img src="/images/login-reg-bg.jpg" alt="" />
        </div>

        <footer className="bg-dark py-4">
          <p className="text-center text-white m-0">FarmFolio</p>
        </footer>
      </div>
    );
  }
}

export default withRouter(MainPage);
