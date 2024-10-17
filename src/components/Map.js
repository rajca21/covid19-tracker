import React from 'react';
import 'leaflet/dist/leaflet.css';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import { icon } from 'leaflet';

const ICON = icon({
  iconUrl: './marker.png',
  iconSize: [16, 16],
});

export default function Map({ countryMap }) {
  return (
    <MapContainer
      center={[countryMap.Lat, countryMap.Lon]}
      zoom={4}
      scrollWheelZoom={false}
      style={{ height: 200, width: '100%' }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
      />
      <Marker icon={ICON} position={[countryMap.Lat, countryMap.Lon]}>
        <Popup>{countryMap.Country}</Popup>
      </Marker>
    </MapContainer>
  );
}
