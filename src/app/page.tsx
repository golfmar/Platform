"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AuthForm from "@/components/AuthForm";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });
const LocationPickerMap = dynamic(
  () => import("@/components/LocationPickerMap"),
  {
    ssr: false,
  }
);
const EditEventModal = dynamic(() => import("@/components/EditEventModal"), {
  ssr: false,
});

interface Event {
  id: number;
  title: string;
  event_date: string;
  description: string | null;
  location: string | null;
  organizer_email: string;
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
    title: "",
    startDate: "",
    endDate: "",
    myEvents: false,
    sort: "date-asc", // Новое поле для сортировки
  });
  const [user, setUser] = useState<{ token: string; email: string } | null>(
    null
  );
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);

  useEffect(() => {
    async function fetchEvents() {
      try {
        console.log("Fetching events...");
        const params = new URLSearchParams();
        if (filter.lat) params.append("lat", filter.lat);
        if (filter.lng) params.append("lng", filter.lng);
        if (filter.radius) params.append("radius", filter.radius);
        if (filter.title) params.append("title", filter.title);
        if (filter.startDate) params.append("startDate", filter.startDate);
        if (filter.endDate) params.append("endDate", filter.endDate);
        if (filter.myEvents) params.append("myEvents", "true");
        const headers: HeadersInit = {};
        if (filter.myEvents && user) {
          headers["Authorization"] = `Bearer ${user.token}`;
        }
        const response = await fetch(`/api/events?${params}`, { headers });
        if (!response.ok) throw new Error("Failed to fetch events");
        let data = await response.json();
        console.log("Events fetched:", data);

        // Сортировка событий
        data = data.sort((a: Event, b: Event) => {
          const dateA = new Date(a.event_date).getTime();
          const dateB = new Date(b.event_date).getTime();
          return filter.sort === "date-asc" ? dateA - dateB : dateB - dateA;
        });

        setEvents(data);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("Error fetching events");
      }
    }
    fetchEvents();
  }, [filter, user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setError("Please log in to create events");
      return;
    }
    try {
      console.log("<====form data====>", form);
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
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
      setEvents(
        [...events, newEvent].sort((a, b) => {
          const dateA = new Date(a.event_date).getTime();
          const dateB = new Date(b.event_date).getTime();
          return filter.sort === "date-asc" ? dateA - dateB : dateB - dateA;
        })
      );
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

  const handleEdit = (event: Event) => {
    setEditingEvent(event);
  };

  const handleSaveEdit = async (updatedEvent: {
    id: number;
    title: string;
    event_date: string;
    description: string;
    location: string;
  }) => {
    if (!user) return;
    try {
      const response = await fetch("/api/events", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(updatedEvent),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update event");
      }
      const savedEvent = await response.json();
      setEvents(
        events
          .map((e) => (e.id === savedEvent.id ? savedEvent : e))
          .sort((a, b) => {
            const dateA = new Date(a.event_date).getTime();
            const dateB = new Date(b.event_date).getTime();
            return filter.sort === "date-asc" ? dateA - dateB : dateB - dateA;
          })
      );
      setEditingEvent(null);
    } catch (err: any) {
      console.error("Edit error:", err);
      setError(err.message || "Error updating event");
    }
  };

  const handleDelete = async (id: number) => {
    if (!user) return;
    try {
      const response = await fetch("/api/events", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({ id }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to delete event");
      }
      setEvents(events.filter((e) => e.id !== id));
    } catch (err: any) {
      console.error("Delete error:", err);
      setError(err.message || "Error deleting event");
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

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFilter({
      ...filter,
      [name]: type === "checkbox" ? checked : value,
    });
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

  const handleLocationSelect = (location: string) => {
    console.log("<====location selected====>", location);
    setForm({ ...form, location, address: "" });
  };

  const handleRegister = async (email: string, password: string) => {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, action: "register" }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Registration failed");
    }
    const { token } = await response.json();
    setUser({ token, email });
  };

  const handleLogin = async (email: string, password: string) => {
    const response = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, action: "login" }),
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Login failed");
    }
    const { token } = await response.json();
    setUser({ token, email });
  };

  const handleLogout = () => {
    setUser(null);
    setFilter({ ...filter, myEvents: false });
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-5 font-sans">
      <h1 className="text-2xl font-bold mb-5">Events</h1>

      {/* Авторизация */}
      {!user ? (
        <AuthForm onRegister={handleRegister} onLogin={handleLogin} />
      ) : (
        <div className="mb-5">
          <p className="mb-2">Logged in as: {user.email}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      )}

      {/* Фильтр */}
      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-3">Filter Events</h2>
        <div className="space-y-3">
          <div>
            <label className="block mb-1">Title:</label>
            <input
              type="text"
              name="title"
              value={filter.title}
              onChange={handleFilterChange}
              placeholder="e.g., Art"
              className="w-full max-w-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Start Date:</label>
            <input
              type="date"
              name="startDate"
              value={filter.startDate}
              onChange={handleFilterChange}
              className="w-full max-w-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">End Date:</label>
            <input
              type="date"
              name="endDate"
              value={filter.endDate}
              onChange={handleFilterChange}
              className="w-full max-w-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Latitude:</label>
            <input
              type="text"
              name="lat"
              value={filter.lat}
              onChange={handleFilterChange}
              placeholder="e.g., 48.8566"
              className="w-full max-w-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Longitude:</label>
            <input
              type="text"
              name="lng"
              value={filter.lng}
              onChange={handleFilterChange}
              placeholder="e.g., 2.3522"
              className="w-full max-w-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Radius (meters):</label>
            <input
              type="text"
              name="radius"
              value={filter.radius}
              onChange={handleFilterChange}
              placeholder="e.g., 10000"
              className="w-full max-w-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Sort by:</label>
            <select
              name="sort"
              value={filter.sort}
              onChange={handleFilterChange}
              className="w-full max-w-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="date-asc">Nearest (Date Ascending)</option>
              <option value="date-desc">Latest (Date Descending)</option>
            </select>
          </div>
          {user && (
            <div>
              <label className="flex items-center">
                <input
                  type="checkbox"
                  name="myEvents"
                  checked={filter.myEvents}
                  onChange={handleFilterChange}
                  className="mr-2 h-4 w-4 text-blue-500 focus:ring-blue-500 border-gray-300 rounded"
                />
                My Events Only
              </label>
            </div>
          )}
        </div>
      </div>

      {/* Форма */}
      {user && (
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="space-y-3">
            <div>
              <label className="block mb-1">Title:</label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                className="w-full max-w-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1">Date:</label>
              <input
                type="datetime-local"
                name="event_date"
                value={form.event_date}
                onChange={handleChange}
                required
                className="w-full max-w-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block mb-1">Description:</label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                className="w-full max-w-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
              />
            </div>
            <div>
              <label className="block mb-1">
                Location (enter address or click on map):
              </label>
              <div className="flex items-center">
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="e.g., Eiffel Tower, Paris"
                  className="w-full max-w-xs p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <button
                  type="button"
                  onClick={handleAddressSearch}
                  className="ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                  Find Address
                </button>
              </div>
              <input
                type="text"
                name="location"
                value={form.location}
                readOnly
                placeholder="Coordinates will appear here"
                className="w-full max-w-xs p-2 border border-gray-300 rounded mt-2 bg-gray-100 cursor-not-allowed"
              />
              <LocationPickerMap onLocationSelect={handleLocationSelect} />
            </div>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Add Event
            </button>
          </div>
        </form>
      )}

      {/* Модал редактирования */}
      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onSave={handleSaveEdit}
          onClose={() => setEditingEvent(null)}
        />
      )}

      {/* Карта событий */}
      <Map events={events} />

      {/* Список событий */}
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul className="space-y-4">
          {events.map((event) => (
            <li key={event.id} className="border-b pb-2">
              <h2 className="text-lg font-semibold">{event.title}</h2>
              <p>Date: {new Date(event.event_date).toLocaleString()}</p>
              <p>Description: {event.description || "None"}</p>
              <p>Location: {event.location || "Unknown"}</p>
              <p className="text-sm text-gray-600">
                Created by: {event.organizer_email}
              </p>
              {user && user.email === event.organizer_email && (
                <div className="mt-2 flex space-x-2">
                  <button
                    onClick={() => handleEdit(event)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
