// contexts/SearchContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode, useRef } from 'react';
import { useProduct } from '@/hooks/product.hook';
import { useRouter } from 'next/router';

interface SearchContextType {
  search: string;
  searchResults: any[];
  isSearching: boolean;
  showSearchResults: boolean;
  searchInputRef: React.RefObject<HTMLInputElement | null>;
  searchResultsRef: React.RefObject<HTMLDivElement | null>;
  handleSearchChange: (value: string) => void;
  handleSearchKeyDown: (e: React.KeyboardEvent) => void;
  handleProductClick: (productId: string) => void;
  clearSearchResults: () => void;
  toggleSearchVisibility: () => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const { getAllProducts } = useProduct();
  const router = useRouter();
  
  // Refs for handling click outside
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const searchResultsRef = useRef<HTMLDivElement | null>(null);
  
  // Reset search when changing routes
  useEffect(() => {
    const handleRouteChange = () => {
      if (showSearchResults) {
        setShowSearchResults(false);
      }
    };

    router.events.on('routeChangeStart', handleRouteChange);
    return () => {
      router.events.off('routeChangeStart', handleRouteChange);
    };
  }, [router, showSearchResults]);
  
  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showSearchResults && 
        searchResultsRef.current && 
        !searchResultsRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest('.search-input-container')
      ) {
        setShowSearchResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showSearchResults]);
  
  const handleSearchChange = (value: string) => {
    setSearch(value);
    
    if (!value.trim()) {
      clearSearchResults();
    } else if (value.trim().length >= 2) {
      // Only start searching when user has typed at least 2 characters
      handleSearchSubmit(value);
    }
  };

  const handleSearchSubmit = async (value: string) => {
    if (value.trim()) {
      setIsSearching(true);
      setShowSearchResults(true);

      try {
        const response = await getAllProducts({
          status: 'active',
          search: value.trim(),
          limit: 5, // Limit results for header display
        });

        if (response?.payload?.data) {
          const results = Array.isArray(response.payload.data)
            ? response.payload.data
            : [response.payload.data];

          setSearchResults(results);
        } else {
          setSearchResults([]);
        }
      } catch (error) {
        console.error('Error during search:', error);
        setSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    }
  };
  
  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit(search);
    }
  };

  const clearSearchResults = () => {
    setShowSearchResults(false);
    setSearchResults([]);
    setSearch('');
  };
  
  const toggleSearchVisibility = () => {
    setShowSearchResults(!showSearchResults);
    
    // If opening search and we have a search term, update results
    if (!showSearchResults && search.trim().length >= 2) {
      handleSearchSubmit(search);
    }
  };
  
  const handleProductClick = (productId: string) => {
    router.push(`/products/${productId}`);
    clearSearchResults();
  };

  return (
    <SearchContext.Provider
      value={{
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
        toggleSearchVisibility
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};