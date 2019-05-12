import React, { useState } from "react";
import styles from "./styles.module.scss";
import Header from "../Header";
import PageTitle from "../PageTitle";
import Dropdown from "../Dropdown";
import Footer from "../Footer";
import Button from "../Button";
import SectionInfo from "../SectionInfo";

const options = [
  { label: "Optiooooooooooooooooooon1", value: "opt1" },
  { label: "Option2", value: "opt2" },
  {
    label: "Option3",
    value: "opt3",
  },
];

const PageTeamSelect = () => {
  const [selectedValue, setSelectedValue] = useState(null);
  return (
    <>
      <Header />
      <div className={styles.main_section}>
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
        <Footer />
      </div>
    </>
  );
};

export default PageTeamSelect;
