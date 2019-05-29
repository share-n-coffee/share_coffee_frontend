import React from "react";

const checkerProp = prop => {
  if (
    prop === "undefined" ||
    prop === null ||
    prop === undefined ||
    prop === "undefined" ||
    `${prop}` === "NaN" ||
    prop === ""
  ) {
    return true;
  } else {
    return false;
  }
};

const setStorage = userData => {
  sessionStorage.setItem("id", userData.data._id);
  sessionStorage.setItem("firstName", userData.data.firstName);
  sessionStorage.setItem("lastName", userData.data.lastName);
  sessionStorage.setItem("avatar", userData.data.avatar);
  sessionStorage.setItem("isAdmin", userData.data.permission);
  sessionStorage.setItem("banned", userData.data.banned.status);
  if (checkerProp(userData.data.department)) {
    sessionStorage.setItem("department", null);
  } else {
    sessionStorage.setItem("department", userData.data.department.title);
  }
  sessionStorage.setItem("tokenTimeOver", userData.exp);
};

const router = props => {
  props.userAuth();
  const hasId = !checkerProp(sessionStorage.getItem("id"));
  const hasDepartament = !checkerProp(sessionStorage.getItem("department"));
  if (hasId && !hasDepartament) {
    props.history.push("/team_select/");
  } else if (hasId && hasDepartament) {
    props.history.push("/subscriptions/");
  }
};

const letterTransform = prop => {
  let str = "";
  if (prop !== undefined || prop !== null) {
    for (let i = 0; i < prop.length; i++) {
      if (i === 0) {
        str += prop.charAt(i).toUpperCase();
      } else {
        str += prop.charAt(i);
      }
    }
    return str;
  } else {
    return "";
  }
};

const regularity = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const timeConverter = prop => {
  const date = new Date(prop);
  let month = `0`;
  if (date.getMonth() < 9) {
    month += date.getMonth() + 1;
  } else {
    month = date.getMonth() + 1;
  }
  return `${date.getDate()}.${month}.${date.getFullYear()}`;
};

const secConverter = prop => {
  const date = new Date(prop);
  const arr = [13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  let min = 0,
    hour = 0;
  if (date.getMinutes() < 10) {
    min += date.getMinutes();
  } else {
    min = date.getMinutes();
  }
  if (date.getHours() <= 12) {
    hour = date.getHours();
  } else {
    for (let i = 0; i < arr.length; i++) {
      if (date.getHours() === arr[i]) {
        hour = i + 1;
      }
    }
  }
  let mas = `${hour}:${min}`;
  return mas;
};

export {
  setStorage,
  router,
  letterTransform,
  // checkerNone,
  timeConverter,
  regularity,
  secConverter,
  checkerProp,
};
