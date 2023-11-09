import axios from 'axios';
import { toast } from 'react-toastify';

import { REACT_APP_APIURL } from '../../constants/constant';
import { setApprovalList } from '../../redux/actions/admin/approvalListActions';
/**
 * @desc ApprovalList - Get Approval List
 * @param {*}
 */
export const getApprovalList = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/approval_list`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;

    if (data) {
      dispatch(setApprovalList(data));
      return data;
    }
  } catch (e) {
    console.log('getApprovalList', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Approval - Create Approval
 * @param {*}
 */
export const createApproval = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/create_approval`, payload, {
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
    console.log('createApproval', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Approval - Single Add To Remove Approval
 * @param {*}
 */
export const singleAddToRemoveApproval = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/single_add_to_remove_approval`, payload, {
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
    console.log('singleAddToRemoveApproval', JSON.stringify(e));
    return false;
  } finally {
  }
};
