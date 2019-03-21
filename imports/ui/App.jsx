import React, { Component } from "react";
import { Meteor } from "meteor/meteor";
import { Link } from "react-router-dom";
import Chat from "./Chat.jsx";
import Event from "./Event.jsx";
import BrowseEvents from "./BrowseEvents.jsx";
import EventRSVP from "./EventRSVP.jsx";
import RegisterEvent from "./RegisterEvent.jsx";
import NavBar from "./NavBar.jsx";
import EventForm from "./EventForm.jsx";
import ListForm from "./ListForm.jsx";

import { withTracker } from "meteor/react-meteor-data";

import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


const HomeComponent = () => {
  return (
    <div>
      <h1>Meteor chat</h1>

      {Meteor.user() ? <Chat /> : <div>Please log in</div>}

      <h1>Events</h1>
      <BrowseEvents />
      <EventForm />

    </div>
  );
};

const AboutComponent = () =>
  <div>
    <h2>About</h2>
    <div>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est saepe, ea minus quae ab nam impedit eaque. Adipisci expedita sit repudiandae, enim sapiente ipsam voluptas obcaecati veritatis, sunt eius nemo.</div>
  </div>;

const NotFoundPage = () =>
  <div>
    <h2>Page not found</h2>
    <div>We should call Suhas 🤷‍♀️</div>
  </div>;

const MainComponent = () =>
<div>
  <header className="masthead d-flex">
    <div className="container text-center my-auto">
      <h1 className="mb-1">Stylish Portfolio</h1>
      <h3 className="mb-5">
        <em>A Free Bootstrap Theme by Start Bootstrap</em>
      </h3>
      <Link to="/about" className="btn btn-primary btn-xl js-scroll-trigger">Find Out More</Link>
    </div>
    <div className="overlay"></div>
  </header>

  <section className="content-section bg-light" id="about">
    <div className="container text-center">
      <div className="row">
        <div className="col-lg-10 mx-auto">
          <h2>Stylish Portfolio is the perfect theme for your next project!</h2>
          <p className="lead mb-5">This theme features a flexible, UX friendly sidebar menu and stock photos from our friends at.</p>
          <Link to="/services" className="btn btn-dark btn-xl js-scroll-trigger">What We Offer</Link>
        </div>
      </div>
    </div>
  </section>

  <section className="content-section bg-primary text-white text-center" id="services">
    <div className="container">
      <div className="content-section-heading">
        <h3 className="text-secondary mb-0">Services</h3>
        <h2 className="mb-5">What We Offer</h2>
      </div>
      <div className="row">
        <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
          <span className="service-icon rounded-circle mx-auto mb-3">
            <i className="icon-screen-smartphone"></i>
          </span>
          <h4>
            <strong>Responsive</strong>
          </h4>
          <p className="text-faded mb-0">Looks great on any screen size!</p>
        </div>
        <div className="col-lg-3 col-md-6 mb-5 mb-lg-0">
          <span className="service-icon rounded-circle mx-auto mb-3">
            <i className="icon-pencil"></i>
          </span>
          <h4>
            <strong>Redesigned</strong>
          </h4>
          <p className="text-faded mb-0">Freshly redesigned for Bootstrap 4.</p>
        </div>
        <div className="col-lg-3 col-md-6 mb-5 mb-md-0">
          <span className="service-icon rounded-circle mx-auto mb-3">
            <i className="icon-like"></i>
          </span>
          <h4>
            <strong>Favorited</strong>
          </h4>
          <p className="text-faded mb-0">Millions of users
            <i className="fas fa-heart"></i>
            Start Bootstrap!</p>
        </div>
        <div className="col-lg-3 col-md-6">
          <span className="service-icon rounded-circle mx-auto mb-3">
            <i className="icon-mustache"></i>
          </span>
          <h4>
            <strong>Question</strong>
          </h4>
          <p className="text-faded mb-0">I mustache you a question...</p>
        </div>
      </div>
    </div>
  </section>

  <section className="callout">
    <div className="container text-center">
      <h2 className="mx-auto mb-5">Welcome to
        <em>your</em>
        next website!</h2>
      <Link to="/download" className="btn btn-primary btn-xl">Download Now!</Link>
    </div>
  </section>

  <section className="content-section" id="portfolio">
    <div className="container">
      <div className="content-section-heading text-center">
        <h3 className="text-secondary mb-0">Portfolio</h3>
        <h2 className="mb-5">Recent Projects</h2>
      </div>
      <div className="row no-gutters">
        <div className="col-lg-6">
          <Link to="/about" className="portfolio-item">
            <span className="caption">
              <span className="caption-content">
                <h2>Stationary</h2>
                <p className="mb-0">A yellow pencil with envelopes on a clean, blue backdrop!</p>
              </span>
            </span>
            <img className="img-fluid" src="img/portfolio-1.jpg" alt="" />
          </Link>
        </div>
        <div className="col-lg-6">
          <Link to="#" className="portfolio-item">
            <span className="caption">
              <span className="caption-content">
                <h2>Ice Cream</h2>
                <p className="mb-0">A dark blue background with a colored pencil, a clip, and a tiny ice cream cone!</p>
              </span>
            </span>
            <img className="img-fluid" src="img/portfolio-2.jpg" alt="" />
          </Link>
        </div>
        <div className="col-lg-6">
          <Link to="#" className="portfolio-item">
            <span className="caption">
              <span className="caption-content">
                <h2>Strawberries</h2>
                <p className="mb-0">Strawberries are such a tasty snack, especially with a little sugar on top!</p>
              </span>
            </span>
            <img className="img-fluid" src="img/portfolio-3.jpg" alt="" />
          </Link>
        </div>
        <div className="col-lg-6">
          <Link to="#" className="portfolio-item">
            <span className="caption">
              <span className="caption-content">
                <h2>Workspace</h2>
                <p className="mb-0">A yellow workspace with some scissors, pencils, and other objects.</p>
              </span>
            </span>
            <img className="img-fluid" src="img/portfolio-4.jpg" alt=""/>
          </Link>
        </div>
      </div>
    </div>
  </section>

  <section className="content-section bg-primary text-white">
    <div className="container text-center">
      <h2 className="mb-4">The buttons below are impossible to resist...</h2>
      <Link to="#" className="btn btn-xl btn-light mr-4">Click Me!</Link>
      <Link to="#" className="btn btn-xl btn-dark">Look at Me!</Link>
    </div>
  </section>

  <footer className="footer text-center">
    <div className="container">
      <ul className="list-inline mb-5">
        <li className="list-inline-item">
          <Link to="#" className="social-link rounded-circle text-white mr-3">
            <i className="icon-social-facebook"></i>
          </Link>
        </li>
        <li className="list-inline-item">
          <Link to="#" className="social-link rounded-circle text-white mr-3">
            <i className="icon-social-twitter"></i>
          </Link>
        </li>
        <li className="list-inline-item">
          <Link to="#" className="social-link rounded-circle text-white">
            <i className="icon-social-github"></i>
          </Link>
        </li>
      </ul>
      <p className="text-muted small mb-0">Copyright &copy; Your Website 2019</p>
    </div>
  </footer>

  <Link to="#page-top" className="scroll-to-top rounded js-scroll-trigger">
    <i className="fas fa-angle-up"></i>
  </Link>
</div>


class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <NavBar />
          <Switch>
            <Route exact path="/" component={HomeComponent} />
            <Route exact path="/about" component={AboutComponent} />
            <Route exact path="/main" component={MainComponent} />
            <Route component={NotFoundPage} />
          </Switch>
          <br />
          <div>Made by John with effort</div>


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