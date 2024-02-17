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
                <div className="col-3">
                    <div className="card bg-dark col-10 offset-1 mt-2" style={{height: '400px'}}>

                    </div>
                </div>
                <div className="col-6">

                </div>
                <div className="col-3">

                </div>
            </div>
        )
    }
}

export default withRouter(MainPage);