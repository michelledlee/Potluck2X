import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Events = new Mongo.Collection("events");

if (Meteor.isServer) {
  Meteor.publish("events", function eventsPublish() {
    return Events.find(
      {},
      {
        limit: 10,
        sort: {
          createdAt: -1
        }
      }
    );
  });
}

Meteor.methods({
  "events.insert"(event) {
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    return Events.insert({
      name: event.name,
      date: event.date,
      time: event.time,
      description: event.description,
      list: event.list,
      createdAt: Date.now(),
      owner: Meteor.user().username
    });
  }
});

Meteor.methods({
  "items.insert"(event) {
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    console.log(event);
    let eventdocument = Events.findOne({ _id: event.objid });
    console.log(eventdocument);
    let eventlist = eventdocument.list;
    let neweventlist = eventlist;
    neweventlist.push(event.iteminfo);

    Events.update({ _id: event.objid }, 
      { $set: {list: neweventlist} });
  }
});