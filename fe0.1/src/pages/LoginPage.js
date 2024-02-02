import React, { Component } from 'react';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        // sets username and login to empty values
        this.state = {
            username: '',
            password: ''
        };
    }

    handleInputChange = (event) => {
        const target = event.target;
        const name = target.name;
        const value = target.value;

        this.setState({
            [name]: value
        });
    };

    handleSubmit = (event) => {
        event.preventDefault();
        console.log('Submit Pressed');
        // You can replace the alert with actual logic to send data to the server for authentication
        fetch('http://localhost:8000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: this.state.username,
                password: this.state.password
            })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                // handle successful authentication here
                if (data.status === 202) {
                    alert(data.message);
                    window.location.href = "home.html";
                } else {
                    throw new Error();
                }
            })
            .catch(error => {
                console.error('Error:', error);
                // handle authentication error here
                alert('Authentication Failed');
            });
    };

    render() {
        return (
            <section
                className="vh-100% gradient-custom"
                style={{
                    background: 'linear-gradient(to right, #3a6828, #4e7240)',
                    color: 'white',
                }}
            >
                <div className="container py-5 h-100">
                    <div className="row d-flex justify-content-center align-items-center h-100">
                        <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                            <div className="card bg-dark text-white">
                                <div className="card-body p-5 text-center">

                                    <div className="mb-md-5 mt-md-4 pb-5">

                                        <h2 className="fw-bold mb-2 text-uppercase">FarmFolio</h2>
                                        <p className="text-white-50 mb-5">Please enter your login and password!</p>

                                        <form className="form-outline form-white-4" onSubmit={this.handleSubmit}>
                                            <div>
                                                <input
                                                    type="text"
                                                    id="typeEmailX"
                                                    className=" form-control-lg"
                                                    placeholder="Username"
                                                    value={this.state.username}
                                                    name="username" // add a name attribute to the input
                                                    onChange={this.handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <div>
                                                <input
                                                    type="password"
                                                    id="typePasswordX"
                                                    className="form-control-lg mt-2"
                                                    placeholder="Password"
                                                    value={this.state.password}
                                                    name="password" // add a name attribute to the input
                                                    onChange={this.handleInputChange}
                                                    required
                                                />
                                            </div>
                                            <p className="small mb-5 pb-lg-2"><a className="text-white-50" href="#!">Forgot password?</a></p>
                                            <button className="btn btn-outline-light btn-lg px-5" type="submit">Login</button>
                                        </form>
                                    </div>

                                    <div>
                                        <p className="mb-0">Don't have an account? <a href="#!" className="text-white-50 fw-bold">Sign Up</a></p>
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