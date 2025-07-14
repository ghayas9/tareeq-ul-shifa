import React from 'react';
import { motion } from 'framer-motion';
import { Delivery, ReturnExchange, VscCreditCard } from './icons/Icons';

const FeaturesSection = () => {
  const features = [
    {
      icon: <VscCreditCard />,
      title: 'Payment Options',
      description: 'COD, Debit/Credit Card, Easy Paisa',
    },
    {
      icon: <Delivery />,
      title: 'Free Delivery',
      description: 'On orders above PKR 2500',
    },
    {
      icon: <ReturnExchange />,
      title: 'Free Return & Exchange',
      description: 'Within 7 Days',
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12
      }
    }
  };

  const iconVariants = {
    hidden: { scale: 0, rotate: -45 },
    visible: { 
      scale: 1, 
      rotate: 0,
      transition: {
        type: 'spring',
        stiffness: 200,
        damping: 10,
        delay: 0.2
      }
    },
    hover: { 
      scale: 1.2, 
      rotate: 5,
      transition: { type: 'spring', stiffness: 300, damping: 10 }
    }
  };

  return (
    <motion.div 
      className="bg-[#d8ebe6] py-6 px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div 
        className="max-w-screen-lg mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-center sm:text-left"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {features.map((feature, index) => (
          <motion.div 
            key={index} 
            className="flex items-center gap-4"
            variants={itemVariants}
            whileHover={{ x: 5 }}
          >
            <motion.div 
              className="border-2 border-dashed border-primary p-3 rounded-lg flex items-center justify-center w-12 h-12 text-xl"
              variants={iconVariants}
              whileHover="hover"
            >
              {feature.icon}
            </motion.div>
            <motion.div>
              <motion.h3 
                className="font-bold text-lg"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                {feature.title}
              </motion.h3>
              <motion.p 
                className="text-sm text-gray-600"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                {feature.description}
              </motion.p>
            </motion.div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default FeaturesSection;