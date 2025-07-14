import React, { useEffect, useRef, useState } from 'react';
import { IoIosArrowDown } from 'react-icons/io';

interface OptionType {
  label: string;
  value: string;
}

interface DropdownProps {
  options: OptionType[];
  placeholder?: string;
  onSelect: (selectedOption: string) => void;
  dropdownClassName?: string;
  className?: string;
  optionClassName?: string;
  optionlabelClassName?: string;
  selectedValue?: string; // Add this prop
}

const Dropdown: React.FC<DropdownProps> = ({
  options,
  placeholder = 'Sort By',
  onSelect,
  dropdownClassName,
  optionClassName,
  className,
  optionlabelClassName,
  selectedValue, // Add this prop
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Set initial selected option based on selectedValue prop
  useEffect(() => {
    if (selectedValue && options.length > 0) {
      const option = options.find(opt => opt.value === selectedValue);
      if (option) {
        setSelectedOption(option);
      }
    }
  }, [selectedValue, options]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleOptionClick = (option: OptionType) => {
    setSelectedOption(option);
    setIsOpen(false);
    onSelect(option.value);
  };

  return (
    <div 
      className={`relative inline-block cursor-pointer w-full ${className}`}
      ref={dropdownRef}
    >
      <div className="relative inline-block cursor-pointer w-full">
        <div
          onClick={() => setIsOpen((prev) => !prev)}
          className={`border border-[#D9D9D9] rounded-[10px] gap-5 px-3 w-full py-1.5 flex items-center justify-between mt-2 ${dropdownClassName}`}
        >
          <h1 className={`text-sm whitespace-nowrap ${optionlabelClassName}`}>
            {selectedOption ? selectedOption.label : placeholder}
          </h1>
          <IoIosArrowDown />
        </div>
        {isOpen && (
          <ul className="absolute z-10 w-full mt-1 bg-white border border-[#D9D9D9] rounded-md shadow-lg max-h-60 overflow-y-auto">
            {options.map((option, index) => (
              <li
                key={index}
                className={`px-4 py-2 cursor-pointer hover:bg-gray-100 ${
                  selectedOption?.value === option.value ? 'bg-gray-100' : ''
                } ${optionClassName}`}
                onClick={() => handleOptionClick(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Dropdown;