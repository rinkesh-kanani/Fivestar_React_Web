import axios from 'axios';

import { REACT_APP_APIURL } from '../../constants/constant';
import { setDubaiStockList, setMembershipList } from '../../redux/actions/DubaiStock/DubaiStockAction';
/**
 * @desc Dubai Stock - Get Dubai Stock List
 * @param {*}
 */
export const getDubaiStockList = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/dubai_stock`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    console.log('data', data);
    if (data) {
      dispatch(setDubaiStockList(data));
      return data;
    }
  } catch (e) {
    console.log('getDubaiStockList', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Dubai Stock - Get Membership
 * @param {*}
 */
export const getMembership = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/membership`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      const newdata = data?.data?.map((item) => {
        return { ...item, label: item?.name, value: item?.name };
      });
      const newItem = {
        ...data,
        data: newdata
      };
      dispatch(setMembershipList(newItem));
      return newItem;
    }
  } catch (e) {
    console.log('getMembership', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Dubai Stock - Membership Change
 * @param {*}
 */
export const membershipChange = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/membership_change`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (e) {
    console.log('membershipChange', JSON.stringify(e));
    return false;
  } finally {
  }
};
