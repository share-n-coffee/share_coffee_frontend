const setStorage = userData => {
  sessionStorage.setItem("id", userData.data._id);
  sessionStorage.setItem("firstName", userData.data.firstName);
  sessionStorage.setItem("lastName", userData.data.lastName);
  sessionStorage.setItem("avatar", userData.data.avatar);
  sessionStorage.setItem("isAdmin", userData.data.permission);
  sessionStorage.setItem("banned", userData.data.banned.status);
  console.log("probros 4");
  if (
    userData.data.department === null ||
    userData.data.department === "undefined" ||
    userData.data.department === undefined ||
    userData.data.department === "null"
  ) {
    console.log("probros session null");
    sessionStorage.setItem("department", null);
  } else {
    console.log("probros session title");
    sessionStorage.setItem("department", userData.data.department.title);
  }
  sessionStorage.setItem("tokenTimeOver", userData.exp);
};

const router = props => {
  console.log("probros 5");
  props.userAuth();
  const id = sessionStorage.getItem("id");
  // const departament = sessionStorage.getItem("department");
  const dep = sessionStorage.getItem("department");
  const hasId =
    id === "undefined" || id === undefined || id === null || id === "null" ? false : true;
  const hasDepartament =
    dep === "undefined" || dep === undefined || dep === null || dep === "null" ? false : true;
  // if (id && !departament) {
  if (hasId && !hasDepartament) {
    props.history.push("/team_select/");
    // } else if (hasId && dep) {
  } else if (hasId && hasDepartament) {
    props.history.push("/subscriptions/");
  }
};
export { setStorage, router };
