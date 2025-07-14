'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useCategory } from '@/hooks/category.hooks';
import { useProduct } from '@/hooks/product.hook';
import CategoryProducts from './CategoryProducts';
import { calculateDiscount } from '../../utils/discountPrice';

const CategoriesProductsContainer = () => {
  // States and hooks from your existing Home component
  const [featuredCategories, setFeaturedCategories] = React.useState<any[]>([]);
  const [categoryProducts, setCategoryProducts] = React.useState<
    Record<string, any[]>
  >({});
  const [categoryLoadingStates, setCategoryLoadingStates] = React.useState<
    Record<string, boolean>
  >({});

  const { categories, getAllCategories } = useCategory();
  const { getProductsByCategory } = useProduct();

  // Animation variants
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

  const buttonVariants = {
    hover: {
      scale: 1.1,
      boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.1)',
    },
    tap: {
      scale: 0.95,
    },
  };

  // Fetch categories and their products
  useEffect(() => {
    if (!categories || categories.length === 0) {
      getAllCategories();
      return;
    }

    const featured = categories.slice(0, 4);
    setFeaturedCategories(featured);

    const fetchCategoryProducts = async () => {
      const categoryProductsObj: Record<string, any[]> = {};

      const initialLoadingStates: Record<string, boolean> = {};
      featured.forEach((category) => {
        const categoryId =
          typeof category === 'object' ? category.id : category;
        initialLoadingStates[categoryId] = true;
      });
      setCategoryLoadingStates(initialLoadingStates);
      
      for (const category of featured) {
        try {
          const categoryId =
            typeof category === 'object' ? category.id : category;

          const params = {
            limit: 10,
            status: 'active',
            category: categoryId,
          };

          const response = await getProductsByCategory({
            categoryId,
            params,
          });

          // if (response?.payload?.data) {
          //   categoryProductsObj[categoryId] = response.payload.data;
          // }
          if (response?.payload?.data) {
            const data = response.payload.data;
            categoryProductsObj[categoryId] = Array.isArray(data) ? data : [data];
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
      }

      setCategoryProducts(categoryProductsObj);
    };

    fetchCategoryProducts();
  }, [categories]);

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {featuredCategories.map((category, index) => (
        <CategoryProducts
          key={typeof category === 'object' ? category.id : `category-${index}`}
          category={category}
          index={index}
          categoryProducts={categoryProducts}
          categoryLoadingStates={categoryLoadingStates}
          itemVariants={itemVariants}
          headingVariants={headingVariants}
          buttonVariants={buttonVariants}
          calculateDiscount={calculateDiscount as any}
        />
      ))}
    </motion.div>
  );
};

export default CategoriesProductsContainer;