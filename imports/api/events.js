import { Mongo } from "meteor/mongo";
import { Meteor } from "meteor/meteor";
import { check } from "meteor/check";

export const Events = new Mongo.Collection("events");

if (Meteor.isServer) {
  Meteor.publish("events", function eventsPublish() {
    try {
      return Events.find(
        {},
        {
          limit: 10,
          sort: {
            createdAt: -1
          }
        }
      );
    } catch (e) {
      console.log(e);
    }
  });

}

// user is adding a new event
Meteor.methods({
  "events.insert"(event) {
    console.log("events.insert");

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

// user is adding items to the event they have just created
Meteor.methods({
  "items.insert"(event) {
    console.log("items.insert");

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    console.log(event);
    let eventdocument = Events.findOne({ _id: event.objid });
    console.log(eventdocument);
    let eventlist = eventdocument.list;
    let neweventlist = eventlist;

    // // get variables for the item that we are trying to insert
    // let insertitem = event.iteminfo.split("-")[0];

    // check if the item is already in the list
    for (let i = 0; i < eventlist.length; i++) {
      console.log("in the loop");

      // split the string to get the itemname and quantitynumber
      let itemname = neweventlist[i].split("-")[0];
      console.log("i item:" + itemname);
      let quantitynumber = neweventlist[i].split("-")[1];
      console.log("quantity: " + quantitynumber);

      // find the matching item in the list
      console.log("event.itemname: " + event.itemname);
      let currentitem = event.iteminfo.split("-")[0];
      console.log("currentitem: " + currentitem);

      if (itemname === currentitem) {
        //  already in the list, do not add
        console.log("iTeM aLrEaDy AdDeD");
        return;

      }
    }

    neweventlist.push(event.iteminfo);

    Events.update({ _id: event.objid }, 
      { $set: {list: neweventlist} });
  }
});

// getting events to display all events
Meteor.methods({
  "events.get"() {
    console.log("events.get");

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      console.log("not authorized mf");
      throw new Meteor.Error("not-authorized");
    }

    return Events.find({});
  }
});

// user is RSVPing to an event with items
Meteor.methods({
  "events.rsvp"(event) {
    console.log("events.rsvp");

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }
    // get the event the user is trying to RSVP to
    let eventdocument = Events.findOne({ _id: event.theid });
    console.log(eventdocument);

    // get the list of items from the event
    let eventlist = eventdocument.list;
    let neweventlist = eventlist;

    // iterate through the list and find the matching item and quantity number
    for (let i = 0; i < neweventlist.length; i++) {
      console.log("in the loop");

      // split the string to get the itemname and quantitynumber
      let itemname = neweventlist[i].split("-")[0];
      console.log("i item:" + itemname);
      let quantitynumber = neweventlist[i].split("-")[1];
      console.log("quantity: " + quantitynumber);

      // find the matching item in the list
      console.log("event.itemname: " + event.itemname);
      let currentitem = event.itemname.split("-")[0];
      console.log("currentitem: " + currentitem);

      if (itemname === currentitem) {
        // update the quantity
        quantitynumber = quantitynumber - event.itemquantity;
        console.log("updated quantity: " + quantitynumber);
        // create the new string
        let newitem = itemname + "-" + quantitynumber;
        // update the list
        neweventlist[i] = newitem;
        console.log(neweventlist);

        Events.update(
          { _id: event.theid }, 
          { $set: {list: neweventlist} });

        break;

      }
    }
  }
});

// check the list to see if the event is ready to go
Meteor.methods({
  "check.list"(event) {
    console.log("check.list");
    console.log(event);

    // Make sure the user is logged in before inserting a task
    if (!this.userId) {
      throw new Meteor.Error("not-authorized");
    }

    // get the list of items from the event
    let eventlist = event.list;
    let neweventlist = eventlist; // don't want to accidentally change the database one

    // iterate through the list and find the matching item and quantity number
    for (let i = 0; i < neweventlist.length; i++) {
      console.log("in the loop");

      // split the string to get the itemname and quantitynumber
      let itemname = neweventlist[i].split("-")[0];
      console.log("i item:" + itemname);
      let quantitynumber = neweventlist[i].split("-")[1];
      console.log("quantity: " + quantitynumber);

      // if any quantity has not been fulfilled, return with not ready
      if (quantitynumber > 0) {
        return false;
      }
    }

    // if looped through and all item quantities are 0, return true
    return true;
  }
});