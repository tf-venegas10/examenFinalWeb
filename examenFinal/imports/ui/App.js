import React, {Component} from "react";
import {Meteor} from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";

import "./App.css";
import MainPage from "./MainPage";
import AuthManager from "../authentication/AuthManager";
import AuthNavbar from "./navbar/AuthNavbar";
import NavbarUser from "./navbar/NavbarUser";
import LoginPage from "./LoginPage";
import {Comments} from "../api/Comments.js";

class App extends Component {
    constructor(props) {
        super(props);
        this.state={
            location: "index",
            userLocation: "index"
        };

        this.goToIndex = this.goToIndex.bind(this);
        this.goToIndexUser = this.goToIndexUser.bind(this);
        this.goToSignUp = this.goToSignUp.bind(this);
        this.goToLogin = this.goToLogin.bind(this);
        this.handleLogoutSubmit = this.handleLogoutSubmit.bind(this);
    }

    goToIndex() {
        this.setState({location: "index"});
    }

    goToIndexUser() {
        this.setState({userLocation: "index"});
    }

    goToSignUp() {
        this.setState({location: "SignUp"});
    }

    goToLogin() {
        this.setState({location: "Login"});
    }

    handleLogoutSubmit() {
        Meteor.logout();
    }


    render() {
        return (
            <div className="app-content">
                {
                    this.props.currentUser ?
                        <NavbarUser onLogoutCallback={this.handleLogoutSubmit}/>
                        : this.state.location !== "index" ? <AuthNavbar goToIndex={this.goToIndex}/> : null
                }
                {
                    (this.props.currentUser ?
                        <MainPage comments={this.props.comments}/>
                        : (this.state.location === "index" ?
                            <LoginPage   goToSignUp={this.goToSignUp} goToLogin={this.goToLogin}/>
                            : <AuthManager isLogin={this.state.location !== "SignUp"} typeAuth={this.state.location}/>))

                }

            </div>
        );
    }
}

export default withTracker(() => {
    Meteor.subscribe("comments");
    if(Meteor.user()) {
        let all= Comments.find().fetch();
        return {
            currentUser: Meteor.user(),
            comments:all
        }
    }
    else{
        return{}
    }

})(App);