export default function Pagination({
  page,
  setPage,
  events,
  eventsPerPage,
}: {
  page: number;
  setPage: (page: number) => void;
  events: any[];
  eventsPerPage: number;
}) {
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };
  const handleNextPage = () => {
    setPage(page + 1);
}
  return (
    <div className="mt-4 flex justify-between">
      <button
        onClick={handlePrevPage}
        disabled={page === 1}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 hover:bg-blue-600"
      >
        Previous
      </button>
      <span>Page {page}</span>
      <button
        onClick={handleNextPage}
        disabled={events.length < eventsPerPage}
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
}
