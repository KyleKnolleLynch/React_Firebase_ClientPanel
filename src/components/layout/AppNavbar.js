import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { firebaseConnect } from 'react-redux-firebase';

class AppNavbar extends Component {
  state = {
    open: false
  };

  toggleOpen = () => this.setState(({ open }) => ({ open: !open }));

  onLogoutClick = e => {
    e.preventDefault();

    const { props: { firebase } } = this;

    firebase.logout();
  }

  render() {
    const {
      state: { open },
      toggleOpen
    } = this;

    const { props: { auth } } = this;
    
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-primary mb-4">
        <div className="container">
          <Link to="/" className="navbar-brand">
            ClientPanel
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleOpen}
            data-target="#navbarMain"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div
            className={`navbar-collapse ${!open ? 'collapse' : ''}`}
            id="navbarMain"
          >
            <ul className="navbar-nav ml-auto">
              {auth.uid ? (
                <li className="nav-item">
                  <Link to="/" className="nav-link">
                    Dashboard
                  </Link>
                </li>
              ) : null}
            </ul>
            {auth.uid ? (
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <a href="#!" className="nav-link">
                    {auth.email}
                  </a>
                </li>
                <li className="nav-item">
                  <a
                    href="#!"
                    className="nav-link"
                    onClick={this.onLogoutClick}
                  >
                    {' '}
                    Logout
                    {auth.password}
                  </a>
                </li>
              </ul>
            ) : null}
          </div>
        </div>
      </nav>
    );
  }
}

AppNavbar.propTypes = {
  firebase: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired
};

export default compose(
  firebaseConnect(),
  connect((props) => ({
    auth: props.firebase.auth
  }))
)(AppNavbar);
