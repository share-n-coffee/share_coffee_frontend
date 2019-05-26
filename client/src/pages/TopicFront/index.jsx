import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import EventMap from "../../events/components/EventMap";
import axios from "axios";
import { getCookie } from "tiny-cookie";
import PageTitle from "../../modules/PageTitle";
import SpinButton from "../../common/SpinButton";
// const token =
//   "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7Il9pZCI6IjVjZTAxNTgyN2RjODI0MDAxZTBhYzczZSIsImZpcnN0TmFtZSI6Ik1heCIsImxhc3ROYW1lIjoiUmF6aG5vdiIsImRlcGFydG1lbnQiOiI1Y2Q2ZjZjMzgxMzcxZDI5N2FjYjJmZDAiLCJhdmF0YXIiOiJodHRwczovL3QubWUvaS91c2VycGljLzMyMC9NeG1NYXpvdnNreS5qcGciLCJiYW5uZWQiOnsic3RhdHVzIjp0cnVlLCJleHBpcmVkIjo0MTAyMzg5ODI4NTA1fSwiaXNBZG1pbiI6ZmFsc2V9LCJpYXQiOjE1NTgzNTI4OTksImV4cCI6MTU1ODk1NzY5OX0.mvcXUriYtWCvaxnejCTatksS97sakq5hekN5w_3Zvxw";
const getDataEvent = id => {
  return axios(`https://forge-development.herokuapp.com/api/events/${id}`, {
    headers: {
      // Authorization: `Bearer ${token}`,
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
      <div className={styles.wrapper}>
        <div className={styles.section_container}>
          <div className={styles.section_header}>
            <h2>Topic {eventData.title}</h2>
            <SpinButton
              text={isSubscribed ? "Unsubscribe" : "Subscribe"}
              type={isSubscribed ? "Unsubscribe" : "Subscribe"}
              isLoading={isLoading || currentLoadingEvents.includes(id)}
              onClick={() => {
                if (isSubscribed) {
                  onUnsubscriptionClick(id);
                } else {
                  onSubscriptionClick(id);
                }
              }}
            />
          </div>
          <p className={styles.section__descr}>{eventData.description}</p>
          <div className={styles.section__place}>
            <h3 className={styles.section__topic__title}>place</h3>
            <p className={styles.place__descr}>{eventData.address}</p>
          </div>
          <div className={styles.time__descr}>
            <h3 className={styles.section__topic__title}>time</h3>
            <p className={styles.time__descr}>{eventData.created}</p>
          </div>
          <div className={styles.map__descr}>
            <h3 className={styles.section__topic__title}>map</h3>
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
