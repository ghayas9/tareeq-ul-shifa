// components/common/GlobalSearch.tsx
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdClose } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { calculateDiscount } from '../../utils/discountPrice';
import { useSearch } from './context/SearchContext';
import HeaderSearch from './common/HeaderSearch';

interface GlobalSearchProps {
  mobileView?: boolean;
  showButton?: boolean;
  buttonLabel?: string;
  className?: string;
  inputClassName?: string;
  searchBtnClassName?: string;
  onBackClick?: () => void;
}

const GlobalSearch: React.FC<GlobalSearchProps> = ({
  mobileView = false,
  showButton = false,
  buttonLabel = 'Search',
  className = '',
  inputClassName = '',
  searchBtnClassName = '',
  onBackClick
}) => {
  const {
    search,
    searchResults,
    isSearching,
    showSearchResults,
    searchInputRef,
    searchResultsRef,
    handleSearchChange,
    handleSearchKeyDown,
    handleProductClick,
    clearSearchResults,
  } = useSearch();

  const searchResultsVariants = {
    hidden: { opacity: 0, y: -10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.2,
      },
    },
    exit: {
      opacity: 0,
      y: -10,
      transition: { duration: 0.15 },
    },
  };

  return (
    <div className={`relative search-input-container ${className}`}>
      <HeaderSearch
        value={search}
        placeholder="Search Medicine by Name or Category"
        onChange={handleSearchChange}
        onKeyDown={handleSearchKeyDown}
        onSubmit={() => {}} // We don't need this as we're handling it in the context
        inputClassName={`!rounded-lg ${inputClassName}`}
        searchBtnClassName={`!rounded-r-lg ${searchBtnClassName}`}
        showButton={showButton}
        buttonLabel={buttonLabel}
        ref={searchInputRef}
        className="w-full"
      />
      
      {/* Search Results Dropdown */}
      <AnimatePresence>
        {showSearchResults && (search.trim().length > 0) && (
          <motion.div
            ref={searchResultsRef}
            className={`absolute ${mobileView ? 'top-12' : 'top-full'} left-0 right-0 mt-1 bg-white rounded-md shadow-lg z-50 ${mobileView ? 'max-h-[60vh]' : 'max-h-[400px]'} overflow-y-auto`}
            variants={searchResultsVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-2">
              <div className="flex justify-between items-center mb-2 pb-2 border-b">
                <h3 className="text-sm font-medium">
                  Results: "{search}"
                </h3>
                <button 
                  className="text-gray-400 hover:text-gray-600"
                  onClick={clearSearchResults}
                >
                  <MdClose size={18} />
                </button>
              </div>
              
              {isSearching ? (
                <div className="py-2">
                  {Array(3).fill(0).map((_, i) => (
                    <div key={i} className="flex items-center gap-3 py-2">
                      <Skeleton width={50} height={50} className="rounded" />
                      <div className="flex-1">
                        <Skeleton width="80%" height={16} />
                        <Skeleton width="50%" height={12} className="mt-1" />
                      </div>
                    </div>
                  ))}
                </div>
              ) : searchResults.length === 0 ? (
                <div className="py-4 text-center text-gray-500 text-sm">
                  No products found
                </div>
              ) : (
                <>
                  {searchResults.map(product => {
                    const discount = calculateDiscount(
                      product.originalPrice,
                      product.price
                    );
                    
                    return (
                      <div 
                        key={product.id}
                        className="flex items-center gap-3 py-2 border-b cursor-pointer hover:bg-gray-50 rounded px-2"
                        onClick={() => handleProductClick(product.id)}
                      >
                        <div className="relative w-12 h-12 flex-shrink-0">
                          <img 
                            src={product.image || '/images/placeholder-product.png'} 
                            alt={product.name}
                            className="object-contain w-full h-full" 
                          />
                          {discount && discount > 0 && (
                            <span className="absolute -top-1 -right-1 bg-primary text-white text-xs px-1 rounded-full">
                              -{discount}%
                            </span>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium line-clamp-1">{product.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            {product.originalPrice && (
                              <span className="text-gray-400 text-xs line-through">
                                Rs {product.originalPrice}
                              </span>
                            )}
                            <span className="text-primary text-sm font-medium">
                              Rs {product.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default GlobalSearch;