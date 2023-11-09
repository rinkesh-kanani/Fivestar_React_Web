import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reduxHelpers';
import * as Actions from '../../actions/types';

const setPrimeListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_PRIME_DETAILS
});

const setPrimeCategoryListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_PRIME_CATEGORY_LIST
});

const primeCategoryReducer = combineReducers({
  primes: setPrimeListReducer,
  primeCategory: setPrimeCategoryListReducer
});

export default primeCategoryReducer;
