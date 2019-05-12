import React, { Component } from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";

//example <MapEvent location={[55.751574, 37.573856]} zoom="5" />

class MapEvent extends Component {
  state = { readyMap: false };

  readyMap = () => {
    //for preloader
    console.log("is loaded");
  };

  ErrMap = () => {
    return <span>Sorry, no info</span>;
  };

  MapPlace = mapState => {
    //for preloader
    console.log("start loading");

    return (
      <YMaps>
        <Map defaultState={mapState} onLoad={this.readyMap}>
          <Placemark geometry={mapState.center} />
        </Map>
      </YMaps>
    );
  };

  checkLocation = (mapState, location) => {
    if (!Array.isArray(location)) {
      mapState.center = false;
      throw TypeError("location is not array");
    } else if (!location.length === 2) {
      mapState.center = false;
      throw TypeError("location incorrect data");
    }
  };

  render() {
    const { location, zoom } = this.props;

    const mapState = {
      center: location,
      zoom: zoom || 10,
    };

    this.checkLocation(mapState, location);

    return mapState.center ? this.MapPlace(mapState) : this.ErrMap();
  }
}

export default MapEvent;
