import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import Dropdown from "../../components/Dropdown";
import Button from "../../common/Button";
import SectionInfo from "../../modules/SectionInfo";
import PageTitle from "../../modules/PageTitle";
import Header from "../../common/Header";
import { getCookie } from "tiny-cookie";
import { checkerProp } from "../../helpers/helpers";
import { SET_USER_DEPARTMENT, GET_ALL_DEPARTMENTS } from "../../constants";
//import { checkTokenTime, checkIsBanned } from "../../helpers/requests";
import Preloader from "../../modules/Preloader";

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
      return res;
    })
    .catch(error => console.log(error));
};

const PageTeamSelect = props => {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [options, setOptions] = useState([]);
  const [isDataLoaded, setDataLoad] = useState(false);

  useEffect(() => {
    // checkIsBanned(sessionStorage.getItem("banned"));
    // checkTokenTime(sessionStorage.getItem("tokenTimeOver"));

    const fetchData = async () => {
      const result = await axios(GET_ALL_DEPARTMENTS, {
        headers: {
          Authorization: `Bearer ${getCookie("token")}`,
        },
      })
        .then(res => res)
        .catch(err => {
          console.log(err);
          return err;
        });
      // console.log(result.data.data);
      setDataLoad(true);
      setOptions(getAccountOptions(result.data.data));
    };

    fetchData();
  }, []);

  // const dep = sessionStorage.getItem("department");
  const hasDepartament = !checkerProp(sessionStorage.getItem("department"));
  // dep === "undefined" || dep === undefined || dep === null || dep === "null" ? false : true;
  if (hasDepartament) {
    props.history.goBack();
  }

  return (
    <>
      {isDataLoaded ? (
        <>
          <Header
            isActive={true}
            isAdmin={sessionStorage.getItem("isAdmin")}
            hasDepartment={false}
            location={props}
          />
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
      ) : (
        <div className="preloader-body">
          <Preloader />
        </div>
      )}
    </>
  );
};

export default withRouter(PageTeamSelect);
