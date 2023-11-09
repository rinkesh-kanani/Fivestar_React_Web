import { current, createReducer as createReducerOrig } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import { createReducer } from '../../../helpers/reduxHelpers';
import * as Actions from '../../actions/types';

const initialOrderListState = [];
const setOrderListReducer = createReducerOrig(initialOrderListState, (builder) => {
  builder
    .addCase(Actions.SET_ORDER_LIST, (state = initialOrderListState, action) => {
      return action.payload;
    })
    .addCase(Actions.UPDATE_ORDER_LIST_ITEM, (state, action) => {
      const orderList = current(state);
      let list = JSON.parse(JSON.stringify(orderList));
      const item = action.payload.item;
      const index = list?.data?.findIndex((x) => x?.order_id === item?.order_id);
      if (index !== -1) {
        list.data[index] = item;
      }
      return list;
    });
});

const setSingleOrderReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_SINGLE_ORDER
});

const setAutoCompanyReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_AUTO_COMPANY
});

const orderReducer = combineReducers({
  orderList: setOrderListReducer,
  singleOrder: setSingleOrderReducer,
  company: setAutoCompanyReducer
});

export default orderReducer;
