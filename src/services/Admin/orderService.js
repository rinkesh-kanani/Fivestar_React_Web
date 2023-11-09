import axios from 'axios';
import { REACT_APP_APIURL } from '../../constants/constant';
import { setAutoCompany, setOrderList, setSingleOrder } from '../../redux/actions/admin/orderActions';

/**
 * @desc Order - Get Order List
 * @param {*}
 */
export const getOrderList = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/get_all_order`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      dispatch(setOrderList(data));
      return true;
    }
  } catch (e) {
    console.log('getOrderList', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Order - Fetch Single Order
 * @param {*}
 */
export const fetchSingleOrder = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/fetch_single_order`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      dispatch(setSingleOrder(data));
      return true;
    }
  } catch (e) {
    console.log('fetchSingleOrder', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Order - Change Order Status
 * @param {*}
 */
export const changeOrderStatus = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/change_order_status`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      return true;
    }
  } catch (e) {
    console.log('changeOrderStatus', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Company - Get Auto Company
 * @param {*}
 */
export const getAutoCompany = (payload) => async (dispatch) => {
  try {
    var bodyFormData = new FormData();
    bodyFormData.append('term', payload?.term);
    const response = await axios.post(`${REACT_APP_APIURL}/auto_company`, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    const { data } = response;
    if (data) {
      dispatch(setAutoCompany(data));
      const newData =
        data
          ?.map((item) => {
            return {
              ...item,
              value: item?.rg_i
            };
          })
          .slice(0, 50) || [];

      return newData;
    }
  } catch (e) {
    console.log('getAutoCompany', JSON.stringify(e));
    return false;
  } finally {
  }
};
