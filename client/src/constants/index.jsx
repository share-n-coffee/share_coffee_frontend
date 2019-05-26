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

export default URL_LOGIN;
