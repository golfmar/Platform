import Link from "next/link";
import { FC } from "react";

interface Event {
  id: string;
  title: string;
  image_url?: string;
  event_date: string;
  category?: string;
  description?: string;
  location?: string;
  organizer_email: string;
}

interface User {
  email: string;
}

interface EventCardProps {
  event: Event;
  user?: User;
  handleEdit: (event: Event) => void;
  handleDelete: (id: string) => void;
  stopBodyScroll: () => void;
}

const EventCard: FC<EventCardProps> = ({
  event,
  user,
  handleEdit,
  handleDelete,
  stopBodyScroll,
}) => {
  return (
    <div className="bg-white rounded-lg shadow-[0_0_5px_rgba(0,0,0,0.1)] hover:shadow-[0_0_5px_rgba(0,0,0,0.2)]  transition-shadow duration-300 p-6 mb-4 overflow-hidden">
      <div className="flex flex-col md:flex-row gap-6">
        {event.image_url && (
          <img
            src={event.image_url}
            alt={event.title}
            className="w-full md:w-48 h-48 object-cover rounded-lg"
          />
        )}
        <div className="flex-1">
          <h2 className="text-xl font-bold text-gray-800 mb-2">
            <Link
              href={`/events/${event.id}`}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              {event.title}
            </Link>
          </h2>
          <div className="space-y-2 text-gray-600">
            <p className="flex items-center">
              <span className="material-icons mr-2 text-gray-400">event</span>
              {new Date(event.event_date).toLocaleString("ru-RU", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              })}
            </p>
            <p className="flex items-center">
              <span className="material-icons mr-2 text-gray-400">
                category:
              </span>
              {event.category || "There is no category"}
            </p>
            <p className="flex items-center">
              <span className="material-icons mr-2 text-gray-400">place:</span>
              {event.location || "Location unknown"}
            </p>
            <p className="flex items-center">
              <span className="material-icons mr-2 text-gray-400">
                description:
              </span>
              {event.description || "The description is missing"}
            </p>
            <p className="flex items-center text-sm text-gray-500">
              <span className="material-icons mr-2 text-gray-400">
                organizer:
              </span>
              {event.organizer_email}
            </p>
          </div>
          {user && user.email === event.organizer_email && (
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => {
                  stopBodyScroll();
                  handleEdit(event);
                }}
                className="flex items-center bg-yellow-500 text-white px-4 py-2 rounded-lg hover:bg-yellow-600 transition-colors duration-200"
              >
                <span className="material-icons mr-2">edit</span>
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors duration-200"
              >
                <span className="material-icons mr-2">delete</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
