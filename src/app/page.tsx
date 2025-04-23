"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });
const LocationPickerMap = dynamic(
  () => import("@/components/LocationPickerMap"),
  {
    ssr: false,
  }
);

interface Event {
  id: number;
  title: string;
  event_date: string;
  description: string | null;
  location: string | null;
}

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    title: "",
    event_date: "",
    description: "",
    location: "",
    address: "",
  });
  const [filter, setFilter] = useState({
    lat: "",
    lng: "",
    radius: "10000",
  });

  useEffect(() => {
    async function fetchEvents() {
      try {
        console.log("Fetching events...");
        const params = new URLSearchParams();
        if (filter.lat) params.append("lat", filter.lat);
        if (filter.lng) params.append("lng", filter.lng);
        if (filter.radius) params.append("radius", filter.radius);
        const response = await fetch(`/api/events?${params}`);
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        console.log("Events fetched:", data);
        setEvents(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error fetching events");
      }
    }
    fetchEvents();
  }, [filter]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("<====form data====>", form);
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: form.title,
          event_date: form.event_date,
          description: form.description,
          location: form.location,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create event");
      }
      const newEvent = await response.json();
      setEvents([...events, newEvent]);
      setForm({
        title: "",
        event_date: "",
        description: "",
        location: "",
        address: "",
      });
    } catch (err: any) {
      console.error("Submit error:", err);
      setError(err.message || "Error creating event");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("<====input change====>", {
      name: e.target.name,
      value: e.target.value,
    });
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  const handleLocationSelect = (location: string) => {
    console.log("<====location selected====>", location);
    setForm({ ...form, location, address: "" });
  };

  const handleAddressSearch = async () => {
    if (!form.address) return;
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          form.address
        )}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        const location = `POINT(${lon} ${lat})`;
        setForm({ ...form, location, address: form.address });
      } else {
        setError("Address not found");
      }
    } catch (err) {
      console.error("Geocode error:", err);
      setError("Failed to geocode address");
    }
  };

  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Events</h1>

      {/* Фильтр */}
      <div style={{ marginBottom: "20px" }}>
        <h2>Filter Events by Location</h2>
        <div>
          <label>Latitude:</label>
          <input
            type="text"
            name="lat"
            value={filter.lat}
            onChange={handleFilterChange}
            placeholder="e.g., 48.8566"
          />
        </div>
        <div>
          <label>Longitude:</label>
          <input
            type="text"
            name="lng"
            value={filter.lng}
            onChange={handleFilterChange}
            placeholder="e.g., 2.3522"
          />
        </div>
        <div>
          <label>Radius (meters):</label>
          <input
            type="text"
            name="radius"
            value={filter.radius}
            onChange={handleFilterChange}
            placeholder="e.g., 10000"
          />
        </div>
      </div>

      {/* Форма */}
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Date:</label>
          <input
            type="datetime-local"
            name="event_date"
            value={form.event_date}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Location (enter address or click on map):</label>
          <input
            type="text"
            name="address"
            value={form.address}
            onChange={handleChange}
            placeholder="e.g., Eiffel Tower, Paris"
          />
          <button
            type="button"
            onClick={handleAddressSearch}
            style={{ marginLeft: "10px" }}
          >
            Find Address
          </button>
          <input
            type="text"
            name="location"
            value={form.location}
            readOnly
            placeholder="Coordinates will appear here"
          />
          <LocationPickerMap onLocationSelect={handleLocationSelect} />
        </div>
        <button type="submit">Add Event</button>
      </form>

      {/* Карта событий */}
      <Map events={events} />

      {/* Список событий */}
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul>
          {events.map((event) => (
            <li key={event.id}>
              <h2>{event.title}</h2>
              <p>Date: {new Date(event.event_date).toLocaleString()}</p>
              <p>Description: {event.description || "None"}</p>
              <p>Location: {event.location || "Unknown"}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
