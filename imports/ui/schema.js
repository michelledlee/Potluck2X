import {SimpleSchema} from 'meteor/aldeed:simple-schema';

export const Schema = new SimpleSchema({
    name: {
        type: String,
    },
    date: {
        type: String,
    },
    time: {
        type: String,
    },
    description: {
        type: String,
    },
    list: {
        type: String,
    },
    createdAt: {
        type: String,
    },
    owner: {
        type: String,
    }
});