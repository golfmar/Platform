"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { use } from "react";
import Loading from "@/components/Loading";

const Map = dynamic(() => import("@/components/Map"), { ssr: false });

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

export default function EventPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const [event, setEvent] = useState<Event | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    async function fetchEvent() {
      try {
        const response = await fetch(`/api/events?id=${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch event");
        }
        const data = await response.json();
        setEvent(data);
      } catch (err: any) {
        setError(err.message || "Error fetching event");
        toast.error(err.message || "Error fetching event");
      } finally {
        setIsLoading(false);
      }
    }
    fetchEvent();
  }, [id]);

  if (isLoading) return <Loading />;
  if (error) return <div className="text-red-500 p-5">{error}</div>;
  if (!event) return <div className="p-5">Event not found</div>;

  return (
    <div className="max-w-4xl mx-auto p-6 font-sans text-gray-800">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />

      <button
        onClick={() => router.push("/")}
        className="mb-6 flex items-center text-blue-600 hover:underline"
      >
        ← Back to Events
      </button>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {event.image_url && (
          <div className="w-full aspect-w-16 aspect-h-9">
            <img
              src={event.image_url}
              alt={event.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div className="p-6 space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
          <div>
            <h2 className="text-lg font-semibold mb-1">📝 Description</h2>
            <p className="text-gray-800">
              {event.description || "No description provided."}
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm text-gray-700">
            <p>
              📅 <strong>Date:</strong>{" "}
              {new Date(event.event_date).toLocaleString("en-US")}
            </p>
            <p>
              🏷️ <strong>Category:</strong> {event.category || "None"}
            </p>
            <p>
              📍 <strong>Location:</strong> {event.location || "Unknown"}
            </p>
            <p>
              📧 <strong>Organizer:</strong> {event.organizer_email}
            </p>
          </div>

          <div className="mt-6">
            <h2 className="text-lg font-semibold mb-2">🗺️ Event Location</h2>
            <div className="border rounded-md overflow-hidden shadow-md h-72">
              <Map events={[event]} zoom={15} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
