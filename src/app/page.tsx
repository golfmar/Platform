"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import AuthForm from "@/components/AuthForm";

// Динамическая загрузка компонентов карты
const Map = dynamic(() => import("@/components/Map"), { ssr: false });
const LocationPickerMap = dynamic(
  () => import("@/components/LocationPickerMap"),
  { ssr: false }
);

interface Event {
  id: number;
  title: string;
  event_date: string;
  description: string | null;
  location: string | null;
}

export default function Home() {
  // Состояние пользователя: token, email, username
  const [user, setUser] = useState<{
    token: string;
    email: string;
    username: string;
  } | null>(null);
  // Состояние событий
  const [events, setEvents] = useState<Event[]>([]);
  // Ошибки
  const [error, setError] = useState<string | null>(null);
  // Форма создания события
  const [form, setForm] = useState({
    title: "",
    event_date: "",
    description: "",
    location: "",
    address: "",
  });
  // Фильтр по радиусу
  const [filter, setFilter] = useState({
    lat: "",
    lng: "",
    radius: "10000",
  });

  // Загрузка событий при изменении фильтра
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

  // Обработка отправки формы события
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

  // Обработка изменений в форме
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    console.log("<====input change====>", {
      name: e.target.name,
      value: e.target.value,
    });
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Обработка изменений в фильтре
  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilter({ ...filter, [e.target.name]: e.target.value });
  };

  // Обработка выбора координат на карте
  const handleLocationSelect = (location: string) => {
    console.log("<====location selected====>", location);
    setForm({ ...form, location, address: "" });
  };

  // Поиск координат по адресу через Nominatim
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

  // Регистрация пользователя
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
      const { token, email: userEmail, username } = await response.json();
      console.log("<====auth response====>", {
        token,
        email: userEmail,
        username,
      });
      setUser({ token, email: userEmail, username });
    } catch (err: any) {
      console.error("Register error:", err);
      setError(err.message || "Registration failed");
    }
  };

  // Вход пользователя
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
      const { token, email: userEmail, username } = await response.json();
      console.log("<====auth response====>", {
        token,
        email: userEmail,
        username,
      });
      setUser({ token, email: userEmail, username });
    } catch (err: any) {
      console.error("Login error:", err);
      setError(err.message || "Login failed");
    }
  };

  // Выход пользователя
  const handleLogout = () => {
    setUser(null);
  };

  // Отображение ошибки
  if (error)
    return <div style={{ color: "red", padding: "20px" }}>{error}</div>;

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "24px", marginBottom: "20px" }}>Events</h1>

      {/* Авторизация или информация о пользователе */}
      {!user ? (
        <AuthForm onRegister={handleRegister} onLogin={handleLogin} />
      ) : (
        <div style={{ marginBottom: "20px" }}>
          <p style={{ fontSize: "16px" }}>
            Welcome, {user.username} ({user.email})
          </p>
          <button
            onClick={handleLogout}
            style={{
              marginLeft: "10px",
              padding: "5px 10px",
              background: "#ff4d4d",
              color: "white",
              border: "none",
              borderRadius: "4px",
            }}
          >
            Logout
          </button>
        </div>
      )}

      {/* Фильтр по радиусу */}
      <div style={{ marginBottom: "20px" }}>
        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
          Filter Events by Location
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Latitude:
            </label>
            <input
              type="text"
              name="lat"
              value={filter.lat}
              onChange={handleFilterChange}
              placeholder="e.g., 48.8566"
              style={{ padding: "5px", width: "200px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Longitude:
            </label>
            <input
              type="text"
              name="lng"
              value={filter.lng}
              onChange={handleFilterChange}
              placeholder="e.g., 2.3522"
              style={{ padding: "5px", width: "200px" }}
            />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: "5px" }}>
              Radius (meters):
            </label>
            <input
              type="text"
              name="radius"
              value={filter.radius}
              onChange={handleFilterChange}
              placeholder="e.g., 10000"
              style={{ padding: "5px", width: "200px" }}
            />
          </div>
        </div>
      </div>

      {/* Форма создания события (только для авторизованных) */}
      {user && (
        <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Title:
              </label>
              <input
                type="text"
                name="title"
                value={form.title}
                onChange={handleChange}
                required
                style={{ padding: "5px", width: "300px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Date:
              </label>
              <input
                type="datetime-local"
                name="event_date"
                value={form.event_date}
                onChange={handleChange}
                required
                style={{ padding: "5px", width: "300px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Description:
              </label>
              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                style={{ padding: "5px", width: "300px", height: "100px" }}
              />
            </div>
            <div>
              <label style={{ display: "block", marginBottom: "5px" }}>
                Location (enter address or click on map):
              </label>
              <div style={{ display: "flex", gap: "10px" }}>
                <input
                  type="text"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="e.g., Eiffel Tower, Paris"
                  style={{ padding: "5px", width: "300px" }}
                />
                <button
                  type="button"
                  onClick={handleAddressSearch}
                  style={{
                    padding: "5px 10px",
                    background: "#007bff",
                    color: "white",
                    border: "none",
                    borderRadius: "4px",
                  }}
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
                style={{ padding: "5px", width: "300px", marginTop: "10px" }}
              />
              <LocationPickerMap onLocationSelect={handleLocationSelect} />
            </div>
            <button
              type="submit"
              style={{
                padding: "5px 10px",
                background: "#28a745",
                color: "white",
                border: "none",
                borderRadius: "4px",
                marginTop: "10px",
              }}
            >
              Add Event
            </button>
          </div>
        </form>
      )}

      {/* Карта */}
      <Map events={events} />

      {/* Список событий */}
      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <ul style={{ listStyle: "none", padding: 0 }}>
          {events.map((event) => (
            <li
              key={event.id}
              style={{
                border: "1px solid #ddd",
                padding: "10px",
                marginBottom: "10px",
                borderRadius: "4px",
              }}
            >
              <h2 style={{ fontSize: "18px", margin: 0 }}>{event.title}</h2>
              <p style={{ margin: "5px 0" }}>
                Date: {new Date(event.event_date).toLocaleString()}
              </p>
              <p style={{ margin: "5px 0" }}>
                Description: {event.description || "None"}
              </p>
              <p style={{ margin: "5px 0" }}>
                Location: {event.location || "Unknown"}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
