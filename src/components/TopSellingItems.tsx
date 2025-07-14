// import React, { useEffect, useState, useRef } from 'react';
// import { useRouter } from 'next/router';
// import Slider from 'react-slick';
// import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
// import TopSellingCard from './TopSellingCard';
// import Skeleton from 'react-loading-skeleton';
// import { motion } from 'framer-motion';
// import { useProduct } from '@/hooks/product.hook';

// interface Props {
//   products?: any[];
//   isLoading?: boolean;
// }

// const TopSellingItems: React.FC<Props> = ({ products: initialProducts, isLoading: initialLoading }) => {
//   const router = useRouter();
//   const { getTopSellingProducts } = useProduct();
//   const [topProducts, setTopProducts] = useState<any[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(initialLoading || true);
//   const sliderRef = useRef<Slider | null>(null);

//   // Fetch top selling products
//   useEffect(() => {
//     const fetchTopProducts = async () => {
//       try {
//         setIsLoading(true);
//         // Use the improved getTopSellingProducts function
//         const response = await getTopSellingProducts({ 
//           limit: 10,
//           status: 'active'
//           // No need to specify sort and order - the hook handles that
//         });
        
//         if (response?.payload?.data) {
//           setTopProducts(Array.isArray(response.payload.data) ? response.payload.data : [response.payload.data]);
//         }
//       } catch (error) {
//         console.error('Error fetching top selling products:', error);
//         setTopProducts([]);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     // If we don't have initial products, fetch them
//     if (!initialProducts || initialProducts.length === 0) {
//       fetchTopProducts();
//     } else {
//       // Use the products passed from props
//       setTopProducts(initialProducts);
//       setIsLoading(false);
//     }
//   }, [initialProducts]);

//   const settings = {
//     dots: false,
//     infinite: false,
//     speed: 500,
//     slidesToShow: 5,
//     slidesToScroll: 1,
//     centerMode: false,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 3, slidesToScroll: 1 } },
//       { breakpoint: 768, settings: { slidesToShow: 2, slidesToScroll: 1 } },
//       { breakpoint: 480, settings: { slidesToShow: 1, slidesToScroll: 1 } },
//     ],
//   };

//   const buttonVariants = {
//     hover: { 
//       scale: 1.1,
//       boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"
//     },
//     tap: { 
//       scale: 0.95 
//     }
//   };

//   const skeletonPlaceholders = Array(5).fill(0);

//   if (isLoading) {
//     return (
//       <div className="flex gap-3 overflow-hidden">
//         {skeletonPlaceholders.map((_, index) => (
//           <div
//             key={index}
//             className="flex-shrink-0 w-[100%] sm:w-[50%] md:w-[35%] lg:w-[25%] px-2"
//           >
//             <div className="relative group">
//               <div>
//                 <Skeleton height={140} className="rounded-md" />
//               </div>
//               <h3 className="text-base mt-3">
//                 <Skeleton />
//               </h3>
//               <div className="mt-1 flex gap-3">
//                 <span className="text-gray-400 text-sm line-through flex-1">
//                   <Skeleton />
//                 </span>
//                 <span className="text-normalGreen font-semibold text-sm flex-1">
//                   <Skeleton />
//                 </span>
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     );
//   }

//   // No products case
//   if (!topProducts || topProducts.length === 0) {
//     return (
//       <div className="w-full py-8 text-center">
//         <p className="text-gray-500">No top selling products available</p>
//       </div>
//     );
//   }

//   return (
//     <motion.div 
//       className="w-full py-8"
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       transition={{ duration: 0.5 }}
//     >
//       <div className="">
//         <div className="relative">
//           <motion.button
//             onClick={() => sliderRef.current?.slickPrev()}
//             className="absolute left-0 flex justify-center items-center top-1/3 transform -translate-y-1/2 bg-primary w-[35px] h-[35px] rounded-[4px] shadow-md z-10"
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//           >
//             <MdKeyboardArrowLeft className="text-2xl text-white" />
//           </motion.button>

//           <motion.button
//             onClick={() => sliderRef.current?.slickNext()}
//             className="absolute right-0 flex justify-center items-center top-1/3 transform -translate-y-1/2 bg-primary w-[35px] h-[35px] rounded-[4px] shadow-md z-10"
//             variants={buttonVariants}
//             whileHover="hover"
//             whileTap="tap"
//           >
//             <MdOutlineKeyboardArrowRight className="text-2xl text-white" />
//           </motion.button>
          
//           <Slider ref={sliderRef} {...settings} className="">
//             {topProducts.map((product, index) => (
//               <motion.div
//                 key={product.id || index}
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 transition={{ 
//                   delay: index * 0.05,
//                   type: 'spring',
//                   stiffness: 100,
//                   damping: 12
//                 }}
//               >
//                 <TopSellingCard product={product} />
//               </motion.div>
//             ))}
//           </Slider>
//         </div>
//       </div>
//     </motion.div>
//   );
// };

// export default TopSellingItems;


import React, { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/router';
import Slider from 'react-slick';
import { MdKeyboardArrowLeft, MdOutlineKeyboardArrowRight } from 'react-icons/md';
import TopSellingCard from './TopSellingCard';
import Skeleton from 'react-loading-skeleton';
import { motion } from 'framer-motion';
import { useProduct } from '@/hooks/product.hook';

interface Props {
  products?: any[];
  isLoading?: boolean;
}

const TopSellingItems: React.FC<Props> = ({ products: initialProducts, isLoading: initialLoading }) => {
  const router = useRouter();
  const { getTopSellingProducts } = useProduct();
  const [topProducts, setTopProducts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(initialLoading || true);
  const sliderRef = useRef<Slider | null>(null);
  const [showArrows, setShowArrows] = useState(false);

  // Fetch top selling products
  useEffect(() => {
    const fetchTopProducts = async () => {
      try {
        setIsLoading(true);
        // Use the improved getTopSellingProducts function
        const response = await getTopSellingProducts({ 
          limit: 10,
          status: 'active'
          // No need to specify sort and order - the hook handles that
        });
        
        if (response?.payload?.data) {
          setTopProducts(Array.isArray(response.payload.data) ? response.payload.data : [response.payload.data]);
        }
      } catch (error) {
        console.error('Error fetching top selling products:', error);
        setTopProducts([]);
      } finally {
        setIsLoading(false);
      }
    };

    // If we don't have initial products, fetch them
    if (!initialProducts || initialProducts.length === 0) {
      fetchTopProducts();
    } else {
      // Use the products passed from props
      setTopProducts(initialProducts);
      setIsLoading(false);
    }
  }, [initialProducts, getTopSellingProducts]);

  // Check if we need to show arrows based on screen size and product count
  useEffect(() => {
    const checkShowArrows = () => {
      if (!topProducts?.length) {
        setShowArrows(false);
        return;
      }
      
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
      setShowArrows(topProducts.length > visibleSlides);
    };

    // Initialize
    checkShowArrows();

    // Add event listener for resize
    window.addEventListener('resize', checkShowArrows);

    // Cleanup
    return () => {
      window.removeEventListener('resize', checkShowArrows);
    };
  }, [topProducts]);

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

  const buttonVariants = {
    hover: { 
      scale: 1.1,
      boxShadow: "0px 5px 15px rgba(0, 0, 0, 0.1)"
    },
    tap: { 
      scale: 0.95 
    }
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

  // No products case
  if (!topProducts || topProducts.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <p className="text-gray-500">No top selling products available</p>
      </div>
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
            {topProducts.map((product, index) => (
              <motion.div
                key={product.id || index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ 
                  delay: index * 0.05,
                  type: 'spring',
                  stiffness: 100,
                  damping: 12
                }}
              >
                <TopSellingCard product={product} />
              </motion.div>
            ))}
          </Slider>
        </div>
      </div>
    </motion.div>
  );
};

export default TopSellingItems;