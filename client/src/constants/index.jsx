const SET_USER_DATA = "https://forge-development.herokuapp.com/login";
const GET_EVENTS = "https://forge-development.herokuapp.com/api/events/";
const GET_USER = id => `https://forge-development.herokuapp.com/api/users/${id}`;
const SUBCR_USER_TO_EVENT = userId => `https://forge-development.herokuapp.com/api/users/${userId}`;
const UNSUBCR_USER_FROM_EVENT = userId =>
  `https://forge-development.herokuapp.com/api/users/${userId}`;
const SET_USER_DEPARTMENT = userId => `https://forge-development.herokuapp.com/api/users/${userId}`;
const GET_ALL_DEPARTMENTS = "https://forge-development.herokuapp.com/api/departments/";
const GET_EVENT = id => `https://forge-development.herokuapp.com/api/events/${id}`;
export {
  SET_USER_DATA,
  GET_EVENTS,
  GET_USER,
  SUBCR_USER_TO_EVENT,
  UNSUBCR_USER_FROM_EVENT,
  SET_USER_DEPARTMENT,
  GET_ALL_DEPARTMENTS,
  GET_EVENT,
};
