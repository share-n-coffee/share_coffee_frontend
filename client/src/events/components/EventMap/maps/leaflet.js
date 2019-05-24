import React from "react";
import { Map as LeafletMap, TileLayer, Marker } from "react-leaflet";
import L from "leaflet";
import marker from "../../../../assets/img/marker-icon.png";

function Leaflet(mapState, callback) {
  const myIcon = L.icon({
    iconUrl: marker,
    iconSize: [30, 60],
    iconAnchor: [30, 60],
    shadowSize: [0, 0],
  });

  return (
    <div onLoad={callback}>
      <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/leaflet/1.3.1/leaflet.css" />
      <LeafletMap center={mapState.center} zoom={mapState.zoom} className="map__container">
        <TileLayer url="http://{s}.tile.osm.org/{z}/{x}/{y}.png" />
        <Marker position={mapState.center} icon={myIcon} />
      </LeafletMap>
    </div>
  );
}

export default Leaflet;
