import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reduxHelpers';
import * as Actions from '../../actions/types';

const setSubListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_SUB_DETAILS
});

const setSubCategoryListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_SUB_CATEGORY_LIST
});

const subCategoryReducer = combineReducers({
  subs: setSubListReducer,
  SubCategory: setSubCategoryListReducer
});

export default subCategoryReducer;
