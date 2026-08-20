// Singapore bounding box, used to bias/restrict geocoding results.
const SG_VIEWBOX = '103.55,1.15,104.15,1.50';

export interface GeocodeResult {
  latitude: number;
  longitude: number;
  displayName: string;
}

export async function geocodeAddress(address: string): Promise<GeocodeResult | null> {
  const query = /singapore/i.test(address) ? address : `${address}, Singapore`;
  const url = new URL('https://nominatim.openstreetmap.org/search');
  url.searchParams.set('q', query);
  url.searchParams.set('format', 'json');
  url.searchParams.set('limit', '1');
  url.searchParams.set('countrycodes', 'sg');
  url.searchParams.set('viewbox', SG_VIEWBOX);
  url.searchParams.set('bounded', '1');

  const res = await fetch(url.toString());
  if (!res.ok) throw new Error('Geocoding request failed');

  const results = (await res.json()) as Array<{ lat: string; lon: string; display_name: string }>;
  if (results.length === 0) return null;

  const [first] = results;
  return {
    latitude: parseFloat(first.lat),
    longitude: parseFloat(first.lon),
    displayName: first.display_name,
  };
}
