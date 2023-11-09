import axios from 'axios';
import { toast } from 'react-toastify';
import { REACT_APP_APIURL, USER_TYPE } from '../../constants/constant';
import UserPreference from '../../helpers/UserPreference';
import UserPreferenceSingleton from '../../helpers/UserPreferenceSingleton';
import { clearCurrentData, setCurrentUser } from '../../redux/actions/auth/authActions';

/**
 * @desc Login - Admin Login
 * @param {*} Payload
 */
export const adminLogin = (payload) => async (dispatch) => {
  try {
    var bodyFormData = new FormData();
    bodyFormData.append('admin_login_email', payload?.admin_login_email);
    bodyFormData.append('admin_login_password', payload?.admin_login_password);

    const response = await axios.post(`${REACT_APP_APIURL}/admin_login`, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    const { data, msg } = response?.data;
    if (response?.data) {
      const newItem = {
        ...data,
        id: data?.ad_id,
        first_name: data?.ad_fname,
        last_name: data?.ad_lname,
        email: data?.ad_email,
        pass: data?.ad_pass,
        user_type: data?.ad_type
      };
      dispatch(setLoginDetail(newItem));
      toast.success(msg);
      return true;
    }
  } catch (e) {
    console.log('adminLogin', JSON.stringify(e));
    return false;
  } finally {
    // dispatch(setAuthLoader(false));
  }
};

/**
 * @desc Login - Client Login
 * @param {*} Payload
 */
export const clientLogin = (payload) => async (dispatch) => {
  try {
    var bodyFormData = new FormData();
    bodyFormData.append('user', payload?.user);
    bodyFormData.append('pass', payload?.pass);

    const response = await axios.post(`${REACT_APP_APIURL}/customer_login`, bodyFormData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    const { data, msg } = response?.data;
    console.log('response', response);
    if (response?.data) {
      console.log('data', data);
      const newItem = {
        ...data,
        id: data?.rg_i,
        first_name: data?.rg_f,
        last_name: data?.rg_l,
        email: data?.rg_mail,
        pass: data?.rg_repass,
        user_type: USER_TYPE[data?.rg_party_type]
      };
      dispatch(setLoginDetail(newItem));
      toast.success(msg);
      return true;
    }
  } catch (e) {
    console.log('clientLogin', JSON.stringify(e));
    return false;
  } finally {
    // dispatch(setAuthLoader(false));
  }
};

/**
 * @desc set login token and set user
 */
export const logout = (item) => (dispatch) => {
  // save auth deteils and set token in header for request
  // saveToken(item.access_token);
  UserPreferenceSingleton.getInstance().clearStoredUserData();
  dispatch(setCurrentUser(null));
};

/**
 * @desc set login token and set user
 */
export const setLoginDetail = (item) => (dispatch) => {
  // save auth deteils and set token in header for request
  // saveToken(item.access_token);
  UserPreference.getInstance().setUserType(item?.user_type);
  UserPreferenceSingleton.getInstance().setCurrentUser(item);
  dispatch(clearCurrentData());
};
