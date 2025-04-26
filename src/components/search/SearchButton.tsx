import {SearchIcon} from '@/icons';

interface Props {
  onClick: () => void;
}

export function SearchButton({onClick}: Props) {
  return (
    <button
      className="flex items-center gap-x-1 w-full h-8 px-4 text-sm border-1 border-solid border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
      onClick={onClick}
    >
      <SearchIcon className="h-5 w-5 text-gray-500" />
      <span className="text-gray-400 text-nowrap">Search Docs</span>
    </button>
  );
}
