// // import { useEffect } from 'react';
// // import { TickIcon } from '../icons/Icons';

// // interface FilterSidebarProps {
// //   onFilterChange: (filters: Filters) => void;
// //   onClose: () => void;
// //   isOpen: boolean;
// //   selectedPrice?: any;
// //   setSelectedPrice?: any;
// //   availableBrands: string[];
// //   availableCategories: any[]; // Changed to any[] to accommodate objects
// //   selectedCategories?: any;
// //   setSelectedCategories?: any;
// //   selectedBrand?: any;
// //   setSelectedBrand?: any;
// //   priceRange: { min: number; max: number };
// // }

// // interface Filters {
// //   price?: { min: number; max: number };
// //   brand?: string;
// //   category?: string[];
// // }

// // const FilterSidebar: React.FC<FilterSidebarProps> = ({
// //   onFilterChange,
// //   onClose,
// //   isOpen,
// //   availableBrands,
// //   availableCategories,
// //   priceRange,
// //   selectedPrice,
// //   setSelectedPrice,
// //   selectedCategories,
// //   setSelectedCategories,
// //   selectedBrand,
// //   setSelectedBrand,
// // }) => {
// //   const handleBrandChange = (brand: string) => {
// //     setSelectedBrand(brand);
// //   };

// //   const handleCategoryChange = (category: string) => {
// //     setSelectedCategories((prev: any) =>
// //       prev.includes(category)
// //         ? prev.filter((c: any) => c !== category)
// //         : [...prev, category]
// //     );
// //   };

// //   useEffect(() => {
// //     if (!isOpen) return;
// //     const currentFilters: Filters = {};
// //     if (selectedBrand) {
// //       currentFilters.brand = selectedBrand;
// //     }
// //     if (selectedCategories && selectedCategories.length > 0) {
// //       currentFilters.category = selectedCategories;
// //     }
// //     if (selectedPrice && selectedPrice.length === 2) {
// //       currentFilters.price = {
// //         min: selectedPrice[0],
// //         max: selectedPrice[1],
// //       };
// //     }
// //     onFilterChange(currentFilters);
// //   }, [selectedBrand, selectedCategories, selectedPrice]);

// //   useEffect(() => {
// //     if (isOpen) {
// //       document.body.style.overflow = 'hidden';
// //     } else {
// //       document.body.style.overflow = 'auto';
// //     }
// //   }, [isOpen]);

// //   const applyPriceFilter = () => {
// //     console.log('Applied price filter:', selectedPrice);
// //   };

// //   return (
// //     <>
// //       {/* Overlay */}
// //       {isOpen && (
// //         <div
// //           className="fixed inset-0 bg-black bg-opacity-50 z-40"
// //           onClick={onClose}
// //         ></div>
// //       )}
// //       <div
// //         className={`fixed top-0 left-0 h-full md:w-80 w-60 bg-white space-y-6 z-50 transition-transform duration-300 ease-in-out ${
// //           isOpen ? 'translate-x-0' : '-translate-x-full'
// //         }`}
// //       >
// //         <div className="flex justify-between items-center w-full px-3 py-[5px] bg-secondary">
// //           <h2 className="text-xl font-bold text-white">Filter</h2>
// //           <button onClick={onClose} className="absolute text-white right-2">
// //             X
// //           </button>
// //         </div>
// //         <div className="max-h-[90vh] overflow-auto custom-scrollbar">
// //           <div className="p-3 w-11/12">
// //             <h3 className="text-base font-medium border-b-4 border-primary inline-block pb-1">
// //               Price
// //             </h3>
// //             <div className="mt-4">
// //               <input
// //                 type="range"
// //                 min={priceRange?.min}
// //                 max={priceRange?.max}
// //                 value={selectedPrice[0]}
// //                 onChange={(e) =>
// //                   setSelectedPrice([Number(e.target.value), selectedPrice[1]])
// //                 }
// //                 className="h-1.5 w-full cursor-pointer appearance-none rounded-lg"
// //               />

// //               <h3 className="text-base text-[#616161] mt-3">
// //                 Price: Rs. {selectedPrice[0]} - Rs. {priceRange?.max}
// //               </h3>
// //               <button
// //                 className="border border-secondary rounded-[10px] w-[100px] h-[36px] mt-4 text-base font-medium"
// //                 onClick={applyPriceFilter}
// //               >
// //                 Filter
// //               </button>
// //             </div>
// //           </div>
// //           <div className="px-3 mt-2 w-3/4">
// //             <h3 className="text-base font-medium border-b-4 border-primary inline-block pb-1">
// //               Brand
// //             </h3>
// //             <div className="space-y-2 max-h-[250px] mt-4 overflow-auto custom-scrollbar">
// //               {availableBrands?.map((brand) => (
// //                 <label
// //                   key={brand}
// //                   className="flex items-center gap-2 py-1 space-x-2 text-[#616161] text-sm"
// //                 >
// //                   <input
// //                     type="radio"
// //                     name="brand"
// //                     checked={selectedBrand === brand}
// //                     onChange={() => handleBrandChange(brand)}
// //                     className="hidden"
// //                   />
// //                   <div
// //                     className={`w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center ${
// //                       selectedBrand === brand ? 'border-green-500' : ''
// //                     }`}
// //                   >
// //                     {selectedBrand === brand && (
// //                       <div className="w-2 h-2 bg-green-500 rounded-full"></div>
// //                     )}
// //                   </div>
// //                   {brand}
// //                 </label>
// //               ))}
// //             </div>
// //           </div>

// //           <div className="px-3 pb-3 pt-16">
// //             <h3 className="text-base font-medium border-b-4 border-primary inline-block pb-1">
// //               Category
// //             </h3>
// //             <div className="space-y-2 mt-4">
// //               {availableCategories?.map((category, index) => {
// //                 // Get category name, handling both string and object cases
// //                 const categoryName =
// //                   typeof category === 'string' ? category : category.name;
// //                 const categoryId =
// //                   typeof category === 'string' ? category : category.id;

// //                 return (
// //                   <label
// //                     key={index}
// //                     className="flex items-center gap-3 py-[5px] space-x-2 text-sm"
// //                   >
// //                     <input
// //                       type="checkbox"
// //                       checked={selectedCategories.includes(
// //                         categoryName || categoryId
// //                       )}
// //                       onChange={() =>
// //                         handleCategoryChange(categoryName || categoryId)
// //                       }
// //                       className="hidden"
// //                     />
// //                     <div
// //                       className={`w-5 h-5 cursor-pointer rounded border-2 border-gray-400 flex items-center justify-center ${
// //                         selectedCategories.includes(categoryName || categoryId)
// //                           ? 'bg-secondary border-secondary'
// //                           : 'bg-white'
// //                       }`}
// //                     >
// //                       {selectedCategories.includes(
// //                         categoryName || categoryId
// //                       ) && <TickIcon />}
// //                     </div>
// //                     {categoryName || 'Unknown Category'}
// //                   </label>
// //                 );
// //               })}
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // };

// // export default FilterSidebar;


// import { useEffect, useState } from 'react';
// import { TickIcon } from '../icons/Icons';
// import useBrand from '@/hooks/brand.hooks';

// interface FilterSidebarProps {
//   onFilterChange: (filters: Filters) => void;
//   onClose: () => void;
//   isOpen: boolean;
//   availableCategories: any[]; // Changed to any[] to accommodate objects
//   selectedCategories?: any;
//   setSelectedCategories?: any;
//   selectedBrand?: any;
//   setSelectedBrand?: any;
// }

// interface Filters {
//   brand?: string;
//   category?: string[];
// }

// const FilterSidebar: React.FC<FilterSidebarProps> = ({
//   onFilterChange,
//   onClose,
//   isOpen,
//   availableCategories,
//   selectedCategories,
//   setSelectedCategories,
//   selectedBrand,
//   setSelectedBrand,
// }) => {
//   // Use brand hook to get dynamic brands
//   const { brands, getAllBrands, isLoading: brandsLoading } = useBrand();
  
//   useEffect(() => {
//     // Fetch all brands when component mounts
//     getAllBrands();
//   }, []);

//   const handleBrandChange = (brand: string) => {
//     setSelectedBrand(brand);
//   };

//   const handleCategoryChange = (category: string) => {
//     setSelectedCategories((prev: any) =>
//       prev.includes(category)
//         ? prev.filter((c: any) => c !== category)
//         : [...prev, category]
//     );
//   };

//   useEffect(() => {
//     if (!isOpen) return;
//     const currentFilters: Filters = {};
//     if (selectedBrand) {
//       currentFilters.brand = selectedBrand;
//     }
//     if (selectedCategories && selectedCategories.length > 0) {
//       currentFilters.category = selectedCategories;
//     }
//     onFilterChange(currentFilters);
//   }, [selectedBrand, selectedCategories]);

//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
//   }, []);

//   return (
//     <>
//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={onClose}
//         ></div>
//       )}
//       <div
//         className={`fixed top-0 left-0 h-full md:w-80 w-60 bg-white space-y-6 z-50 transition-transform duration-300 ease-in-out ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         <div className="flex justify-between items-center w-full px-3 py-[5px] bg-secondary">
//           <h2 className="text-xl font-bold text-white">Filter</h2>
//           <button onClick={onClose} className="absolute text-white right-2">
//             X
//           </button>
//         </div>
//         <div className="max-h-[90vh] overflow-auto custom-scrollbar">
//           <div className="px-3 mt-2 w-3/4">
//             <h3 className="text-base font-medium border-b-4 border-primary inline-block pb-1">
//               Brand
//             </h3>
//             <div className="space-y-2 max-h-[250px] mt-4 overflow-auto custom-scrollbar">
//               {brandsLoading ? (
//                 <div className="py-2 text-gray-500">Loading brands...</div>
//               ) : brands?.length ? (
//                 brands.map((brand:any) => (
//                   <label
//                     key={brand.id}
//                     className="flex items-center gap-2 py-1 space-x-2 text-[#616161] text-sm"
//                   >
//                     <input
//                       type="radio"
//                       name="brand"
//                       checked={selectedBrand === brand.name}
//                       onChange={() => handleBrandChange(brand.name)}
//                       className="hidden"
//                     />
//                     <div
//                       className={`w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center ${
//                         selectedBrand === brand.name ? 'border-green-500' : ''
//                       }`}
//                     >
//                       {selectedBrand === brand.name && (
//                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                       )}
//                     </div>
//                     {brand.name}
//                   </label>
//                 ))
//               ) : (
//                 <div className="py-2 text-gray-500">No brands available</div>
//               )}
//             </div>
//           </div>

//           <div className="px-3 pb-3 pt-16">
//             <h3 className="text-base font-medium border-b-4 border-primary inline-block pb-1">
//               Category
//             </h3>
//             <div className="space-y-2 mt-4">
//               {availableCategories?.map((category, index) => {
//                 // Get category name, handling both string and object cases
//                 const categoryName =
//                   typeof category === 'string' ? category : category.name;
//                 const categoryId =
//                   typeof category === 'string' ? category : category.id;

//                 return (
//                   <label
//                     key={index}
//                     className="flex items-center gap-3 py-[5px] space-x-2 text-sm"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={selectedCategories.includes(
//                         categoryName || categoryId
//                       )}
//                       onChange={() =>
//                         handleCategoryChange(categoryName || categoryId)
//                       }
//                       className="hidden"
//                     />
//                     <div
//                       className={`w-5 h-5 cursor-pointer rounded border-2 border-gray-400 flex items-center justify-center ${
//                         selectedCategories.includes(categoryName || categoryId)
//                           ? 'bg-secondary border-secondary'
//                           : 'bg-white'
//                       }`}
//                     >
//                       {selectedCategories.includes(
//                         categoryName || categoryId
//                       ) && <TickIcon />}
//                     </div>
//                     {categoryName || 'Unknown Category'}
//                   </label>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FilterSidebar;

// import { useEffect, useState } from 'react';
// import { TickIcon } from '../icons/Icons';
// import useBrand from '@/hooks/brand.hooks';

// interface FilterSidebarProps {
//   onFilterChange: (filters: Filters) => void;
//   onClose: () => void;
//   isOpen: boolean;
//   availableCategories: any[]; // Changed to any[] to accommodate objects
//   selectedCategories?: any;
//   setSelectedCategories?: any;
//   selectedBrand?: any;
//   setSelectedBrand?: any;
// }

// interface Filters {
//   brand?: string;
//   category?: string[];
// }

// const FilterSidebar: React.FC<FilterSidebarProps> = ({
//   onFilterChange,
//   onClose,
//   isOpen,
//   availableCategories,
//   selectedCategories,
//   setSelectedCategories,
//   selectedBrand,
//   setSelectedBrand,
// }) => {
//   // Use brand hook to get dynamic brands
//   const { brands, getAllBrands, isLoading: brandsLoading } = useBrand();
  
//   // Add local state to track changes before applying them
//   const [localCategories, setLocalCategories] = useState(selectedCategories || []);
//   const [localBrand, setLocalBrand] = useState(selectedBrand);
  
//   useEffect(() => {
//     // Fetch all brands when component mounts
//     getAllBrands();
//   }, []);
  
//   // Sync local state with props when sidebar opens
//   useEffect(() => {
//     if (isOpen) {
//       setLocalCategories(selectedCategories || []);
//       setLocalBrand(selectedBrand);
//     }
//   }, [isOpen, selectedCategories, selectedBrand]);

//   const handleBrandChange = (brand: string) => {
//     setLocalBrand(brand);
//   };

//   const handleCategoryChange = (category: string) => {
//     setLocalCategories((prev: any) =>
//       prev.includes(category)
//         ? prev.filter((c: any) => c !== category)
//         : [...prev, category]
//     );
//   };

//   // Apply filters function - only called when Apply button is clicked
//   const applyFilters = () => {
//     // Update parent component states
//     setSelectedBrand(localBrand);
//     setSelectedCategories(localCategories);
    
//     // Create and apply filters
//     const currentFilters: Filters = {};
//     if (localBrand) {
//       currentFilters.brand = localBrand;
//     }
//     if (localCategories && localCategories.length > 0) {
//       currentFilters.category = localCategories;
//     }
    
//     // Make a single call to apply all filters at once
//     onFilterChange(currentFilters);
//     onClose();
//   };

//   // Manage body overflow
//   useEffect(() => {
//     if (isOpen) {
//       document.body.style.overflow = 'hidden';
//     } else {
//       document.body.style.overflow = 'auto';
//     }
    
//     return () => {
//       document.body.style.overflow = 'auto';
//     };
//   }, [isOpen]);

//   return (
//     <>
//       {/* Overlay */}
//       {isOpen && (
//         <div
//           className="fixed inset-0 bg-black bg-opacity-50 z-40"
//           onClick={onClose}
//         ></div>
//       )}
//       <div
//         className={`fixed top-0 left-0 h-full md:w-80 w-60 bg-white space-y-6 z-50 transition-transform duration-300 ease-in-out ${
//           isOpen ? 'translate-x-0' : '-translate-x-full'
//         }`}
//       >
//         <div className="flex justify-between items-center w-full px-3 py-[5px] bg-secondary">
//           <h2 className="text-xl font-bold text-white">Filter</h2>
//           <button onClick={onClose} className="absolute text-white right-2">
//             X
//           </button>
//         </div>
//         <div className="max-h-[calc(100vh-120px)] overflow-auto custom-scrollbar">
//           <div className="px-3 mt-2 w-3/4">
//             <h3 className="text-base font-medium border-b-4 border-primary inline-block pb-1">
//               Brand
//             </h3>
//             <div className="space-y-2 max-h-[250px] mt-4 overflow-auto custom-scrollbar">
//               {brandsLoading ? (
//                 <div className="py-2 text-gray-500">Loading brands...</div>
//               ) : brands?.length ? (
//                 brands.map((brand:any) => (
//                   <label
//                     key={brand.id}
//                     className="flex items-center gap-2 py-1 space-x-2 text-[#616161] text-sm"
//                   >
//                     <input
//                       type="radio"
//                       name="brand"
//                       checked={localBrand === brand.name}
//                       onChange={() => handleBrandChange(brand.name)}
//                       className="hidden"
//                     />
//                     <div
//                       className={`w-4 h-4 border-2 border-gray-400 rounded-full flex items-center justify-center ${
//                         localBrand === brand.name ? 'border-green-500' : ''
//                       }`}
//                     >
//                       {localBrand === brand.name && (
//                         <div className="w-2 h-2 bg-green-500 rounded-full"></div>
//                       )}
//                     </div>
//                     {brand.name}
//                   </label>
//                 ))
//               ) : (
//                 <div className="py-2 text-gray-500">No brands available</div>
//               )}
//             </div>
//           </div>

//           <div className="px-3 pb-3 pt-16">
//             <h3 className="text-base font-medium border-b-4 border-primary inline-block pb-1">
//               Category
//             </h3>
//             <div className="space-y-2 mt-4">
//               {availableCategories?.map((category, index) => {
//                 // Get category name, handling both string and object cases
//                 const categoryName =
//                   typeof category === 'string' ? category : category.name;
//                 const categoryId =
//                   typeof category === 'string' ? category : category.id;

//                 return (
//                   <label
//                     key={index}
//                     className="flex items-center gap-3 py-[5px] space-x-2 text-sm"
//                   >
//                     <input
//                       type="checkbox"
//                       checked={localCategories.includes(
//                         categoryName || categoryId
//                       )}
//                       onChange={() =>
//                         handleCategoryChange(categoryName || categoryId)
//                       }
//                       className="hidden"
//                     />
//                     <div
//                       className={`w-5 h-5 cursor-pointer rounded border-2 border-gray-400 flex items-center justify-center ${
//                         localCategories.includes(categoryName || categoryId)
//                           ? 'bg-secondary border-secondary'
//                           : 'bg-white'
//                       }`}
//                     >
//                       {localCategories.includes(
//                         categoryName || categoryId
//                       ) && <TickIcon />}
//                     </div>
//                     {categoryName || 'Unknown Category'}
//                   </label>
//                 );
//               })}
//             </div>
//           </div>
//         </div>
        
//         {/* Apply Button */}
//         <div className="sticky bottom-0 bg-white p-4 border-t">
//           <button 
//             onClick={applyFilters}
//             className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90 transition-colors"
//           >
//             Apply Filters
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default FilterSidebar;

import { useEffect, useState } from 'react';
import { TickIcon } from '../icons/Icons';
import useBrand from '@/hooks/brand.hooks';

interface FilterSidebarProps {
  onFilterChange: (filters: Filters) => void;
  onClose: () => void;
  isOpen: boolean;
  availableCategories: any[]; // Changed to any[] to accommodate objects
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
    const categoryName = typeof category === 'string' ? category : category.name;
    
    setLocalCategories((prev: any) =>
      prev.includes(categoryName)
        ? prev.filter((c: any) => c !== categoryName)
        : [...prev, categoryName]
    );
  };

  // Apply filters function - only called when Apply button is clicked
  const applyFilters = () => {
    // Update parent component states
    setSelectedBrand(localBrand);
    setSelectedCategories(localCategories);
    
    // Create and apply filters
    const currentFilters: Filters = {};
    
    // Add both name and ID for brand
    if (localBrand && selectedBrandObject) {
      currentFilters.brand = localBrand; // For display purposes
      currentFilters.brandId = selectedBrandObject.id; // For API
    }
    
    // Add both names and IDs for categories
    if (localCategories && localCategories.length > 0) {
      currentFilters.category = localCategories; // For display
      
      // Get IDs for all selected categories
      const categoryIds = localCategories.map((catName: string) => {
        const category = availableCategories.find(
          (c) => (typeof c === 'string' ? c : c.name) === catName
        );
        return typeof category === 'string' ? category : category?.id;
      }).filter(Boolean);
      
      currentFilters.categoryIds = categoryIds;
    }
    
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
                // Get category name, handling both string and object cases
                const categoryName =
                  typeof category === 'string' ? category : category.name;
                const categoryId =
                  typeof category === 'string' ? category : category.id;

                return (
                  <label
                    key={index}
                    className="flex items-center gap-3 py-[5px] space-x-2 text-sm"
                  >
                    <input
                      type="checkbox"
                      checked={localCategories.includes(categoryName)}
                      onChange={() => handleCategoryChange(category)}
                      className="hidden"
                    />
                    <div
                      className={`w-5 h-5 cursor-pointer rounded border-2 border-gray-400 flex items-center justify-center ${
                        localCategories.includes(categoryName)
                          ? 'bg-secondary border-secondary'
                          : 'bg-white'
                      }`}
                    >
                      {localCategories.includes(categoryName) && <TickIcon />}
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