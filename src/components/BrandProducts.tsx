'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import DiscountBadge from '@/components/common/DiscountBadge';
import { calculateDiscount } from '../../utils/discountPrice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import NoData from '@/components/common/NoData';
import Search from '@/components/common/Search';
import { ProductQueryParams } from '@/types/productTypes';
import useBrandProducts from '@/hooks/brandProducts.hooks';

const BrandProducts = () => {
  const router = useRouter();
  const brandId = router.query.id;
  console.log(brandId, 'brandis');
  const [search, setSearch] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [queryParams, setQueryParams] = useState<ProductQueryParams>({
    limit: 20,
    page: 1,
    status: 'active',
  });

  const { products, brand, isLoading, pagination, getProductsByBrand } =
    useBrandProducts();

  useEffect(() => {
    if (brandId) {
      fetchBrandProducts();
    }
  }, [brandId]);

  const fetchBrandProducts = async () => {
    if (typeof brandId !== 'string') return;

    try {
      await getProductsByBrand({
        brandId,
        params: queryParams,
      });
    } catch (error) {
      console.error('Error fetching brand products:', error);
    }
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);

    if (!value.trim()) {
      clearSearchResults();
    }
  };

  const handleSearchSubmit = async () => {
    if (!search.trim() || !brandId) return;

    setIsSearching(true);
    setShowSearchResults(true);

    try {
      await getProductsByBrand({
        brandId: brandId as string,
        params: {
          ...queryParams,
          search: search.trim(),
          page: 1, 
        },
      });
    } catch (error) {
      console.error('Error during search:', error);
    } finally {
      setIsSearching(false);
    }
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const clearSearchResults = () => {
    setShowSearchResults(false);
    setSearch('');
    
    // Reset to original params
    const resetParams = {
      limit: 20,
      page: 1,
      status: 'active'
    };
    
    setQueryParams(resetParams);
    
    // Important: Re-fetch products with reset params
    if (typeof brandId === 'string') {
      getProductsByBrand({
        brandId,
        params: resetParams
      });
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    setQueryParams({
      ...queryParams,
      page,
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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

  const renderBrandHeader = () => {
    if (isLoading && !brand) {
      return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-8">
          <Skeleton height={60} />
          <Skeleton count={2} />
        </div>
      );
    }

    if (!brand) {
      return (
        <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-8">
          <h1 className="text-2xl font-bold text-gray-700">Brand not found</h1>
        </div>
      );
    }

    return (
      <motion.div
        className="w-full max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-md mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center gap-6">
          {brand.logo ? (
            <img
              src={brand.logo}
              alt={brand.name}
              className="w-24 h-24 object-contain"
            />
          ) : (
            <div className="w-24 h-24 bg-gray-200 rounded-md flex items-center justify-center">
              <span className="text-2xl font-bold text-gray-500">
                {brand.name?.substring(0, 2).toUpperCase()}
              </span>
            </div>
          )}

          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-800">{brand.name}</h1>
            {brand.website && (
              <a
                href={brand.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                {brand.website}
              </a>
            )}
            {(brand?.discount ?? 0) > 0 && (
              <div className="mt-2">
                <span className="inline-block bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                  {brand.discount}% Off on all products
                </span>
              </div>
            )}
          </div>
        </div>

        {brand.description && (
          <div className="mt-4 text-gray-600">
            <p>{brand.description}</p>
          </div>
        )}
      </motion.div>
    );
  };

  const renderProducts = () => {
    if (isLoading && products.length === 0) {
      return (
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
      );
    }

    if (products.length === 0) {
      return (
        <NoData
        //   message={`No products found for ${brand?.name || 'this brand'}`}
        //   subMessage="Try a different brand or check back later for new products"
        />
      );
    }

    return (
      <motion.div
        className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {products.map((product: any) => {
          const discount = calculateDiscount(
            product?.originalPrice,
            product.price
          );
          return (
            <motion.div
              key={product.id}
              className="h-full"
              variants={itemVariants}
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
                  {discount && <DiscountBadge discountPercentage={discount} />}
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
                    {brand?.name || product.brand}
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
      </motion.div>
    );
  };

  const renderPagination = () => {
    if (!pagination || pagination.totalPages <= 1 || products.length === 0) {
      return null;
    }

    const maxPagesToShow = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
    let endPage = Math.min(
      pagination.totalPages,
      startPage + maxPagesToShow - 1
    );

    if (endPage - startPage + 1 < maxPagesToShow) {
      startPage = Math.max(1, endPage - maxPagesToShow + 1);
    }

    const pages = Array.from(
      { length: endPage - startPage + 1 },
      (_, i) => startPage + i
    );

    return (
      <div className="flex justify-center mt-8">
        <nav className="flex items-center gap-1">
          <button
            onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className={`px-3 py-1 rounded-md ${
              currentPage === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Previous
          </button>

          {startPage > 1 && (
            <>
              <button
                onClick={() => handlePageChange(1)}
                className="px-3 py-1 rounded-md hover:bg-gray-100"
              >
                1
              </button>
              {startPage > 2 && (
                <span className="px-2 py-1 text-gray-500">...</span>
              )}
            </>
          )}

          {pages.map((page) => (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`px-3 py-1 rounded-md ${
                page === currentPage
                  ? 'bg-primary text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {page}
            </button>
          ))}

          {endPage < pagination.totalPages && (
            <>
              {endPage < pagination.totalPages - 1 && (
                <span className="px-2 py-1 text-gray-500">...</span>
              )}
              <button
                onClick={() => handlePageChange(pagination.totalPages)}
                className="px-3 py-1 rounded-md hover:bg-gray-100"
              >
                {pagination.totalPages}
              </button>
            </>
          )}

          <button
            onClick={() =>
              handlePageChange(Math.min(pagination.totalPages, currentPage + 1))
            }
            disabled={currentPage === pagination.totalPages}
            className={`px-3 py-1 rounded-md ${
              currentPage === pagination.totalPages
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            Next
          </button>
        </nav>
      </div>
    );
  };

  return (
    <Layout>
      <div className="w-full py-8 bg-gray-50 min-h-screen">
        {renderBrandHeader()}

        <div className="w-full max-w-4xl mx-auto mb-6">
          <Search
            value={search}
            placeholder={`Search products in ${brand?.name || 'this brand'}...`}
            onChange={handleSearchChange}
            onKeyDown={handleSearchKeyDown}
            onSearch={handleSearchSubmit}
            inputClassName="!rounded-lg"
            searchBtnClassName="!rounded-r-lg"
            className="my-4"
          />
        </div>

        <div className="w-full max-w-7xl mx-auto px-4">
          <div className="mb-6 flex justify-between items-center">
            <h2 className="text-2xl font-semibold">
              {search ? `Search Results for "${search}"` : 'All Products'}
            </h2>
            {search && (
              <button
                onClick={clearSearchResults}
                className="flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-md text-gray-600 hover:bg-gray-200"
              >
                Clear Search
              </button>
            )}
          </div>

          {renderProducts()}
          {renderPagination()}
        </div>
      </div>
    </Layout>
  );
};

export default BrandProducts;
