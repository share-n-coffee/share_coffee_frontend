import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Dropdown from "../../components/Dropdown";
import Button from "../../common/Button";
import SectionInfo from "../../modules/SectionInfo";
import PageTitle from "../../modules/PageTitle";
import Header from "../../common/Header";
import { getCookie } from "tiny-cookie";
import jwtdecode from "jwt-decode";
import { SET_USER_DEPARTMENT, GET_ALL_DEPARTMENTS } from "../../constants";
import { checkTokenTime, checkIsBanned } from "../../helpers/requests";

const getAccountOptions = departments => {
  return departments.map(department => {
    return { label: department.title, value: department._id };
  });
};

const setUserDepartment = departmentId => {
  // checkIsBanned(sessionStorage.getItem("banned"));
  // checkTokenTime(sessionStorage.getItem("tokenTimeOver"));

  const userId = sessionStorage.getItem("id");
  const token = getCookie("token");
  // api 2.0
  return axios({
    method: "put",
    url: `${SET_USER_DEPARTMENT(userId)}`,
    data: { newDepartment: departmentId },
    headers: {
      Authorization: `Bearer ${token}`,
      mode: "cors",
      "Content-Type": "application/json",
    },
  })
    .then(res => {
      // const user = jwtdecode(`${res.data.token}`);
      // console.log(user);
      // sessionStorage.setItem("department", user.data.department._id);
      // console.log(res);
      return res;
    })
    .catch(error => console.log(error));
};
//---------------------------------------------

// new api 1.0
//   return axios
//     .put(
//       `${SET_USER_DEPARTMENT(userId)}`,
//       { newDepartment: departmentId },
//       {
//         headers: {
//           Authorization: `Bearer ${getCookie("token")}`,
//           "Content-Type": "application/json",
//           mode: "cors",
//         },
//       },
//     )
//     .catch(error => console.log(error));
// };
//--------------------------------------------------------

const PageTeamSelect = props => {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    // checkIsBanned(sessionStorage.getItem("banned"));
    // checkTokenTime(sessionStorage.getItem("tokenTimeOver"));

    const fetchData = async () => {
      // api 1.0
      // const result = await axios(GET_ALL_DEPARTMENTS, {
      //   headers: {
      //     Authorization: `Bearer ${getCookie("token")}`,
      //   },
      // });
      //--------------------------------------------------------

      // new api 2.0
      const result = await axios(GET_ALL_DEPARTMENTS, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      });
      // console.log(result.data.data);
      //--------------------------------------------------------
      //api 1.0
      // setOptions(getAccountOptions(result.data));
      //--------------------------------------------------------

      //  api 2.0
      setOptions(getAccountOptions(result.data.data));
      //--------------------------------------------------------
    };

    fetchData();
  }, []);

  return (
    <>
      <Header isActive={true} isAdmin={false} hasDepartment={false} location={props} />
      <main className="select-main_section">
        <PageTitle
          title={`Hello, ${sessionStorage.getItem("firstName")} ${sessionStorage.getItem(
            "lastName",
          )}`}
        />
        <SectionInfo
          infoText="Select your team to start knowledge sharing and
                having some coffee:"
        />
        <div className="select-dropdown_container">
          <Dropdown
            options={options}
            selectedValue={selectedDepartmentId}
            onSelect={setSelectedDepartmentId}
          />
        </div>

        <Button
          onClick={async () => {
            await setUserDepartment(selectedDepartmentId);
            props.history.push("/subscriptions");
          }}
          disabled={!selectedDepartmentId}
          text="Accept"
          type="primary"
        />
      </main>
    </>
  );
};

export default withRouter(PageTeamSelect);
