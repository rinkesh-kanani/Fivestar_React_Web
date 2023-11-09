import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reduxHelpers';
import * as Actions from '../../actions/types';

const setMasterListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_MASTER_DETAILS
});
const setMasterCategoryListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_MASTER_CATEGORY_LIST
});

const setAllMasterListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_ALL_MASTER_LIST
});

const masterCategoryReducer = combineReducers({
  masters: setMasterListReducer,
  masterCategoryList: setMasterCategoryListReducer,
  allMasterList: setAllMasterListReducer
});

export default masterCategoryReducer;
