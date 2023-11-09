import { USER_TYPE_PREFERENCE } from '../constants/constant';

let singleton;
const singletonEnforcer = Symbol();
const parseDataFile = (defaults) => {
  try {
    const settings = localStorage.getItem(USER_TYPE_PREFERENCE);
    if (settings) return JSON.parse(settings);
    return {};
  } catch (error) {
    return defaults;
  }
};

const containsKey = (obj, key) => ({}.hasOwnProperty.call(obj || {}, key));

class UserPreferences {
  constructor(opts) {
    this.defaults = opts.defaults;
    this.data = parseDataFile(opts.defaults);
  }

  get(key, defaultValue) {
    if (containsKey(this.data, key)) {
      return this.data[key];
    }
    return defaultValue;
  }

  save(settings) {
    localStorage.setItem(USER_TYPE_PREFERENCE, JSON.stringify(settings));
  }

  set(key, value) {
    this.data = parseDataFile(this.defaults);
    this.data[key] = value;
    this.save(this.data);
  }

  remove(key) {
    delete this.data[key];
    this.save(this.data);
  }

  parseDataFile() {
    this.data = parseDataFile(this.defaults);
  }

  contains(key) {
    return Object.prototype.hasOwnProperty.call(this.data, key);
  }
}
export default class UserPreference {
  static get USER_TYPE() {
    return 'user_type';
  }

  constructor(enforcer) {
    if (enforcer !== singletonEnforcer) throw new Error('Cannot construct singleton');

    this.userPreferences = new UserPreferences({
      configName: 'user-preferences',
      defaults: {
        windowBounds: { width: 800, height: 600 }
      }
    });
  }

  static getInstance() {
    if (!singleton) {
      singleton = new UserPreference(singletonEnforcer);
    }
    return singleton;
  }

  static removeInstance() {
    singleton = undefined;
  }

  setUserType(value) {
    return this.userPreferences.set(UserPreference.USER_TYPE, value);
  }

  getUserType() {
    return this.userPreferences.get(UserPreference.USER_TYPE, undefined);
  }

  get(key, defaultValue = null) {
    return this.userPreferences.get(key, defaultValue);
  }

  set(key, value) {
    this.userPreferences.set(key, value);
  }

  clearStoredUserData() {
    localStorage.removeItem(USER_TYPE_PREFERENCE);
  }
}
