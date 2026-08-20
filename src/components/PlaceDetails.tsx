import type { FoodPlace } from '../types';

interface PlaceDetailsProps {
  place: FoodPlace;
  onClose: () => void;
  onToggleVisited: (place: FoodPlace) => void;
  onEdit: (place: FoodPlace) => void;
  onDelete: (place: FoodPlace) => void;
}

export default function PlaceDetails({ place, onClose, onToggleVisited, onEdit, onDelete }: PlaceDetailsProps) {
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${place.latitude},${place.longitude}`;

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal details-panel" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose} aria-label="Close">
          ×
        </button>

        <h2>{place.name}</h2>
        <p className="details-address">📍 {place.address}</p>
        {place.type && <p className="details-type">{place.type}</p>}
        {place.notes && <p className="details-notes">"{place.notes}"</p>}

        <div className="details-actions">
          <a className="btn-secondary" href={place.link || mapsUrl} target="_blank" rel="noreferrer">
            Open in Google Maps
          </a>
          <button className="btn-secondary" onClick={() => onToggleVisited(place)}>
            {place.visited ? 'Mark as Want to Go' : 'Mark as Visited'}
          </button>
          <button className="btn-secondary" onClick={() => onEdit(place)}>
            Edit
          </button>
          <button className="btn-danger" onClick={() => onDelete(place)}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
