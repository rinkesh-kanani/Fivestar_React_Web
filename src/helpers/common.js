import moment from 'moment';
import { DATE_FORMAT } from '../constants/constant';
/**
 * @desc Check if given value is string
 * @param {*} value // Accepts string
 */
export function isStirng(value) {
  var myRegEx = /^[a-zA-Z\s]*$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks if given value is Number
 * @param {*} value // Accepts string
 */
export function isNumber(value) {
  var myRegEx = /^(\s*[0-9]+\s*)+$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks for valid email
 * @param {*} value // Accepts string
 */
export function isEmail(value) {
  // eslint-disable-next-line max-len
  var myRegEx =
    // eslint-disable-next-line max-len
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  var isValid = myRegEx.test(value);
  return isValid ? true : false;
}

/**
 * @desc Checks for Empty string
 * @param {*} value // Accepts string, object
 */
export function isEmpty(value) {
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  ) {
    return true;
  } else {
    return false;
  }
}

/**
 * @desc: Check valid date
 */
export function isValidDate(d) {
  return d instanceof Date;
}

/**
 * @desc it return unique GUID string
 */
export const getUniqueId = () => {
  function S4() {
    return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
  }
  return (S4() + S4() + '-' + S4() + '-4' + S4().substr(0, 3) + '-' + S4() + '-' + S4() + S4() + S4()).toLowerCase();
};

/**
 * @desc get query params
 */
export const getUrlParams = (queryParams) => {
  if (!queryParams) return new URLSearchParams();
  return new URLSearchParams(queryParams);
};

/**
 * @desc get query param by name
 */
export const getUrlParam = (query, name) => {
  let queryParams = new URLSearchParams();
  if (query) queryParams = new URLSearchParams(query);
  return queryParams.get(name);
};

/**
 * @desc get user friendly string from the given value
 * @param {*} value
 * @param {*} replaceChar
 */
export const UserFriendlyString = (value, replaceChar) => {
  if (!value) return '';
  value = value.trim();

  if (!replaceChar) replaceChar = '_';
  return value === undefined
    ? ''
    : value
        .replace(/[^a-z0-9_]+/gi, replaceChar)
        .replace(/^-|-$/g, '')
        .toLowerCase();
};

export const stringToBoolean = (value) => {
  if (!value) return false;

  switch (value.toString().toLowerCase().trim()) {
    case 'true':
    case 'yes':
    case '1':
      return true;
    case 'false':
    case 'no':
    case '0':
    case null:
      return false;
    default:
      return Boolean(value);
  }
};

export function mathRound(number, digit = 2) {
  try {
    if (Number(number) < 1) digit = 3;
    if (number) return Number(number).toFixed(digit);
  } catch (e) {}
  return Number(0).toFixed(2);
}

/**
 * @desc load java script async from code
 */
export const loadJavaScript = (url) => {
  const script = document.createElement('script');
  script.src = url;
  script.async = true;
  document.body.appendChild(script);
  return script;
};

/**
 * @desc get formatted date
 */
export const getFormattedDate = (date) => {
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var year = date.getFullYear();
  return day + '/' + month + '/' + year;
};

/**
 * @desc init webflow ready
 */
export const initWebflowReady = () => {
  let interval;
  interval = setInterval(function () {
    if (window.Webflow) {
      clearInterval(interval);
      window.Webflow.ready();
    }
  }, 100);
};

/**
 * @desc split user name into firstname and lastname
 */
export const getFirstAndLastName = (userName) => {
  let firstname, lastname;
  const args = (userName || '').split(' ');
  if (args && args.length >= 2) {
    firstname = args[0];
    lastname = args[1];
  }
  return { firstname, lastname };
};

export const getFormattedTime = (date) => {
  if (!date) date = new Date();
  else date = new Date(date);
  var hour = date.getHours();
  var minutes = date.getMinutes();
  const time = String(hour).padStart(2, '0') + ':' + String(minutes).padStart(2, '0');
  return String(time);
};

export const getNameById = (array, id) => {
  if (!array || array.length === 0 || !id) return;
  const item = array.find((x) => x.id === id);
  if (item) return item.name;
};

export const removeWhiteSpaceRegex = (str) => {
  return str.replace(/ +/g, '');
};

export const replaceWhiteSpaceWithDash = (str) => {
  return str.replace(/\s+/g, '-');
};

export const getAPIErrorReason = (e) => {
  if (e) {
    if (e.response && e.response.data) {
      return e.response.data.reason || e.response.data.message;
    } else if (e.message) {
      return e.message;
    }
  }
};

export const currencyWithDecimal = (num) => {
  let returnValue = num;
  try {
    let digit = 2;
    if (num) {
      if (Number(num) < 1) digit = 3;
      if (Number(num) > 999) digit = 1;
      const num2 = Number(num).toFixed(digit);
      returnValue = num2;
    } else {
      returnValue = Number(0).toFixed(digit);
    }
  } catch (e) {}
  return returnValue;
};

export const numToWords = (num) => {
  let a = [
    '',
    'one ',
    'two ',
    'three ',
    'four ',
    'five ',
    'six ',
    'seven ',
    'eight ',
    'nine ',
    'ten ',
    'eleven ',
    'twelve ',
    'thirteen ',
    'fourteen ',
    'fifteen ',
    'sixteen ',
    'seventeen ',
    'eighteen ',
    'nineteen '
  ];
  let b = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  if ((num = num.toString()).length > 9) return 'overflow';
  let n = num.split('');
  n = ('000000000' + num).substr(-9).match(/^(\d{2})(\d{2})(\d{2})(\d{1})(\d{2})$/);
  if (!n) return '';
  var str = '';
  str += n[1] !== '00' ? (a[Number(n[1])] || b[n[1][0]] + ' ' + a[n[1][1]]) + 'crore ' : '';
  str += n[2] !== '00' ? (a[Number(n[2])] || b[n[2][0]] + ' ' + a[n[2][1]]) + 'lakh ' : '';
  str += n[3] !== '00' ? (a[Number(n[3])] || b[n[3][0]] + ' ' + a[n[3][1]]) + 'thousand ' : '';
  str += n[4] !== '00' ? (a[Number(n[4])] || b[n[4][0]] + ' ' + a[n[4][1]]) + 'hundred ' : '';
  str += n[5] !== '00' ? (str !== '' ? 'and ' : '') + (a[Number(n[5])] || b[n[5][0]] + ' ' + a[n[5][1]]) + '' : '';
  return str;
};

export const currencyInWords = (value) => {
  if (isEmpty(value)) return '';
  var number = parseFloat(value);
  if (number === undefined) return '';
  let num = value.toString().split('.');

  var Rs = numToWords(num[0]).toUpperCase();
  if (num.length === 1) return Rs + ' RUPEES ONLY';

  //Get two digit decimal
  var num2 = (num[1] + '0').substring(0, 2);
  if (num2[0] === '0') num2 = num2[1];

  var Paisa = numToWords(num2).toUpperCase();
  return Rs + ' RUPEES AND ' + Paisa + ' PAISA ONLY';
};

export const getDateDifference = (startDate, endDate) => {
  try {
    const date1 = new Date(startDate);
    const date2 = new Date(endDate);
    const diffTime = Math.abs(date2 - date1);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    if (diffDays >= 0) return diffDays;
  } catch (e) {}
};

export const isPastDate = (date) => {
  if (!date) {
    return '';
  }
  let diff = moment().diff(date, 'days');
  return diff > 0;
};

export const displayRelativeDate = (date) => {
  if (!date) {
    return '';
  }
  let diff = moment(new Date(moment().format('YYYY-MMM-DD'))).diff(date, 'days');
  if (diff === 0) {
    return 'Today';
  } else if (diff === -1) {
    return 'Tomorrow';
  } else {
    return moment(date).fromNow();
  }
};

export const getFormattedAddress = (item) => {
  if (!item) return '';
  let formattedAdd = '';
  let address = [];
  if (!isEmpty(item.address_line1) || !isEmpty(item.addressLine1)) {
    address.push(item.address_line1 || item.addressLine1);
  }
  if (!isEmpty(item.city)) {
    address.push(item.city);
  }
  if (!isEmpty(item.state)) {
    address.push(item.state);
  }
  if (!isEmpty(item.pincode)) {
    address.push(item.pincode);
  }
  formattedAdd = address.join(', ');
  return formattedAdd;
};

export const getDateString = (date) => {
  //return yyyyMMdd
  if (date) {
    date = new Date(date);
    return date.getFullYear() + ('0' + (date.getMonth() + 1)).slice(-2) + ('0' + date.getDate()).slice(-2);
  }
  return;
};

export const getDateFromFormatedDate = (date) => {
  //parse yyyyMMdd and return date object
  if (date) {
    let year = Number(date.substr(0, 4));
    let month = Number(date.substr(4, 2));
    let day = Number(date.substr(6, 2));
    //here do -1 becuase month is always +1
    let result = new Date(year, month - 1, day);
    return result;
  }
  return;
};

export const getUTCDate = (date) => {
  if (date) date = new Date(date);
  else date = new Date();
  return new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()));
};

export const getDate = (date) => {
  if (!date) date = new Date();
  date = moment(date).format(DATE_FORMAT);
  return date;
};

export const removeDuplicates = (data, key) => {
  return [...new Map(data.map((x) => [key(x), x])).values()];
};

export const addDays = (date, number) => {
  let newDate = new Date(date);
  newDate.setDate(newDate.getDate() + number);
  return newDate;
};

export const addMonth = (date, number) => {
  let newDate = new Date(date);
  newDate.setMonth(newDate.getMonth() + number);
  return newDate;
};

export const hasProduction = () => {
  if (window.location.host.startsWith('dashboard.salescamp.app')) {
    return true;
  }
  return false;
};

export const downloadFile = (data, filename, mime) => {
  // It is necessary to create a new blob object with mime-type explicitly set
  // otherwise only Chrome works like it should
  const blob = new Blob([data], { type: mime || 'application/octet-stream' });
  if (typeof window.navigator.msSaveBlob !== 'undefined') {
    // IE doesn't allow using a blob object directly as link href.
    // Workaround for "HTML7007: One or more blob URLs were
    // revoked by closing the blob for which they were created.
    // These URLs will no longer resolve as the data backing
    // the URL has been freed."
    window.navigator.msSaveBlob(blob, filename);
    return;
  }
  // Other browsers
  // Create a link pointing to the ObjectURL containing the blob
  const blobURL = window.URL.createObjectURL(blob);
  const tempLink = document.createElement('a');
  tempLink.style.display = 'none';
  tempLink.href = blobURL;
  tempLink.setAttribute('download', filename);
  // Safari thinks _blank anchor are pop ups. We only want to set _blank
  // target if the browser does not support the HTML5 download attribute.
  // This allows you to download files in desktop safari if pop up blocking
  // is enabled.
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank');
  }
  document.body.appendChild(tempLink);
  tempLink.click();
  document.body.removeChild(tempLink);
  setTimeout(() => {
    // For Firefox it is necessary to delay revoking the ObjectURL
    window.URL.revokeObjectURL(blobURL);
  }, 100);
};

export const randomIntFromInterval = (min, max) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getSecondsFromHHMMSS = (value) => {
  const [str1, str2, str3] = value.split(':');
  const val1 = Number(str1);
  const val2 = Number(str2);
  const val3 = Number(str3);

  if (!isNaN(val1) && isNaN(val2) && isNaN(val3)) {
    return val1;
  }

  if (!isNaN(val1) && !isNaN(val2) && isNaN(val3)) {
    return val1 * 60 + val2;
  }

  if (!isNaN(val1) && !isNaN(val2) && !isNaN(val3)) {
    return val1 * 60 * 60 + val2 * 60 + val3;
  }

  return 0;
};

export const toHHMMSS = (secs) => {
  const secNum = parseInt(secs.toString(), 10);
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor(secNum / 60) % 60;
  const seconds = secNum % 60;

  return [hours, minutes, seconds]
    .map((val) => (val < 10 ? `0${val}` : val))
    .filter((val, index) => val !== '00' || index > 0)
    .join(':')
    .replace(/^0/, '');
};

export const isAdminPanel = (url) => {
  let is_admin_panel = false;
  if (url?.startsWith('/fivestar_panel')) {
    is_admin_panel = true;
  }
  return is_admin_panel;
};
