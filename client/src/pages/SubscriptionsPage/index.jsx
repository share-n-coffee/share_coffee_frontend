import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./styles.module.scss";
import Header from "../../common/Header";
import EventDesc from "../../events/components/EventDesc";
import { getCookie } from "tiny-cookie";
import { Switch, Route } from "react-router-dom";
import TopicFront from "../TopicFront";
import jwtDecode from "jwt-decode";

const getEvents = token => {
  return axios({
    method: "get",
    url: "https://forge-development.herokuapp.com/api/events/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getUser = (token, id) => {
  return axios({
    method: "get",
    url: `https://forge-development.herokuapp.com/api/users/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const subscribeUserToEvent = (eventId, userId, token) => {
  return axios({
    method: "put",
    url: `https://forge-development.herokuapp.com/api/users/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { eventId: eventId },
  });
};

const unsubscibeUserFromEvent = (eventId, userId, token) => {
  return axios({
    method: "delete",
    url: `https://forge-development.herokuapp.com/api/users/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { eventId: eventId },
  });
};

const SubscriptionsPage = props => {
  const [events, setEvents] = useState([]);
  const [userData, setUserData] = useState({});
  const token = getCookie("token");
  const userId = "5ce1147ca0c89f001e1c2a4b";
  // const userId = sessionStorage.getItem("id");
  const handleSubscriptionClick = async eventId => {
    const result = await subscribeUserToEvent(eventId, userId, token);
    setUserData(result.data);
  };

  const handleUnsubscriptionClick = async eventId => {
    const result = await unsubscibeUserFromEvent(eventId, userId, token);
    setUserData(result.data);
  };

  useEffect(() => {
    const fetchData = async () => {
      const result = await getEvents(token);
      setEvents(result.data);
    };

    fetchData();
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      const result = await getUser(token, userId);
      setUserData(result.data);
    };

    fetchData();
  }, []);

  const EventFull = () => (
    <EventDesc
      className={styles.event}
      events={events}
      userEvents={userData.events}
      onSubscriptionClick={eventId => handleSubscriptionClick(eventId)}
      onUnsubscriptionClick={eventId => handleUnsubscriptionClick(eventId)}
    />
  );
  return (
    <>
      <Header
        isActive={true}
        isAdmin={false}
        hasDepartment={true}
        avatar={sessionStorage.getItem("avatar")}
        name={`${sessionStorage.getItem("firstName")} ${sessionStorage.getItem("lastName")}`}
        location={props}
      />
      <main>
        <Switch>
          <Route exact path="/subscriptions/" component={EventFull} />
          <Route path="/subscriptions/:id" component={TopicFront} />
        </Switch>
      </main>
    </>
  );
};

export default SubscriptionsPage;
