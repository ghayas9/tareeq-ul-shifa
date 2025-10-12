"use client"
import { useEffect, useState } from 'react';
import Breadcrumb from '@/components/common/BreadCrumb';
import DiscountBadge from '@/components/common/DiscountBadge';
import Dropdown from '@/components/common/Dropdown';
import FilterSidebar from '@/components/common/Filter';
import Pagination from '@/components/common/Pagination';
import { CartIcons, FilterIcon } from '@/components/icons/Icons';
import Layout from '@/components/layout/Layout';
import { useProduct } from '@/hooks/product.hook';
import { useCart } from '@/hooks/cart.hook';
import { toggleCartSidebar } from '@/redux/slices/cartSlice';
import { AppDispatch } from '@/redux/store/store';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import toast from 'react-hot-toast';
import { useDispatch } from 'react-redux';
import { calculateDiscount } from '../../../utils/discountPrice';
import { useCategory } from '@/hooks/category.hooks';
import useBrand from '@/hooks/brand.hooks';

const ProductList = () => {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { products, pagination, isLoading, getAllProducts, changePage } =
    useProduct();
  const { addItemToCart } = useCart();
  const { getAllCategories, categories } = useCategory();
  const { brands, getAllBrands } = useBrand();
  const [itemsPerPage, setItemsPerPage] = useState(10);

  // Process categories at the top level to make them available throughout the component
  const processedCategories = Array.isArray(categories)
    ? categories.map((cat) =>
        typeof cat === 'object' ? cat : { id: cat, name: cat }
      )
    : [];

  // Filter states
  const [filters, setFilters] = useState<any>({});
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedBrand, setSelectedBrand] = useState<string | null>(null);
  const [sortOption, setSortOption] = useState<string>('createdAt');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Count active filters
  const filterCount = selectedCategories.length + (selectedBrand ? 1 : 0);

  const sortOptions = [
    { label: 'Newest First', value: 'createdAt:desc' },
    { label: 'Oldest First', value: 'createdAt:asc' },
    { label: 'Price: Low to High', value: 'price:asc' },
    { label: 'Price: High to Low', value: 'price:desc' },
    { label: 'Top Selling', value: 'topSell:desc' },
    { label: 'Highest Discount', value: 'discount:desc' },
  ];

  const handlePageChange = (page: number) => {
    changePage(page);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, page },
      },
      undefined,
      { shallow: true }
    );
  };

  useEffect(() => {
    getAllCategories();
    getAllBrands();
  }, []);

  const handleItemsPerPageChange = (perPage: number) => {
    setItemsPerPage(perPage);
    changePage(1);
    router.push(
      {
        pathname: router.pathname,
        query: { ...router.query, limit: perPage, page: 1 },
      },
      undefined,
      { shallow: true }
    );
  };

  const handleFilterChange = (selectedFilters: any) => {
    console.log('Received filters from sidebar:', selectedFilters);
    const apiFilters: any = {};

    if (selectedFilters.categoryIds && selectedFilters.categoryIds.length > 0) {
      apiFilters.category = selectedFilters.categoryIds.join(',');
    }

    if (selectedFilters.brandId) {
      apiFilters.brand = selectedFilters.brandId;
    }

    console.log('Setting API filters:', apiFilters);
    setFilters(apiFilters);

    changePage(1);
    router.push(
      {
        pathname: router.pathname,
        query: {
          ...router.query,
          ...apiFilters,
          page: 1,
        },
      },
      undefined,
      { shallow: true }
    );
  };

  const toggleFilterSidebar = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  useEffect(() => {
    if (router.isReady) {
      const page = router.query.page
        ? parseInt(router.query.page as string)
        : 1;
      const limit = router.query.limit
        ? parseInt(router.query.limit as string)
        : itemsPerPage;

      const urlFilters: any = {};

      // For category, we need to associate UUIDs with display names
      if (router.query.category) {
        urlFilters.category = router.query.category;
        const categoryValues = Array.isArray(router.query.category)
          ? router.query.category
          : [router.query.category as string];

        // Find the display names for the category IDs
        const categoryNames = categoryValues.map((categoryId) => {
          const category = processedCategories.find(
            (cat) => cat.id === categoryId
          );
          return category ? category.name : categoryId;
        });

        setSelectedCategories(categoryNames);
      }

      // For brand, we need to find the display name from the ID
      if (router.query.brand) {
        urlFilters.brand = router.query.brand;
        const brandId = router.query.brand as string;
        const brand = brands?.find((b) => b.id === brandId);
        setSelectedBrand(brand ? brand.name : brandId);
      }

      if (router.query.sort) {
        const sortValue = router.query.sort as string;
        setSortOption(sortValue);
      }

      if (router.query.order) {
        setSortOrder(router.query.order as 'asc' | 'desc');
      }

      setFilters(urlFilters);

      if (page !== pagination?.currentPage) {
        changePage(page);
      }

      if (limit !== itemsPerPage) {
        setItemsPerPage(limit);
      }
    }
  }, [router.isReady, router.query]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let sort = sortOption;
        let order = sortOrder;

        if (sortOption.includes(':')) {
          const [sortField, sortDirection] = sortOption.split(':');
          sort = sortField;
          order = sortDirection as 'asc' | 'desc';
        }

        console.log('Fetching products with:', {
          page: pagination?.currentPage || 1,
          limit: itemsPerPage,
          sort,
          order,
          ...filters,
        });

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

    fetchProducts();
  }, [pagination?.currentPage, itemsPerPage, filters, sortOption, sortOrder]);

  const handleSortChange = (value: string) => {
    setSortOption(value);

    if (value.includes(':')) {
      const [sortField, sortDirection] = value.split(':');
      setSortOrder(sortDirection as 'asc' | 'desc');
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            sort: sortField,
            order: sortDirection,
          },
        },
        undefined,
        { shallow: true }
      );
    }
  };

  const handleClearFilters = () => {
    setSelectedCategories([]);
    setSelectedBrand(null);
    setFilters({});

    const query = { ...router.query };
    delete query.category;
    delete query.brand;

    router.push(
      {
        pathname: router.pathname,
        query,
      },
      undefined,
      { shallow: true }
    );
  };

  const removeFilter = (type: string, value: string | number) => {
    if (type === 'category') {
      const newCategoryNames = selectedCategories.filter(
        (categoryName) => categoryName !== value
      );
      setSelectedCategories(newCategoryNames);

      // Find the corresponding category IDs
      const newCategoryIds = newCategoryNames.map((name) => {
        const category = processedCategories.find((cat) => cat.name === name);
        return category ? category.id : name;
      });

      const newFilters = { ...filters };
      if (newCategoryIds.length === 0) {
        delete newFilters.category;
      } else {
        newFilters.category = newCategoryIds.join(',');
      }

      setFilters(newFilters);
      router.push(
        {
          pathname: router.pathname,
          query: {
            ...router.query,
            category:
              newCategoryIds.length > 0 ? newCategoryIds.join(',') : undefined,
          },
        },
        undefined,
        { shallow: true }
      );
    } else if (type === 'brand') {
      setSelectedBrand(null);

      // Update filters
      const newFilters = { ...filters };
      delete newFilters.brand;
      setFilters(newFilters);

      // Update URL
      const query = { ...router.query };
      delete query.brand;
      router.push(
        {
          pathname: router.pathname,
          query,
        },
        undefined,
        { shallow: true }
      );
    }
  };

  const handleAddToCart = async (e: React.MouseEvent, product: any) => {
    e.preventDefault();

    if (product.stock === 0) {
      toast.error('This product is out of stock');
      return;
    }

    try {
      await addItemToCart({
        productId: product.id,
        quantity: 1,
      });

      dispatch(toggleCartSidebar());
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  const skeletonPlaceholders = Array(itemsPerPage).fill(0);

  return (
    <Layout>
      <div className="w-full bg-gray-50 px-4 pt-10 pb-8">
        <div className="px-3">
          <Breadcrumb />
        </div>
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
              {selectedCategories.map((category) => (
                <div
                  key={category}
                  className="flex items-center gap-1 px-2 py-1"
                >
                  <span className="text-primary">|</span>
                  <button
                    onClick={() => removeFilter('category', category as any)}
                    className="text-primary text-xs"
                  >
                    X
                  </button>
                  <span>{category}</span>
                </div>
              ))}
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
            <div className="flex justify-end ">
              <button
                onClick={handleClearFilters}
                className="text-sm text-white bg-primary px-4 py-1 rounded-lg"
              >
                Clear Filters ({filterCount})
              </button>
            </div>
          )}
        </div>

        <div className="flex w-full flex-wrap justify-center">
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
                              src={product.image}
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

        {!isLoading && (!products || products.length === 0) && (
          <div className="w-full py-10 text-center">
            <h3 className="text-xl text-gray-500">No products found</h3>
            <p className="mt-2 text-gray-400">
              Try adjusting your filters or search criteria
            </p>
          </div>
        )}
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

export default ProductList;
