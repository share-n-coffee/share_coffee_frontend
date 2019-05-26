const setStorage = userData => {
  sessionStorage.setItem("id", userData.data._id);
  sessionStorage.setItem("firstName", userData.data.firstName);
  sessionStorage.setItem("lastName", userData.data.lastName);
  sessionStorage.setItem("avatar", userData.data.avatar);
  sessionStorage.setItem("isAdmin", userData.data.isAdmin);
  sessionStorage.setItem("banned", userData.data.banned.status);
  sessionStorage.setItem("department", userData.data.department);
  sessionStorage.setItem("tokenTimeOver", userData.exp);
  sessionStorage.setItem("tokenTimeStart", userData.iat);
};

const router = props => {
  props.userAuth();
  const id = sessionStorage.getItem("id");
  const departament = sessionStorage.getItem("department");
  if (id && !departament) {
    props.history.push("/team_select/");
  } else if (id && departament) {
    props.history.push("/subscriptions/");
  }
};
export { setStorage, router };
