import {Meteor} from "meteor/meteor";
import React from "react";
import {Mongo} from "meteor/mongo";
import {check} from "meteor/check";

export const Comments = new Mongo.Collection('Comments');



if (Meteor.isServer) {
    Meteor.publish('comments', function tasksPublication() {
        return Comments.find();
    });

}

/*
Meteor.methods({

    'comments.insert'(text, username, agency, route, type) {
        console.log("entergin comments.insert");
        check(text, String);
        check(username, String);
        check(agency, String);
        check(route, String);
        check(type, Number);
        console.log("check done");

        Comments.insert({
            text:text,
            username:username,
            agency:agency,
            route:route,
            type: type,
            created_at:new Date()
        });

    }
});*/