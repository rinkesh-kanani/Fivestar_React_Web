import axios from 'axios';
import { toast } from 'react-toastify';
import { REACT_APP_APIURL } from '../../constants/constant';
import { setCartList } from '../../redux/actions/Cart/CartAction';
/**
 * @desc Cart - Get Cart List
 * @param {*}
 */
export const getCartList = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/cart_list`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      dispatch(setCartList(data));
      return data;
    }
  } catch (e) {
    console.log('getCartList', JSON.stringify(e));
    return false;
  } finally {
  }
};

export const deleteCart = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/remove_cart_list`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      toast.success(data?.msg);
      return true;
    }
  } catch (e) {
    console.log('deleteCart', JSON.stringify(e));
    return false;
  } finally {
  }
};
