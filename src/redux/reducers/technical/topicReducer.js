import { combineReducers } from "redux";
import { createReducer } from "../../../helpers/reduxHelpers";
import * as Actions from "../../actions/types";

const setTopicListReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_TOPIC_DETAILS,
});

const setCategoryTopicsReducer = createReducer({
  initialState: null,
  actionType: Actions.SET_CATEGORY_TOPICS,
});

const topicReducer = combineReducers({
  topics: setTopicListReducer,
  categoryTopics: setCategoryTopicsReducer,
});

export default topicReducer;
