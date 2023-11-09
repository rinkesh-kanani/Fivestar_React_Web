import axios from 'axios';
import { toast } from 'react-toastify';
import { REACT_APP_APIURL } from '../../constants/constant';
// eslint-disable-next-line max-len
import {
  setMasterCategoryList,
  setMasterDetails,
  setAllMasterList
} from '../../redux/actions/technical/masterCategoryActions';

/**
 * @desc Master Category - Get Master Category Details
 * @param {*}
 */
export const getMasterDetails = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/get_all_masters`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    console.log(response);
    const { data } = response;
    if (data) {
      dispatch(setMasterDetails(data));
      return data;
    }
  } catch (e) {
    console.log('e-------->', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc MasterCategory - Add New Master Category
 * @param {*}
 */
export const addNewMasterCategory = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/add_new_master`, payload, {
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
    console.log('addNewMasterCategory', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc MasterCategory - Update MasterCategory
 * @param {*}
 */
export const updateMasterCategory = (payload) => async (dispatch) => {
  try {
    console.log('payload', payload);
    const response = await axios.post(`${REACT_APP_APIURL}/update_master`, payload, {
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
    console.log('updateMasterCategory', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Master Category - Delete Master Category
 * @param {*}
 */
export const deleteMasterCategory = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/delete_master`, payload, {
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
    console.log('deleteMasterCategory', JSON.stringify(e));
    return false;
  } finally {
  }
};

export const fetchMasterCategoryList = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/fetch_master_category_list`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    console.log('d1=', data);
    if (data) {
      dispatch(setMasterCategoryList(data));
      return data;
    }
  } catch (e) {
    console.log('fetchMasterCategoryList', JSON.stringify(e));
    return false;
  } finally {
  }
};

export const fetchAllMasterList = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/fetch_all_master_list`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    console.log('alldata', data);
    if (data) {
      dispatch(setAllMasterList(data));
      return true;
    }
  } catch (e) {
    console.log('fetchAllMasterList', JSON.stringify(e));
    return false;
  } finally {
  }
};
