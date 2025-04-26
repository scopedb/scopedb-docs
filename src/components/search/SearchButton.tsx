interface Props {
  onClick: () => void;
}

export function SearchButton({onClick}: Props) {
  return (
    <button
      className="flex items-center gap-x-1 w-full h-8 px-4 text-sm rounded-xl border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={onClick}
    >
      <svg
        className="w-5 h-5 text-gray-800"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10.5 3a7.5 7.5 0 100 15 7.5 7.5 0 000-15zM21 21l-4.35-4.35"
        />
      </svg>
      <span className="text-gray-400 text-nowrap">Search Docs</span>
    </button>
  );
}
