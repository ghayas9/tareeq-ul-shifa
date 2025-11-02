import React, { useState, useEffect, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { motion } from 'framer-motion';
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';
import { useRouter } from 'next/router';
import DiscountBadge from './common/DiscountBadge';
import type { Swiper as SwiperType } from 'swiper';

// Define types for props
interface CategorySectionProps {
  category: any;
  index: number;
  categoryProducts: Record<string, any[]>;
  categoryLoadingStates: Record<string, boolean>;
  itemVariants: any;
  headingVariants: any;
  buttonVariants: any;
  calculateDiscount: (originalPrice: number, currentPrice: number) => number;
}

const CategoryProducts: React.FC<CategorySectionProps> = ({
  category,
  index,
  categoryProducts,
  categoryLoadingStates,
  itemVariants,
  headingVariants,
  buttonVariants,
  calculateDiscount,
}) => {
  const router = useRouter();
  const [showArrows, setShowArrows] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const swiperRef = useRef<SwiperType | null>(null);

  const categoryId = typeof category === 'object' ? category.id : category;
  const categoryName = typeof category === 'object' ? category.name : category;
  const categoryProds = categoryProducts[categoryId] || [];
  const isLoadingCategory = categoryLoadingStates[categoryId] || false;

  // Create skeleton placeholders
  const skeletonPlaceholders = Array(5).fill(0);

  // Navigation handlers
  const handlePrevClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slidePrev();
    }
  };

  const handleNextClick = () => {
    if (swiperRef.current) {
      swiperRef.current.slideNext();
    }
  };

  // Effect to check if arrows should be displayed based on content and screen size
  useEffect(() => {
    setIsMounted(true);

    const checkShowArrows = () => {
      if (!categoryProds || categoryProds.length === 0) {
        setShowArrows(false);
        return;
      }

      const width = window.innerWidth;
      let visibleSlides = 5; // default for desktop

      if (width < 540) {
        visibleSlides = 1;
      } else if (width < 640) {
        visibleSlides = 2;
      } else if (width < 768) {
        visibleSlides = 2;
      } else if (width < 1024) {
        visibleSlides = 4;
      }

      // Only show arrows if we have more products than visible slides
      setShowArrows(categoryProds.length > visibleSlides);
    };

    // Initialize
    checkShowArrows();

    // Add event listener
    window.addEventListener('resize', checkShowArrows);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkShowArrows);
    };
  }, [categoryProds]);

  // Effect to update navigation when swiper is ready
  useEffect(() => {
    if (swiperRef.current && isMounted && showArrows) {
      // Small delay to ensure DOM elements are ready
      const timer = setTimeout(() => {
        if (swiperRef.current?.navigation) {
          swiperRef.current.navigation.update();
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [isMounted, showArrows, categoryProds]);

  return (
    <motion.div
      key={categoryId}
      className="w-full mt-12 lg:max-w-[96%] max-w-[90%] mx-auto overflow-visible"
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      transition={{ delay: 0.1 * index }}
    >
      <div className="flex justify-center w-full items-center mb-4">
        <motion.h2
          className="text-[28px] font-medium"
          variants={headingVariants}
        >
          {categoryName}
        </motion.h2>
      </div>

      {isLoadingCategory ? (
        <div className="flex gap-3 overflow-hidden px-4">
          {skeletonPlaceholders.map((_, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[100%] sm:w-[50%] md:w-[35%] lg:w-[25%] px-2"
            >
              <div className="relative group">
                <div>
                  <Skeleton height={140} className="rounded-md" />
                </div>
                <h3 className="text-base mt-3">
                  <Skeleton />
                </h3>
                <div className="mt-1 flex gap-3">
                  <span className="text-gray-400 text-sm line-through flex-1">
                    <Skeleton />
                  </span>
                  <span className="text-normalGreen font-semibold text-sm flex-1">
                    <Skeleton />
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : categoryProds.length > 0 ? (
        <div className="relative mx-auto w-full overflow-visible pb-4">
          {isMounted && showArrows && (
            <>
              <div
                className={`cat-prev-${index} absolute top-1/2 -left-4 z-10 transform -translate-y-1/2`}
              >
                <motion.div
                  className="flex justify-center items-center bg-primary text-white w-[35px] h-[35px] rounded-md shadow-md cursor-pointer"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handlePrevClick}
                >
                  <MdKeyboardArrowLeft className="text-xl" />
                </motion.div>
              </div>

              <div
                className={`cat-next-${index} absolute top-1/2 -right-4 z-10 transform -translate-y-1/2`}
              >
                <motion.div
                  className="flex justify-center items-center bg-primary text-white w-[35px] h-[35px] rounded-md shadow-md cursor-pointer"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  onClick={handleNextClick}
                >
                  <MdOutlineKeyboardArrowRight className="text-xl" />
                </motion.div>
              </div>
            </>
          )}

          <Swiper
            modules={[Navigation]}
            spaceBetween={16}
            slidesPerView={2}
            navigation={{
              prevEl: `.cat-prev-${index}`,
              nextEl: `.cat-next-${index}`,
            }}
            centeredSlides={
              categoryProds?.length === 1 || categoryProds?.length === 2
            }
            breakpoints={{
              540: {
                slidesPerView: 2,
              },
              640: {
                slidesPerView: 3,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
            }}
            className="px-4 !py-6" 
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            onInit={(swiper) => {
              // Ensure navigation is properly initialized
              if (swiper.navigation) {
                swiper.navigation.init();
                swiper.navigation.update();
              }
            }}
          >
            {categoryProds.map((product) => {
              const discount = calculateDiscount(
                product.originalPrice,
                product.price
              );
              return (
                <SwiperSlide key={product.id}>
                  <motion.div
                    className="h-full"
                    variants={itemVariants}
                    whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  >
                    <div
                      className="bg-white rounded-lg shadow-md p-2 md:h-[220px] h-auto flex flex-col cursor-pointer"
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
                          src={
                            product.image || '/images/placeholder-product.png'
                          }
                          alt={product.name}
                          className="h-full w-auto object-contain max-w-full"
                        />
                      </div>
                      <div className="flex-grow p-2">
                        <h3 className="md:text-sm text-xs font-medium line-clamp-2 mb-1">
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
                          <span className="text-green-600 md:text-sm text-xs font-semibold">
                            Rs {product.price}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </div>
      ) : (
        <div className="w-full text-center py-10">
          <p className="text-gray-500">No products found in this category</p>
        </div>
      )}
    </motion.div>
  );
};

export default CategoryProducts;
