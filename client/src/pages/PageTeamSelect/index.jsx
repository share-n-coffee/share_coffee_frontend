import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import styles from "./styles.module.scss";
import Dropdown from "../../components/Dropdown";
import Button from "../../common/Button";
import SectionInfo from "../../modules/SectionInfo";
import PageTitle from "../../modules/PageTitle";
// import UserDataContext from "../../contexts/UserDataContext";

const getAccountOptions = departments => {
  return departments.map(department => {
    return { label: department.title, value: department._id };
  });
};

const setUserDepartment = (departmentId, userData) => {
  return axios
    .put(
      `https://forge-development.herokuapp.com/api/users/${sessionStorage.getItem(
        "id",
      )}`,
      { newDepartment: departmentId },
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
      },
    )
    .catch(error => console.log(error));
};

const PageTeamSelect = ({ history }) => {
  const [selectedDepartmentId, setSelectedDepartmentId] = useState(null);
  const [options, setOptions] = useState([]);

  // const userData = useContext(UserDataContext);
  const userData = {
    id: sessionStorage.getItem("id"),
    token: sessionStorage.getItem("token"),
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(
        "https://forge-development.herokuapp.com/api/departments/",
        {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        },
      );

      setOptions(getAccountOptions(result.data));
    };

    fetchData();
  }, []);

  const name = sessionStorage.getItem("firstName");
  const surName = sessionStorage.getItem("lastName");

  return (
    <main className={styles.main_section}>
      <PageTitle title={`Hello, ${name} ${surName}`} />
      <SectionInfo
        infoText="Select your team to start knowledge sharing and
                having some coffee:"
      />
      <div className={styles.dropdown_container}>
        <Dropdown
          options={options}
          selectedValue={selectedDepartmentId}
          onSelect={setSelectedDepartmentId}
        />
      </div>

      <Button
        onClick={async () => {
          await setUserDepartment(selectedDepartmentId, userData);
          history.push("/subscriptions");
        }}
        disabled={!selectedDepartmentId}
        text="Accept"
        type="primary"
      />
    </main>
  );
};

export default withRouter(PageTeamSelect);
