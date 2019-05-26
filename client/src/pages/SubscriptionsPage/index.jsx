import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../common/Header";
import EventDesc from "../../events/components/EventDesc";
import { getCookie } from "tiny-cookie";
import { Switch, Route } from "react-router-dom";
import TopicFront from "../TopicFront";
import { checkTokenTime } from "../../helpers/requests";

const getEvents = token => {
  // checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
  return axios({
    method: "get",
    url: "https://forge-development.herokuapp.com/api/events/",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const getUser = (token, id) => {
  // checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
  return axios({
    method: "get",
    url: `https://forge-development.herokuapp.com/api/users/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

const subscribeUserToEvent = (eventId, userId, token) => {
  // checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
  return axios({
    method: "put",
    url: `https://forge-development.herokuapp.com/api/users/${userId}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    data: { eventId: eventId },
  });
};

const unsubsrcibeUserFromEvent = (eventId, userId, token) => {
  // checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
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
  const [isUserDataLoaded, setIsUserDataLoaded] = useState(false);
  const [currentLoadingEvents, setCurrentLoadingEvents] = useState([]);
  const token = getCookie("token");
  //const userId = "5ce1147ca0c89f001e1c2a4b";
  const userId = sessionStorage.getItem("id");
  const handleSubscriptionClick = eventId => handleSubscribing(eventId, subscribeUserToEvent);
  const handleUnsubscriptionClick = eventId => handleSubscribing(eventId, unsubsrcibeUserFromEvent);
  const handleSubscribing = async (eventId, subscribingFunction) => {
    setCurrentLoadingEvents([...currentLoadingEvents, eventId]);
    const result = await subscribingFunction(eventId, userId, token);
    setUserData(result.data);
    setCurrentLoadingEvents(
      currentLoadingEvents.filter(loadingEventId => loadingEventId !== eventId),
    );
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
      setIsUserDataLoaded(true);
    };

    fetchData();
  }, []);

  const EventFull = () => (
    <EventDesc
      className="event"
      events={events}
      userEvents={userData.events}
      onSubscriptionClick={eventId => handleSubscriptionClick(eventId)}
      onUnsubscriptionClick={eventId => handleUnsubscriptionClick(eventId)}
      isLoading={!isUserDataLoaded}
      currentLoadingEvents={currentLoadingEvents}
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
          <Route
            path="/subscriptions/:id"
            component={params => (
              <TopicFront
                userEvents={userData.events}
                onSubscriptionClick={eventId => handleSubscriptionClick(eventId)}
                onUnsubscriptionClick={eventId => handleUnsubscriptionClick(eventId)}
                isLoading={!isUserDataLoaded}
                currentLoadingEvents={currentLoadingEvents}
                {...params}
              />
            )}
          />
        </Switch>
      </main>
    </>
  );
};

export default SubscriptionsPage;
