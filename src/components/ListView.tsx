import type { FoodPlace } from '../types';

interface ListViewProps {
  places: FoodPlace[];
  onSelect: (place: FoodPlace) => void;
}

export default function ListView({ places, onSelect }: ListViewProps) {
  if (places.length === 0) {
    return <p className="empty-state">No food places yet. Tap + to add one.</p>;
  }

  return (
    <ul className="list-view">
      {places.map((place) => (
        <li key={place.id} className="list-item" onClick={() => onSelect(place)}>
          <span className={`list-item__status ${place.visited ? 'is-visited' : ''}`}>
            {place.visited ? '✓' : '○'}
          </span>
          <span className="list-item__text">
            <span className="list-item__name">{place.name}</span>
            <span className="list-item__address">{place.address}</span>
          </span>
        </li>
      ))}
    </ul>
  );
}
