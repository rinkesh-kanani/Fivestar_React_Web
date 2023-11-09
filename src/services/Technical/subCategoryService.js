import axios from 'axios';
import { toast } from 'react-toastify';
import { REACT_APP_APIURL } from '../../constants/constant';
import { setSubDetails, setSubCategoryList } from '../../redux/actions/technical/subCategoryActions';

/**
 * @desc Sub Category - Get Sub Category List
 * @param {*}
 */
export const getSubDetails = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/get_all_subcat`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    console.log(response);
    const { data } = response;
    dispatch(setSubDetails(data));
    return data;
  } catch (e) {
    console.log('e-------->', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Sub Category - Add New Sub Category
 * @param {*}
 */
export const addNewSubCategory = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/add_new_sub`, payload, {
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
    console.log('addNewSubCategory', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Sub Category - Delete Sub Category
 * @param {*}
 */
export const deleteSubCategory = (payload) => async () => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/delete_subcat`, payload, {
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
    console.log('deleteSubCategory', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Sub Category - Update Sub Category
 * @param {*}
 */
export const updateSubCategory = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/update_subcategory`, payload, {
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
    console.log('updateSubCategory', JSON.stringify(e));
    return false;
  } finally {
  }
};

export const fetchSubCategoryList = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/fetch_sub_category_list`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;

    if (data) {
      dispatch(setSubCategoryList(data));
      return data;
    }
  } catch (e) {
    console.log('fetchSubCategoryList', JSON.stringify(e));
    return false;
  } finally {
  }
};
