import axios from 'axios';
import { toast } from 'react-toastify';
import { REACT_APP_APIURL } from '../../constants/constant';
import { setEmailAddress, setEmailAddressList } from '../../redux/actions/technical/EmailAddressAction';
/**
 * @desc Topic - Get Topic List
 * @param {*}
 */
export const getEmailAddress = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/get_all_email_address`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      dispatch(setEmailAddress(data));
      return data;
    }
  } catch (e) {
    console.log('getEmailAddress', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc EmailAddress - Add New Email
 * @param {*}
 */
export const AddNewEmail = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/add_new_email_address`, payload, {
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
    console.log('addNewEmail', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc EmailAddress - Update Email
 * @param {*}
 */
export const updateEmail = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/update_new_email_address`, payload, {
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
    console.log('updateEmailAddress', JSON.stringify(e));
    return false;
  } finally {
  }
};

export const fetchEmailAddressList = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/fetch_all_email_address`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;

    if (data) {
      dispatch(setEmailAddressList(data));
      return data;
    }
  } catch (e) {
    console.log('fetchEmailAddressList', JSON.stringify(e));
    return false;
  } finally {
  }
};
