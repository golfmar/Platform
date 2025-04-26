"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import Input from "./ui/Input/Input";
import Select from "./ui/Select/Select";
import Calendar from "./ui/Calendar/Calendar";
import Image from "next/image";

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
    id: event.id,
    title: event.title,
    event_date: new Date(event.event_date)
      .toLocaleDateString("de-DE", {
        timeZone: "Europe/Berlin",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split(".")
      .reverse()
      .join("-"),
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
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleDateChange = (date: Date) => {
    const formattedDate = date
      .toLocaleDateString("de-DE", {
        timeZone: "Europe/Berlin",
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .split(".")
      .reverse()
      .join("-");
    setForm({ ...form, event_date: formattedDate });
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
        )}&addressdetails=1&limit=1`
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
      console.error("Geocode error:", err);
      toast.error("Error searching address");
    } finally {
      setIsSearching(false);
    }
  };

  const handleLocationSelect = (location: string) => {
    setForm({ ...form, location, address: "" });
  };

  const handleResetLocation = () => {
    setForm({ ...form, address: "", location: event.location || "" });
    toast.success("Location reset");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) {
      console.log("<====Submit blocked: already submitting====>");
      return;
    }
    setIsSubmitting(true);
    const submitId = Date.now();
    console.log(`<====handleSubmit called====> ID: ${submitId}`);
    try {
      if (!form.title) {
        toast.error("Title is required");
        return;
      }
      if (!form.event_date) {
        toast.error("Date is required");
        return;
      }
      if (!form.location) {
        toast.error("Location is required");
        return;
      }

      const formData = new FormData();
      formData.append("id", form.id.toString());
      formData.append("title", form.title);
      formData.append("event_date", form.event_date);
      formData.append("description", form.description);
      formData.append("location", form.location);
      formData.append("address", form.address);
      formData.append("category", form.category);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      console.log(`<====FormData contents ID: ${submitId}====>`);
      for (const [key, value] of formData.entries()) {
        console.log(`${key}:`, value);
      }

      await onSave(formData);
      console.log(`<====onSave completed ID: ${submitId}====>`);
      onClose();
    } catch (err: any) {
      console.error(`<====Submit error ID: ${submitId}====>`, err);
      toast.error(err.message || "Error updating event");
    } finally {
      setIsSubmitting(false);
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
          <div>
            <Input
              id="title"
              typeInput="text"
              data="Title:"
              value={form.title}
              onChange={handleChange}
              name="title"
              required
            />
          </div>
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
              initialDate={new Date(event.event_date)}
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
              Enter an address (e.g., "Brandenburg Gate, Berlin") and click
              "Search address", or pick a location on the map below.
            </p>
            <div className="flex items-center space-x-2">
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="e.g., Brandenburg Gate, Berlin"
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={handleAddressSearch}
                disabled={isSubmitting || isSearching}
                className={`bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 flex items-center ${
                  isSubmitting || isSearching
                    ? "opacity-50 cursor-not-allowed"
                    : ""
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
              {(form.address || form.location !== event.location) && (
                <button
                  type="button"
                  onClick={handleResetLocation}
                  className="text-sm text-red-500 hover:text-red-700"
                  disabled={isSubmitting}
                >
                  Reset Location
                </button>
              )}
            </div>
            <input
              type="text"
              name="location"
              value={form.location}
              readOnly
              placeholder="Coordinates will appear here (e.g. POINT(13.37 52.51))"
              className="w-full p-2 border border-gray-300 rounded mt-2 bg-gray-100 cursor-not-allowed"
              disabled={isSubmitting}
            />
            <LocationPickerMap
              onLocationSelect={handleLocationSelect}
              initialLocation={parsedLocation}
            />
          </div>
          <div className="flex justify-end mt-4 space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 text-gray-700 rounded hover:bg-gray-400"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${
                isSubmitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isSubmitting}
            >
              Save Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
