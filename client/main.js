
import {Meteor} from "meteor/meteor";
import React from "react";
import {render} from "react-dom";
import App from "../imports/ui/App.js";
import "../imports/api/Comments.js";

Meteor.startup(()=>{

    render(<App/>, document.getElementById("render-target"));
});
