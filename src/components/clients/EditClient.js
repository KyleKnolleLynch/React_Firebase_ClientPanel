import React, { Component, Fragment } from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { firestoreConnect } from 'react-redux-firebase';
import PropTypes from 'prop-types';
import Spinner from '../layout/Spinner';

class EditClient extends Component {
  constructor(props) {
    super(props);
    //  Create refs
    this.firstNameInput = React.createRef();
    this.lastNameInput = React.createRef();
    this.emailInput = React.createRef();
    this.phoneInput = React.createRef();
    this.balanceInput = React.createRef();
  }

  onSubmit = e => {
    e.preventDefault();

    const { client, firestore, history } = this.props;

    //  Updated client
    const updClient = {
      firstName: this.firstNameInput.current.value,
      lastName: this.lastNameInput.current.value,
      email: this.emailInput.current.value,
      phone: this.phoneInput.current.value,
      balance: this.balanceInput.current.value === '' ? 0 : this.balanceInput.current.value
    }

    //  Update in firestore
    firestore.update({collection: 'clients', doc: client.id}, updClient)
    .then(history.push('/'));
  }

  render() {
    const { client } = this.props;
    const { disableBalanceOnEdit } = this.props.settings;

    if(client) {
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
            <div className="card-header">Edit Client</div>
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
                    ref={this.firstNameInput}
                    defaultValue={client.firstName}
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
                    ref={this.lastNameInput}
                    defaultValue={client.lastName}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="Enter Email"
                    ref={this.emailInput}
                    defaultValue={client.email}
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
                    ref={this.phoneInput}
                    defaultValue={client.phone}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="balance">Balance:</label>
                  <input
                    type="text"
                    name="balance"
                    className="form-control"
                    placeholder="Enter Balance"
                    ref={this.balanceInput}
                    defaultValue={client.balance}
                    disabled={disableBalanceOnEdit}
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
    } else {
      return <Spinner />
    }
    
  }
}

EditClient.propTypes = {
  firestore: PropTypes.object.isRequired,
  client: PropTypes.object
};

export default compose(
  firestoreConnect(props => [
    { collection: 'clients', storeAs: 'client', doc: props.match.params.id }
  ]),
  connect(({ firestore: { ordered }, settings }, props) => ({
    client: ordered.client && ordered.client[0],
    settings
  }))
)(EditClient);
