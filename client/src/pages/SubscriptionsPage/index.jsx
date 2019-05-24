import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../../common/Header";
import EventDesc from "../../events/components/EventDesc";
import { getCookie } from "tiny-cookie";
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
        <EventDesc className="event" events={events} />
      </main>
    </>
  );
};

export default SubscriptionsPage;
