import React, { useEffect, useState } from "react";
import EventMap from "../../events/components/EventMap";
import axios from "axios";
import { getCookie } from "tiny-cookie";
import PageTitle from "../../modules/PageTitle";
import { checkTokenTime } from "../../helpers/requests";
import SpinButton from "../../common/SpinButton";
import { GET_TOPIC } from "../../constants";
import Button from "../../common/Button";

// api 1.0 and 2.0
const getDataEvent = id => {
  // checkTokenTime(sessionStorage.getItem("tokenTimeOver"));
  console.log(id);
  return axios(GET_TOPIC(id), {
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
  isAdmin,
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

  const toEdit = () => {
    history.push(`/admin/topic-create/${id}`);
  };

  const [eventData, setEvent] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      const result = await getDataEvent(id);
      console.log(result.data[0]);
      // api 1.0
      // setEvent(result);
      //  -------------
      //  api 2.0
      setEvent(result.data[0]);
      //  --------------
    };
    fetchData();
  }, []);

  // let { title, description, address, location } = eventData;

  const letterTransform = prop => {
    let str = "";
    if (prop !== undefined || prop !== null) {
      for (let i = 0; i < prop.length; i++) {
        if (i === 0) {
          str += prop.charAt(i).toUpperCase();
        } else {
          str += prop.charAt(i);
        }
      }
      return str;
    } else {
      return "";
    }
  };

  const checkerNone = prop => {
    if (prop === "undefined" || prop === null || prop === undefined || prop === "undefined") {
      return "";
    } else {
      return prop;
    }
  };

  const parseHTML = props => {
    const test = React.createElement("div", null, props);
    // test.insertHTML = props;
    return test;
  };

  console.log(eventData);
  return (
    <>
      {!isAdmin ? (
        <PageTitle
          title={!linkHover ? letterTransform(checkerNone(eventData.title)) : "← Back"}
          mouseOver={mouseEvents.mouseOver}
          mouseOut={mouseEvents.mouseOut}
          click={mouseEvents.click}
        />
      ) : (
        ""
      )}
      <div className="topic-wrapper">
        <div className="map-section_container">
          <div className="section_header">
            <h2>Topic "{letterTransform(checkerNone(eventData.title))}"</h2>
            {isAdmin ? (
              <Button text={"Edit"} onClick={toEdit} />
            ) : (
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
            )}
          </div>
          <p className="section__descr">{letterTransform(checkerNone(eventData.description))}</p>
          <div className="section__place">
            <h3 className="section__topic__title">Place:</h3>
            <p className="place__descr">{letterTransform(checkerNone(eventData.address))}</p>
          </div>
          <div className="time__descr">
            <h3 className="section__topic__title">Time:</h3>
            <p className="time__descr">{checkerNone(eventData.time)}</p>
          </div>
          <div className="map__descr">
            <h3 className="section__topic__title">Map:</h3>
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
