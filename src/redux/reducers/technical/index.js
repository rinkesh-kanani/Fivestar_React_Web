import { combineReducers } from 'redux';
import masterCategoryReducer from './masterCategoryReducer';
import primeCategoryReducer from './primeCategoryReduce';
import subCategoryReducer from './subCategoryReducer';
import topicReducer from './topicReducer';
import EmailAddressReducer from './EmailAddressReducer';
import EmailTemplateReducer from './EmailTemplateReducers';
const technicalReducers = combineReducers({
  topic: topicReducer,
  master: masterCategoryReducer,
  prime: primeCategoryReducer,
  sub: subCategoryReducer,
  EmailAddress: EmailAddressReducer,
  EmailTemplate: EmailTemplateReducer
});

export default technicalReducers;
