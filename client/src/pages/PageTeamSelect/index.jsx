import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./styles.module.scss";
import Dropdown from "../../components/Dropdown";
import Button from "../../modules/Button";
import SectionInfo from "../../modules/SectionInfo";
import PageTitle from "../../modules/PageTitle";

const getAccountOptions = departments => {
  return departments.map(department => {
    return { label: department.title, value: department._id };
  });
};

const PageTeamSelect = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const token =
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVjZTExNDdjYTBjODlmMDAxZTFjMmE0YiIsImZpcnN0TmFtZSI6IkFuYXRvbHkiLCJsYXN0TmFtZSI6IlNlbWVueWFrYSIsImF2YXRhciI6Imh0dHBzOi8vdC5tZS9pL3VzZXJwaWMvMzIwL3RvbHlhX2thdG9seWEuanBnIiwiYmFubmVkIjp7InN0YXR1cyI6ZmFsc2UsImV4cGlyZWQiOjB9LCJpc0FkbWluIjpmYWxzZX0sImlhdCI6MTU1ODI1NDcxNiwiZXhwIjoxNTU4ODU5NTE2fQ.t2vTbuMgfp4Q-rz6AH_d_i6F6F0ZaeH9E6e-yz2MC_4";
      const result = await axios(
        "https://forge-development.herokuapp.com/api/departments/",
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      setOptions(getAccountOptions(result.data));
    };

    fetchData();
  }, []);

  return (
    <main className={styles.main_section}>
      <PageTitle title="Hello, FullStackVasya921" />
      <SectionInfo
        infoText="Select your team to start knowledge sharing and
                having some coffee:"
      />
      <div className={styles.dropdown_container}>
        <Dropdown
          options={options}
          selectedValue={selectedValue}
          onSelect={setSelectedValue}
        />
      </div>

      <Button link="href://" text="Accept" />
    </main>
  );
};

export default PageTeamSelect;
