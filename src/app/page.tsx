"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";
import AuthForm from "@/components/AuthForm";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });
const CreateEventModal = dynamic(
  () => import("@/components/CreateEventModal"),
  { ssr: false }
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
  const [filter, setFilter] = useState({
    lat: "",
    lng: "",
    radius: "10000",
    title: "",
    startDate: "",
    endDate: "",
    myEvents: false,
    sort: "date-asc",
  });
  const [user, setUser] = useState<{ token: string; email: string } | null>(
    null
  );
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);

  const calculateDistance = (
    lat1: number,
    lng1: number,
    lat2: number,
    lng2: number
  ): number => {
    const R = 6371;
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c * 1000; // В метрах
  };

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

        data = data.sort((a: Event, b: Event) => {
          if (filter.sort === "distance-asc" && filter.lat && filter.lng) {
            const lat = parseFloat(filter.lat);
            const lng = parseFloat(filter.lng);
            if (!a.location || !b.location) return 0;
            const matchA = a.location.match(/POINT\(([^ ]+) ([^)]+)\)/);
            const matchB = b.location.match(/POINT\(([^ ]+) ([^)]+)\)/);
            if (!matchA || !matchB) return 0;
            const eventLatA = parseFloat(matchA[2]);
            const eventLngA = parseFloat(matchA[1]);
            const eventLatB = parseFloat(matchB[2]);
            const eventLngB = parseFloat(matchB[1]);
            const distA = calculateDistance(lat, lng, eventLatA, eventLngA);
            const distB = calculateDistance(lat, lng, eventLatB, eventLngB);
            return distA - distB;
          }
          const dateA = new Date(a.event_date).getTime();
          const dateB = new Date(b.event_date).getTime();
          return filter.sort === "date-asc" ? dateA - dateB : dateB - dateA;
        });

        setEvents(data);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError("Error fetching events");
        toast.error("Failed to fetch events");
      }
    }
    fetchEvents();
  }, [filter, user]);

  const handleCreateEvent = async (event: {
    title: string;
    event_date: string;
    description: string;
    location: string;
  }) => {
    if (!user) {
      setError("Please log in to create events");
      toast.error("Please log in to create events");
      return;
    }
    try {
      console.log("<====create event data====>", event);
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify(event),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create event");
      }
      const newEvent = await response.json();
      setEvents(
        [...events, newEvent].sort((a, b) => {
          if (filter.sort === "distance-asc" && filter.lat && filter.lng) {
            const lat = parseFloat(filter.lat);
            const lng = parseFloat(filter.lng);
            if (!a.location || !b.location) return 0;
            const matchA = a.location.match(/POINT\(([^ ]+) ([^)]+)\)/);
            const matchB = b.location.match(/POINT\(([^ ]+) ([^)]+)\)/);
            if (!matchA || !matchB) return 0;
            const eventLatA = parseFloat(matchA[2]);
            const eventLngA = parseFloat(matchA[1]);
            const eventLatB = parseFloat(matchB[2]);
            const eventLngB = parseFloat(matchB[1]);
            const distA = calculateDistance(lat, lng, eventLatA, eventLngA);
            const distB = calculateDistance(lat, lng, eventLatB, eventLngB);
            return distA - distB;
          }
          const dateA = new Date(a.event_date).getTime();
          const dateB = new Date(b.event_date).getTime();
          return filter.sort === "date-asc" ? dateA - dateB : dateB - dateA;
        })
      );
      toast.success("Event created successfully!");
    } catch (err: any) {
      console.error("Create error:", err);
      setError(err.message || "Error creating event");
      throw err; // Пробрасываем ошибку для обработки в модале
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
            if (filter.sort === "distance-asc" && filter.lat && filter.lng) {
              const lat = parseFloat(filter.lat);
              const lng = parseFloat(filter.lng);
              if (!a.location || !b.location) return 0;
              const matchA = a.location.match(/POINT\(([^ ]+) ([^)]+)\)/);
              const matchB = b.location.match(/POINT\(([^ ]+) ([^)]+)\)/);
              if (!matchA || !matchB) return 0;
              const eventLatA = parseFloat(matchA[2]);
              const eventLngA = parseFloat(matchA[1]);
              const eventLatB = parseFloat(matchB[2]);
              const eventLngB = parseFloat(matchB[1]);
              const distA = calculateDistance(lat, lng, eventLatA, eventLngA);
              const distB = calculateDistance(lat, lng, eventLatB, eventLngB);
              return distA - distB;
            }
            const dateA = new Date(a.event_date).getTime();
            const dateB = new Date(b.event_date).getTime();
            return filter.sort === "date-asc" ? dateA - dateB : dateB - dateA;
          })
      );
      setEditingEvent(null);
      toast.success("Event updated successfully!");
    } catch (err: any) {
      console.error("Edit error:", err);
      setError(err.message || "Error updating event");
      toast.error(err.message || "Error updating event");
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
      toast.success("Event deleted successfully!");
    } catch (err: any) {
      console.error("Delete error:", err);
      setError(err.message || "Error deleting event");
      toast.error(err.message || "Error deleting event");
    }
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

  const handleRegister = async (email: string, password: string) => {
    try {
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
      toast.success("Registered successfully!");
    } catch (err: any) {
      console.error("Register error:", err);
      toast.error(err.message || "Registration failed");
    }
  };

  const handleLogin = async (email: string, password: string) => {
    try {
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
      toast.success("Logged in successfully!");
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(err.message || "Login failed");
    }
  };

  const handleLogout = () => {
    setUser(null);
    setFilter({ ...filter, myEvents: false });
    toast.success("Logged out successfully!");
  };

  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="p-5 font-sans">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <h1 className="text-2xl font-bold mb-5">Events</h1>

      {/* Авторизация */}
      {!user ? (
        <AuthForm onRegister={handleRegister} onLogin={handleLogin} />
      ) : (
        <div className="mb-5">
          <p className="mb-2">Logged in as: {user.email}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => setIsCreatingEvent(true)}
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Create Event
            </button>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        </div>
      )}

      {/* Модал создания события */}
      {isCreatingEvent && (
        <CreateEventModal
          onSave={handleCreateEvent}
          onClose={() => setIsCreatingEvent(false)}
        />
      )}

      {/* Модал редактирования */}
      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onSave={handleSaveEdit}
          onClose={() => setEditingEvent(null)}
        />
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
              <option value="date-asc">Date (Earliest First)</option>
              <option value="date-desc">Date (Latest First)</option>
              <option value="distance-asc">Nearest (By Distance)</option>
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
