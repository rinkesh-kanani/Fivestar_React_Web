import axios from 'axios';
import { toast } from 'react-toastify';
import { REACT_APP_APIURL } from '../../constants/constant';
import { setPrimeCategoryList, setPrimeDetails } from '../../redux/actions/technical/primeCategoryActions';

/**
 * @desc Topic - Get Topic List
 * @param {*}
 */
export const getPrimeDetails = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/get_all_primes`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;

    dispatch(setPrimeDetails(data));
    return data;
  } catch (e) {
    console.log('e-------->', JSON.stringify(e));
    return false;
  } finally {
  }
};

export const addNewPrimeCategory = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/add_new_prime`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    console.log('add==', data);
    if (data) {
      toast.success(data?.msg);
      return true;
    }
  } catch (e) {
    console.log('addNewPrimeCategory', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Prime Category - Delete Prime Category
 * @param {*}
 */
export const deletePrimeCategory = (payload) => async () => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/delete_prime`, payload, {
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
    console.log('deletePrimeCategory', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc PrimeCategory - Update PrimeCategory
 * @param {*}
 */
export const updatePrimeCategory = (payload) => async (dispatch) => {
  try {
    console.log('payload', payload);
    const response = await axios.post(`${REACT_APP_APIURL}/update_prime`, payload, {
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
    console.log('updatePrimeCategory', JSON.stringify(e));
    return false;
  } finally {
  }
};

export const fetchPrimeCategoryList = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/fetch_prime_category_list`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;

    if (data) {
      dispatch(setPrimeCategoryList(data));
      return data;
    }
  } catch (e) {
    console.log('fetchPrimeCategoryList', JSON.stringify(e));
    return false;
  } finally {
  }
};
