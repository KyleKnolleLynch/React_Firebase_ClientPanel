import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  setDisableBalanceOnAdd,
  setDisableBalanceOnEdit,
  setAllowRegistration
} from '../../actions/settingsActions';

const Settings = props => {
  const {
    setDisableBalanceOnAdd,
    setDisableBalanceOnEdit,
    setAllowRegistration,
    settings: { disableBalanceOnAdd, disableBalanceOnEdit, allowRegistration }
  } = props;

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
        <div className="card-header">
          <h4>Edit Settings</h4>
        </div>
        <div className="card-body">
          <form>
            <div className="form-group">
              <label>Allow Registration</label>{' '}
              <input
                type="checkbox"
                name="allowRegistration"
                checked={allowRegistration}
                onChange={setAllowRegistration}
              />
            </div>
            <div className="form-group">
              <label>Disable Balance on Add</label>{' '}
              <input
                type="checkbox"
                name="disableBalanceOnAdd"
                checked={disableBalanceOnAdd}
                onChange={setDisableBalanceOnAdd}
              />
            </div>
            <div className="form-group">
              <label>Disable Balance On Edit</label>{' '}
              <input
                type="checkbox"
                name="disableBalanceOnEdit"
                checked={disableBalanceOnEdit}
                onChange={setDisableBalanceOnEdit}
              />
            </div>
          </form>
        </div>
      </div>
    </Fragment>
  );
};

Settings.propTypes = {
  settings: PropTypes.object.isRequired,
  setDisableBalanceOnAdd: PropTypes.func.isRequired,
  setDisableBalanceOnEdit: PropTypes.func.isRequired,
  setAllowRegistration: PropTypes.func.isRequired
};

export default connect(
  (state, props) => ({
    auth: state.firebase.auth,
    settings: state.settings
  }),
  { setDisableBalanceOnAdd, setDisableBalanceOnEdit, setAllowRegistration }
)(Settings);
