import axios from 'axios';
import { toast } from 'react-toastify';
import { REACT_APP_APIURL } from '../../constants/constant';
import { setEmailTemplate, setEditEmailTemplate } from '../../redux/actions/technical/EmailTemplateAction';
/**
 * @desc Email Template - Get Email Template List
 * @param {*}
 */
export const getEmailTemplate = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/get_all_email_template`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      dispatch(setEmailTemplate(data));
      return data;
    }
  } catch (e) {
    console.log('getEmailTemplate', JSON.stringify(e));
    return false;
  } finally {
  }
};

export const AddEmailTemplate = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/add_new_email_template`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    console.log('Api', data);
    if (data) {
      toast.success(data?.msg);
      return true;
    }
  } catch (e) {
    console.log('AddEmailTemplate', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc EmailTemplate - Delete EmailTemplate
 * @param {*}
 */
export const deleteEmailTemplate = (payload) => async () => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/delete_email_template`, payload, {
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
    console.log('deleteEmailTemplate', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Edit Email Template - Get Edit Email Template List
 * @param {*}
 */
export const getEditEmailTemplate = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/get_edit_email_template`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      dispatch(setEditEmailTemplate(data));
      return data;
    }
  } catch (e) {
    console.log('getEditEmailTemplate', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Email Template - Update Email Template
 * @param {*}
 */
export const updateEmailTemplate = (payload) => async (dispatch) => {
  try {
    console.log('payload', payload);
    const response = await axios.post(`${REACT_APP_APIURL}/update_email_template`, payload, {
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
    console.log('updateEmailTemplate', JSON.stringify(e));
    return false;
  } finally {
  }
};
