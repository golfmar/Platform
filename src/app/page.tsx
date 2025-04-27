"use client";

import React, { useState, useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import toast, { Toaster } from "react-hot-toast";
import AuthForm from "@/components/AuthForm";
import Link from "next/link";
import Pagination from "@/components/Pagination";
import Loading from "@/components/Loading";
import Input from "@/components/ui/Input/Input";
import Select from "@/components/ui/Select/Select";
import Calendar from "@/components/ui/Calendar/Calendar";
import ClockUhr from "@/components/ui/ClockUhr/ClockUhr";
import ButtonTab from "@/components/ButtonTab";

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
  category: string | null;
  image_url: string | null;
}

const CATEGORIES = [
  "Concert",
  "Exhibition",
  "Sports",
  "Workshop",
  "Conference",
  "Other",
];

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const initialFilter = {
    lat: "",
    lng: "",
    radius: "10000",
    title: "",
    startDate: "",
    endDate: "",
    myEvents: false,
    sort: "date-asc",
    category: "",
  };
  const [filter, setFilter] = useState(initialFilter);

  const [user, setUser] = useState<{ token: string; email: string } | null>(
    null
  );
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const eventsPerPage = 5;
  const refs = useRef<(HTMLButtonElement | null)[]>([]);
  // const refItem = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    console.log("<===filter=====>", filter);
  }, [filter]);

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
    return R * c * 1000;
  };

  const stopBodyScroll = () => {
    document.body.style.overflow = "hidden";
  };
  const allowBodyScroll = () => {
    document.body.style.overflow = "auto";
  };

  const resetFilters = () => {
    setFilter({
      lat: "",
      lng: "",
      radius: "10000",
      title: "",
      startDate: "",
      endDate: "",
      myEvents: false,
      sort: "date-asc",
      category: "",
    });
    setPage(1);
  };

  useEffect(() => {
    async function fetchEvents() {
      try {
        console.log("Fetching events with filter:", filter);
        const params = new URLSearchParams();
        if (filter.lat) params.append("lat", filter.lat);
        if (filter.lng) params.append("lng", filter.lng);
        if (filter.radius) params.append("radius", filter.radius);
        if (filter.title) params.append("title", filter.title);
        if (filter.startDate) {
          const startDate = new Date(filter.startDate);
          const utcStartDate = startDate.toISOString();
          params.append("startDate", utcStartDate);
        }
        if (filter.endDate) {
          const endDate = new Date(filter.endDate);
          const utcEndDate = endDate.toISOString();
          params.append("endDate", utcEndDate);
        }
        if (filter.myEvents) params.append("myEvents", "true");
        params.append("category", filter.category || "");
        params.append("limit", eventsPerPage.toString());
        params.append("offset", ((page - 1) * eventsPerPage).toString());
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
        toast.error("Failed to fetch events");
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvents();
  }, [filter, user, page]);
  // ----------------------------------------
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      e.stopPropagation();

      if (
        e.target instanceof Node &&
        !e.target.closest(".button-tab") &&
        !e.target.closest(".next-hidden")
      ) {
        refs.current.forEach((btn) => {
          if (btn && btn.classList.contains("run")) {
            btn.classList.remove("run");
          }
        });
      }
    };

    // Добавляем обработчик события на документ
    document.addEventListener("click", handleClickOutside);

    // Убираем обработчик при размонтировании компонента
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  // ----------------------------------------
  const handleCreateEvent = async (formData: FormData) => {
    setIsLoading(true);
    if (!user) {
      toast.error("Please log in to create events");
      return;
    }
    try {
      stopBodyScroll();
      console.log("<====create event data====>", formData);
      const response = await fetch("/api/events", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${user.token}`,
          Accept: "application/json",
        },
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create event");
      }
      const newEvent = await response.json();
      setEvents([...events, newEvent].slice(0, eventsPerPage));
      toast.success("Event created successfully!");
    } catch (err: any) {
      console.error("Create error:", err);
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (event: Event) => {
    stopBodyScroll();
    setEditingEvent(event);
  };

  const handleSaveEdit = async (formData: FormData) => {
    if (!user) return;
    setIsLoading(true);
    try {
      const response = await fetch("/api/events", {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        body: formData,
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to update event");
      }
      const savedEvent = await response.json();
      setEvents(events.map((e) => (e.id === savedEvent.id ? savedEvent : e)));
      setEditingEvent(null);
      toast.success("Event updated successfully!");
    } catch (err: any) {
      console.error("Edit error:", err);
      toast.error(err.message || "Error updating event");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!user) return;
    setIsLoading(true);
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
      toast.error(err.message || "Error deleting event");
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    const newFilter = {
      ...filter,
      [name]: type === "checkbox" ? checked : value,
    };
    if (name === "startDate" || name === "endDate") {
      const start = newFilter.startDate ? new Date(newFilter.startDate) : null;
      const end = newFilter.endDate ? new Date(newFilter.endDate) : null;
      if (start && end && end < start) {
        toast.error("End date cannot be before start date");
        return;
      }
    }
    setFilter(newFilter);
    setPage(1);
  };

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
  }, []);

  const handleLogin = async (email: string, password: string) => {
    setIsLoading(true);
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
      const user = { token, email };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Logged in successfully!");
    } catch (err: any) {
      console.error("Login error:", err);
      toast.error(err.message || "Login failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (email: string, password: string) => {
    setIsLoading(true);
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
      const user = { token, email };
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      toast.success("Registered successfully!");
    } catch (err: any) {
      console.error("Register error:", err);
      toast.error(err.message || "Registration failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("user");
    setFilter({ ...filter, myEvents: false });
    toast.success("Logged out successfully!");
  };

  return (
    <div className="p-5 font-sans">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <h1 className="text-2xl font-bold mb-5">Events</h1>

      {!user ? (
        <AuthForm onRegister={handleRegister} onLogin={handleLogin} />
      ) : (
        <div className="mb-5">
          <p className="mb-2">Logged in as: {user.email}</p>
          <div className="flex space-x-2">
            <button
              onClick={() => {
                setIsCreatingEvent(true);
                stopBodyScroll();
              }}
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

      {isCreatingEvent && (
        <CreateEventModal
          onSave={handleCreateEvent}
          onClose={() => {
            allowBodyScroll();
            setIsCreatingEvent(false);
          }}
        />
      )}

      {editingEvent && (
        <EditEventModal
          event={editingEvent}
          onSave={handleSaveEdit}
          onClose={() => {
            setEditingEvent(null);
            allowBodyScroll();
          }}
        />
      )}

      <div className="mb-5">
        <h2 className="text-xl font-semibold mb-3">Filter Events</h2>

        {filter.startDate && (
          <div className="mb-3">
            <button
              onClick={resetFilters}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Reset Filters
            </button>
          </div>
        )}
        <div className="space-y-3">
          <div>
            <ButtonTab refs={refs} name="test" />
            <div className="next-hidden">
              <div className="next-hidden__wrap">
                <ButtonTab refs={refs} name="test1" />
                <div className="next-hidden">
                  <div className="next-hidden__wrap">
                    <ButtonTab refs={refs} name="test2" />
                    <div className="next-hidden">
                      <div className="next-hidden__wrap">test2 content</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <button
              type="button"
              data-name="title"
              ref={(el) => {
                if (el && !refs.current.includes(el)) {
                  refs.current.push(el);
                }
              }}
              onClick={(e) => {
                refs.current.forEach((btn) => {
                  if (btn?.dataset.name === "title") {
                    btn.classList.add("run");
                  } else if (btn) {
                    btn.classList.remove("run");
                  }
                });
              }}
            >
              Title:
            </button>
            <div className="next-hidden">
              <div className="next-hidden__wrap">
                <Input
                  typeInput="text"
                  data="e.g., Art"
                  name="title"
                  value={filter.title}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
          <div>
            <button
              type="button"
              data-name="category"
              ref={(el) => {
                if (el && !refs.current.includes(el)) {
                  refs.current.push(el);
                }
              }}
              onClick={(e) => {
                refs.current.forEach((btn) => {
                  if (btn?.dataset.name === "category") {
                    btn.classList.add("run");
                  } else if (btn) {
                    btn.classList.remove("run");
                  }
                });
              }}
            >
              Category:
            </button>
            <div className="next-hidden">
              <div className="next-hidden__wrap">
                <Select
                  selectItems={CATEGORIES}
                  value={filter.category}
                  onChange={handleFilterChange}
                  name="category"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="block mb-1">Start Date Interval:</label>
            <div>
              <label className="block mb-1">
                {filter.startDate && (
                  <span>
                    {new Date(filter.startDate).toLocaleString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                )}
              </label>
              <Calendar
                selectedDate={
                  filter.startDate ? new Date(filter.startDate) : null
                }
                handleDateChange={(date: Date) => {
                  const berlinDate = new Date(
                    date.toLocaleString("en-US", { timeZone: "Europe/Berlin" })
                  );
                  const year = berlinDate.getFullYear();
                  const month = String(berlinDate.getMonth() + 1).padStart(
                    2,
                    "0"
                  );
                  const day = String(berlinDate.getDate()).padStart(2, "0");
                  const formattedDate = `${year}-${month}-${day}`;
                  const currentTime =
                    filter.startDate?.split("T")[1] || "00:00:00";
                  const newStartDate = `${formattedDate}T${currentTime}`;
                  handleFilterChange({
                    target: { name: "startDate", value: newStartDate },
                  } as React.ChangeEvent<HTMLInputElement>);
                }}
              />
            </div>
            <div>
              <label className="block mb-1">
                Time:{" "}
                {filter.startDate && (
                  <span>
                    {new Date(filter.startDate).toLocaleTimeString("de-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                )}
              </label>
              <ClockUhr
                data="Time:"
                value={filter.startDate?.split("T")[1]?.slice(0, 5) || "00:00"}
                disabled={!filter.startDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!filter.startDate) return;
                  const cleanedTime = e.target.value.trim();
                  if (/^\d{2}:\d{2}$/.test(cleanedTime)) {
                    const currentDate =
                      filter.startDate?.split("T")[0] ||
                      new Date()
                        .toLocaleString("en-US", { timeZone: "Europe/Berlin" })
                        .split(",")[0]
                        .split("/")
                        .reverse()
                        .map((num) => num.padStart(2, "0"))
                        .join("-");
                    const newStartDate = `${currentDate}T${cleanedTime}:00`;
                    handleFilterChange({
                      target: { name: "startDate", value: newStartDate },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }
                }}
              />
            </div>
          </div>
          <div>
            <label className="block mb-1">End Date Interval:</label>
            <div>
              <label className="block mb-1">
                {filter.endDate && (
                  <span>
                    {new Date(filter.endDate).toLocaleString("de-DE", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                    })}
                  </span>
                )}
              </label>
              <Calendar
                selectedDate={filter.endDate ? new Date(filter.endDate) : null}
                handleDateChange={(date: Date) => {
                  const berlinDate = new Date(
                    date.toLocaleString("en-US", { timeZone: "Europe/Berlin" })
                  );
                  const year = berlinDate.getFullYear();
                  const month = String(berlinDate.getMonth() + 1).padStart(
                    2,
                    "0"
                  );
                  const day = String(berlinDate.getDate()).padStart(2, "0");
                  const formattedDate = `${year}-${month}-${day}`;
                  const currentTime =
                    filter.endDate?.split("T")[1] || "00:00:00";
                  const newEndDate = `${formattedDate}T${currentTime}`;
                  handleFilterChange({
                    target: { name: "endDate", value: newEndDate },
                  } as React.ChangeEvent<HTMLInputElement>);
                }}
              />
            </div>
            <div>
              <label className="block mb-1">
                Time:{" "}
                {filter.endDate && (
                  <span>
                    {new Date(filter.endDate).toLocaleTimeString("de-DE", {
                      hour: "2-digit",
                      minute: "2-digit",
                      hour12: false,
                    })}
                  </span>
                )}
              </label>
              <ClockUhr
                data="Time:"
                value={filter.endDate?.split("T")[1]?.slice(0, 5) || "00:00"}
                disabled={!filter.endDate}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  if (!filter.endDate) return;

                  const cleanedTime = e.target.value.trim();
                  if (/^\d{2}:\d{2}$/.test(cleanedTime)) {
                    const currentDate =
                      filter.endDate?.split("T")[0] ||
                      new Date()
                        .toLocaleString("en-US", { timeZone: "Europe/Berlin" })
                        .split(",")[0]
                        .split("/")
                        .reverse()
                        .map((num) => num.padStart(2, "0"))
                        .join("-");
                    const newEndDate = `${currentDate}T${cleanedTime}:00`;
                    handleFilterChange({
                      target: { name: "endDate", value: newEndDate },
                    } as React.ChangeEvent<HTMLInputElement>);
                  }
                }}
              />
            </div>
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

      <Map events={events} />

      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <>
          <ul className="space-y-4">
            {events.map((event) => (
              <li key={event.id} className="border-b pb-2">
                <div className="flex space-x-4">
                  {event.image_url && (
                    <img
                      src={event.image_url}
                      alt={event.title}
                      className="w-24 h-24 object-cover rounded"
                    />
                  )}
                  <div>
                    <h2 className="text-lg font-semibold">
                      <Link
                        href={`/events/${event.id}`}
                        className="text-blue-500 hover:underline"
                      >
                        {event.title}
                      </Link>
                    </h2>
                    <p>
                      Date and Time:{" "}
                      {new Date(event.event_date).toLocaleString("de-DE", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                      })}
                    </p>
                    <p>Category: {event.category || "None"}</p>
                    <p>Description: {event.description || "None"}</p>
                    <p>Location: {event.location || "Unknown"}</p>
                    <p className="text-sm text-gray-600">
                      Created by: {event.organizer_email}
                    </p>
                    {user && user.email === event.organizer_email && (
                      <div className="mt-2 flex space-x-2">
                        <button
                          onClick={() => {
                            stopBodyScroll();
                            handleEdit(event);
                          }}
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
                  </div>
                </div>
              </li>
            ))}
          </ul>
          {isLoading && <Loading />}
          <Pagination
            page={page}
            setPage={setPage}
            events={events}
            eventsPerPage={eventsPerPage}
          />
        </>
      )}
    </div>
  );
}
