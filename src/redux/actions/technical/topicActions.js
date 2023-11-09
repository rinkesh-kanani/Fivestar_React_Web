import { createAction } from "@reduxjs/toolkit";
import * as Actions from "../types";

/**
 * @desc Set Topic Details
 */
export const setTopicDetails = createAction(Actions.SET_TOPIC_DETAILS);
/**
 * @desc Set Category Topics
 */
export const setCategoryTopics = createAction(Actions.SET_CATEGORY_TOPICS);

/**
 * @desc Clear Topic Data
 */
export const clearTopicData = () => (dispatch) => {
  dispatch(setTopicDetails(null));
  dispatch(setCategoryTopics(null));
};
