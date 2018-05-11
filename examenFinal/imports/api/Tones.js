import {Meteor} from 'meteor/meteor';
import {Mongo} from 'meteor/mongo';
import {check} from 'meteor/check';


export const Tones = new Mongo.Collection('Tones');



if (Meteor.isServer) {

    // This code only runs on the server
    Meteor.publish('tones', function tasksPublication() {
        return Tones.find({userId: this.userId});
    });


}

Meteor.methods({

    'tones.insert'(tone) {
        check(tone, Object);
        console.log(tone);
        Tones.insert(tone);
        console.log(Tones.find({}).fetch());
    }
});