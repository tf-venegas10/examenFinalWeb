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
            return JSON.parse(result.content).agency    ;
        })
            .catch((error) => {
                throw new Meteor.Error('500', `${error.message}`);
            });
    },

    'buses.getRoute'(agencyTag, routeTag) {
        return callService(
            'GET',
            'http://webservices.nextbus.com/service/publicJSONFeed?command=schedule&a=' + agencyTag+'&r='+routeTag
        ).then((result) => {
            return (result.data);
        })
            .catch((error) => {
                throw new Meteor.Error('500', `${error.message}`);
            });
    }
});