import axios from 'axios';
import { toast } from 'react-toastify';
import { REACT_APP_APIURL } from '../../constants/constant';
import { setCategoryTopics, setTopicDetails } from '../../redux/actions/technical/topicActions';
/**
 * @desc Topic - Get Topic List
 * @param {*}
 */
export const getTopicDetails = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/get_all_topics`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });
    const { data } = response;
    if (data) {
      dispatch(setTopicDetails(data));
      return data;
    }
  } catch (e) {
    console.log('getTopicDetails', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Topic - Add New Topic
 * @param {*}
 */
export const addNewTopic = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/add_new_topic`, payload, {
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
    console.log('addNewTopic', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Topic - Update Topic
 * @param {*}
 */
export const updateTopic = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/update_topic`, payload, {
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
    console.log('updateTopic', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Topic - Delete Topic
 * @param {*}
 */
export const deleteTopic = (payload) => async (dispatch) => {
  try {
    const response = await axios.post(`${REACT_APP_APIURL}/delete_topic`, payload, {
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
    console.log('deleteTopic', JSON.stringify(e));
    return false;
  } finally {
  }
};

/**
 * @desc Category - Get All Topic
 * @param {*}
 */
export const getAllTopic = () => async (dispatch) => {
  try {
    const payload = {};
    const response = await axios.post(`${REACT_APP_APIURL}/fetch_topic_list`, payload, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    });

    const { data } = response;
    if (data) {
      dispatch(setCategoryTopics(data));
      return data;
    }
  } catch (e) {
    console.log('e-------->', JSON.stringify(e));
    return false;
  } finally {
  }
};
