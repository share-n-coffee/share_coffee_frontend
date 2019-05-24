import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../common/Header";
import EventDesc from "../../events/components/EventDesc";
import { getCookie } from "tiny-cookie";
import { Switch, Route } from "react-router-dom";
import TopicFront from "../TopicFront";
// import UserDataContext from "../../contexts/UserDataContext";

const getEvents = token => {
  return axios({
    method: "get",
    url: "https://forge-development.herokuapp.com/api/events/",
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  });
};

const SubscriptionsPage = props => {
  const [events, setEvents] = useState([]);
  const token = getCookie("token");
  useEffect(() => {
    const fetchData = async () => {
      const result = await getEvents(token);
      setEvents(result.data);
    };

    fetchData();
  }, []);
  const EventFull = () => <EventDesc className="event" events={events} />;
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
        {/* <EventDesc className="event" events={events} /> */}

        <Switch>
          <Route exact path="/subscriptions/" component={EventFull} />
          <Route path="/subscriptions/:id" component={TopicFront} />
        </Switch>
      </main>
    </>
  );
};

export default SubscriptionsPage;
