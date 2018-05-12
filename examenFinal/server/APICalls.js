import {Meteor} from "meteor/meteor";
import {HTTP} from "meteor/http";
import {check} from 'meteor/check';
import {Comments} from "../imports/api/Comments";

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
    'buses.getRoutesList'(agencyTag) {
            check(agencyTag,String);
            return callService(
                'GET',
                'http://webservices.nextbus.com/service/publicJSONFeed?command=routeList&a='+agencyTag
            ).then((result) => {
                if (!Array.isArray(result.data.route)){
                    return [result.data.route]
                }
                return result.data.route   ;
            })
                .catch((error) => {
                    throw new Meteor.Error('500', `${error.message}`);
                });
        },

    'buses.getRoute'(agencyTag, routeTag) {
        check(agencyTag,String);
        check(routeTag,String);
        return callService(
            'GET',
            'http://webservices.nextbus.com/service/publicJSONFeed?command=schedule&a=' + agencyTag+'&r='+routeTag
        ).then((result) => {
            return (result.data);
        })
            .catch((error) => {
                throw new Meteor.Error('500', `${error.message}`);
            });
    },
    'comments.insert'(text, username, agency, route, type) {
        check(text, String);
        check(username, String);
        check(agency, String);
        check(route, String);
        check(type, Number);

        Comments.insert({
            text:text,
            username:username,
            agency:agency,
            route:route,
            type: type,
            created_at:new Date()
        });

    }
});