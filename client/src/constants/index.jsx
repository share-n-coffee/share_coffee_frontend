const SET_USER_DATA = "https://forge-development.herokuapp.com/login";
const GET_EVENTS = "https://forge-development.herokuapp.com/api/events/";
const GET_USER = id => `https://forge-development.herokuapp.com/api/users/${id}`;
const SUBCR_USER_TO_EVENT = userId => `https://forge-development.herokuapp.com/api/users/${userId}`;
const UNSUBCR_USER_FROM_EVENT = userId =>
  `https://forge-development.herokuapp.com/api/users/${userId}`;
const SET_USER_DEPARTMENT = userId => `https://forge-development.herokuapp.com/api/users/${userId}`;
const GET_ALL_DEPARTMENTS = "https://forge-development.herokuapp.com/api/departments/";
const GET_EVENT = id => `https://forge-development.herokuapp.com/api/events/${id}`;

// local server
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVjZTAxNTgyN2RjODI0MDAxZTBhYzczZSIsImZpcnN0TmFtZSI6Ik1heCIsImxhc3ROYW1lIjoiUmF6aG5vdiIsImRlcGFydG1lbnQiOiI1Y2UyODMzOGVkNjc1MDJmZGIxZDU1ODUiLCJhdmF0YXIiOiJodHRwczovL3QubWUvaS91c2VycGljLzMyMC9NeG1NYXpvdnNreS5qcGciLCJiYW5uZWQiOnsic3RhdHVzIjpmYWxzZSwiZXhwaXJlZCI6MH0sImlzQWRtaW4iOnRydWV9LCJpYXQiOjE1NTg5NzgyNDksImV4cCI6MTU1OTU4MzA0OX0.Y2a1y0Ei_zwK6x8cUSoaYZVFklFuvhgY8oQnkoW3JZE`;

export {
  SET_USER_DATA,
  GET_EVENTS,
  GET_USER,
  SUBCR_USER_TO_EVENT,
  UNSUBCR_USER_FROM_EVENT,
  SET_USER_DEPARTMENT,
  GET_ALL_DEPARTMENTS,
  GET_EVENT,
  token,
};
