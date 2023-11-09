import axios from 'axios';

import { REACT_APP_APIURL } from '../../constants/constant';
import { setFreelanchersList } from '../../redux/actions/admin/freelanchersActions';
/**
 * @desc Hold - Get Hold List
 * @param {*}
 */
export const getFreelanchersList = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/freelancer_list`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      //console.log('data', data);
      dispatch(setFreelanchersList(data));
      return data;
    }
  } catch (e) {
    console.log('getFreelanchersList', JSON.stringify(e));
    return false;
  } finally {
  }
};
