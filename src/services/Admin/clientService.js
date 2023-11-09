import axios from 'axios';

import { REACT_APP_APIURL } from '../../constants/constant';
import { setClientList } from '../../redux/actions/admin/clientActions';
/**
 * @desc Client - Get Client List
 * @param {*}
 */
export const getClientList = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/client_list`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      dispatch(setClientList(data));
      return data;
    }
  } catch (e) {
    console.log('getClientList', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Client - update Client
 * @param {*}
 */
export const updateClient = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/rg_update_data`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (e) {
    console.log('updateClient', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Client - update Client
 * @param {*}
 */
export const deleteClient = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/delete_rg`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      return data;
    }
  } catch (e) {
    console.log('deleteClient', JSON.stringify(e));
    return false;
  } finally {
  }
};
