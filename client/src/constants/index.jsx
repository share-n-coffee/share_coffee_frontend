export const LOGIN_ADMIN = `https://forgeserver.herokuapp.com/login/admin`;

export const GET_TOPIC_SUBSCRIBERS = id =>
  `https://forgeserver.herokuapp.com/api/subscriptions/topic/${id}`;
export const TOPICS = (page = 0, limit = 5) =>
  `https://forgeserver.herokuapp.com/api/topics/?page=${page}&limit=${limit}`;
export const ONE_TOPIC = id => `https://forgeserver.herokuapp.com/api/topics/${id}`;
export const ADD_NEW_TOPIC = "https://forgeserver.herokuapp.com/api/topics/";
export const UPDATE_TOPIC = id => `https://forgeserver.herokuapp.com/api/topics/${id}`;
// export const TOPIC_EVENTS = id => `https://forgeserver.herokuapp.com/api/events/?topicId=${id}`;
export const TOPIC_EVENTS = id => `https://forgeserver.herokuapp.com/api/topics/events/${id}`;

export const USERS = (page = 0, limit = 10) =>
  `https://forgeserver.herokuapp.com/api/users/?page=${page}&limit=${limit}`;
export const BAN_USER = id => `https://forgeserver.herokuapp.com/api/users/ban/${id}`;
export const ONE_USER = id => `https://forgeserver.herokuapp.com/api/users/${id}`;

export const TEAMS = `https://forgeserver.herokuapp.com/api/departments/`;
export const USER_IN_TEAM = id => `https://forgeserver.herokuapp.com/api/users/?department=${id}`;
export const ONE_TEAM = id => `https://forgeserver.herokuapp.com/api/departments/${id}`;

const SET_USER_DATA = "https://forge-development.herokuapp.com/login";
const GET_EVENTS = "https://forge-development.herokuapp.com/api/events/";
//--------------------------------------------------------------------------
// const GET_USER = id => `https://forge-development.herokuapp.com/api/users/${id}`;
// const SUBCR_USER_TO_EVENT = userId => `https://forge-development.herokuapp.com/api/users/${userId}`;
// const UNSUBCR_USER_FROM_EVENT = userId =>
//   `https://forge-development.herokuapp.com/api/users/${userId}`;
// const SET_USER_DEPARTMENT = userId => `https://forge-development.herokuapp.com/api/users/${userId}`;

// const GET_ALL_DEPARTMENTS = "https://forge-development.herokuapp.com/api/departments/";
// const GET_EVENT = id => `https://forge-development.herokuapp.com/api/events/${id}`;

// local server
const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVjZWRhMjQxOTE5M2M5YmI1NDcwM2ZlMCIsImZpcnN0TmFtZSI6IkFsZXN5YSIsImxhc3ROYW1lIjoiU2tvcm9raG9kIiwiZGVwYXJ0bWVudCI6eyJfaWQiOiI1Y2Q2ZjZjMzgxMzcxZDI5N2FjYjJmZDEiLCJ0aXRsZSI6IktvZmZlZSIsImRlc2NyaXB0aW9uIjoiQ2lsbHVtIHVsbGFtY28gYWQgZWxpdCBkdWlzIHBhcmlhdHVyIHNpbnQgdXQgbGFib3JlIHByb2lkZW50IGVsaXQuIEVzdCBleGNlcHRldXIgZXhlcmNpdGF0aW9uIGV0IG9mZmljaWEgYWRpcGlzaWNpbmcgc2l0IGV4ZXJjaXRhdGlvbiBlYSBkZXNlcnVudCBzaW50IGNvbnNlcXVhdC4gRWxpdCBhbGlxdWEgZXN0IGlydXJlIG5pc2kgaWQgYWRpcGlzaWNpbmcgbmlzaSByZXByZWhlbmRlcml0IGxhYm9ydW0gaW4gc2ludCBpcHN1bSBlYS4gTWFnbmEgZG9sb3JlIHZlbmlhbSB2ZW5pYW0gZG9sb3IgaXJ1cmUgZWxpdCBMb3JlbSBwcm9pZGVudC4gT2ZmaWNpYSB2ZWxpdCBlbmltIHV0IGlkIGFkaXBpc2ljaW5nIGN1cGlkYXRhdCBkb2xvcmUuIER1aXMgY29tbW9kbyByZXByZWhlbmRlcml0IGNpbGx1bSBsYWJvcnVtIG1pbmltIGNvbnNlcXVhdCB2ZWxpdCBuaXNpIGFtZXQgcGFyaWF0dXIuIn0sImF2YXRhciI6Imh0dHBzOi8vdC5tZS9pL3VzZXJwaWMvMzIwL3B1aGNoYS5qcGciLCJiYW5uZWQiOnsic3RhdHVzIjpmYWxzZSwiZXhwaXJlZCI6MH0sInBlcm1pc3Npb24iOjB9LCJpYXQiOjE1NTkwNzgxNTQsImV4cCI6MTU1OTY4Mjk1NH0.Al2mZI_s3qlCNQhTGqyZDFGlmkAt6o2qL9qMmvhVvEo`;
//new api 2.0
// const GET_EVENTS = `https://forgeserver.herokuapp.com/api/events/`;
const GET_ALL_TOPICS = `https://forgeserver.herokuapp.com/api/topics/`;
const SET_USER_DEPARTMENT = userId => `https://forgeserver.herokuapp.com/api/users/${userId}`;
const GET_ALL_DEPARTMENTS = `https://forgeserver.herokuapp.com/api/departments/`;
const GET_USER = id => `https://forgeserver.herokuapp.com/api/users/${id}`;
const SUBCR_USER_TO_TOPIC = (topicId, userId) =>
  `https://forgeserver.herokuapp.com/api/topics/${topicId}/${userId}/`;
const UNSUBCR_USER_FROM_TOPIC = (topicId, userId) =>
  `https://forgeserver.herokuapp.com/api/topics/${topicId}/${userId}/ `;
// const GET_EVENT = id => `https://forgeserver.herokuapp.com/api/events/${id}`;
const GET_TOPIC = id => `https://forgeserver.herokuapp.com/api/topics/${id}`;

export {
  SET_USER_DATA,
  GET_EVENTS,
  GET_ALL_TOPICS,
  GET_USER,
  SUBCR_USER_TO_TOPIC,
  UNSUBCR_USER_FROM_TOPIC,
  SET_USER_DEPARTMENT,
  GET_ALL_DEPARTMENTS,
  GET_TOPIC,
  token,
};
