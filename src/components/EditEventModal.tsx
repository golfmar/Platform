"use client";

import { useState, useMemo, useEffect } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import Input from "./ui/Input/Input";
import Select from "./ui/Select/Select";
import Calendar from "./ui/Calendar/Calendar";
import ClockUhr from "./ui/ClockUhr/ClockUhr";
import Image from "next/image";

const LocationPickerMap = dynamic(() => import("./LocationPickerMap"), {
  ssr: false,
});

const CATEGORIES = [
  { name: "Concert", value: "Concert" },
  { name: "Exhibition", value: "Exhibition" },
  { name: "Sports", value: "Sports" },
  { name: "Workshop", value: "Workshop" },
  { name: "Conference", value: "Conference" },
  { name: "Other", value: "Other" },
];

interface EditEventModalProps {
  event: {
    id: number;
    title: string;
    event_date: string;
    description: string | null;
    location: string | null;
    category: string | null;
    image_url: string | null;
  };
  onSave: (formData: FormData) => Promise<void>;
  onClose: () => void;
}

export default function EditEventModal({
  event,
  onSave,
  onClose,
}: EditEventModalProps) {
  const [form, setForm] = useState({
    title: event.title || "",
    event_date: "",
    event_time: "",
    description: event.description || "",
    location: event.location || "",
    address: "",
    category: event.category || "Other",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    event.image_url
  );
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (event) {
      // Парсим event_date с учетом локали Германии
      const eventDate = new Date(event.event_date);
      if (isNaN(eventDate.getTime())) {
        toast.error("Invalid event date format");
        return;
      }

      const tzDate = new Date(
        eventDate.toLocaleString("en-US", { timeZone: "Europe/Berlin" })
      );

      const year = tzDate.getFullYear();
      const month = String(tzDate.getMonth() + 1).padStart(2, "0");
      const day = String(tzDate.getDate()).padStart(2, "0");
      const hours = String(tzDate.getHours()).padStart(2, "0");
      const minutes = String(tzDate.getMinutes()).padStart(2, "0");

      const formattedDate = `${year}-${month}-${day}`;
      const formattedTime = `${hours}:${minutes}`;

      setForm({
        title: event.title || "",
        event_date: formattedDate,
        event_time: formattedTime,
        description: event.description || "",
        location: event.location || "",
        address: "",
        category: event.category || "Other",
      });
      setImagePreview(event.image_url);
    }
  }, [event]);

  const validateAndSetDate = (date: Date | null): Date => {
    if (!date || isNaN(date.getTime())) {
      toast.error("Invalid date selected");
      return new Date();
    }

    const now = new Date();
    const selected = new Date(date);
    selected.setHours(0, 0, 0, 0);
    const today = new Date(now);
    today.setHours(0, 0, 0, 0);

    if (selected < today) {
      toast.error("Date must be in the future!");
      return today;
    }
    return date;
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date | null) => {
    const validatedDate = validateAndSetDate(date);
    const tzDate = new Date(
      validatedDate.toLocaleString("en-US", { timeZone: "Europe/Berlin" })
    );

    const year = tzDate.getFullYear();
    const month = String(tzDate.getMonth() + 1).padStart(2, "0");
    const day = String(tzDate.getDate()).padStart(2, "0");

    const formattedDate = `${year}-${month}-${day}`;
    setForm((prevForm) => ({ ...prevForm, event_date: formattedDate }));
  };

  const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, event_time: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(event.image_url);
    }
  };

  const handleAddressSearch = async () => {
    if (!form.address) {
      toast.error("Please enter an address");
      return;
    }
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          form.address
        )}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon, display_name } = data[0];
        const location = `POINT(${lon} ${lat})`;
        setForm({ ...form, location, address: display_name });
        toast.success("Address found!");
      } else {
        toast.error("Address not found");
      }
    } catch (err: any) {
      toast.error("Error searching address");
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocationSelect = (location: string) => {
    setForm({ ...form, location, address: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Валидация обязательных полей
    if (!form.title) {
      toast.error("Title is required");
      return;
    }
    if (!form.event_date) {
      toast.error("Event date is required");
      return;
    }
    if (!form.event_time) {
      toast.error("Event time is required");
      return;
    }
    if (!form.location) {
      toast.error("Location is required");
      return;
    }
    if (!form.category) {
      toast.error("Category is required");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("id", String(event.id));
      formData.append("title", form.title);
      const eventDateTime = `${form.event_date}T${form.event_time}:00`;
      formData.append("event_date", eventDateTime);
      formData.append("description", form.description);
      formData.append("location", form.location);
      formData.append("category", form.category);
      if (imageFile) {
        formData.append("image", imageFile);
      }
      await onSave(formData);
      onClose();
    } catch (err: any) {
      if (err.message.includes("Token expired")) {
        toast.error(
          "Your authorization has expired. Please update your login credentials"
        );
      } else if (err.message.includes("Missing required fields")) {
        toast.error("Please fill in all required fields");
      } else {
        toast.error("Error updating event");
      }
    }
  };

  const parsedLocation = useMemo(() => {
    if (!form.location) return null;
    const match = form.location.match(/^POINT\((-?\d+\.?\d*) (-?\d+\.?\d*)\)$/);
    if (match) {
      return {
        lng: parseFloat(match[1]),
        lat: parseFloat(match[2]),
      };
    }
    return null;
  }, [form.location]);

  return (
    <div className="fixed top-0 left-0 inset-0 bg-[#000000e3] bg-opacity-50 z-5000 overflow-y-scroll">
      <div className="bg-white p-6 rounded-lg max-w-md w-full min-w-[70vw] m-auto my-6">
        <h2 className="text-xl font-semibold mb-4">Edit Event</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <Input
            id="title"
            typeInput="text"
            data="Title:"
            value={form.title}
            onChange={handleChange}
            name="title"
            required
          />
          <div>
            <label className="block mb-1">Category:</label>
            <Select
              selectItems={CATEGORIES}
              value={form.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1">
              Date: {form.event_date && <span>{form.event_date}</span>}
            </label>
            <Calendar
              handleDateChange={handleDateChange}
              selectedDate={form.event_date ? new Date(form.event_date) : null}
            />
          </div>
          <div>
            <label className="block mb-1">
              Time: {form.event_time && <span>{form.event_time}</span>}
            </label>
            <ClockUhr
              data="Time:"
              value={form.event_time}
              onChange={handleTimeChange}
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
            <label className="block mb-1">Image (optional):</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="imageInput"
            />
            <label htmlFor="imageInput" className="cursor-pointer">
              <div className="bg-gray-100 p-2 rounded text-center">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Preview"
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                ) : (
                  "Click to upload image"
                )}
              </div>
            </label>
          </div>
          <div>
            <label className="block mb-1">
              Location (enter address or pick on map):
            </label>
            <p className="text-sm text-gray-600 mb-1">
              Enter an address (e.g. "Brandenburg Gate, Berlin") and click
              "Search address", or pick a location on the map below.
            </p>
            <div className="flex items-center">
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="e.g. Brandenburg Gate, Berlin"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="button"
                onClick={handleAddressSearch}
                disabled={isSearching}
                className={`ml-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center ${
                  isSearching ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isSearching ? (
                  <svg
                    className="animate-spin h-5 w-5 mr-2 text-white"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
                    />
                  </svg>
                ) : null}
                Search address
              </button>
            </div>
            <input
              type="text"
              name="location"
              value={form.location}
              readOnly
              placeholder="Coordinates will appear here (e.g. POINT(13.37 52.51))"
              className="w-full p-2 border border-gray-300 rounded mt-2 bg-gray-100 cursor-not-allowed"
            />
            <LocationPickerMap
              onLocationSelect={handleLocationSelect}
              initialLocation={parsedLocation}
            />
          </div>
          <div className="flex justify-end mt-4">
            <button
              type="button"
              onClick={onClose}
              className="mr-2 px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
