import {Meteor} from "meteor/meteor";
import {HTTP} from "meteor/http";

const callService = (type, url, options) => new Promise((resolve, reject) => {
    HTTP.call(type, url, options, (error, result) => {
        if (error) {
            reject(error);
        } else {
            resolve(result);
        }
    });
});



Meteor.methods({

    'buses.getAgencyList'() {
        return callService(
            'GET',
            'http://webservices.nextbus.com/service/publicJSONFeed?command=agencyList'
        ).then((result) => {
            return JSON.parse(result);
        })
            .catch((error) => {
                throw new Meteor.Error('500', `${error.message}`);
            });
    },

    'buses.getRoutesByAgency'(agencyTag) {
        return callService(
            'GET',
            'http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a=' + agencyTag
        ).then((result) => {
            return JSON.parse(result);
        }).then((result) => {
            return result.agency;
        })
            .catch((error) => {
                throw new Meteor.Error('500', `${error.message}`);
            });
    }
});