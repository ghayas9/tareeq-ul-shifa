
// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import Link from 'next/link';
// import Layout from '@/components/layout/Layout';
// import { useProduct } from '@/hooks/product.hook';
// import { useCategory } from '@/hooks/category.hooks';
// import Breadcrumb from '@/components/common/BreadCrumb';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import Pagination from '@/components/common/Pagination';
// import FilterSidebar from '@/components/common/Filter';
// import Dropdown from '@/components/common/Dropdown';
// import { FilterIcon, CartIcons } from '@/components/icons/Icons';
// import DiscountBadge from '@/components/common/DiscountBadge';
// import { useCart } from '@/hooks/cart.hook';
// import { toggleCartSidebar } from '@/redux/slices/cartSlice';
// import { useDispatch } from 'react-redux';
// import { motion } from 'framer-motion';
// import toast from 'react-hot-toast';
// import { calculateDiscount } from '../../../utils/discountPrice';

// const ProductCategory = () => {
//   const router = useRouter();
//   const { category: categoryId, search, brand } = router.query;
//   const dispatch = useDispatch<any>();
  
//   // States
//   const [currentCategory, setCurrentCategory] = useState<any>(null);
//   const [itemsPerPage, setItemsPerPage] = useState(10);
//   const [isFilterOpen, setIsFilterOpen] = useState(false);
//   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
//   const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
//   const [priceRange, setPriceRange] = useState<{ min: number; max: number }>({
//     min: 0,
//     max: 1000,
//   });
//   const [selectedPrice, setSelectedPrice] = useState<number[]>([0, 1000]);
//   const [sortOption, setSortOption] = useState<string>('createdAt');
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
//   const [filters, setFilters] = useState<any>({});
  
//   // Hooks
//   const { products, pagination, isLoading, getAllProducts, changePage } = useProduct();
//   const { categories, getAllCategories } = useCategory();
//   const { addItemToCart } = useCart();

//   // Calculate filter count for the UI
//   const filterCount =
//     selectedCategories.length +
//     (selectedBrand ? 1 : 0) +
//     (selectedPrice[0] > 0 || selectedPrice[1] < priceRange.max ? 1 : 0);

//   // Available brands - you might want to fetch this from your API
//   const availableBrands = [
//     'GSK',
//     'Handural',
//     'Cenutra',
//     'Nestle',
//     'Nutriforce',
//     'Pfizer',
//     'Abbott',
//     'Sanofi',
//     'Novartis',
//     'Hamdard Pakistan',
//   ];

//   // Sort options
//   const sortOptions = [
//     { label: 'Newest First', value: 'createdAt:desc' },
//     { label: 'Oldest First', value: 'createdAt:asc' },
//     { label: 'Price: Low to High', value: 'price:asc' },
//     { label: 'Price: High to Low', value: 'price:desc' },
//     { label: 'Top Selling', value: 'topSell:desc' },
//     { label: 'Highest Discount', value: 'discount:desc' },
//   ];

//   // Load categories on component mount
//   useEffect(() => {
//     getAllCategories();
//   }, []);

//   // Find the category details from the categories list
//   useEffect(() => {
//     // Only proceed if we have categories and a categoryId
//     if (categories?.length > 0 && categoryId) {
//       const catId = typeof categoryId === 'string' ? categoryId : categoryId[0];
      
//       // Find the category in the categories array
//       const foundCategory = categories.find(cat => {
//         const id = typeof cat === 'object' && cat !== null ? cat.id : cat;
//         return id === catId;
//       });
      
//       if (foundCategory) {
//         setCurrentCategory(foundCategory);
        
//         // Set initial selected categories
//         setSelectedCategories([catId]);
//       }
//     }
//   }, [categories, categoryId]);

//   // Initialize filters from URL params
//   useEffect(() => {
//     if (router.isReady) {
//       const initialFilters: any = {};
      
//       if (categoryId) {
//         initialFilters.category = categoryId;
//         const catId = typeof categoryId === 'string' ? categoryId : categoryId[0];
//         setSelectedCategories([catId]);
//       }
      
//       if (brand) {
//         initialFilters.brand = brand;
//         setSelectedBrand(typeof brand === 'string' ? brand : brand[0]);
//       }
      
//       if (search) {
//         initialFilters.search = search;
//       }
      
//       if (router.query.minPrice || router.query.maxPrice) {
//         const min = router.query.minPrice ? parseInt(router.query.minPrice as string) : 0;
//         const max = router.query.maxPrice ? parseInt(router.query.maxPrice as string) : priceRange.max;
//         setSelectedPrice([min, max]);
//         initialFilters.minPrice = min;
//         initialFilters.maxPrice = max;
//       }
      
//       if (router.query.sort) {
//         const sortValue = router.query.sort as string;
//         setSortOption(sortValue);
//       }
      
//       if (router.query.order) {
//         setSortOrder(router.query.order as 'asc' | 'desc');
//       }

//       // Set page from URL if available
//       const page = router.query.page ? parseInt(router.query.page as string) : 1;
//       const limit = router.query.limit ? parseInt(router.query.limit as string) : itemsPerPage;
      
//       // Update pagination if needed
//       if (page !== pagination?.currentPage) {
//         changePage(page);
//       }

//       if (limit !== itemsPerPage) {
//         setItemsPerPage(limit);
//       }
      
//       setFilters(initialFilters);
//     }
//   }, [router.isReady, router.query]);

//   // Fetch products when filters or pagination changes
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         // Determine sort and order from sortOption
//         let sort = sortOption;
//         let order = sortOrder;
        
//         if (sortOption.includes(':')) {
//           const [sortField, sortDirection] = sortOption.split(':');
//           sort = sortField;
//           order = sortDirection as 'asc' | 'desc';
//         }
        
//         await getAllProducts({
//           page: pagination?.currentPage || 1,
//           limit: itemsPerPage,
//           sort,
//           order,
//           ...filters,
//         });
//       } catch (error) {
//         console.error('Error fetching products:', error);
//       }
//     };

//     if (Object.keys(filters).length > 0 || pagination?.currentPage !== 1) {
//       fetchProducts();
//     }
//   }, [filters, pagination?.currentPage, itemsPerPage, sortOption, sortOrder]);

//   // Handle page changes
//   const handlePageChange = (page: number) => {
//     changePage(page);
//     // Update URL with page number
//     router.push({
//       pathname: router.pathname,
//       query: { ...router.query, page },
//     }, undefined, { shallow: true });
//   };

//   // Handle items per page changes
//   const handleItemsPerPageChange = (perPage: number) => {
//     setItemsPerPage(perPage);
//     // Reset to page 1 when changing items per page
//     changePage(1);
//     // Update URL with limit
//     router.push({
//       pathname: router.pathname,
//       query: { ...router.query, limit: perPage, page: 1 },
//     }, undefined, { shallow: true });
//   };

//   // Handle filter changes from sidebar
//   const handleFilterChange = (selectedFilters: any) => {
//     // Transform filters to match API's expected format
//     const apiFilters: any = { ...filters };
    
//     // Add category filter if present
//     if (selectedFilters.category && selectedFilters.category.length > 0) {
//       apiFilters.category = selectedFilters.category.join(',');
//     } else {
//       delete apiFilters.category;
//     }
    
//     // Add brand filter if present
//     if (selectedFilters.brand) {
//       apiFilters.brand = selectedFilters.brand;
//     } else {
//       delete apiFilters.brand;
//     }
    
//     // Add price filter if present
//     if (selectedFilters.price && 
//         (selectedFilters.price.min > 0 || selectedFilters.price.max < priceRange.max)) {
//       apiFilters.minPrice = selectedFilters.price.min;
//       apiFilters.maxPrice = selectedFilters.price.max;
//     } else {
//       delete apiFilters.minPrice;
//       delete apiFilters.maxPrice;
//     }
    
//     setFilters(apiFilters);
    
//     // Reset to page 1 when changing filters
//     changePage(1);
    
//     // Update URL with filters
//     router.push({
//       pathname: router.pathname,
//       query: { 
//         ...router.query, 
//         ...apiFilters,
//         page: 1 
//       },
//     }, undefined, { shallow: true });
//   };

//   // Handle sort selection
//   const handleSortChange = (value: string) => {
//     setSortOption(value);
    
//     if (value.includes(':')) {
//       const [sortField, sortDirection] = value.split(':');
//       setSortOrder(sortDirection as 'asc' | 'desc');
      
//       // Update URL with sort parameters
//       router.push({
//         pathname: router.pathname,
//         query: { 
//           ...router.query, 
//           sort: sortField,
//           order: sortDirection
//         },
//       }, undefined, { shallow: true });
//     }
//   };

//   // Format price range for display
//   const formatPriceRange = (priceRange: number[]) => {
//     return `Rs ${priceRange[0]} - Rs ${priceRange[1]}`;
//   };

//   // Clear all filters
//   const handleClearFilters = () => {
//     setSelectedCategories([]);
//     setSelectedBrand(null);
//     setSelectedPrice([0, priceRange.max]);
    
//     // Keep only pagination params
//     const query = { 
//       page: router.query.page,
//       limit: router.query.limit
//     };
    
//     router.push({
//       pathname: router.pathname,
//       query,
//     }, undefined, { shallow: true });
    
//     setFilters({});
//   };

//   // Remove a specific filter
//   const removeFilter = (type: string, value: string | number) => {
//     if (type === 'category') {
//       const newCategories = selectedCategories.filter((category) => category !== value);
//       setSelectedCategories(newCategories);
      
//       // Update filters
//       const newFilters = { ...filters };
//       if (newCategories.length === 0) {
//         delete newFilters.category;
//       } else {
//         newFilters.category = newCategories.join(',');
//       }
//       setFilters(newFilters);
      
//       // Update URL
//       router.push({
//         pathname: router.pathname,
//         query: { 
//           ...router.query, 
//           category: newCategories.length > 0 ? newCategories.join(',') : undefined 
//         },
//       }, undefined, { shallow: true });
//     } else if (type === 'brand') {
//       setSelectedBrand(null);
      
//       // Update filters
//       const newFilters = { ...filters };
//       delete newFilters.brand;
//       setFilters(newFilters);
      
//       // Update URL
//       const query = { ...router.query };
//       delete query.brand;
//       router.push({
//         pathname: router.pathname,
//         query,
//       }, undefined, { shallow: true });
//     } else if (type === 'price') {
//       setSelectedPrice([0, priceRange.max]);
      
//       // Update filters
//       const newFilters = { ...filters };
//       delete newFilters.minPrice;
//       delete newFilters.maxPrice;
//       setFilters(newFilters);
      
//       // Update URL
//       const query = { ...router.query };
//       delete query.minPrice;
//       delete query.maxPrice;
//       router.push({
//         pathname: router.pathname,
//         query,
//       }, undefined, { shallow: true });
//     }
//   };

//   // Handle adding item to cart
//   const handleAddToCart = async (e: React.MouseEvent, product: any) => {
//     e.preventDefault();

//     if (product.quantity === 0) {
//       toast.error('This product is out of stock');
//       return;
//     }

//     try {
//       await addItemToCart({
//         productId: product.id,
//         quantity: 1,
//       });

//       // Open the cart sidebar after adding the item
//       dispatch(toggleCartSidebar());
//     } catch (error) {
//       console.error('Failed to add item to cart:', error);
//     }
//   };

//   // Get category name for display
//   const getCategoryName = (categoryId: string) => {
//     const category = categories.find(cat => {
//       const id = typeof cat === 'object' && cat !== null ? cat.id : cat;
//       return id === categoryId;
//     });
    
//     return typeof category === 'object' && category !== null ? category.name : categoryId;
//   };

//   // Create an array of placeholders for skeleton loading
//   const skeletonPlaceholders = Array(itemsPerPage).fill(0);

//   // Process categories for the filter sidebar
//   const processedCategories = Array.isArray(categories) 
//     ? categories.map((cat) =>
//         typeof cat === 'object' ? cat : { id: cat, name: cat }
//       )
//     : [];

//   return (
//     <Layout>
//       <div className="w-full bg-gray-50 px-4 pt-10 pb-8">
//         <div className="px-3">
//           <Breadcrumb />
//         </div>
        
//         {/* Category title */}
//         {currentCategory && (
//           <div className="text-center my-6">
//             <h1 className="text-3xl font-semibold text-primary">
//               {typeof currentCategory === 'object' && currentCategory !== null ? currentCategory.name : getCategoryName(currentCategory)}
//             </h1>
//             {/* {typeof currentCategory === 'object' && currentCategory !== null && currentCategory.description && (
//               <p className="mt-2 text-gray-600">{currentCategory.description}</p>
//             )} */}
//           </div>
//         )}
        
//         <div className="flex justify-between items-center px-2">
//           <div className="flex items-center gap-1">
//             <FilterIcon />
//             <button
//               onClick={() => setIsFilterOpen(true)}
//               className="p-2 text-sm"
//             >
//               Filters
//             </button>
//           </div>
//           <FilterSidebar
//             isOpen={isFilterOpen}
//             onClose={() => setIsFilterOpen(false)}
//             onFilterChange={handleFilterChange}
//             availableBrands={availableBrands}
//             availableCategories={processedCategories}
//             selectedPrice={selectedPrice}
//             setSelectedPrice={setSelectedPrice}
//             priceRange={priceRange}
//             selectedCategories={selectedCategories}
//             setSelectedCategories={setSelectedCategories}
//             selectedBrand={selectedBrand}
//             setSelectedBrand={setSelectedBrand}
//           />
//           <Dropdown
//             className="!w-[213px]"
//             options={sortOptions.map((option) => ({
//               label: option.label,
//               value: option.value,
//             }))}
//             onSelect={handleSortChange}
//             placeholder={sortOption}
//           />
//         </div>
        
//         <div className="px-3 mt-3 flex items-center gap-3 text-sm text-gray-600">
//           {selectedCategories.length > 0 && (
//             <div className="flex items-center gap-2">
//               {selectedCategories.map((category) => {
//                 // Find category name from ID
//                 const displayName = getCategoryName(category);
                
//                 return (
//                   <div
//                     key={category}
//                     className="flex items-center gap-1 px-2 py-1"
//                   >
//                     <span className="text-primary">|</span>
//                     <button
//                       onClick={() => removeFilter('category', category)}
//                       className="text-primary text-xs"
//                     >
//                       X
//                     </button>
//                     <span>{displayName}</span>
//                   </div>
//                 );
//               })}
//             </div>
//           )}

//           {selectedBrand && (
//             <div className="flex items-center gap-2">
//               <span className="text-primary">|</span>
//               <button
//                 onClick={() => removeFilter('brand', selectedBrand)}
//                 className="text-primary text-xs"
//               >
//                 X
//               </button>
//               <div className="flex items-center gap-1 px-2 py-1">
//                 <span>{selectedBrand}</span>
//               </div>
//             </div>
//           )}

//           {selectedPrice && selectedPrice[0] > 0 && (
//             <div className="flex items-center gap-2">
//               <span className="text-primary">|</span>
//               <button
//                 onClick={() => removeFilter('price', selectedPrice as any)}
//                 className="text-primary text-xs"
//               >
//                 X
//               </button>
//               <span>Price</span>
//               <div className="flex items-center gap-1 p-1">
//                 <span>{formatPriceRange(selectedPrice)}</span>
//               </div>
//             </div>
//           )}
          
//           {filterCount > 0 && (
//             <div className="flex justify-end">
//               <button
//                 onClick={handleClearFilters}
//                 className="text-sm text-white bg-primary px-4 py-1 rounded-lg"
//               >
//                 Clear Filters ({filterCount})
//               </button>
//             </div>
//           )}
//         </div>

//         {/* Products Grid */}
//         <div className="flex w-full flex-wrap">
//           {isLoading
//             ? skeletonPlaceholders.map((_, index) => (
//                 <div
//                   key={index}
//                   className="flex lg:w-1/5 md:w-1/3 sm:w-1/2 w-full my-5"
//                 >
//                   <div className="px-[6px] w-full">
//                     <div className="relative">
//                       <div className="flex relative p-4 rounded-[10px] shadow-sm h-[218px] justify-center items-center bg-white">
//                         <Skeleton width={120} height={120} />
//                         <div className="absolute top-2 right-2">
//                           <Skeleton width={40} height={20} />
//                         </div>
//                       </div>
//                       <Skeleton width="85%" height={25} className="mt-3" />
//                       <div className="mt-1 flex">
//                         <Skeleton width={50} height={16} className="mr-2" />
//                         <Skeleton width={70} height={16} />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             : products?.map((product: any) => {
//                 const discount = calculateDiscount(
//                   product.originalPrice,
//                   product.price
//                 );

//                 return (
//                   <div
//                     key={product.id}
//                     className="flex lg:w-1/5 md:w-1/3 sm:w-1/2 w-full my-5"
//                   >
//                     <Link href={`/products/${product?.id}`} className="w-full">
//                       <div className="px-[6px] w-full h-full">
//                         <div className="relative group flex flex-col h-full">
//                           <div className="flex relative p-4 rounded-[10px] hover:shadow-xl shadow-sm h-[218px] justify-center items-center bg-white">
//                             {product.quantity === 0 && (
//                               <span className="absolute top-2 left-2 bg-red-200 w-[105px] text-center flex justify-center items-center h-[24px] text-red-600 text-sm font-medium rounded">
//                                 Out of Stock
//                               </span>
//                             )}
//                             <img
//                               src={product.image || '/images/placeholder-product.png'}
//                               alt={product.name}
//                               className="h-32 w-auto object-contain max-w-full"
//                             />
//                             {discount && discount > 0 && (
//                               <DiscountBadge discountPercentage={discount} />
//                             )}
//                             <div className="absolute bottom-4 right-2 transform -translate-x-1/2 translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out flex space-x-3">
//                               <button
//                                 onClick={(e) => handleAddToCart(e, product)}
//                                 disabled={product.quantity === 0}
//                                 className={`${
//                                   product.quantity === 0
//                                     ? 'bg-gray-400 cursor-not-allowed'
//                                     : 'bg-primary hover:bg-primary/90'
//                                 } text-white p-2 rounded-[4px] shadow-md`}
//                               >
//                                 <CartIcons />
//                               </button>
//                             </div>
//                           </div>
//                           <div className="flex flex-col flex-grow">
//                             <h3 className="text-base mt-3 line-clamp-2 overflow-hidden">
//                               {product.name}
//                             </h3>
//                             <div className="mt-1 flex items-center">
//                               {product.originalPrice ? (
//                                 <span className="text-gray-400 text-sm line-through mr-2">
//                                   Rs {product.originalPrice}
//                                 </span>
//                               ) : (
//                                 <span className="mr-2">&nbsp;</span>
//                               )}
//                               <span className="text-normalGreen font-semibold text-lg">
//                                 Rs {product.price}
//                               </span>
//                             </div>
//                           </div>
//                         </div>
//                       </div>
//                     </Link>
//                   </div>
//                 );
//               })}
//         </div>

//         {/* Show message when no products found */}
//         {!isLoading && (!products || products.length === 0) && (
//           <div className="w-full py-10 text-center">
//             <h3 className="text-xl text-gray-500">No products found</h3>
//             <p className="mt-2 text-gray-400">
//               Try adjusting your filters or search criteria
//             </p>
//           </div>
//         )}

//         {/* Pagination Component */}
//         {!isLoading && products && products.length > 0 && (
//           <div className="px-3 mt-6">
//             <Pagination
//               currentPage={pagination?.currentPage || 1}
//               totalPages={pagination?.totalPages || 1}
//               itemsPerPage={itemsPerPage}
//               totalItems={pagination?.total || products.length || 0}
//               onPageChange={handlePageChange}
//               onItemsPerPageChange={handleItemsPerPageChange}
//               itemsPerPageOptions={[5, 10, 20, 30, 50]}
//               showItemsPerPage={true}
//             />
//           </div>
//         )}
//       </div>
//     </Layout>
//   );
// };

// export default ProductCategory;


import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/hooks/product.hook';
import { useCategory } from '@/hooks/category.hooks';
import Breadcrumb from '@/components/common/BreadCrumb';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Pagination from '@/components/common/Pagination';
import FilterSidebar from '@/components/common/Filter';
import Dropdown from '@/components/common/Dropdown';
import { FilterIcon, CartIcons } from '@/components/icons/Icons';
import DiscountBadge from '@/components/common/DiscountBadge';
import { useCart } from '@/hooks/cart.hook';
import { toggleCartSidebar } from '@/redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';
import { calculateDiscount } from '../../../utils/discountPrice';

const ProductCategory = () => {
  const router = useRouter();
  const { category: categoryId, search, brand } = router.query;
  const dispatch = useDispatch<any>();
  
  // States
  const [currentCategory, setCurrentCategory] = useState<any>(null);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [filters, setFilters] = useState<any>({});
  
  // Hooks
  const { products, pagination, isLoading, getAllProducts, changePage } = useProduct();
  const { categories, getAllCategories } = useCategory();
  const { addItemToCart } = useCart();

  // Calculate filter count for the UI
  const filterCount = selectedCategories.length + (selectedBrand ? 1 : 0);

  // Sort options
  const sortOptions = [
    { label: 'Newest First', value: 'createdAt:desc' },
    { label: 'Oldest First', value: 'createdAt:asc' },
    { label: 'Price: Low to High', value: 'price:asc' },
    { label: 'Price: High to Low', value: 'price:desc' },
    { label: 'Top Selling', value: 'topSell:desc' },
    { label: 'Highest Discount', value: 'discount:desc' },
  ];

  // Load categories on component mount
  useEffect(() => {
    getAllCategories();
  }, []);

  // Find the category details from the categories list
  useEffect(() => {
    // Only proceed if we have categories and a categoryId
    if (categories?.length > 0 && categoryId) {
      const catId = typeof categoryId === 'string' ? categoryId : categoryId[0];
      
      // Find the category in the categories array
      const foundCategory = categories.find(cat => {
        const id = typeof cat === 'object' && cat !== null ? cat.id : cat;
        return id === catId;
      });
      
      if (foundCategory) {
        setCurrentCategory(foundCategory);
        
        // Set initial selected categories
        setSelectedCategories([catId]);
      }
    }
  }, [categories, categoryId]);

  // Initialize filters from URL params
  useEffect(() => {
    if (router.isReady) {
      const initialFilters: any = {};
      
      if (categoryId) {
        initialFilters.category = categoryId;
        const catId = typeof categoryId === 'string' ? categoryId : categoryId[0];
        setSelectedCategories([catId]);
      }
      
      if (brand) {
        initialFilters.brand = brand;
        setSelectedBrand(typeof brand === 'string' ? brand : brand[0]);
      }
      
      if (search) {
        initialFilters.search = search;
      }
      
      if (router.query.sort) {
        const sortValue = router.query.sort as string;
        setSortOption(sortValue);
      }
      
      if (router.query.order) {
        setSortOrder(router.query.order as 'asc' | 'desc');
      }

      // Set page from URL if available
      const page = router.query.page ? parseInt(router.query.page as string) : 1;
      const limit = router.query.limit ? parseInt(router.query.limit as string) : itemsPerPage;
      
      // Update pagination if needed
      if (page !== pagination?.currentPage) {
        changePage(page);
      }

      if (limit !== itemsPerPage) {
        setItemsPerPage(limit);
      }
      
      setFilters(initialFilters);
    }
  }, [router.isReady, router.query]);

  // Fetch products when filters or pagination changes
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Determine sort and order from sortOption
        let sort = sortOption;
        let order = sortOrder;
        
        if (sortOption.includes(':')) {
          const [sortField, sortDirection] = sortOption.split(':');
          sort = sortField;
          order = sortDirection as 'asc' | 'desc';
        }
        
        await getAllProducts({
          page: pagination?.currentPage || 1,
          limit: itemsPerPage,
          sort,
          order,
          ...filters,
        });
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    if (Object.keys(filters).length > 0 || pagination?.currentPage !== 1) {
      fetchProducts();
    }
  }, [filters, pagination?.currentPage, itemsPerPage, sortOption, sortOrder]);

  // Handle page changes
  const handlePageChange = (page: number) => {
    changePage(page);
    // Update URL with page number
    router.push({
      pathname: router.pathname,
      query: { ...router.query, page },
    }, undefined, { shallow: true });
  };

  // Handle items per page changes
  const handleItemsPerPageChange = (perPage: number) => {
    setItemsPerPage(perPage);
    // Reset to page 1 when changing items per page
    changePage(1);
    // Update URL with limit
    router.push({
      pathname: router.pathname,
      query: { ...router.query, limit: perPage, page: 1 },
    }, undefined, { shallow: true });
  };

  // Handle filter changes from sidebar
  const handleFilterChange = (selectedFilters: any) => {
    // Transform filters to match API's expected format
    const apiFilters: any = { ...filters };
    
    // Add category filter if present
    if (selectedFilters.category && selectedFilters.category.length > 0) {
      apiFilters.category = selectedFilters.category.join(',');
    } else {
      delete apiFilters.category;
    }
    
    // Add brand filter if present
    if (selectedFilters.brand) {
      apiFilters.brand = selectedFilters.brand;
    } else {
      delete apiFilters.brand;
    }
    
    setFilters(apiFilters);
    
    // Reset to page 1 when changing filters
    changePage(1);
    
    // Update URL with filters
    router.push({
      pathname: router.pathname,
      query: { 
        ...router.query, 
        ...apiFilters,
        page: 1 
      },
    }, undefined, { shallow: true });
  };

  // Handle sort selection
  const handleSortChange = (value: string) => {
    setSortOption(value);
    
    if (value.includes(':')) {
      const [sortField, sortDirection] = value.split(':');
      setSortOrder(sortDirection as 'asc' | 'desc');
      
      // Update URL with sort parameters
      router.push({
        pathname: router.pathname,
        query: { 
          ...router.query, 
          sort: sortField,
          order: sortDirection
        },
      }, undefined, { shallow: true });
    }
  };

  // Clear all filters
  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrand(null);
    
    // Keep only pagination params
    const query = { 
      page: router.query.page,
      limit: router.query.limit
    };
    
    router.push({
      pathname: router.pathname,
      query,
    }, undefined, { shallow: true });
    
    setFilters({});
  };

  // Remove a specific filter
  const removeFilter = (type: string, value: string | number) => {
    if (type === 'category') {
      const newCategories = selectedCategories.filter((category) => category !== value);
      setSelectedCategories(newCategories);
      
      // Update filters
      const newFilters = { ...filters };
      if (newCategories.length === 0) {
        delete newFilters.category;
      } else {
        newFilters.category = newCategories.join(',');
      }
      setFilters(newFilters);
      
      // Update URL
      router.push({
        pathname: router.pathname,
        query: { 
          ...router.query, 
          category: newCategories.length > 0 ? newCategories.join(',') : undefined 
        },
      }, undefined, { shallow: true });
    } else if (type === 'brand') {
      setSelectedBrand(null);
      
      // Update filters
      const newFilters = { ...filters };
      delete newFilters.brand;
      setFilters(newFilters);
      
      // Update URL
      const query = { ...router.query };
      delete query.brand;
      router.push({
        pathname: router.pathname,
        query,
      }, undefined, { shallow: true });
    }
  };

  // Handle adding item to cart
  const handleAddToCart = async (e: React.MouseEvent, product: any) => {
    e.preventDefault();

    if (product.quantity === 0) {
      toast.error('This product is out of stock');
      return;
    }

    try {
      await addItemToCart({
        productId: product.id,
        quantity: 1,
      });

      // Open the cart sidebar after adding the item
      dispatch(toggleCartSidebar());
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  // Get category name for display
  const getCategoryName = (categoryId: string) => {
    const category = categories.find(cat => {
      const id = typeof cat === 'object' && cat !== null ? cat.id : cat;
      return id === categoryId;
    });
    
    return typeof category === 'object' && category !== null ? category.name : categoryId;
  };

  // Create an array of placeholders for skeleton loading
  const skeletonPlaceholders = Array(itemsPerPage).fill(0);

  // Process categories for the filter sidebar
  const processedCategories = Array.isArray(categories) 
    ? categories.map((cat) =>
        typeof cat === 'object' ? cat : { id: cat, name: cat }
      )
    : [];

  return (
    <Layout>
      <div className="w-full bg-gray-50 px-4 pt-10 pb-8">
        <div className="px-3">
          <Breadcrumb />
        </div>
        
        {/* Category title */}
        {currentCategory && (
          <div className="text-center my-6">
            <h1 className="text-3xl font-semibold text-primary">
              {typeof currentCategory === 'object' && currentCategory !== null ? currentCategory.name : getCategoryName(currentCategory)}
            </h1>
            {/* {typeof currentCategory === 'object' && currentCategory !== null && currentCategory.description && (
              <p className="mt-2 text-gray-600">{currentCategory.description}</p>
            )} */}
          </div>
        )}
        
        <div className="flex justify-between items-center px-2">
          <div className="flex items-center gap-1">
            <FilterIcon />
            <button
              onClick={() => setIsFilterOpen(true)}
              className="p-2 text-sm"
            >
              Filters
            </button>
          </div>
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            onFilterChange={handleFilterChange}
            availableCategories={processedCategories}
            selectedCategories={selectedCategories}
            setSelectedCategories={setSelectedCategories}
            selectedBrand={selectedBrand}
            setSelectedBrand={setSelectedBrand}
          />
          <Dropdown
            className="!w-[213px]"
            options={sortOptions.map((option) => ({
              label: option.label,
              value: option.value,
            }))}
            onSelect={handleSortChange}
            placeholder={sortOption}
          />
        </div>
        
        <div className="px-3 mt-3 flex items-center gap-3 text-sm text-gray-600">
          {selectedCategories.length > 0 && (
            <div className="flex items-center gap-2">
              {selectedCategories.map((category) => {
                // Find category name from ID
                const displayName = getCategoryName(category);
                
                return (
                  <div
                    key={category}
                    className="flex items-center gap-1 px-2 py-1"
                  >
                    <span className="text-primary">|</span>
                    <button
                      onClick={() => removeFilter('category', category)}
                      className="text-primary text-xs"
                    >
                      X
                    </button>
                    <span>{displayName}</span>
                  </div>
                );
              })}
            </div>
          )}

          {selectedBrand && (
            <div className="flex items-center gap-2">
              <span className="text-primary">|</span>
              <button
                onClick={() => removeFilter('brand', selectedBrand)}
                className="text-primary text-xs"
              >
                X
              </button>
              <div className="flex items-center gap-1 px-2 py-1">
                <span>{selectedBrand}</span>
              </div>
            </div>
          )}
          
          {filterCount > 0 && (
            <div className="flex justify-end">
              <button
                onClick={handleClearFilters}
                className="text-sm text-white bg-primary px-4 py-1 rounded-lg"
              >
                Clear Filters ({filterCount})
              </button>
            </div>
          )}
        </div>

        {/* Products Grid */}
        <div className="flex w-full flex-wrap">
          {isLoading
            ? skeletonPlaceholders.map((_, index) => (
                <div
                  key={index}
                  className="flex lg:w-1/5 md:w-1/3 sm:w-1/2 w-full my-5"
                >
                  <div className="px-[6px] w-full">
                    <div className="relative">
                      <div className="flex relative p-4 rounded-[10px] shadow-sm h-[218px] justify-center items-center bg-white">
                        <Skeleton width={120} height={120} />
                        <div className="absolute top-2 right-2">
                          <Skeleton width={40} height={20} />
                        </div>
                      </div>
                      <Skeleton width="85%" height={25} className="mt-3" />
                      <div className="mt-1 flex">
                        <Skeleton width={50} height={16} className="mr-2" />
                        <Skeleton width={70} height={16} />
                      </div>
                    </div>
                  </div>
                </div>
              ))
            : products?.map((product: any) => {
                const discount = calculateDiscount(
                  product.originalPrice,
                  product.price
                );

                return (
                  <div
                    key={product.id}
                    className="flex lg:w-1/5 md:w-1/3 sm:w-1/2 w-full my-5"
                  >
                    <Link href={`/products/${product?.id}`} className="w-full">
                      <div className="px-[6px] w-full h-full">
                        <div className="relative group flex flex-col h-full">
                          <div className="flex relative p-4 rounded-[10px] hover:shadow-xl shadow-sm h-[218px] justify-center items-center bg-white">
                            {product.quantity === 0 && (
                              <span className="absolute top-2 left-2 bg-red-200 w-[105px] text-center flex justify-center items-center h-[24px] text-red-600 text-sm font-medium rounded">
                                Out of Stock
                              </span>
                            )}
                            <img
                              src={product.image || '/images/placeholder-product.png'}
                              alt={product.name}
                              className="h-32 w-auto object-contain max-w-full"
                            />
                            {discount && discount > 0 && (
                              <DiscountBadge discountPercentage={discount} />
                            )}
                            <div className="absolute bottom-4 right-2 transform -translate-x-1/2 translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out flex space-x-3">
                              <button
                                onClick={(e) => handleAddToCart(e, product)}
                                disabled={product.quantity === 0}
                                className={`${
                                  product.quantity === 0
                                    ? 'bg-gray-400 cursor-not-allowed'
                                    : 'bg-primary hover:bg-primary/90'
                                } text-white p-2 rounded-[4px] shadow-md`}
                              >
                                <CartIcons />
                              </button>
                            </div>
                          </div>
                          <div className="flex flex-col flex-grow">
                            <h3 className="text-base mt-3 line-clamp-2 overflow-hidden">
                              {product.name}
                            </h3>
                            <div className="mt-1 flex items-center">
                              {product.originalPrice ? (
                                <span className="text-gray-400 text-sm line-through mr-2">
                                  Rs {product.originalPrice}
                                </span>
                              ) : (
                                <span className="mr-2">&nbsp;</span>
                              )}
                              <span className="text-normalGreen font-semibold text-lg">
                                Rs {product.price}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              })}
        </div>

        {/* Show message when no products found */}
        {!isLoading && (!products || products.length === 0) && (
          <div className="w-full py-10 text-center">
            <h3 className="text-xl text-gray-500">No products found</h3>
            <p className="mt-2 text-gray-400">
              Try adjusting your filters or search criteria
            </p>
          </div>
        )}

        {/* Pagination Component */}
        {!isLoading && products && products.length > 0 && (
          <div className="px-3 mt-6">
            <Pagination
              currentPage={pagination?.currentPage || 1}
              totalPages={pagination?.totalPages || 1}
              itemsPerPage={itemsPerPage}
              totalItems={pagination?.total || products.length || 0}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              itemsPerPageOptions={[5, 10, 20, 30, 50]}
              showItemsPerPage={true}
            />
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ProductCategory;