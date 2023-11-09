import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reduxHelpers';
import * as Actions from '../../actions/types';

const setEmailAddressReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_EMAIL_ADDRESS
});

const setEmailAddressListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_EMAIL_ADDRESS_LIST
});

const EmailAddressReducer = combineReducers({
  EmailAddress: setEmailAddressReducer,
  EmailAddressList: setEmailAddressListReducer
});

export default EmailAddressReducer;
