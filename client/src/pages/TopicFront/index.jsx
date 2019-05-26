import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import EventMap from "../../events/components/EventMap";
import axios from "axios";
import { getCookie } from "tiny-cookie";
import PageTitle from "../../modules/PageTitle";
import { checkTokenTime } from "../../helpers/requests";
import SpinButton from "../../common/SpinButton";

const getDataEvent = id => {
  // checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
  return axios(`https://forge-development.herokuapp.com/api/events/${id}`, {
    headers: {
      Authorization: `Bearer ${getCookie("token")}`,
    },
  })
    .then(res => {
      return res.data;
    })
    .catch(err => console.log(err));
};

const TopicFront = ({
  userEvents = [],
  onSubscriptionClick,
  onUnsubscriptionClick,
  isLoading,
  currentLoadingEvents = [],
  match,
  history,
}) => {
  const [linkHover, setHover] = useState(false);
  const id = match.params.id;
  const userEventIds = userEvents.map(event => event.eventId);
  const isSubscribed = userEventIds.includes(id);
  const mouseEvents = {
    mouseOver: () => {
      setHover(true);
    },
    mouseOut: () => {
      setHover(false);
    },
    click: () => {
      history.goBack();
    },
  };

  const [eventData, setEvent] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await getDataEvent(id);
      setEvent(result);
    };
    fetchData();
  }, []);
  return (
    <>
      <PageTitle
        title={!linkHover ? eventData.title : "← Back"}
        mouseOver={mouseEvents.mouseOver}
        mouseOut={mouseEvents.mouseOut}
        click={mouseEvents.click}
      />
      <div className="topic-wrapper">
        <div className="map-section_container">
          <div className="section_header">
            <h2>Topic {eventData.title}</h2>
            <SpinButton
              text={isSubscribed ? "Unsubscribe" : "Subscribe"}
              type={isSubscribed ? "Unsubscribe" : "Subscribe"}
              isLoading={isLoading || currentLoadingEvents.includes(id)}
              disabled={!eventData.active}
              onClick={() => {
                if (isSubscribed) {
                  onUnsubscriptionClick(id);
                } else {
                  onSubscriptionClick(id);
                }
              }}
            />
          </div>
          <p className="section__descr">{eventData.description}</p>
          <div className="section__place">
            <h3 className="section__topic__title">place</h3>
            <p className="place__descr">{eventData.address}</p>
          </div>
          <div className="time__descr">
            <h3 className="section__topic__title">time</h3>
            <p className="time__descr">{eventData.options ? eventData.options.times[0] : <></>}</p>
          </div>
          <div className="map__descr">
            <h3 className="section__topic__title">map</h3>
            {eventData.location ? (
              <EventMap location={eventData.location} />
            ) : (
              <span>Map is not ready</span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default TopicFront;
