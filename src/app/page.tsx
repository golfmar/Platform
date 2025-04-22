"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    async function fetchEvents() {
      try {
        const response = await fetch("/api/events");
        console.log("<====response====>", response);
        if (!response.ok) throw new Error("Failed to fetch events");
        const data = await response.json();
        setEvents(data);
      } catch (err) {
        setError("Error fetching events");
      }
    }
    fetchEvents();
  }, []);

  if (error) return <div>{error}</div>;

  return (
    <div>
      <h1>Events</h1>
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
