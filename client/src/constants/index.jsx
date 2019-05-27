export const URL_LOGIN = "https://forge-development.herokuapp.com/login";
export const GET_ONE_TEAM = id => `https://forge-development.herokuapp.com/api/departments/${id}`;
export const TEAMS = `https://forge-development.herokuapp.com/api/departments/`;
export const GET_TOPIC_SUBSCRIBERS = id =>
  `https://forge-development.herokuapp.com/api/users/?events.eventId=${id}`;
export const EVENTS = `https://forge-development.herokuapp.com/api/events/`;
export const GENERATE_PAIRS = id => `https://forge-development.herokuapp.com/api/randomizer/${id}`;
export const ONE_EVENT = id => `https://forge-development.herokuapp.com/api/events/${id}`;
export const USERS = `https://forge-development.herokuapp.com/api/users/`;
export const BAN_USER = id => `https://forge-development.herokuapp.com/api/users/ban/${id}`;
export const ONE_USER = id => `https://forge-development.herokuapp.com/api/users/${id}`;
export const USER_IN_TEAM = id =>
  `https://forge-development.herokuapp.com/api/users/?events.eventId=${id}`;
export const ADMIN_USER = id => `https://forge-development.herokuapp.com/api/users/${id}`;
export default URL_LOGIN;
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
