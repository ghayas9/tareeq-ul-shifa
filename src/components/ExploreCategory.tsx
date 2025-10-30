// import React, { useEffect, useState } from 'react';
// import { useRouter } from 'next/router';
// import { motion } from 'framer-motion';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';
// import Link from 'next/link';

// interface ExploreCategoryProps {
//   isLoading: boolean;
//   categories: any[];
// }

// const ExploreCategory: React.FC<ExploreCategoryProps> = ({ isLoading, categories }) => {
//   const router = useRouter();

//   // Default category icons - match these with your category names or customize as needed
//   const categoryIcons: Record<string, string> = {
//     'Herbal Medicines': '/images/categories/herbal.png',
//     'Vitamins & Supplements': '/images/categories/vitamins.png',
//     'Pain Relief': '/images/categories/pain.png',
//     'Digestive Health': '/images/categories/digestive.png',
//     'Skin Care': '/images/categories/skin.png',
//     'Cold & Flu': '/images/categories/cold.png',
//     'First Aid': '/images/categories/firstaid.png',
//     'Baby Care': '/images/categories/baby.png',
//     // Add more mappings as needed
//   };

//   // Default icon for categories without a specific image
//   const defaultIcon = '/images/categories/default.png';

//   // Animation variants
//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: {
//       opacity: 1,
//       transition: {
//         staggerChildren: 0.1,
//         delayChildren: 0.2
//       }
//     }
//   };

//   const itemVariants = {
//     hidden: { opacity: 0, y: 20 },
//     visible: {
//       opacity: 1,
//       y: 0,
//       transition: {
//         type: 'spring',
//         stiffness: 80,
//         damping: 10
//       }
//     }
//   };

//   // Handle click on a category
//   const handleCategoryClick = (categoryId: string) => {
//     router.push({
//       pathname: '/products',
//       query: { category: categoryId }
//     });
//   };

//   // Show skeleton loading UI while data is being fetched
//   if (isLoading) {
//     return (
//       <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4">
//         {Array(10).fill(0).map((_, index) => (
//           <div key={`skeleton-${index}`} className="flex flex-col items-center">
//             <Skeleton circle width={80} height={80} className="mb-3" />
//             <Skeleton width={100} height={20} />
//           </div>
//         ))}
//       </div>
//     );
//   }

//   // If no categories are available
//   if (!categories || categories.length === 0) {
//     return (
//       <div className="text-center py-8">
//         <p className="text-gray-500">No categories available</p>
//       </div>
//     );
//   }

//   return (
//     <motion.div
//       className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-4"
//       variants={containerVariants}
//       initial="hidden"
//       animate="visible"
//     >
//       {categories.map((category) => {
//         const categoryId = typeof category === 'object' && category !== null ? category.id : category;
//         const categoryName = typeof category === 'object' && category !== null ? category.name : category;
//         const categoryImage = categoryIcons[categoryName] || defaultIcon;

//         return (
//           <motion.div
//             key={categoryId}
//             className="flex flex-col items-center cursor-pointer"
//             onClick={() => handleCategoryClick(categoryId)}
//             variants={itemVariants}
//             whileHover={{
//               scale: 1.05,
//               transition: { duration: 0.2 }
//             }}
//             whileTap={{ scale: 0.95 }}
//           >
//             <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-3 overflow-hidden">
//               <img
//                 src={categoryImage}
//                 alt={categoryName}
//                 className="w-12 h-12 object-contain"
//               />
//             </div>
//             <h3 className="text-center text-sm font-medium">{categoryName}</h3>
//           </motion.div>
//         );
//       })}
//     </motion.div>
//   );
// };

// export default ExploreCategory;

import React, { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import {
  MdKeyboardArrowLeft,
  MdOutlineKeyboardArrowRight,
} from 'react-icons/md';

interface ExploreCategoryProps {
  isLoading: boolean;
  categories: any[];
  products?: any[];
}

const ExploreCategory: React.FC<ExploreCategoryProps> = ({
  isLoading,
  categories,
  products,
}) => {
  const router = useRouter();
  const prevRef = useRef<HTMLDivElement>(null);
  const nextRef = useRef<HTMLDivElement>(null);
  const swiperRef = useRef<any>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
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
        stiffness: 80,
        damping: 10,
      },
    },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    },
    tap: {
      scale: 0.95,
    },
  };

  // Update swiper when navigation elements are rendered
  useEffect(() => {
    if (swiperRef.current && prevRef.current && nextRef.current) {
      swiperRef.current.params.navigation.prevEl = prevRef.current;
      swiperRef.current.params.navigation.nextEl = nextRef.current;
      swiperRef.current.navigation.init();
      swiperRef.current.navigation.update();
    }
  }, []);

  // Handle click on a category
  const handleCategoryClick = (categoryId: string, categoryName: string) => {
    router.push({
      pathname: '/products-category',
      query: { category: categoryId, name: categoryName },
    });
  };

  // Show skeleton loading UI while data is being fetched
  if (isLoading) {
    return (
      <div className="flex gap-4 overflow-hidden">
        {Array(6)
          .fill(0)
          .map((_, index) => (
            <div
              key={`skeleton-${index}`}
              className="flex-shrink-0 flex flex-col items-center"
            >
              <Skeleton circle width={80} height={80} className="mb-3" />
              <Skeleton width={100} height={20} />
            </div>
          ))}
      </div>
    );
  }

  // If no categories are available
  if (!categories || categories.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No categories available</p>
      </div>
    );
  }

  return (
    <motion.div
      className="w-full relative"
      initial="visible"
      animate="visible"
      variants={containerVariants}
      transition={{ duration: 0.5 }}
    >
      <div
        ref={prevRef}
        className="category-prev absolute top-1/2 -left-4 z-10 transform -translate-y-1/2"
      >
        <motion.div
          className="flex justify-center items-center bg-primary w-[35px] h-[35px] rounded-full shadow-md cursor-pointer opacity-100" // Changed from opacity-0 to opacity-100
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <MdKeyboardArrowLeft className="text-xl text-white" />
        </motion.div>
      </div>

      <div
        ref={nextRef}
        className="category-next absolute top-1/2 -right-4 z-10 transform -translate-y-1/2"
      >
        <motion.div
          className="flex justify-center items-center bg-primary w-[35px] h-[35px] rounded-full shadow-md cursor-pointer opacity-100" // Changed from opacity-0 to opacity-100
          variants={buttonVariants}
          whileHover="hover"
          whileTap="tap"
        >
          <MdOutlineKeyboardArrowRight className="text-xl text-white" />
        </motion.div>
      </div>

      <Swiper
        modules={[Navigation]}
        spaceBetween={20}
        slidesPerView={2}
        onSwiper={(swiper) => {
          swiperRef.current = swiper;
        }}
        navigation={{
          prevEl: prevRef.current,
          nextEl: nextRef.current,
          disabledClass: 'opacity-50 cursor-not-allowed',
        }}
        breakpoints={{
          640: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          1024: {
            slidesPerView: 6,
          },
        }}
        className="px-4 py-4"
      >
        {categories.map((category, index) => {
          const categoryId =
            typeof category === 'object' && category !== null
              ? category.id
              : category;
          const categoryName =
            typeof category === 'object' && category !== null
              ? category.name
              : category;
          return (
            <SwiperSlide key={`${categoryId}-${index}`}>
              <motion.div
                className="flex flex-col items-center cursor-pointer text-center"
                onClick={() => handleCategoryClick(categoryId, categoryName)}
                initial="visible"
                animate="visible"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  transition: { duration: 0.2 },
                }}
                whileTap={{ scale: 0.95 }}
              >
                <div className="w-20 h-20 rounded-full bg-white shadow-md flex items-center justify-center mb-3 overflow-hidden">
                  <img
                    src={category.image}
                    alt={categoryName}
                    className="w-20 p-2 h-20 rounded-full object-cover"
                  />
                </div>
                <h3 className="text-center text-sm font-medium line-clamp-2">
                  {categoryName}
                </h3>
              </motion.div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </motion.div>
  );
};

export default ExploreCategory;
