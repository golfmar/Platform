"use client";

export default function Pagination({
  page,
  setPage,
  events,
  eventsPerPage,
  totalCount,
}: {
  page: number;
  setPage: (page: number) => void;
  events: any[];
  eventsPerPage: number;
  totalCount: number; // Новый проп
}) {
  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    setPage(page + 1);
  };

  const isLastPage = page * eventsPerPage >= totalCount;

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
        disabled={isLastPage} // Отключаем, если последняя страница
        className="bg-blue-500 text-white px-4 py-2 rounded disabled:bg-gray-300 hover:bg-blue-600"
      >
        Next
      </button>
    </div>
  );
}
