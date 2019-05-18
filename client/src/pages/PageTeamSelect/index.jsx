import React, { useState, useEffect } from "react";
import axios from "axios";

import styles from "./styles.module.scss";
import Dropdown from "../../components/Dropdown";
import Button from "../../modules/Button";
import SectionInfo from "../../modules/SectionInfo";
import PageTitle from "../../modules/PageTitle";

// const options = [
//   { label: "Optiooooooooooooooooooon1", value: "opt1" },
//   { label: "Option2", value: "opt2" },
//   {
//     label: "Option3",
//     value: "opt3",
//   },
// ];

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
      // const result = await fetch(
      //     "https://forge-development.herokuapp.com/api/departments/"
      // )
      const result = [
        {
          _id: "5cd6f6c381371d297acb2fd0",
          title: "Pivitol",
          description:
            "Qui velit ex amet amet id. Culpa ipsum consequat aliquip nulla elit culpa. Id aute sit velit enim exercitation sit cupidatat eu esse et anim aute.",
          created: "2019-05-17T10:15:51.724Z",
        },
        {
          _id: "5cd6f6c381371d297acb2fd1",
          title: "Koffee",
          description:
            "Cillum ullamco ad elit duis pariatur sint ut labore proident elit. Est excepteur exercitation et officia adipisicing sit exercitation ea deserunt sint consequat. Elit aliqua est irure nisi id adipisicing nisi reprehenderit laborum in sint ipsum ea. Magna dolore veniam veniam dolor irure elit Lorem proident. Officia velit enim ut id adipisicing cupidatat dolore. Duis commodo reprehenderit cillum laborum minim consequat velit nisi amet pariatur.",
          created: "2019-05-17T10:15:51.724Z",
        },
        {
          _id: "5cd6f6c381371d297acb2fd2",
          title: "Geekmosis",
          description:
            "Est cupidatat veniam deserunt reprehenderit non sint. Dolor enim est qui aute. Ea eiusmod irure enim sit elit labore non pariatur. Laboris eiusmod proident eiusmod consequat.",
          created: "2019-05-17T10:15:51.725Z",
        },
        {
          _id: "5cd6f6c381371d297acb2fd3",
          title: "Repetwire",
          description:
            "Consequat ut aute cillum magna veniam commodo. Id officia sit ipsum cillum pariatur reprehenderit. Ea cupidatat eu qui in in reprehenderit.",
          created: "2019-05-17T10:15:51.725Z",
        },
        {
          _id: "5cd6f6c381371d297acb2fd4",
          title: "Dogspa",
          description:
            "Laborum quis enim amet adipisicing laborum ad consequat aute deserunt ipsum eu. Laborum exercitation mollit in duis sint aute tempor mollit aliqua nostrud in id tempor. Ex mollit consectetur laborum excepteur aliquip incididunt velit aliquip Lorem. Sint laboris eu amet do consectetur reprehenderit commodo dolore. Dolore adipisicing id pariatur deserunt et cupidatat consequat est nostrud aliquip ea aliqua. Eu magna laborum tempor nisi id amet proident dolore commodo consectetur ipsum. Labore ullamco sint non proident ex proident qui esse laboris aliqua.",
          created: "2019-05-17T10:15:51.725Z",
        },
      ];

      setOptions(getAccountOptions(result));
    };

    fetchData();
  }, []);

  return (
    <>
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
    </>
  );
};

export default PageTeamSelect;
