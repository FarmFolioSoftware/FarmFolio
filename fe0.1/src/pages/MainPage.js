//   ./pages/MainPage.js

import React, { Component } from "react";
import withRouter from '../components/withRouter';

class MainPage extends Component {


//Function that checks for a sessionID in local storage. If no sessionID is found, redirect to the login page for reauthentication.
    checkSessionID = () => {
        //Whenever the user tries to perform an action such as viewing data, add this to check for a sessionID first
    
        const { navigate } = this.props;

          if (localStorage.getItem('sessionID') === null) {
            navigate('/');
          }
        
    };

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
                                    <button id="btnPastHarvest" className="btn btn-outline-light btn-lg px-5 custom-button col-4 mb-3" type="button">See Past Harvest</button>
                                </div>
                                <div className="row">
                                    <button id="btnClockIn" className="btn btn-outline-light btn-lg px-5 custom-button col-3 offset-1 " type="button">Clock In</button>
                                    <button id="btnClockOut" className="btn btn-outline-light btn-lg px-5 custom-button col-3 " type="button">Clock Out</button>
                                </div>
                            </form>
                        </div>
                        <div className="card col-10 offset-1 bg-dark text-white mt-5 cardSmall">
                            <div className="card-header">
                                <h2>Crops</h2>
                            </div>
                            <form className="card-body">

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
                                    <textArea id="txtAreaDisplay" disabled rows="16" cols="86"></textArea>
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