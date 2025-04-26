"use client";

import { useState, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMap,
  useMapEvents,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Настройка иконок маркера (обязательно, иначе маркер не виден)
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

interface LocationPickerMapProps {
  onLocationSelect: (location: string) => void;
  initialLocation?: { lng: number; lat: number } | null;
}

function MapUpdater({ center }: { center: [number, number] | null }) {
  const map = useMap();
  useEffect(() => {
    if (center) {
      map.setView(center, 13);
    }
  }, [center, map]);
  return null;
}

function MapClickHandler({
  onClick,
}: {
  onClick: (lat: number, lng: number) => void;
}) {
  useMapEvents({
    click(e) {
      onClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

export default function LocationPickerMap({
  onLocationSelect,
  initialLocation,
}: LocationPickerMapProps) {
  const [position, setPosition] = useState<[number, number] | null>(null);

  useEffect(() => {
    if (initialLocation) {
      console.log("📍 Received initial location:", initialLocation);
      setPosition([initialLocation.lat, initialLocation.lng]);
    }
  }, [initialLocation]);

  const handleMapClick = (lat: number, lng: number) => {
    setPosition([lat, lng]);
    onLocationSelect(`POINT(${lng} ${lat})`);
  };

  const center: [number, number] = position || [51.505, -0.09];

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "200px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='© <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      <MapUpdater center={center} />
      <MapClickHandler onClick={handleMapClick} />
      {position && <Marker position={position} />}
    </MapContainer>
  );
}
