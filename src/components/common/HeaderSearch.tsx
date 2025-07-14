
// import React, { forwardRef } from 'react';
// import { FiSearch } from 'react-icons/fi';

// interface SearchProps {
//   value: string;
//   onChange: (value: string) => void;
//   onSubmit?: () => void;
//   placeholder?: string;
//   className?: string;
//   showButton?: boolean;
//   buttonLabel?: string;
// }

// const HeaderSearch = forwardRef<HTMLInputElement, SearchProps>(
//   ({ 
//     value, 
//     onChange, 
//     onSubmit, 
//     placeholder = 'Search', 
//     className = '', 
//     showButton = false,
//     buttonLabel = 'Search'
//   }, ref) => {
    
//     const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//       if (e.key === 'Enter' && onSubmit) {
//         onSubmit();
//       }
//     };

//     return (
//       <div className={`flex items-center ${className}`}>
//         <div className="relative flex-1">
//           <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//             <FiSearch className="md:h-5 md:w-5 h-4 w-4 text-gray-400" />
//           </div>
//           <input
//             ref={ref}
//             type="text"
//             value={value}
//             onChange={(e) => onChange(e.target.value)}
//             placeholder={placeholder}
//             onKeyDown={handleKeyDown}
//             className="w-full px-2 h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
//           />
//         </div>
        
//         {showButton && (
//           <button
//             onClick={onSubmit}
//             className="ml-2 bg-primary text-white h-10 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
//           >
//             {buttonLabel}
//           </button>
//         )}
//       </div>
//     );
//   }
// );

// // Display name for React DevTools
// HeaderSearch.displayName = 'Search';

// export default HeaderSearch;


import React, { forwardRef } from 'react';
import { FiSearch } from 'react-icons/fi';

interface SearchProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  inputClassName?: string;
  iconClass?: string;
  searchBtnClassName?: string;
  showButton?: boolean;
  buttonLabel?: string;
}

const HeaderSearch = forwardRef<HTMLInputElement, SearchProps>(
  ({
    value,
    onChange,
    onSubmit,
    onKeyDown,
    placeholder = 'Search',
    className = '',
    inputClassName = '',
    iconClass = '',
    searchBtnClassName = '',
    showButton = false,
    buttonLabel = 'Search'
  }, ref) => {
    
    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && onSubmit) {
        onSubmit();
      }
      if (onKeyDown) {
        onKeyDown(e);
      }
    };

    return (
      <div className={`flex items-center ${className}`}>
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className={`md:h-5 md:w-5 h-4 w-4 text-gray-400 ${iconClass}`} />
          </div>
          <input
            ref={ref}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder={placeholder}
            onKeyDown={handleKeyDown}
            className={`w-full md:text-base text-sm h-10 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent ${inputClassName}`}
          />
        </div>
        
        {showButton && (
          <button
            onClick={onSubmit}
            className={`ml-2 bg-primary text-white h-10 px-4 rounded-lg hover:bg-primary/90 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 md:text-base text-sm ${searchBtnClassName}`}
          >
            {buttonLabel}
          </button>
        )}
      </div>
    );
  }
);

// Display name for React DevTools
HeaderSearch.displayName = 'Search';

export default HeaderSearch;