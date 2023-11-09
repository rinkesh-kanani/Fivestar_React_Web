import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reduxHelpers';
import * as Actions from '../../actions/types';

const setFreelanchersListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_FREELANCHERS_LIST
});

const freelanchersReducer = combineReducers({
  FreelanchersList: setFreelanchersListReducer
});

export default freelanchersReducer;
