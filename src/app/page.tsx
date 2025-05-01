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
import ButtonTab from "@/components/ui/ButtonTab/ButtonTab";
import Tabs from "@/components/ui/Tabs/Tabs";
import InputCheck from "@/components/ui/InputCheck/InputCheck";
import EventCard from "@/components/EventCard/EventCard";

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
  { name: "Concert", value: "Concert" },
  { name: "Exhibition", value: "Exhibition" },
  { name: "Sports", value: "Sports" },
  { name: "Workshop", value: "Workshop" },
  { name: "Conference", value: "Conference" },
  { name: "Other", value: "Other" },
];
const ORDERS = [
  { name: "Date: Soonest First", value: "date-asc" },
  { name: "Date: Latest First", value: "date-desc" },
  { name: "Distance: Nearest First", value: "distance-asc" },
];

export default function Home() {
  const [events, setEvents] = useState<Event[]>([]);
  const [totalCount, setTotalCount] = useState(0);
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
  const refs = useRef<Array<HTMLButtonElement | null>>([]);

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

  const handleMapClick = (lat: number, lng: number) => {
    setFilter({
      ...filter,
      lat: lat.toString(),
      lng: lng.toString(),
      sort: "distance-asc",
    });
    toast.success("Location selected! Sorting events by distance.");
  };

  const fetchEvents = async () => {
    try {
      console.log("Fetching events with filter:", filter, "Page:", page);
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
      params.append("sortOrder", filter.sort);
      params.append("limit", eventsPerPage.toString());
      params.append("offset", ((page - 1) * eventsPerPage).toString());
      const headers: HeadersInit = {};
      if (filter.myEvents && user) {
        headers["Authorization"] = `Bearer ${user.token}`;
      }
      const response = await fetch(`/api/events?${params}`, { headers });
      if (!response.ok) throw new Error("Failed to fetch events");
      const { events: data, totalCount: count } = await response.json();
      console.log("<====Events fetched:====>", data, "Total count:", count);
      setEvents(data);
      setTotalCount(count);
    } catch (err: any) {
      console.error("Fetch error:", err);
      toast.error("Failed to fetch events");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (filter.sort === "distance-asc" && (!filter.lat || !filter.lng)) {
      toast.error("Please select a location on the map for distance sorting");
      setFilter({ ...filter, sort: "date-asc" });
    } else {
      fetchEvents();
    }
  }, [filter, user, page]);

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
    document.addEventListener("click", handleClickOutside);
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

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
      await fetchEvents(); // Перезапрашиваем события для синхронизации
      toast.success("Event created successfully!");
    } catch (err: any) {
      console.error("Create error:", err);
      toast.error(err.message || "Failed to create event");
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
      const updatedEvents = events.filter((e) => e.id !== id);
      setEvents(updatedEvents);
      setTotalCount(totalCount - 1); // Уменьшаем totalCount
      if (updatedEvents.length === 0 && page > 1) {
        setPage(1); // Сбрасываем на первую страницу
      } else {
        await fetchEvents(); // Перезапрашиваем события для синхронизации
      }
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

        {(filter.startDate ||
          filter.lat ||
          filter.lng ||
          filter.title ||
          filter.category) && (
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
            <ButtonTab refs={refs} name="Title:" />
            <div className="next-hidden">
              <div className="next-hidden__wrap">
                <Input
                  typeInput="text"
                  data="Title:"
                  name="title"
                  value={filter.title}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          </div>
          <div>
            <ButtonTab refs={refs} name="Category:" />
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
            <ButtonTab refs={refs} name="Start Date Interval:" />
            <div className="next-hidden">
              <div className="next-hidden__wrap">
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
                      date.toLocaleString("en-US", {
                        timeZone: "Europe/Berlin",
                      })
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
                <label className="block mb-1">
                  Time:
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
                  value={
                    filter.startDate?.split("T")[1]?.slice(0, 5) || "00:00"
                  }
                  disabled={!filter.startDate}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                    if (!filter.startDate) return;
                    const cleanedTime = e.target.value.trim();
                    if (/^\d{2}:\d{2}$/.test(cleanedTime)) {
                      const currentDate =
                        filter.startDate?.split("T")[0] ||
                        new Date()
                          .toLocaleString("en-US", {
                            timeZone: "Europe/Berlin",
                          })
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
          </div>
          <div>
            <ButtonTab refs={refs} name="End Date Interval:" />
            <div className="next-hidden">
              <div className="next-hidden__wrap">
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
                  selectedDate={
                    filter.endDate ? new Date(filter.endDate) : null
                  }
                  handleDateChange={(date: Date) => {
                    const berlinDate = new Date(
                      date.toLocaleString("en-US", {
                        timeZone: "Europe/Berlin",
                      })
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
                          .toLocaleString("en-US", {
                            timeZone: "Europe/Berlin",
                          })
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
          </div>
          <div>
            <ButtonTab refs={refs} name="Coordinates (optional):" />
            <div className="next-hidden">
              <div className="next-hidden__wrap">
                <p className="text-sm text-gray-600 mb-2">
                  Enter coordinates or click on the map to select a location
                </p>
                <div className="mt-4 w-full px-1">
                  <Input
                    typeInput="text"
                    data="Longitude:"
                    name="lng"
                    value={filter.lng}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="mt-4 w-full px-1">
                  <Input
                    typeInput="text"
                    data="Latitude:"
                    name="lat"
                    value={filter.lat}
                    onChange={handleFilterChange}
                  />
                </div>
                <div className="mt-6 w-full px-1 py-2">
                  <Input
                    typeInput="text"
                    data="Radius (meters):"
                    name="radius"
                    value={filter.radius}
                    onChange={handleFilterChange}
                  />
                </div>
              </div>
            </div>
          </div>
          <div>
            <ButtonTab refs={refs} name="Sort by:" />
            <div className="next-hidden">
              <div className="next-hidden__wrap">
                <Select
                  selectItems={ORDERS}
                  value={filter.sort}
                  onChange={handleFilterChange}
                  name="sort"
                />
              </div>
            </div>
          </div>
          {user && (
            <InputCheck
              type="checkbox"
              data="myEvents"
              value={filter.myEvents ? "true" : "false"}
              checkedValue="true"
              onChange={handleFilterChange}
            />
          )}
        </div>
      </div>

      <Map events={events} onMapClick={handleMapClick} />

      {events.length === 0 ? (
        <p>No events found</p>
      ) : (
        <>
          <ul className="space-y-4 mt-4">
            {events.map((event) => (
              <li key={event.id} className="">
                <EventCard
                  event={event}
                  user={user}
                  handleEdit={handleEdit}
                  handleDelete={handleDelete}
                  stopBodyScroll={stopBodyScroll}
                />
              </li>
            ))}
          </ul>
          {isLoading && <Loading />}
          <Pagination
            page={page}
            setPage={setPage}
            events={events}
            veterinarians
            eventsPerPage={eventsPerPage}
            totalCount={totalCount}
          />
        </>
      )}
    </div>
  );
}
