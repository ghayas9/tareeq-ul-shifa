'use client';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Search from '@/components/common/Search';
import ExploreCategory from '@/components/ExploreCategory';
import FeaturesSection from '@/components/FeatureSection';
import HealthBanner from '@/components/HealthBanner';
import Layout from '@/components/layout/Layout';
import NewItems from '@/components/NewItems';
import PopularBrands from '@/components/PopularBrands';
import TopSellingItems from '@/components/TopSellingItems';
import { useProduct } from '@/hooks/product.hook';
import { useCategory } from '@/hooks/category.hooks';
import { useRouter } from 'next/router';
import { ProductQueryParams } from '@/types/productTypes';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
  MdClose,
} from 'react-icons/md';
import DiscountBadge from '@/components/common/DiscountBadge';
import { calculateDiscount } from '../../utils/discountPrice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useBrand from '@/hooks/brand.hooks';
import CategoriesProductsContainer from '@/components/CategoryProductsContainer';

const Home = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [categoryProducts, setCategoryProducts] = useState<
    Record<string, any[]>
  >({});
  const [featuredCategories, setFeaturedCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [topSellingProducts, setTopSellingProducts] = useState<any[]>([]);
  const [isTopSellingLoading, setIsTopSellingLoading] = useState(true);

  // Brand pagination states
  const [brandsCurrentPage, setBrandsCurrentPage] = useState(1);
  const [brandsItemsPerPage] = useState(12); // Show 12 brands per page
  const [brandsPagination, setBrandsPagination] = useState<{
    total: number;
    totalPages: number;
    currentPage: number;
  } | null>(null);
  const [isBrandsLoading, setIsBrandsLoading] = useState(true);

  const { getAllBrands, brands } = useBrand();

  const [categoryLoadingStates, setCategoryLoadingStates] = useState<
    Record<string, boolean>
  >({});

  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);

  const {
    products,
    getAllProducts,
    getTopSellingProducts,
    getProductsByCategory,
  } = useProduct();
  const { categories, getAllCategories } = useCategory();

  // Fetch brands with pagination
  useEffect(() => {
    const getBrands = async () => {
      setIsBrandsLoading(true);
      try {
        const response = await getAllBrands({
          page: brandsCurrentPage,
          limit: brandsItemsPerPage,
          status: 'active', // Only get active brands for homepage
        });

        // Extract pagination data from response if your API returns it
        if (response && typeof response === 'object' && 'total' in response) {
          setBrandsPagination({
            total: response.total,
            totalPages: response.totalPages,
            currentPage: response?.page,
          });
        }
      } catch (error) {
        console.error('Error fetching brands:', error);
      } finally {
        setIsBrandsLoading(false);
      }
    };

    getBrands();
  }, [brandsCurrentPage, brandsItemsPerPage]);

  useEffect(() => {
    const fetchInitialData = async () => {
      setIsLoading(true);

      try {
        await getAllCategories();

        await getAllProducts({
          limit: 20,
          status: 'active',
          sort: 'createdAt',
          order: 'desc',
        });
      } catch (error) {
        console.error('Error fetching initial data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialData();
  }, []);

  useEffect(() => {
    const fetchTopSellingData = async () => {
      setIsTopSellingLoading(true);

      try {
        const response = await getTopSellingProducts({
          limit: 10,
          status: 'active',
        });

        if (response?.payload?.data) {
          setTopSellingProducts(
            Array.isArray(response.payload.data)
              ? response.payload.data
              : [response.payload.data]
          );
        }
      } catch (error) {
        console.error('Error fetching top selling products:', error);
        setTopSellingProducts([]);
      } finally {
        setIsTopSellingLoading(false);
      }
    };

    fetchTopSellingData();
  }, []);

  useEffect(() => {
    if (!categories || categories.length === 0) return;

    const featured = categories.slice(0, 4);
    setFeaturedCategories(featured);

    const fetchCategoryProducts = async () => {
      const categoryProductsObj: Record<string, any[]> = {};

      // Initialize loading states for all categories at once
      const initialLoadingStates: Record<string, boolean> = {};
      featured.forEach((category) => {
        const categoryId =
          typeof category === 'object' ? category.id : category;
        initialLoadingStates[categoryId] = true;
      });
      setCategoryLoadingStates(initialLoadingStates);

      // Use Promise.all to fetch products for all categories in parallel
      await Promise.all(
        featured.map(async (category) => {
          try {
            const categoryId =
              typeof category === 'object' ? category.id : category;

            const params: ProductQueryParams = {
              limit: 10,
              status: 'active',
              category: categoryId,
            };

            const response = await getProductsByCategory({
              categoryId,
              params,
            });

            if (response?.payload?.data) {
              categoryProductsObj[categoryId] = Array.isArray(
                response.payload.data
              )
                ? response.payload.data
                : [response.payload.data];
            }

            setCategoryLoadingStates((prev) => ({
              ...prev,
              [categoryId]: false,
            }));
          } catch (error) {
            console.error(`Error fetching products for category:`, error);
            const categoryId =
              typeof category === 'object' ? category.id : category;
            setCategoryLoadingStates((prev) => ({
              ...prev,
              [categoryId]: false,
            }));
          }
        })
      );

      setCategoryProducts(categoryProductsObj);
    };

    fetchCategoryProducts();
  }, [categories, getProductsByCategory]);

  // Brand pagination handlers
  const handleBrandPageChange = (page: number) => {
    setBrandsCurrentPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);

    if (!value.trim()) {
      clearSearchResults();
    }
  };


  const handleClear = () => {
    setSearch("")
    setIsSearching(false)
    clearSearchResults();
  }

  const handleSearchSubmit = async () => {
    if (search.trim()) {
      setIsSearching(true);
      setShowSearchResults(true);

      try {
        const response = await getAllProducts({
          status: 'active',
          search: search.trim(),
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
      handleSearchSubmit();
    }
  };

  const clearSearchResults = () => {
    setShowSearchResults(false);
    setSearchResults([]);
    setSearch('');
  };

  // Handle prescription upload navigation
  const handlePrescriptionUpload = () => {
    router.push('/prescription');
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const headingVariants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 10,
        delay: 0.2,
      },
    },
  };

  const renderSearchResults = () => {
    if (!showSearchResults) return null;

    return (
      <motion.div
        className="w-full lg:max-w-[96%] max-w-[90%] mx-auto my-8 bg-white rounded-lg shadow-md p-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-medium">
            Search Results for "{search}"
          </h2>
          <motion.button
            className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200"
            onClick={clearSearchResults}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <MdClose /> Clear
          </motion.button>
        </div>

        {isSearching ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array(10)
              .fill(0)
              .map((_, index) => (
                <div key={index} className="h-full">
                  <Skeleton height={140} className="rounded-md mb-2" />
                  <Skeleton count={2} className="mb-1" />
                  <div className="flex gap-2 mt-2">
                    <Skeleton width={40} />
                    <Skeleton width={60} />
                  </div>
                </div>
              ))}
          </div>
        ) : searchResults.length === 0 ? (
          <div className="text-center py-10">
            <p className="text-gray-500">
              No products found matching "{search}"
            </p>
            <p className="text-gray-400 mt-2">
              Try different keywords or browse categories below
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {searchResults.map((product) => {
              const discount = calculateDiscount(
                product.originalPrice,
                product.price
              );
              return (
                <motion.div
                  key={product.id}
                  className="h-full"
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                >
                  <div
                    className="bg-white rounded-lg shadow-md p-3 h-full flex flex-col cursor-pointer"
                    onClick={() => router.push(`/products/${product.id}`)}
                  >
                    <div className="relative flex-shrink-0 h-32 flex items-center justify-center mb-2">
                      {product.quantity === 0 && (
                        <span className="absolute top-0 left-0 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
                          Out of Stock
                        </span>
                      )}
                      {discount && (
                        <DiscountBadge discountPercentage={discount} />
                      )}
                      <img
                        src={product.image || '/images/placeholder-product.png'}
                        alt={product.name}
                        className="h-full w-auto object-contain max-w-full"
                      />
                    </div>

                    <div className="flex-grow">
                      <h3 className="text-sm font-medium line-clamp-2 mb-1">
                        {product.name}
                      </h3>
                      <p className="text-xs text-gray-500 mb-2">
                        {product.brand}
                      </p>
                      <div className="flex items-center">
                        {product.originalPrice && (
                          <span className="text-gray-400 text-xs line-through mr-2">
                            Rs {product.originalPrice}
                          </span>
                        )}
                        <span className="text-green-600 font-semibold">
                          Rs {product.price}
                        </span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </motion.div>
    );
  };

  // Render Popular Brands section with pagination
  const renderPopularBrands = () => {
    const totalBrands = brandsPagination?.total || 0;
    const totalPages = brandsPagination?.totalPages || 1;
    const currentPage = brandsPagination?.currentPage || brandsCurrentPage;

    return (
      <motion.div className="w-full mt-12 mx-auto" variants={itemVariants}>
        <motion.h1
          className="text-[28px] font-medium text-center"
          variants={headingVariants}
        >
          Popular Brands
        </motion.h1>

        {/* Brands Grid */}
        <motion.div
          className="w-full flex flex-wrap justify-center px-4 my-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isBrandsLoading ? (
            // Loading skeleton
            Array(12)
              .fill(0)
              .map((_, index) => (
                <div
                  key={index}
                  className="lg:w-1/6 my-4 md:w-1/4 sm:w-1/3 w-1/2 px-2"
                >
                  <div className="bg-white rounded-lg shadow-md p-4 h-32">
                    <Skeleton height={80} className="rounded-md mb-2" />
                    <Skeleton count={1} />
                  </div>
                </div>
              ))
          ) : brands && brands.length > 0 ? (
            brands.map((brand, index) => (
              <motion.div
                key={brand.id}
                className="lg:w-1/6 my-4 md:w-1/4 sm:w-1/3 w-1/2 px-2"
                variants={itemVariants}
                custom={index}
                transition={{
                  delay: index * 0.1,
                  type: 'spring',
                  stiffness: 100,
                  damping: 12,
                }}
              >
                <PopularBrands
                  id={brand.id}
                  name={brand.name}
                  logo={brand.logo as any}
                  discount={`${brand.discount}% Off`}
                />
              </motion.div>
            ))
          ) : (
            <div className="text-center py-10 w-full">
              <p className="text-gray-500">No brands available</p>
            </div>
          )}
        </motion.div>

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <motion.div
            className="flex justify-center items-center gap-4 mt-8 mb-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.button
              className={`px-4 py-2 rounded-md border ${currentPage === 1
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              onClick={() =>
                currentPage > 1 && handleBrandPageChange(currentPage - 1)
              }
              disabled={currentPage === 1}
              whileHover={currentPage > 1 ? { scale: 1.05 } : {}}
              whileTap={currentPage > 1 ? { scale: 0.95 } : {}}
            >
              <MdKeyboardArrowLeft className="w-5 h-5" />
            </motion.button>

            <div className="flex gap-2">
              {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                let pageNumber;
                if (totalPages <= 5) {
                  pageNumber = i + 1;
                } else if (currentPage <= 3) {
                  pageNumber = i + 1;
                } else if (currentPage >= totalPages - 2) {
                  pageNumber = totalPages - 4 + i;
                } else {
                  pageNumber = currentPage - 2 + i;
                }

                return (
                  <motion.button
                    key={pageNumber}
                    className={`w-10 h-10 rounded-md ${currentPage === pageNumber
                      ? 'bg-emerald-500 text-white'
                      : 'bg-white text-gray-700 hover:bg-gray-50'
                      }`}
                    onClick={() => handleBrandPageChange(pageNumber)}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {pageNumber}
                  </motion.button>
                );
              })}
            </div>

            <motion.button
              className={`px-4 py-2 rounded-md border ${currentPage === totalPages
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
              onClick={() =>
                currentPage < totalPages &&
                handleBrandPageChange(currentPage + 1)
              }
              disabled={currentPage === totalPages}
              whileHover={currentPage < totalPages ? { scale: 1.05 } : {}}
              whileTap={currentPage < totalPages ? { scale: 0.95 } : {}}
            >
              <MdOutlineKeyboardArrowRight className="w-5 h-5" />
            </motion.button>
          </motion.div>
        )}

        {/* Pagination Info */}
        {totalBrands > 0 && (
          <motion.div
            className="text-center text-sm text-gray-500 mt-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            Showing {(currentPage - 1) * brandsItemsPerPage + 1} to{' '}
            {Math.min(currentPage * brandsItemsPerPage, totalBrands)} of{' '}
            {totalBrands} brands
          </motion.div>
        )}
      </motion.div>
    );
  };

  return (
    <Layout>
      <motion.div
        className="w-full md:pt-10 pt-4 bg-gray-50"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="flex w-full lg:px-0 px-4 mx-auto flex-col"
          variants={itemVariants}
        >
          <motion.h1
            className="md:text-[31px] sm:text-2xl text-xl md:py-0 py-3 font-medium text-center text-primary"
            variants={headingVariants}
          >
            What are you looking for?
          </motion.h1>
          <motion.div
            className="flex justify-end gap-3 w-full max-w-xl mx-auto pr-4"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <p className="sm:text-base text-sm">Order with prescription</p>
            <p
              className="sm:text-base text-sm text-primary cursor-pointer hover:underline"
              onClick={handlePrescriptionUpload}
            >
              Upload Now
            </p>
          </motion.div>
          <motion.div
            className="mx-auto w-full flex justify-center items-center"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Search
              value={search}
              placeholder="Search Medicine by Name or Category"
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              onSearch={handleSearchSubmit}
              onClear={handleClear}
              inputClassName="!rounded-lg"
              searchBtnClassName="!rounded-r-lg"
              className="my-4 !max-w-xl"
            />
          </motion.div>
        </motion.div>

        {renderSearchResults()}
        {!showSearchResults && (
          <>
            {/* <HealthBanner /> */}
            <motion.div
              className="w-full lg:max-w-[96%] max-w-[90%] my-8 mx-auto"
              variants={itemVariants}
            >
              <motion.h1
                className="text-[28px] font-medium md:py-3 py-6 text-center"
                variants={headingVariants}
              >
                Explore By Categories
              </motion.h1>
              <ExploreCategory
                products={products}
                isLoading={isLoading}
                categories={categories}
              />
            </motion.div>
            <motion.div
              className="w-full mt-12 lg:max-w-[96%] max-w-[90%] mx-auto"
              variants={itemVariants}
            >
              <motion.h1
                className="text-[28px] font-medium text-center"
                variants={headingVariants}
              >
                Top Selling Items
              </motion.h1>
              <TopSellingItems
                products={topSellingProducts}
                isLoading={isTopSellingLoading}
              />
            </motion.div>
            <CategoriesProductsContainer />
            <motion.div
              className="w-full mt-12 lg:max-w-[96%] max-w-[90%] mx-auto"
              variants={itemVariants}
            >
              <motion.h1
                className="text-[28px] font-medium text-center"
                variants={headingVariants}
              >
                New Items
              </motion.h1>
              <NewItems products={products} isLoading={isLoading} />
            </motion.div>

            {/* Popular Brands with Pagination */}
            {renderPopularBrands()}

            <HealthBanner />
            <motion.div
              variants={itemVariants}
              initial="hidden"
              animate="visible"
              transition={{ delay: 0.8 }}
            >
              <FeaturesSection />
            </motion.div>
          </>
        )}
      </motion.div>
    </Layout>
  );
};

export default Home;
