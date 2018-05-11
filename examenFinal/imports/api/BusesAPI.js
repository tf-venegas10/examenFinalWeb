import {Meteor} from "meteor/meteor";
import React from "react";
import {HTTP} from 'meteor/http'

Meteor.methods({
    "agencyList"() {
        try {
            let res = HTTP.get('http://webservices.nextbus.com/service/publicJSONFeed?command=agencyList');
            return res.data.agency;

        } catch (e) {
            throw new Meteor.Error('error-code', 'API error',e);
        }
    }

});