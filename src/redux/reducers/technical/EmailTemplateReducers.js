import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reduxHelpers';
import * as Actions from '../../actions/types';

const setEmailTemplateReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_EMAIL_TEMPLATE
});

const setEditEmailTemplateReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_EDIT_EMAIL_TEMPLATE
});

const EmailTemplateReducer = combineReducers({
  EmailTemplate: setEmailTemplateReducer,
  EditEmailTemplate: setEditEmailTemplateReducer
});

export default EmailTemplateReducer;
