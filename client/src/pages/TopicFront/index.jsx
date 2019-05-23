import React, { Component, useEffect, useState } from "react";
import styles from "./styles.module.scss";
import EventMap from "../../events/components/EventMap";
import Button from "../../common/Button";
import axios from "axios";
import { getCookie } from "tiny-cookie";

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

const TopicFront = props => {
  const [eventData, setEvent] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await getDataEvent(props.id);
      setEvent(result);
    };
    fetchData();
  }, {});
  console.log(eventData);
  return (
    <>
      <div className={styles.wrapper}>
        <div className={styles.section_container}>
          <div className={styles.section_header}>
            <h2>Topic {eventData.title}</h2>
            {eventData.active ? (
              <Button text={"Subscribe"} type="Subscribe" />
            ) : (
              <Button text={"Subscribe"} type="Subscribe" disabled />
            )}
          </div>
          <p className={styles.section__descr}>{eventData.description}</p>
          <div className={styles.section__place}>
            <h3 className={styles.section__topic__title}>place</h3>
            <p className={styles.place__descr}>{eventData.address}</p>
          </div>
          <div className={styles.time__descr}>
            <h3 className={styles.section__topic__title}>time</h3>
            <p className={styles.time__descr}>
              {eventData.options ? eventData.options.times[0] : "no time"}
            </p>
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
