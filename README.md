# My Singapore Food Map 🍜

A personal web app for tracking food places to visit in Singapore. Add a spot, see it on a map, and check it off once you've been.

Built for personal use — fast to add a place, simple to browse, no accounts or sign-up required.

## Features

- **Interactive map** — Singapore-focused map (OpenStreetMap/Leaflet) with every saved place shown as a pin
- **Quick add** — save a place by name, address, type, notes, and an optional link; the address is automatically geocoded and dropped onto the map
- **Details view** — tap a pin or list entry to see the full details, open it in Google Maps, edit it, or delete it
- **Visited tracking** — mark a place as visited; visited and want-to-go pins are shown in different colors, with a filter to hide visited spots
- **List view** — browse all saved places as a simple list, with search across name/address/type
- **Local persistence** — data is saved to the browser's local storage; no backend, database, or account needed

## Tech Stack

- [React](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/) for tooling and dev server
- [Leaflet](https://leafletjs.com/) / [react-leaflet](https://react-leaflet.js.org/) for the map, tiles via [OpenStreetMap](https://www.openstreetmap.org/)
- [Nominatim](https://nominatim.org/) for free address geocoding
- Browser `localStorage` for data persistence

No API keys or backend services are required.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) 18 or later

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Then open the printed local URL (typically `http://localhost:5173`) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## Usage

1. Open the app — it loads centered on Singapore.
2. Tap **+** to add a food place: enter a name, address, type, and any notes.
3. The place is geocoded and appears as a pin on the map.
4. Tap a pin (or a row in **List** view) to view details, open it in Google Maps, mark it as visited, edit it, or delete it.
5. Use the search box and "Show visited" filter to narrow down the map or list.

## Data

Each saved place is stored as:

```json
{
  "name": "The Coconut Club",
  "address": "Beach Road, Singapore",
  "latitude": 1.30,
  "longitude": 103.86,
  "type": "Restaurant",
  "notes": "Want to try their nasi lemak",
  "link": "Google Maps URL",
  "visited": false
}
```

All data lives in the browser's `localStorage` under the `eatgrass.places` key. Clearing your browser storage for this site will remove your saved places.

## Project Scope

This is a lightweight personal tool, not a multi-user product. Deliberately out of scope for now: user accounts, social/sharing features, reviews and ratings, AI recommendations, notifications, and support for locations outside Singapore.
