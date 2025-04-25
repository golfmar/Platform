"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";

const LocationPickerMap = dynamic(() => import("./LocationPickerMap"), {
  ssr: false,
});

const CATEGORIES = [
  "Concert",
  "Exhibition",
  "Sports",
  "Workshop",
  "Conference",
  "Other",
];

interface EditEventModalProps {
  event: {
    id: number;
    title: string;
    event_date: string;
    description: string | null;
    location: string | null;
    category: string | null;
  };
  onSave: (event: {
    id: number;
    title: string;
    event_date: string;
    description: string;
    location: string;
    category: string;
  }) => Promise<void>;
  onClose: () => void;
}

export default function EditEventModal({
  event,
  onSave,
  onClose,
}: EditEventModalProps) {
  const [form, setForm] = useState({
    id: event.id,
    title: event.title,
    event_date: new Date(event.event_date).toISOString().slice(0, 16),
    description: event.description || "",
    location: event.location || "",
    address: "",
    category: event.category || "Other",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAddressSearch = async () => {
    if (!form.address) {
      toast.error("Please enter an address");
      return;
    }
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
        toast.error("Address not found");
      }
    } catch (err: any) {
      console.error("Geocode error:", err);
      toast.error("Failed to geocode address");
    }
  };

  const handleLocationSelect = (location: string) => {
    setForm({ ...form, location, address: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await onSave({
        id: form.id,
        title: form.title,
        event_date: form.event_date,
        description: form.description,
        location: form.location,
        category: form.category,
      });
    } catch (err: any) {
      toast.error(err.message || "Error saving event");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="block mb-1">Title:</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Category:</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Date:</label>
            <input
              type="datetime-local"
              name="event_date"
              value={form.event_date}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block mb-1">Description:</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
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
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              className="w-full p-2 border border-gray-300 rounded mt-2 bg-gray-100 cursor-not-allowed"
            />
            <LocationPickerMap onLocationSelect={handleLocationSelect} />
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
