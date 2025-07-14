import React, { ChangeEvent, useState, KeyboardEvent } from 'react';
import { SearchIcon } from '../icons/Icons';

interface SearchInputProps {
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  iconClass?: string;
  searchBtnClassName?: string;
  value?: string;
  showButton?: boolean;
  onChange?: (value: string) => void;
  onKeyDown?: (e: KeyboardEvent<HTMLInputElement>) => void;
  onSearch?: () => void;
}

const Search = ({
  placeholder,
  className,
  inputClassName,
  searchBtnClassName,
  value,
  onChange,
  onKeyDown,
  onSearch,
  showButton = true,
}: SearchInputProps) => {
  const [searchValue, setSearchValue] = useState(value || '');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleSearch = () => {
    if (onSearch) {
      onSearch();
    }
  };

  return (
    <div className={`w-full ${className}`}>
      <div className="relative flex items-center w-full mx-auto">
        <SearchIcon />
        <input
          type="text"
          placeholder={placeholder}
          value={searchValue}
          onChange={handleChange}
          onKeyDown={onKeyDown}
          className={`w-full focus:outline-none md:text-base text-xs sm:placeholder:text-base placeholder:text-[9px] rounded-xl px-2 py-[5px] md:pl-10 pl-7 border border-[#9E9E9E] ${inputClassName}`}
        />
        {showButton && (
          <button
            onClick={handleSearch}
            className={`absolute right-0 top-0 bottom-0 px-4 bg-primary text-white rounded-r-xl ${searchBtnClassName}`}
          >
            Search
          </button>
        )}
      </div>
    </div>
  );
};

export default Search;