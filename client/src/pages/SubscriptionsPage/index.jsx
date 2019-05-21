import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.scss";
import EventDesc from "../../events/components/EventDesc";
import UserDataContext from "../../contexts/UserDataContext";

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
      <EventDesc className={styles.event} events={events} />
    </main>
  );
};

export default SubscriptionsPage;
