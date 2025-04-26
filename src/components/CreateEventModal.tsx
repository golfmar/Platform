"use client";

import { useState } from "react";
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
  const [isSearching, setIsSearching] = useState(false); // Для индикатора загрузки

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
      setImagePreview(null);
    }
  };

  const handleAddressSearch = async () => {
    if (!form.address) {
      toast.error("Bitte geben Sie eine Adresse ein");
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
        toast.success("Adresse gefunden!");
      } else {
        toast.error("Adresse nicht gefunden");
      }
    } catch (err: any) {
      console.error("Geocode error:", err);
      toast.error("Fehler beim Suchen der Adresse");
    } finally {
      setIsSearching(false);
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
    <div className="fixed top-0 left-0 inset-0 bg-[#000000e3] bg-opacity-50 z-5000 overflow-y-scroll">
      <div className="bg-white p-6 rounded-lg max-w-md w-full min-w-[70vw] m-auto my-6">
        <h2 className="text-xl font-semibold mb-4">Veranstaltung erstellen</h2>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <Input
              id="title"
              typeInput="text"
              data="Titel:"
              value={form.title}
              onChange={handleChange}
              name="title"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Kategorie:</label>
            <Select
              selectItems={CATEGORIES}
              value={form.category}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className="block mb-1">Datum:</label>
            {/* <input
              type="date"
              name="event_date"
              value={form.event_date}
              onChange={handleChange}
              required
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.event_date && <p>Ausgewählt: {form.event_date}</p>} */}
            <Calendar handleDateChange={handleDateChange} />
          </div>
          <div>
            <label className="block mb-1">Beschreibung:</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-[80px]"
            />
          </div>
          <div>
            <label className="block mb-1">Bild (optional):</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
              id="imageInput"
            />
            <label htmlFor="imageInput" className="cursor-pointer">
              <Image
                src={"/assets/svg/images.svg"}
                alt="Image preview"
                width={40}
                height={40}
              />
            </label>
            {imagePreview && (
              <div className="mt-2">
                <p className="text-sm text-gray-600">Preview:</p>
                <img
                  src={imagePreview}
                  alt="Image preview"
                  className="w-full max-w-[300px] max-h-[200px] h-auto object-contain rounded"
                />
                <button
                  type="button"
                  onClick={() => {
                    setImageFile(null);
                    setImagePreview(null);
                  }}
                  className="mt-1 text-sm text-red-500 hover:text-red-700"
                >
                  Remove Image
                </button>
              </div>
            )}
          </div>
          <div>
            <label className="block mb-1">
              Ort (Adresse eingeben oder auf der Karte wählen):
            </label>
            <p className="text-sm text-gray-600 mb-1">
              Geben Sie eine Adresse ein (z.B. "Brandenburger Tor, Berlin") und
              klicken Sie auf "Adresse suchen", oder wählen Sie einen Punkt auf
              der Karte unten.
            </p>
            <div className="flex items-center">
              <input
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                placeholder="z.B. Brandenburger Tor, Berlin"
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
                Adresse suchen
              </button>
            </div>
            <input
              type="text"
              name="location"
              value={form.location}
              readOnly
              placeholder="Koordinaten erscheinen hier (z.B. POINT(13.37 52.51))"
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
              Abbrechen
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
            >
              Erstellen
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
