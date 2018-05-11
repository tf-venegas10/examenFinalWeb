import React, {Component} from 'react';
import PropTypes from "prop-types";
import "./LoginPage.css";


export default class LoginPage extends Component {
    render() {
        return (
            <div className="justify-content-around main">
                <div className="main-interactions center-items">
                    <div className="col-m-12 interactions-content">
                        <h1 className="slogan">
                            Final Exam
                        </h1>
                        <div className="col-md-12">

                        </div>
                        <div className="col-md-12 sign-up-button-container">
                            <button className="btn sign-up-button col-md-12 btn-signup" onClick={this.props.goToSignUp}>
                                Sign Up
                            </button>
                        </div>
                        <div className="col-md-12 login-button-container">
                            <button className="btn login-button col-md-12 btn-login" onClick={this.props.goToLogin}>
                                Login
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

LoginPage.propTypes = {
    goToSignUp: PropTypes.func.isRequired,
    goToLogin: PropTypes.func.isRequired,
};