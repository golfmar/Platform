"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

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

export default function LocationPickerMap({
  onLocationSelect,
  initialLocation,
}: LocationPickerMapProps) {
  const [position, setPosition] = useState<[number, number] | null>(
    initialLocation ? [initialLocation.lat, initialLocation.lng] : null
  );

  const handleMapClick = (e: any) => {
    const { lat, lng } = e.latlng;
    setPosition([lat, lng]);
    onLocationSelect(`POINT(${lng} ${lat})`);
  };

  const center: [number, number] = initialLocation
    ? [initialLocation.lat, initialLocation.lng]
    : [51.505, -0.09]; // Дефолтный центр (Лондон)

  return (
    <MapContainer
      center={center}
      zoom={13}
      style={{ height: "200px", width: "100%" }}
      onClick={handleMapClick}
    >
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <MapUpdater center={position || center} />
      {position && <Marker position={position} />}
    </MapContainer>
  );
}
