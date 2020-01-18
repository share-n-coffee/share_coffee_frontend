import React from "react";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import marker from "../../../../assets/img/marker-icon.png";

const Yandex = (mapState, callback) => {
  const myIcon = {
    iconLayout: "default#image",
    iconImageHref: marker,
    iconImageSize: [30, 60],
    iconImageOffset: [0, 0],
    iconContentOffset: [0, 0],
  };
  return (
    <YMaps>
      <Map defaultState={mapState} onLoad={callback} className="map__container">
        <Placemark geometry={mapState.center} options={myIcon} />
      </Map>
    </YMaps>
  );
};

export default Yandex;
