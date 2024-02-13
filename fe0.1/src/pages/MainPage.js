//   ./pages/MainPage.js

import React, { Component } from "react"
import withRouter from "../components/withRouter";

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

        if (localStorage.getItem('sessionID') === null) {
            navigate('/');
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
            })
    }

    render() {
        return (
            <div className="vh-100 gradient-custom">
                <div className="row">
                    <div id="leftSide" className="col-6 d-flex">
                        <div className="card col-10 offset-1 bg-dark text-white mt-5 cardSmall">
                            <div className="card-header">
                                <h2>Harvests</h2>
                            </div>
                            <form className="card-body">
                                <div className="row">
                                    <button id="btnAddHarvest" className="btn btn-outline-light btn-lg px-5 custom-button col-4 offset-1" type="button">Add Harvest</button>
                                    <button id="btnPastHarvest" className="btn btn-outline-light btn-lg px-5 custom-button col-4 mb-3" type="button" onClick={this.handlePastHarvest}>See Past Harvest</button>
                                </div>
                                <div className="row">
                                    <button id="btnClockIn" className="btn btn-outline-light btn-lg px-5 custom-button col-3 offset-1 " type="button">Clock In</button>
                                    <button id="btnClockOut" className="btn btn-outline-light btn-lg px-5 custom-button col-3 " type="button">Clock Out</button>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="col-6 d-flex">
                        <div id="cardDisplay" className="card col-11 bg-dark text-white mt-5">
                            <div className="card-header">
                                <h2>Display</h2>
                            </div>
                            <div className="card-body">
                                <div className="d-flex">
                                    <p>{this.state.strDisplayData}</p>
                                </div>
                            </div>
                            <div className="card-footer">
                                <button id="btnExport" className="btn btn-outline-light btn-lg px-5 custom-button col-3 justify-content-center mb-3" type="button">Export Data</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(MainPage);