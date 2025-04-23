"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Исправление иконки маркера
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface Event {
  id: number;
  title: string;
  event_date: string;
  description: string | null;
  location: string | null;
}

interface MapProps {
  events: Event[];
}

// Парсинг строки POINT(x y) в координаты [lat, lng]
const parsePoint = (point: string | null): [number, number] | null => {
  if (!point) {
    console.log("No location provided");
    return null;
  }
  // Регулярное выражение для POINT(x y)
  const match = point.match(/POINT\((-?\d+\.?\d*)\s(-?\d+\.?\d*)\)/);
  if (!match) {
    console.log("Invalid location format:", point);
    return null;
  }
  const lng = parseFloat(match[1]); // x = долгота
  const lat = parseFloat(match[2]); // y = широта
  console.log("Parsed coords:", { lat, lng });
  return [lat, lng]; // Leaflet: [lat, lng]
};

export default function Map({ events }: MapProps) {
  console.log("Events for map:", events);
  return (
    <MapContainer
      center={[48.8566, 2.3522]}
      zoom={10}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {events.map((event) => {
        const coords = parsePoint(event.location);
        if (!coords) return null;
        return (
          <Marker key={event.id} position={coords}>
            <Popup>
              <h3>{event.title}</h3>
              <p>Date: {new Date(event.event_date).toLocaleString()}</p>
              <p>Description: {event.description || "None"}</p>
            </Popup>
          </Marker>
        );
      })}
    </MapContainer>
  );
}
