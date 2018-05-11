import React, {Component} from "react";
import {Meteor} from 'meteor/meteor';
import {withTracker} from "meteor/react-meteor-data";
import {Tones} from "/imports/api/Tones.js"

import "./App.css";
import MainPage from "./MainPage";
import LoginPage from "./LoginPage";
import AuthManager from "../authentication/AuthManager";
import AuthNavbar from "./navbar/AuthNavbar";
import NavbarUser from "./navbar/NavbarUser";
import RealChart from "./D3/RealChart";

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

    componentDidMount(){
       /* Meteor.call("buses.getAgencyList",(err,res)=>{
            if (err) throw err;
            res.forEach((f)=>{
                if(f.title.includes("San Francisco")){
                    console.log(f);
                }
            })
        });
       */

       Meteor.call("buses.getRoute","sf-muni","N", (err,res)=> {
               if (err) throw err;
               else {
                   console.log(res.route[0].tr);
                   this.buses = [];
                   for (let bus of res.route[0].tr) {
                       let route = bus.stop.filter((d) => d.content !== "--");
                       route.forEach((d) => d.date = new Date(+d.epochTime));
                       this.buses.push(route);
                   }
                   console.log(this.buses);
               }
           }
        );

    }
    render() {
        return (
            <div className="app-content">
                <RealChart data={this.buses}/>

            </div>
        );
    }
}

export default withTracker(() => {

    if(Meteor.user()) {
       /* Meteor.subscribe('tones');
        let all = Tones.find().fetch();
        console.log(all);
        */
        return {
            currentUser: Meteor.user(),

        }
    }
    else{
        return{}
    }

})(App);