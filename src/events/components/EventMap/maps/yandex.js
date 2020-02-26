import React from "react";
import PropTypes from "prop-types";
import { YMaps, Map, Placemark } from "react-yandex-maps";
import marker from "../../../../assets/img/marker-icon.png";

const Yandex = (mapState, callback) => {
    const myIcon = {
        iconLayout: "default#image",
        iconImageHref: marker,
        iconImageSize: [30, 60],
        iconImageOffset: [0, 0],
        iconContentOffset: [0, 0]
    };
    return (
        <YMaps>
            <Map defaultState={mapState} onLoad={callback} className="map__container">
                <Placemark geometry={mapState.center} options={myIcon} />
            </Map>
        </YMaps>
    );
};

Yandex.propTypes = {
    mapState: PropTypes.object,
    callback: PropTypes.func
};

export default Yandex;
