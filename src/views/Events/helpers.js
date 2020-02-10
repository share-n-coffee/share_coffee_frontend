import axios from "axios";
import { SERVER, GET_ALL_TOPICS, GET_USER, GET_TOPIC } from "../../constants";
import { checkTokenTime } from "../../helpers/helpers";

const getAllTopics = (token, page = 0, limit = 3) => {
  checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
  return axios({
    method: "get",
    url: GET_ALL_TOPICS(page, limit),
    headers: {
      Authorization: `Bearer ${token}`,
      mode: "cors",
      "Content-Type": "application/json",
    },
  });
};

const getAllUserSubscriptions = (token, userId) => {
  checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
  return axios({
    method: "get",
    url: `${SERVER}/subscriptions/?userId=${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      mode: "cors",
      "Content-Type": "application/json",
    },
  });
};

const getUser = (token, id) => {
  checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
  return axios({
    method: "get",
    url: GET_USER(id),
    headers: {
      Authorization: `Bearer ${token}`,
      mode: "cors",
      "Content-Type": "application/json",
    },
  });
};

const subscribeUserToTopic = (topicId, userId, token) => {
  checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
  return axios({
    method: "post",
    url: `${SERVER}/topics/${topicId}/${userId}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const unsubsrcibeUserFromTopic = (topicId, userId, token) => {
  checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
  return axios({
    method: "delete",
    url: `${SERVER}/topics/${topicId}/${userId}/`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getDataEvent = (topicId, token) => {
  checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
  return axios(GET_TOPIC(topicId), {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
};

const getSubscription = (topicId, userId, token) => {
  checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
  return axios({
    method: "get",
    url: `${SERVER}/subscriptions/?userId=${userId}&topicId=${topicId}`,
    headers: {
      Authorization: `Bearer ${token}`,
      mode: "cors",
      "Content-Type": "application/json",
    },
  });
};

export {
  getSubscription,
  getAllTopics,
  getAllUserSubscriptions,
  getUser,
  subscribeUserToTopic,
  unsubsrcibeUserFromTopic,
  getDataEvent,
};
