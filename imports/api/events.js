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

Meteor.methods({
  "events.get"() {
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    return Events.find({});
  }
});

Meteor.methods({
  "events.rsvp"(event) {
    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    // get the event the user is trying to RSVP to
    // console.log(event);
    let eventdocument = Events.findOne({ _id: event.theid });
    console.log(eventdocument);

    // get the list of items from the event
    let eventlist = eventdocument.list;
    let neweventlist = eventlist;

    // iterate through the list and find the matching item and quantity number
    for (let i = 0; i < neweventlist.length; i++) {
      console.log("in the loop");
      // split the string to get the itemname and quantitynumber
      let itemname = neweventlist[i].split(" ")[0];
      console.log("i item:" + itemname);
      let quantitynumber = neweventlist[i].split(" ")[1];
      console.log("quantity: " + quantitynumber);
      // find the matching item in the list
      console.log("event.itemname: " + event.itemname);
      let currentitem = event.itemname.split(" ")[0];
      console.log("currentitem: " + currentitem);
      if (itemname === currentitem) {
        // update the quantity
        quantitynumber = quantitynumber - event.itemquantity;
        console.log("updated quantity: " + quantitynumber);
        // create the new string
        let newitem = itemname + " " + quantitynumber;
        // update the list
        neweventlist[i] = newitem;
        console.log(neweventlist);

      Events.update(
        { _id: event.theid }, 
        { $set: {list: neweventlist} });
      }

      break;

    }

  }
});
