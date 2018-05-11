import {Meteor} from "meteor/meteor";
import React from "react";
import {Mongo} from "meteor/mongo";

export const Buses = new Mongo.Collection('buses');



if (Meteor.isServer) {
    Meteor.publish('buses', function tasksPublication() {
        return Buses.find();
    });

}
