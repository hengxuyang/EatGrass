import { useState, type FormEvent } from 'react';
import type { FoodPlace } from '../types';
import { geocodeAddress } from '../geocode';

const TYPE_SUGGESTIONS = ['Restaurant', 'Hawker', 'Cafe', 'Bar', 'Dessert', 'Bakery', 'Street Food'];

interface PlaceFormProps {
  initial?: FoodPlace;
  onCancel: () => void;
  onSave: (data: { name: string; address: string; type: string; notes: string; link: string; latitude: number; longitude: number }) => void;
}

export default function PlaceForm({ initial, onCancel, onSave }: PlaceFormProps) {
  const [name, setName] = useState(initial?.name ?? '');
  const [address, setAddress] = useState(initial?.address ?? '');
  const [type, setType] = useState(initial?.type ?? '');
  const [notes, setNotes] = useState(initial?.notes ?? '');
  const [link, setLink] = useState(initial?.link ?? '');
  const [status, setStatus] = useState<'idle' | 'locating' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !address.trim()) return;

    setStatus('locating');
    setErrorMessage('');
    try {
      let latitude = initial?.latitude;
      let longitude = initial?.longitude;

      if (!initial || initial.address !== address) {
        const result = await geocodeAddress(address);
        if (!result) {
          setStatus('error');
          setErrorMessage("Couldn't find that location in Singapore. Try a more specific address.");
          return;
        }
        latitude = result.latitude;
        longitude = result.longitude;
      }

      onSave({
        name: name.trim(),
        address: address.trim(),
        type: type.trim(),
        notes: notes.trim(),
        link: link.trim(),
        latitude: latitude!,
        longitude: longitude!,
      });
    } catch {
      setStatus('error');
      setErrorMessage('Something went wrong while locating that address. Please try again.');
    }
  }

  return (
    <div className="modal-backdrop" onClick={onCancel}>
      <form className="modal" onClick={(e) => e.stopPropagation()} onSubmit={handleSubmit}>
        <h2>{initial ? 'Edit Food Place' : 'Add Food Place'}</h2>

        <label>
          Name
          <input value={name} onChange={(e) => setName(e.target.value)} placeholder="The Coconut Club" required autoFocus />
        </label>

        <label>
          Location / Address
          <input value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Beach Road" required />
        </label>

        <label>
          Type
          <input value={type} onChange={(e) => setType(e.target.value)} placeholder="Restaurant" list="type-suggestions" />
          <datalist id="type-suggestions">
            {TYPE_SUGGESTIONS.map((t) => (
              <option key={t} value={t} />
            ))}
          </datalist>
        </label>

        <label>
          Notes
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Want to try their nasi lemak" rows={2} />
        </label>

        <label>
          Link
          <input value={link} onChange={(e) => setLink(e.target.value)} placeholder="Google Maps URL" type="url" />
        </label>

        {status === 'error' && <p className="form-error">{errorMessage}</p>}

        <div className="modal-actions">
          <button type="button" className="btn-secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn-primary" disabled={status === 'locating'}>
            {status === 'locating' ? 'Locating…' : 'Save'}
          </button>
        </div>
      </form>
    </div>
  );
}
