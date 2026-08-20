import { useMemo, useState } from 'react';
import 'leaflet/dist/leaflet.css';
import './App.css';
import type { FoodPlace } from './types';
import { loadPlaces, savePlaces, makeId } from './storage';
import Header from './components/Header';
import MapView from './components/MapView';
import ListView from './components/ListView';
import PlaceForm from './components/PlaceForm';
import PlaceDetails from './components/PlaceDetails';

type View = 'map' | 'list';

export default function App() {
  const [places, setPlaces] = useState<FoodPlace[]>(() => loadPlaces());
  const [view, setView] = useState<View>('map');
  const [search, setSearch] = useState('');
  const [showVisited, setShowVisited] = useState(true);
  const [selected, setSelected] = useState<FoodPlace | null>(null);
  const [editing, setEditing] = useState<FoodPlace | null>(null);
  const [showForm, setShowForm] = useState(false);

  function persist(next: FoodPlace[]) {
    setPlaces(next);
    savePlaces(next);
  }

  function handleSaveNew(data: Omit<FoodPlace, 'id' | 'visited' | 'createdAt'>) {
    const place: FoodPlace = { ...data, id: makeId(), visited: false, createdAt: Date.now() };
    persist([...places, place]);
    setShowForm(false);
  }

  function handleSaveEdit(id: string, data: Omit<FoodPlace, 'id' | 'visited' | 'createdAt'>) {
    persist(places.map((p) => (p.id === id ? { ...p, ...data } : p)));
    setEditing(null);
    setShowForm(false);
    setSelected((current) => (current && current.id === id ? { ...current, ...data } : current));
  }

  function handleToggleVisited(place: FoodPlace) {
    const updated = { ...place, visited: !place.visited };
    persist(places.map((p) => (p.id === place.id ? updated : p)));
    setSelected(updated);
  }

  function handleDelete(place: FoodPlace) {
    if (!confirm(`Delete "${place.name}"?`)) return;
    persist(places.filter((p) => p.id !== place.id));
    setSelected(null);
  }

  const filteredPlaces = useMemo(() => {
    const query = search.trim().toLowerCase();
    return places.filter((p) => {
      if (!showVisited && p.visited) return false;
      if (!query) return true;
      return (
        p.name.toLowerCase().includes(query) ||
        p.address.toLowerCase().includes(query) ||
        p.type.toLowerCase().includes(query)
      );
    });
  }, [places, search, showVisited]);

  return (
    <div className="app">
      <Header
        search={search}
        onSearchChange={setSearch}
        showVisited={showVisited}
        onToggleShowVisited={() => setShowVisited((v) => !v)}
        onAdd={() => {
          setEditing(null);
          setShowForm(true);
        }}
      />

      <main className="app-main">
        {view === 'map' ? (
          <MapView places={filteredPlaces} onSelect={setSelected} flyToPlace={selected} />
        ) : (
          <ListView places={filteredPlaces} onSelect={setSelected} />
        )}
      </main>

      <nav className="view-toggle">
        <button className={view === 'map' ? 'is-active' : ''} onClick={() => setView('map')}>
          Map
        </button>
        <button className={view === 'list' ? 'is-active' : ''} onClick={() => setView('list')}>
          List
        </button>
      </nav>

      {showForm && (
        <PlaceForm
          initial={editing ?? undefined}
          onCancel={() => {
            setShowForm(false);
            setEditing(null);
          }}
          onSave={(data) => {
            if (editing) {
              handleSaveEdit(editing.id, data);
            } else {
              handleSaveNew(data);
            }
          }}
        />
      )}

      {selected && !showForm && (
        <PlaceDetails
          place={selected}
          onClose={() => setSelected(null)}
          onToggleVisited={handleToggleVisited}
          onEdit={(place) => {
            setEditing(place);
            setShowForm(true);
          }}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
