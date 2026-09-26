import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import { DayItinerary, ItineraryStop } from '../types/itinerary';
import { Maximize2, MapPin, Navigation } from 'lucide-react';

interface RouteMapProps {
  itinerary: DayItinerary;
  selectedStopId?: string | null;
  onSelectStop: (stopId: string) => void;
  language: 'uk' | 'en';
}

export const RouteMap: React.FC<RouteMapProps> = ({
  itinerary,
  selectedStopId,
  onSelectStop,
  language,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<Map<string, L.Marker>>(new Map());
  const polylineRef = useRef<L.Polyline | null>(null);

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current) return;

    // Remove existing if any
    if (mapInstanceRef.current) {
      mapInstanceRef.current.remove();
      mapInstanceRef.current = null;
    }

    const map = L.map(mapContainerRef.current, {
      zoomControl: true,
      scrollWheelZoom: false,
    });

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
      maxZoom: 19,
    }).addTo(map);

    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Update Markers and Polyline when itinerary changes
  useEffect(() => {
    const map = mapInstanceRef.current;
    if (!map) return;

    // Clear old markers
    markersRef.current.forEach(m => m.remove());
    markersRef.current.clear();
    if (polylineRef.current) {
      polylineRef.current.remove();
      polylineRef.current = null;
    }

    const validStops = itinerary.stops.filter(
      s => s.coordinates && s.coordinates.lat !== 0 && s.coordinates.lng !== 0
    );

    if (validStops.length === 0) return;

    const latLngs: L.LatLngExpression[] = [];

    validStops.forEach((stop, index) => {
      const isSelected = selectedStopId === stop.id;
      const isVisited = !!stop.visited;
      const latLng: [number, number] = [stop.coordinates.lat, stop.coordinates.lng];
      latLngs.push(latLng);

      const html = `
        <div style="
          width: 32px;
          height: 32px;
          background: ${isVisited ? '#10b981' : isSelected ? '#f59e0b' : '#1c1917'};
          border: 2px solid white;
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 800;
          font-size: 13px;
          font-family: sans-serif;
          box-shadow: 0 4px 10px rgba(0,0,0,0.3);
          transform: ${isSelected ? 'scale(1.2)' : 'scale(1)'};
          transition: all 0.2s ease;
          cursor: pointer;
        ">
          ${isVisited ? '✓' : index + 1}
        </div>
      `;

      const customIcon = L.divIcon({
        className: 'custom-leaflet-marker',
        html,
        iconSize: [32, 32],
        iconAnchor: [16, 16],
      });

      const marker = L.marker(latLng, { icon: customIcon }).addTo(map);

      // Popup
      const popupContent = `
        <div style="font-family: sans-serif; font-size: 12px; line-height: 1.4;">
          <div style="font-weight: 800; color: #1c1917; margin-bottom: 2px;">
            ${index + 1}. ${stop.name}
          </div>
          <div style="color: #6b7280; font-size: 11px; margin-bottom: 4px;">
            🕒 ${stop.time} &bull; 💰 ${stop.estimatedCost > 0 ? `${stop.estimatedCost} ${itinerary.budgetBreakdown.currency}` : (language === 'uk' ? 'Безкоштовно' : 'Free')}
          </div>
          <p style="margin: 0; color: #374151;">${stop.description}</p>
        </div>
      `;
      marker.bindPopup(popupContent);

      marker.on('click', () => {
        onSelectStop(stop.id);
      });

      markersRef.current.set(stop.id, marker);
    });

    // Draw route connecting line
    if (latLngs.length > 1) {
      polylineRef.current = L.polyline(latLngs, {
        color: '#f59e0b',
        weight: 3.5,
        opacity: 0.8,
        dashArray: '6, 8',
      }).addTo(map);
    }

    // Fit bounds
    const bounds = L.latLngBounds(latLngs);
    map.fitBounds(bounds, { padding: [40, 40], maxZoom: 15 });

  }, [itinerary, selectedStopId, language, onSelectStop]);

  // Handle selected stop zoom
  useEffect(() => {
    if (!selectedStopId || !mapInstanceRef.current) return;
    const stop = itinerary.stops.find(s => s.id === selectedStopId);
    if (stop && stop.coordinates && stop.coordinates.lat !== 0) {
      mapInstanceRef.current.panTo([stop.coordinates.lat, stop.coordinates.lng], {
        animate: true,
      });
      const marker = markersRef.current.get(selectedStopId);
      if (marker) {
        marker.openPopup();
      }
    }
  }, [selectedStopId, itinerary]);

  const fitAll = () => {
    if (!mapInstanceRef.current) return;
    const validStops = itinerary.stops.filter(
      s => s.coordinates && s.coordinates.lat !== 0 && s.coordinates.lng !== 0
    );
    if (validStops.length === 0) return;
    const latLngs = validStops.map(s => [s.coordinates.lat, s.coordinates.lng] as [number, number]);
    mapInstanceRef.current.fitBounds(L.latLngBounds(latLngs), { padding: [40, 40] });
  };

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] rounded-3xl overflow-hidden shadow-xl shadow-stone-200/50 border border-stone-200/80 bg-stone-100">
      <div ref={mapContainerRef} className="w-full h-full z-0" />

      {/* Floating control pill */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-2 bg-stone-900/80 backdrop-blur-md px-3 py-1.5 rounded-xl border border-stone-700 text-xs font-semibold text-stone-200 shadow-md">
        <button
          onClick={fitAll}
          className="flex items-center gap-1.5 hover:text-amber-400 transition-colors cursor-pointer"
          title={language === 'uk' ? 'Показати весь маршрут' : 'Fit entire route'}
        >
          <Navigation className="w-3.5 h-3.5 text-amber-400" />
          <span>{language === 'uk' ? 'Весь маршрут' : 'Fit route'}</span>
        </button>
      </div>

      {/* Floating city & stops count badge */}
      <div className="absolute bottom-4 left-4 z-10 bg-white/90 backdrop-blur-md px-3.5 py-2 rounded-2xl border border-stone-200 shadow-lg text-xs font-bold text-stone-800 flex items-center gap-2">
        <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
        <span>
          {itinerary.city} &bull; {itinerary.stops.length} {language === 'uk' ? 'зупинок' : 'stops'}
        </span>
      </div>
    </div>
  );
};
