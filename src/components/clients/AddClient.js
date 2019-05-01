import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
// import { compose } from 'redux';
// import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';

class AddClient extends Component {
  state = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    balance: ''
  };

  onSubmit = e => {
    e.preventDefault();

    const {
      state,
      props: { firestore, history }
    } = this;

    const newClient = {
      ...state,
      balance: state.balance === '' ? '0' : state.balance
    };

    firestore
      .add({ collection: 'clients' }, newClient)
      .then(() => history.push('/'));
  };

  onChange = e => this.setState({ [e.target.name]: e.target.value });

  render() {
    return (
      <Fragment>
        <div className="row">
          <div className="col-md-6">
            <Link to="/" className="btn btn-link">
              <i className="fas fa-arrow-circle-left" /> Back to Dashboard
            </Link>
          </div>
        </div>

        <div className="card">
          <div className="card-header">Add Client</div>
          <div className="card-body">
            <form onSubmit={this.onSubmit}>
              <div className="form-group">
                <label htmlFor="firstName">First Name:</label>
                <input
                  type="text"
                  name="firstName"
                  placeholder="Enter First Name"
                  className="form-control"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.firstName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="lastName">Last Name:</label>
                <input
                  type="text"
                  name="lastName"
                  placeholder="Enter Last Name"
                  className="form-control"
                  minLength="2"
                  required
                  onChange={this.onChange}
                  value={this.state.lastName}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter Email"
                  onChange={this.onChange}
                  value={this.state.email}
                />
              </div>
              <div className="form-group">
                <label htmlFor="phone">Phone:</label>
                <input
                  type="text"
                  name="phone"
                  className="form-control"
                  placeholder="Enter Phone #"
                  minLength="10"
                  required
                  onChange={this.onChange}
                  value={this.state.phone}
                />
              </div>
              <div className="form-group">
                <label htmlFor="balance">Balance:</label>
                <input
                  type="text"
                  name="balance"
                  className="form-control"
                  placeholder="Enter Balance"
                  onChange={this.onChange}
                  value={this.state.balance}
                />
              </div>
              <div className="form-group">
                <input
                  type="submit"
                  value="submit"
                  className="btn btn-block btn-info mt-4"
                />
              </div>
            </form>
          </div>
        </div>
      </Fragment>
    );
  }
}

AddClient.propTypes = {
  firestore: PropTypes.object.isRequired
};

export default firestoreConnect()(AddClient);
