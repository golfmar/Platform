export default function Loading() {
  return (
    <div className="fixed  flex items-center justify-center bg-gray-900 bg-opacity-50 top-0 left-0 right-0 bottom-0 z-50000">
      <svg className="animate-spin h-70 w-70 text-white" viewBox="0 0 24 24">
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="white"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="white"
          d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
        />
      </svg>
    </div>
  );
}
