import React, { Component } from "react";
import InfoAboutEvent from "../../modules/InfoAboutEvent";
import PageTitle from "../../../modules/PageTitle";
import TopicFront from "../../../pages/TopicFront";
import EventName from "../../modules/EventName";
import Button from "../../../common/Button";
import styles from "./styles.module.scss";

class EventDesc extends Component {
  state = {
    idEvent: "",
    openEvent: false,
    linkNoHover: true,
  };
  openEvent(id, title) {
    return () => {
      this.setState({ idEvent: id });
      this.setState({ title: title });
      this.setState({ openEvent: true });

      this.setState({ linkNoHover: true });
      this.forceUpdate();
    };
  }

  mouseEvents = {
    mouseOver: () => {
      this.setState({ linkNoHover: false });
    },
    mouseOut: () => {
      this.setState({ linkNoHover: true });
    },
    click: () => {
      this.setState({ openEvent: false });
    },
  };

  render() {
    const { events } = this.props;
    const elements = events.map(item => {
      const { ...itemProps } = item;
      return (
        <div key={itemProps._id} className={styles.eventDescItem}>
          <div
            className={styles.eventContainer}
            onClick={this.openEvent(itemProps._id, itemProps.title)}
          >
            <EventName
              eventName={itemProps.title}
              isSubscribed={itemProps.isActive}
            />
            <InfoAboutEvent
              adress={itemProps.address}
              eventFrequency={new Date(itemProps.created).toDateString()}
            />
          </div>
          <Button
            text={itemProps.events ? "Unsubscribe" : "Subscribe"}
            type={itemProps.events ? "Unsubscribe" : "Subscribe"}
          />
        </div>
      );
    });
    return this.state.openEvent ? (
      <>
        <PageTitle
          title={this.state.linkNoHover ? this.state.title : "← Back"}
          mouseOver={this.mouseEvents.mouseOver}
          mouseOut={this.mouseEvents.mouseOut}
          click={this.mouseEvents.click}
        />

        <TopicFront id={this.state.idEvent} />
      </>
    ) : (
      <>
        <PageTitle title="Current topics" />
        <div className={styles.eventDesc}>{elements}</div>
      </>
    );
  }
}

export default EventDesc;
