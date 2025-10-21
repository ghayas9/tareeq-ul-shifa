'use client';
import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import NoData from './common/NoData';
import { motion } from 'framer-motion';

interface ProductProps {
  products: any;
  isLoading?: boolean;
}

const NewItems = ({ products, isLoading }: ProductProps) => {
  const sliderRef = useRef<Slider | null>(null);
  const [showArrows, setShowArrows] = useState(false);
  const [currentBreakpoint, setCurrentBreakpoint] = useState('desktop');

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    centerMode: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
      { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
      { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
    ],
  };

  // Update current breakpoint based on window width
  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth;
      if (width <= 480) {
        setCurrentBreakpoint('mobile');
      } else if (width <= 768) {
        setCurrentBreakpoint('tablet-sm');
      } else if (width <= 1024) {
        setCurrentBreakpoint('tablet-lg');
      } else {
        setCurrentBreakpoint('desktop');
      }
    };

    // Check if we should show arrows
    const checkShowArrows = () => {
      if (!products?.length) return false;

      const width = window.innerWidth;
      let visibleSlides = 5; // default for desktop

      if (width <= 480) {
        visibleSlides = 1;
      } else if (width <= 768) {
        visibleSlides = 2;
      } else if (width <= 1024) {
        visibleSlides = 3;
      }

      // Only show arrows if we have more products than visible slides
      setShowArrows(products.length > visibleSlides);
    };

    // Initialize
    updateBreakpoint();
    checkShowArrows();

    // Add event listener
    window.addEventListener('resize', () => {
      updateBreakpoint();
      checkShowArrows();
    });

    // Cleanup
    return () => {
      window.removeEventListener('resize', () => {
        updateBreakpoint();
        checkShowArrows();
      });
    };
  }, [products]);

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    },
    tap: {
      scale: 0.95,
    },
  };

  const skeletonPlaceholders = Array(5).fill(0);

  if (isLoading) {
    return (
      <div className="flex gap-3 overflow-hidden">
        {skeletonPlaceholders.map((_, index) => (
          <div
            key={index}
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
    );
  }

  if (!isLoading && !products) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <NoData />
      </motion.div>
    );
  }

  return (
    <motion.div
      className="w-full py-8"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="">
        <div className="relative">
          {showArrows && (
            <>
              <motion.button
                onClick={() => sliderRef.current?.slickPrev()}
                className="absolute left-0 flex justify-center items-center top-1/3 transform -translate-y-1/2 bg-primary w-[35px] h-[35px] rounded-[4px] shadow-md z-10"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <MdKeyboardArrowLeft className="text-2xl text-white" />
              </motion.button>

              <motion.button
                onClick={() => sliderRef.current?.slickNext()}
                className="absolute right-0 flex justify-center items-center top-1/3 transform -translate-y-1/2 bg-primary w-[35px] h-[35px] rounded-[4px] shadow-md z-10"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <MdOutlineKeyboardArrowRight className="text-2xl text-white" />
              </motion.button>
            </>
          )}

          <Slider ref={sliderRef} {...settings} className="">
            {products.map((product: any, index: number) => (
              <motion.div
                key={product.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 100,
                  damping: 12,
                }}
              >
                <Link href={`/products/${product.id}`}>
                  <div className="px-[6px]">
                    <div className="relative group">
                      {product.discount && (
                        <span className="absolute top-2 right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-md">
                          {product.discount}
                        </span>
                      )}
                      <motion.div
                        className="flex relative rounded-[10px] hover:shadow-xl shadow-sm h-[218px] bg-white overflow-hidden"
                        whileHover={{
                          scale: 1.05,
                          boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)',
                        }}
                        transition={{
                          type: 'spring',
                          stiffness: 300,
                          damping: 15,
                        }}
                      >
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover rounded-t-[10px]"
                        />
                      </motion.div>
                      <h3 className="text-base mt-3">{product.name}</h3>
                      <div className="mt-1">
                        <motion.span
                          className="text-normalGreen font-semibold text-lg ml-2"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          Rs {product.price}
                        </motion.span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </Slider>
        </div>
      </div>
    </motion.div>
  );
};

export default NewItems;
