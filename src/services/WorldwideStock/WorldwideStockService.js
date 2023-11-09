import axios from 'axios';

import { REACT_APP_APIURL } from '../../constants/constant';
import { setWorldwideStockList } from '../../redux/actions/WorldwideStock/WorldwideStockAction';
/**
 * @desc Dubai Stock - Get Dubai Stock List
 * @param {*}
 */
export const getWorldwideStockList = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/world_wide_stock`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      dispatch(setWorldwideStockList(data));
      return data;
    }
  } catch (e) {
    console.log('getWorldwideStockList', JSON.stringify(e));
    return false;
  } finally {
  }
};
