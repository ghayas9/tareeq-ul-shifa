// src/pages/brands/index.tsx
"use client"
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/layout/Layout';
import BrandCard from '@/components/BrandCard';
import Search from '@/components/common/Search';
import PageLoader from '@/components/common/PageLoader';
import NoData from '@/components/common/NoData';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import useBrand from '@/hooks/brand.hooks';
import { useRouter } from 'next/router';

const BrandsPage = () => {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filteredBrands, setFilteredBrands] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  
  const { brands, isLoading, getAllBrands } = useBrand();

  // Fetch all brands
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        await getAllBrands({ status: 'active' });
      } catch (error) {
        console.error('Error fetching brands:', error);
      }
    };

    fetchBrands();
  }, [getAllBrands]);

  // Filter brands based on search
  useEffect(() => {
    if (!brands) return;
    
    if (!search.trim()) {
      setFilteredBrands(brands);
    } else {
      const filtered = brands.filter(brand => 
        brand.name.toLowerCase().includes(search.toLowerCase()) ||
        (brand.description && brand.description.toLowerCase().includes(search.toLowerCase()))
      );
      setFilteredBrands(filtered);
    }
  }, [brands, search]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const handleSearchSubmit = () => {
    setIsSearching(true);
    
    // Already filtering in the useEffect above, just need to set isSearching
    setTimeout(() => {
      setIsSearching(false);
    }, 500);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearchSubmit();
    }
  };

  const handleBrandClick = (brandId: string) => {
    router.push(`/brands/${brandId}`);
  };

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

  if (isLoading && !brands) {
    return (
      <Layout>
        <div className="py-16">
          <PageLoader />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="w-full pt-10 pb-16 bg-gray-50">
        <motion.div 
          className="flex w-full lg:px-0 px-4 mx-auto flex-col mb-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.h1
            className="md:text-[31px] text-2xl md:py-0 py-3 font-medium text-center"
            variants={headingVariants}
            initial="hidden"
            animate="visible"
          >
            All Brands
          </motion.h1>
          
          <motion.div
            className="mx-auto w-full flex justify-center items-center my-6"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Search
              value={search}
              placeholder="Search Brands"
              onChange={handleSearchChange}
              onKeyDown={handleSearchKeyDown}
              onSearch={handleSearchSubmit}
              inputClassName="!rounded-lg"
              searchBtnClassName="!rounded-r-lg"
              className="my-4 !max-w-xl"
            />
          </motion.div>
        </motion.div>

        <motion.div 
          className="w-full lg:max-w-[96%] max-w-[90%] mx-auto"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {isLoading || isSearching ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {Array(12).fill(0).map((_, index) => (
                <div key={index} className="h-[200px]">
                  <Skeleton height="100%" className="rounded-lg" />
                </div>
              ))}
            </div>
          ) : filteredBrands && filteredBrands.length > 0 ? (
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">
              {filteredBrands.map((brand) => (
                <motion.div
                  key={brand.id}
                  variants={itemVariants}
                  onClick={() => handleBrandClick(brand.id)}
                  className="cursor-pointer"
                >
                  <BrandCard brand={brand} />
                </motion.div>
              ))}
            </div>
          ) : (
            // <NoData 
            // //   message={search ? `No brands found matching "${search}"` : "No brands available"}  
            //   subMessage={search ? "Try different keywords" : "Check back later for new brands"}
            // />
            "No data"
          )}
        </motion.div>
      </div>
    </Layout>
  );
};

export default BrandsPage;