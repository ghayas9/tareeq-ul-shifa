import React from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';

interface BrandProps {
  id: string;
  name: string;
  logo: string;
  discount: string;
}

const PopularBrands: React.FC<BrandProps> = ({ id, name, logo, discount }) => {
  const router = useRouter();

  const handleBrandClick = () => {
    router.push(`/brands/${id}`);
  };
  return (
    <motion.div
      className="bg-white h-[220px] p-3 shadow-lg cursor-pointer rounded-lg w-full text-center relative overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 12 }}
      whileHover={{ y: -5, boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.1)' }}
      onClick={handleBrandClick}
    >
      <motion.div
        className="flex justify-center items-center h-16"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={logo}
          alt={name}
          className="h-12 w-auto max-w-full object-contain"
        />
      </motion.div>

      <h3 className="text-lg font-medium mb-4">{name}</h3>
      <motion.div
        className="absolute bottom-0 left-0 w-full bg-secondary text-white sm:text-[24px] text-lg font-medium rounded-t-full sm:h-24 h-28 flex items-center justify-center"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 10,
          delay: 0.2,
        }}
      >
        {discount}
      </motion.div>
    </motion.div>
  );
};

export default PopularBrands;