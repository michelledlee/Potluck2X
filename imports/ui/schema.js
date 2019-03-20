import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const Schema = new SimpleSchema({
    name: {
        type: String,
        label: "Name of Event",
        optional: false
    },
    date: {
        type: String,
        label: "Date",
        optional: false
    },
    time: {
        type: String,
        label: "Time",
        optional: false
    },
    description: {
        type: String,
        label: "Description",
        optional: false
    },
    list: {
        type: [String],
        label: "Description",
        optional: false
    }

});
