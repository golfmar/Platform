"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";

// Динамический импорт Map
const Map = dynamic(() => import("@/components/Map"), { ssr: false });

// Динамический импорт LocationPickerMap
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
  });

  useEffect(() => {
    async function fetchEvents() {
      try {
        console.log("Fetching events...");
        const response = await fetch("/api/events");
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
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("<====form data====>", form);
    try {
      const response = await fetch("/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create event");
      }
      const newEvent = await response.json();
      setEvents([...events, newEvent]);
      setForm({ title: "", event_date: "", description: "", location: "" });
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

  const handleLocationSelect = (location: string) => {
    console.log("<====location selected====>", location);
    setForm({ ...form, location });
  };

  if (error) return <div>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1>Events</h1>

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
          <label>Location (click on map):</label>
          <input
            type="text"
            name="location"
            value={form.location}
            readOnly
            placeholder="Click on map to select"
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
