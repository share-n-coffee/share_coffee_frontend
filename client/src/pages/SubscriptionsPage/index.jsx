import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.scss";
import PageTitle from "../../modules/PageTitle";
import EventDesc from "../../Events/components/EventDesc";
import UserDataContext from "../../contexts/UserDataContext";
import Header from "../../common/Header";
import Footer from "../../common/Footer";

const getEvents = token => {
  return axios({
    method: "get",
    url: "https://forge-development.herokuapp.com/api/events/",
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

const SubscriptionsPage = () => {
  const [events, setEvents] = useState([]);
  const { token } = useContext(UserDataContext);
  useEffect(() => {
    const fetchData = async () => {
      const result = await getEvents(token);
      setEvents(result.data);
    };

    fetchData();
  }, []);

  return (
    <main>
      <PageTitle title="Current topics" />
      <EventDesc className={styles.event} events={events} />
    </main>
  );
};

export default SubscriptionsPage;
