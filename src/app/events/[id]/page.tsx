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
        console.log(`<====Fetching event ID: ${id}====>`);
        const response = await fetch(`/api/events?id=${id}`);
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.error || "Failed to fetch event");
        }
        const data = await response.json();
        console.log("<====Event fetched====>", data);
        setEvent(data);
      } catch (err: any) {
        console.error("<====Fetch error====>", err);
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
    <div className="p-5 font-sans">
      <Toaster position="top-right" toastOptions={{ duration: 3000 }} />
      <button
        onClick={() => router.push("/")}
        className="mb-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Back to Events
      </button>
      <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
      {event.image_url && (
        <img
          src={event.image_url}
          alt={event.title}
          className="w-full max-w-md h-64 object-cover rounded mb-4"
        />
      )}
      <div className="space-y-2">
        <p>
          <strong>Date:</strong> {new Date(event.event_date).toLocaleString()}
        </p>
        <p>
          <strong>Category:</strong> {event.category || "None"}
        </p>
        <p>
          <strong>Description:</strong> {event.description || "None"}
        </p>
        <p>
          <strong>Location:</strong> {event.location || "Unknown"}
        </p>
        <p>
          <strong>Organizer:</strong> {event.organizer_email}
        </p>
      </div>
      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Location</h2>
        <Map events={[event]} zoom={15} />
      </div>
    </div>
  );
}
