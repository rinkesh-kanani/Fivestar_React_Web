import axios from 'axios';

import { REACT_APP_APIURL } from '../../constants/constant';
import { setCustomerOfferList } from '../../redux/actions/admin/customerOfferActions';
/**
 * @desc Customer Offer - Get Customer Offer List
 * @param {*}
 */
export const getCustomerOfferList = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/fetch_customer_offer`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      //console.log('data', data);
      dispatch(setCustomerOfferList(data));
      return data;
    }
  } catch (e) {
    console.log('getCustomerOfferList', JSON.stringify(e));
    return false;
  } finally {
  }
};
