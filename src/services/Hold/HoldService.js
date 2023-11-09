import axios from 'axios';
import { toast } from 'react-toastify';
import { REACT_APP_APIURL } from '../../constants/constant';
import { setHoldList } from '../../redux/actions/Hold/HoldAction';
/**
 * @desc Hold - Get Hold List
 * @param {*}
 */
export const getHoldList = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/hold_list`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      dispatch(setHoldList(data));
      return data;
    }
  } catch (e) {
    console.log('getHoldList', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Hold - Create Onhold
 * @param {*}
 */
export const createOnHold = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/create_onhold`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      toast.success(data?.msg);
      return data;
    }
  } catch (e) {
    console.log('createOnHold', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Hold - single add to remove hold
 * @param {*}
 */
export const removeHold = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/single_add_to_remove_hold`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      toast.success(data?.msg);
      return data;
    }
  } catch (e) {
    console.log('removeHold', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Hold - confirm Order OnHold
 * @param {*}
 */
export const confirmOrderOnHold = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/confirm_order_onhold`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      toast.success(data?.msg);
      return data;
    }
  } catch (e) {
    console.log('confirmOrderOnHold', JSON.stringify(e));
    return false;
  } finally {
  }
};
