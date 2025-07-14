import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';

interface BrandCardProps {
  brand: {
    id: string;
    name: string;
    logo: string | null;
    discount: string;
    description?: string | null;
  };
}

const BrandCard: React.FC<BrandCardProps> = ({ brand }) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/brands/${brand.id}`);
  };

  return (
    <motion.div
      className="bg-white h-[200px] p-4 shadow-lg rounded-lg w-full text-center relative overflow-hidden cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: 'spring', stiffness: 100, damping: 12 }}
      whileHover={{ y: -5, boxShadow: '0px 15px 30px rgba(0, 0, 0, 0.1)' }}
      onClick={handleClick}
    >
      <motion.div
        className="flex justify-center items-center h-24"
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <img
          src={brand.logo || '/images/popularbrand.png'}
          alt={brand.name}
          className="h-20 w-auto max-w-full object-contain"
        />
      </motion.div>
      
      <h3 className="text-lg font-medium mt-2 mb-4">{brand.name}</h3>
      
      <motion.div
        className="absolute bottom-0 left-0 w-full bg-secondary text-white text-[28px] font-medium rounded-t-full sm:h-24 h-28 flex items-center justify-center"
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{
          type: 'spring',
          stiffness: 50,
          damping: 10,
          delay: 0.2,
        }}
      >
        {brand.discount}% Off
      </motion.div>
    </motion.div>
  );
};

export default BrandCard;