import React, { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import EventMap from "../../events/components/EventMap";
import Button from "../../common/Button";
import axios from "axios";
import { getCookie } from "tiny-cookie";
import PageTitle from "../../modules/PageTitle";
const getDataEvent = id => {
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

const TopicFront = props => {
  const [linkHover, setHover] = useState(false);

  const id = props.match.params.id;

  const mouseEvents = {
    mouseOver: () => {
      setHover(true);
    },
    mouseOut: () => {
      setHover(false);
    },
    click: () => {
      props.history.goBack();
    },
  };

  const [eventData, setEvent] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await getDataEvent(id);
      setEvent(result);
    };
    fetchData();
  }, {});
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
              {eventData.options ? eventData.options.times[0] : <></>}
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
