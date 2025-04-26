"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import toast from "react-hot-toast";
import Input from "./ui/Input/Input";
import Select from "./ui/Select/Select";

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

interface CreateEventModalProps {
  onSave: (formData: FormData) => Promise<void>;
  onClose: () => void;
}

export default function CreateEventModal({
  onSave,
  onClose,
}: CreateEventModalProps) {
  const [form, setForm] = useState({
    title: "",
    event_date: "",
    description: "",
    location: "",
    address: "",
    category: "Other",
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else {
      setImageFile(null);
      setImagePreview(null);
    }
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
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("event_date", form.event_date);
      formData.append("description", form.description);
      formData.append("location", form.location);
      formData.append("category", form.category);
      if (imageFile) {
        formData.append("image", imageFile);
      }

      await onSave(formData);
      onClose();
    } catch (err: any) {
      toast.error(err.message || "Error creating event");
    }
  };

  return (
    <div className="fixed top-0 left-0  inset-0 bg-[#000000e3] bg-opacity-50   z-5000  overflow-y-scroll">
      <div className="bg-white p-6 rounded-lg max-w-md w-full min-w-[70vw] m-auto my-6">
        <h2 className="text-xl font-semibold mb-4">Create Event</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            {/* <label className="block mb-1">Title:</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            /> */}
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
            <label className="block mb-1">Image (optional):</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Preview:</p>
                <img
                  src={imagePreview}
                  alt="Image preview"
                  className="w-full h-40 object-cover rounded"
                />
              </div>
            )}
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
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
