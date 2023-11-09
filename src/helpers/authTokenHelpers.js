import axios from 'axios';
import jwt_decode from 'jwt-decode';
import UserPreferenceSingleton from './UserPreferenceSingleton';

export const setupToken = () => {
  const userDetails = UserPreferenceSingleton.getInstance().getCurrentUser();
  const { access_token } = userDetails || {};

  if (access_token) {
    const decoded = jwt_decode(access_token);
    const currentTime = Date.now() / 1000;
    if (decoded.exp > currentTime) {
      setAuthToken(access_token);
      return access_token;
    }
  }
  return false; // if no token or expired token, return false
};

export const saveToken = (access_token) => {
  setAuthToken(access_token);
};

export const clearToken = () => {
  UserPreferenceSingleton.getInstance().clearStoredUserData();
  clearAuthToken();
};

// header methods
const setAuthToken = (token) => {
  try {
    axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
  } catch (e) {
    console.log('Error while settup Content Type', e);
  }
};

const clearAuthToken = () => {
  delete axios.defaults.headers.common['Content-Type'];
};

const setHeaderContentType = (token) => {
  try {
    axios.defaults.headers.common['Content-Type'] = 'application/x-www-form-urlencoded';
  } catch (e) {
    console.log('Error while settup Content Type', e);
  }
};

const clearsetHeaderContentType = () => {
  delete axios.defaults.headers.common['Content-Type'];
};
