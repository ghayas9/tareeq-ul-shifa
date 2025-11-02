import { useEffect, useState } from 'react';
import { TickIcon } from '../icons/Icons';
import useBrand from '@/hooks/brand.hooks';

interface FilterSidebarProps {
  onFilterChange: (filters: Filters) => void;
  onClose: () => void;
  isOpen: boolean;
  availableCategories: any[];
  selectedCategories?: any;
  setSelectedCategories?: any;
  selectedBrand?: any;
  setSelectedBrand?: any;
}

interface Filters {
  brand?: string;
  brandId?: string;
  category?: string[];
  categoryIds?: string[];
}

const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onFilterChange,
  onClose,
  isOpen,
  availableCategories,
  selectedCategories,
  setSelectedCategories,
  selectedBrand,
  setSelectedBrand,
}) => {
  // Use brand hook to get dynamic brands
  const { brands, getAllBrands, isLoading: brandsLoading } = useBrand();
  
  // Add local state to track changes before applying them
  const [localCategories, setLocalCategories] = useState(selectedCategories || []);
  const [localBrand, setLocalBrand] = useState(selectedBrand);
  
  // Add state to track the selected brand object (with ID)
  const [selectedBrandObject, setSelectedBrandObject] = useState<any>(null);
  
  // Helper function to validate UUID format
  const isValidUUID = (str: string) => {
    if (!str) return false;
    const uuidRegex = /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(str);
  };
  
  useEffect(() => {
    // Fetch all brands when component mounts
    getAllBrands();
  }, []);
  
  // Sync local state with props when sidebar opens
  useEffect(() => {
    if (isOpen) {
      setLocalCategories(selectedCategories || []);
      setLocalBrand(selectedBrand);
      
      // Find the brand object that matches the selected brand name
      if (selectedBrand && brands?.length) {
        const brandObj = brands.find((b: any) => b.name === selectedBrand);
        if (brandObj) {
          setSelectedBrandObject(brandObj);
        }
      } else {
        setSelectedBrandObject(null);
      }
    }
  }, [isOpen, selectedCategories, selectedBrand, brands]);

  const handleBrandChange = (brand: any) => {
    setLocalBrand(brand.name);
    setSelectedBrandObject(brand);
  };

  const handleCategoryChange = (category: any) => {
    // Always work with category IDs for consistency
    const categoryId = typeof category === 'string' ? category : category.id;
    
    if (!categoryId) {
      console.warn('⚠️ Category has no ID:', category);
      return;
    }
    
    setLocalCategories((prev: any) => {
      const isSelected = prev.includes(categoryId);
      
      if (isSelected) {
        console.log('Removing category:', categoryId);
        return prev.filter((c: any) => c !== categoryId);
      } else {
        console.log('Adding category:', categoryId);
        return [...prev, categoryId];
      }
    });
  };

  // Apply filters function - only called when Apply button is clicked
  const applyFilters = () => {
    console.log('🔍 Applying filters...', { localCategories, localBrand });
    
    // Update parent component states - send IDs not names
    setSelectedBrand(localBrand);
    setSelectedCategories(localCategories); // These are now IDs
    
    // Create and apply filters
    const currentFilters: Filters = {};
    
    // Add both name and ID for brand
    if (localBrand && selectedBrandObject) {
      // Validate brand ID
      if (isValidUUID(selectedBrandObject.id)) {
        currentFilters.brand = localBrand; // For display purposes
        currentFilters.brandId = selectedBrandObject.id; // For API
        console.log('✅ Brand filter:', currentFilters.brand, 'ID:', currentFilters.brandId);
      } else {
        console.warn('⚠️ Invalid brand UUID:', selectedBrandObject.id);
      }
    }
    
    // Add both names and IDs for categories
    if (localCategories && localCategories.length > 0) {
      // localCategories now contains IDs, so we need to get names for display
      const categoryNames = localCategories
        .map((catId: string) => {
          const category = availableCategories.find(
            (c) => (typeof c === 'object' && c.id === catId)
          );
          return category ? category.name : null;
        })
        .filter(Boolean);
      
      currentFilters.category = categoryNames; // For display
      
      // Validate all IDs are UUIDs
      const validCategoryIds = localCategories.filter((id: string) => isValidUUID(id));
      
      console.log('📋 Category IDs to send:', validCategoryIds);
      
      // Only add categoryIds if we have valid UUIDs
      if (validCategoryIds.length > 0) {
        currentFilters.categoryIds = validCategoryIds;
      } else {
        console.warn('⚠️ No valid category UUIDs found! Removing category filter.');
        delete currentFilters.category;
      }
    }
    
    console.log('📤 Final filters being sent:', currentFilters);
    
    // Make a single call to apply all filters at once
    onFilterChange(currentFilters);
    onClose();
  };

  // Manage body overflow
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={onClose}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 h-full md:w-80 w-60 bg-white space-y-6 z-50 transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex justify-between items-center w-full px-3 py-[5px] bg-secondary">
          <h2 className="text-xl font-bold text-white">Filter</h2>
          <button onClick={onClose} className="absolute text-white right-2">
            X
          </button>
        </div>
        <div className="max-h-[calc(100vh-120px)] overflow-auto custom-scrollbar">
          <div className="px-3 mt-2 w-3/4">
            <h3 className="text-base font-medium border-b-4 border-primary inline-block pb-1">
              Brand
            </h3>
            <div className="space-y-2 max-h-[250px] mt-4 overflow-auto custom-scrollbar">
              {brandsLoading ? (
                <div className="py-2 text-gray-500">Loading brands...</div>
              ) : brands?.length ? (
                brands.map((brand:any) => (
                  <label
                    key={brand.id}
                    className="flex items-center gap-2 py-1 space-x-2 text-[#616161] text-sm"
                  >
                    <input
                      type="radio"
                      name="brand"
                      checked={localBrand === brand.name}
                      onChange={() => handleBrandChange(brand)}
                      className="hidden"
                    />
                    <div
                      className={`w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center ${
                        localBrand === brand.name ? 'border-green-500' : ''
                      }`}
                    >
                      {localBrand === brand.name && (
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      )}
                    </div>
                    {brand.name}
                  </label>
                ))
              ) : (
                <div className="py-2 text-gray-500">No brands available</div>
              )}
            </div>
          </div>

          <div className="px-3 pb-3 pt-16">
            <h3 className="text-base font-medium border-b-4 border-primary inline-block pb-1">
              Category
            </h3>
            <div className="space-y-2 mt-4">
              {availableCategories?.map((category, index) => {
                const categoryName = typeof category === 'string' ? category : category.name;
                const categoryId = typeof category === 'string' ? category : category.id;
                
                // Always check by ID for consistency
                const isChecked = localCategories.includes(categoryId);

                return (
                  <label
                    key={categoryId || index}
                    className="flex items-center gap-3 py-[5px] space-x-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => handleCategoryChange(category)}
                      className="hidden"
                    />
                    <div
                      className={`w-5 h-5 cursor-pointer rounded border-2 border-gray-400 flex items-center justify-center ${
                        isChecked
                          ? 'bg-secondary border-secondary'
                          : 'bg-white'
                      }`}
                    >
                      {isChecked && <TickIcon />}
                    </div>
                    {categoryName || 'Unknown Category'}
                  </label>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Apply Button */}
        <div className="sticky bottom-0 bg-white p-4 border-t">
          <button 
            onClick={applyFilters}
            className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </>
  );
};

export default FilterSidebar;