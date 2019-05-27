import React, { Component } from "react";
import Yandex from "./maps/yandex";
import Leaflet from "./maps/leaflet";
import Preloader from "../../../modules/Preloader";

//example
// <MapEvent location={[55.751574, 37.573856]} zoom="5" type='leaflet/yandex' />

// location = array
// zoom = num/str | optional(default 10)
// type = str | optional(default yandex map)

class EventMap extends Component {
  state = {
    zoom: 10,
    checkProps: false,
    errorText: "Sorry, no info",
    preloader: false,
  };

  readyMap = () => {
    this.setState({ preloader: false });
  };

  ErrMap = () => {
    return <span>{this.state.errorText}</span>;
  };

  MapPlace = mapState => {
    if (mapState.type === "leaflet") {
      return Leaflet(mapState, this.readyMap);
    }

    return Yandex(mapState, this.readyMap);
  };

  componentDidMount() {
    //checkProps
    //location
    if (!this.props.location) {
      return;
    }

    const noArray = !Array.isArray(this.props.location);
    const noTwoCordinate = !this.props.location.length === 2;

    if (noArray || noTwoCordinate) {
      this.setState({
        errorText: "Wrong coordinates",
      });
    }

    //zoom
    if (!isNaN(+this.props.zoom)) {
      this.setState({
        zoom: this.props.zoom,
      });
    }

    //all ok
    this.setState({
      checkProps: true,
      preloader: true,
    });
  }

  render() {
    const { location, zoom, type } = this.props;

    const mapState = {
      center: location,
      zoom: this.state.zoom || zoom,
      type: type,
    };
    return (
      <div className="map__container map__body">
        {this.state.preloader ? <Preloader /> : null}
        {this.state.checkProps ? <>{this.MapPlace(mapState)} </> : this.ErrMap()}
      </div>
    );
  }
}

export default EventMap;
