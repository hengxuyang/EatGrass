import { MapContainer, Marker, TileLayer, useMap } from 'react-leaflet';
import L from 'leaflet';
import { useEffect } from 'react';
import type { FoodPlace } from '../types';

const SINGAPORE_CENTER: [number, number] = [1.3521, 103.8198];

function pinIcon(color: string) {
  return L.divIcon({
    className: 'food-pin',
    html: `<span class="food-pin__dot" style="background:${color}"></span>`,
    iconSize: [18, 18],
    iconAnchor: [9, 9],
    popupAnchor: [0, -10],
  });
}

const wantToGoIcon = pinIcon('#ff6b35');
const visitedIcon = pinIcon('#2e8b57');

function FlyToPlace({ place }: { place: FoodPlace | null }) {
  const map = useMap();
  useEffect(() => {
    if (place) {
      map.flyTo([place.latitude, place.longitude], Math.max(map.getZoom(), 15), { duration: 0.6 });
    }
  }, [place, map]);
  return null;
}

interface MapViewProps {
  places: FoodPlace[];
  onSelect: (place: FoodPlace) => void;
  flyToPlace: FoodPlace | null;
}

export default function MapView({ places, onSelect, flyToPlace }: MapViewProps) {
  return (
    <MapContainer center={SINGAPORE_CENTER} zoom={12} className="map-container">
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <FlyToPlace place={flyToPlace} />
      {places.map((place) => (
        <Marker
          key={place.id}
          position={[place.latitude, place.longitude]}
          icon={place.visited ? visitedIcon : wantToGoIcon}
          eventHandlers={{ click: () => onSelect(place) }}
        />
      ))}
    </MapContainer>
  );
}
