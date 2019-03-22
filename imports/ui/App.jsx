import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import BrowseEvents from "./BrowseEvents.jsx";
import NavBar from "./NavBar.jsx";
import EventForm from "./EventForm.jsx";

import { withTracker } from "meteor/react-meteor-data";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

const HomeComponent = () => {
  return (
    <div>
      {Meteor.user() ? (
        <section className="content-section bg-light" id="about">
          <div className="container text-center">
            <div className="row">
              <div className="col-lg-10 mx-auto">
                <div className="travel-topper">
                  <h1>Upcoming Events</h1>
                </div>
                <div className="lead mb-5">
                  <BrowseEvents />
                </div>
                <div className="travel-topper">
                  <h1>Register an Event</h1>
                </div>
                <div className="lead mb-5">
                  <EventForm />
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <header className="masthead d-flex">
          <div className="container text-center my-auto">
            <h1 className="mb-1">Potluck Potluck</h1>
            <h3 className="mb-5">
              <em>its a potluck of potlucks!</em>
            </h3>
            <Link
              to="/about"
              className="btn btn-primary btn-xl js-scroll-trigger"
            >
              Find Out More
            </Link>
          </div>
          <div className="overlay" />
        </header>
      )}
      <p className="text-muted small mb-0">
        Copyright &copy; POTLUCKPOTLUCK 2019
      </p>
      <Link to="#page-top" className="scroll-to-top rounded js-scroll-trigger">
        <i className="fas fa-angle-up" />
      </Link>
    </div>
  );
};

const AboutComponent = () => (
  <div>
    <section className="content-section bg-light" id="about">
      <div className="container text-center">
        <div className="row">
          <div className="col-lg-10 mx-auto">
            <h2>About</h2>
            <p className="lead mb-5">Tired of inviting 20 people to your party, only to find no ones brought bananas? PotluckPotluck is here to help! Once you register for an account, youll be able to create events for anyone to attend, and list all the items you need guests to bring to get your party started! Your guests can sign up for your event with the number of each item theyre bringing. Never go bananaless again!</p>
          </div>
          <div className="grill-topper d-flex" />
        </div>
      </div>
    </section>
    <p className="text-muted small mb-0">
      Copyright &copy; POTLUCKPOTLUCK 2019
    </p>
  </div>
);

const NotFoundPage = () => (
  <div>
    <h2>Page not found</h2>
    <div>SUHAS HELP</div>
  </div>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/about" component={AboutComponent} />
            <Route component={NotFoundPage} />
          </Switch>
          <br />
        </div>
      </Router>
    );
  }
}

export default withTracker(() => {
  return {
    user: Meteor.user()
  };
})(App);