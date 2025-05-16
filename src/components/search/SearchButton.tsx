import {SearchIcon} from '@/icons';
import './SearchButton.css';
import {Button} from '../Button';

interface Props {
  onClick: () => void;
  isMobile?: boolean;
}

export function SearchButton({onClick, isMobile}: Props) {
  return (
    isMobile
      ? <SearchIcon width={17.5} height={17.5} onClick={onClick} />
      : (
        <Button
          className="search-btn"
          onClick={onClick}
          icon={<SearchIcon width={17.5} height={17.5} />}
        >
          Search Docs
        </Button>
      )
  );
}
