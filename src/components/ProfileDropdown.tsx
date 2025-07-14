import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { motion, AnimatePresence } from 'framer-motion';
import {  FiSettings, FiShoppingBag, FiLogOut, FiChevronDown } from 'react-icons/fi';

interface ProfileDropdownProps {
  user?: {
    name: string;
    email: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

const ProfileDropdown: React.FC<ProfileDropdownProps> = ({ 
  user = { name: 'Guest User', email: 'guest@example.com' },
  onLogout 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Animation variants
  const dropdownVariants = {
    hidden: { 
      opacity: 0,
      y: -10,
      scale: 0.95,
      transition: {
        duration: 0.2
      }
    },
    visible: { 
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 25,
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05,
      backgroundColor: "rgba(18, 142, 124, 0.1)"
    },
    tap: { scale: 0.98 }
  };

  const arrowVariants = {
    closed: { rotate: 0 },
    open: { rotate: 180 }
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <motion.div 
        className="flex items-center space-x-2 cursor-pointer rounded-full p-1 hover:bg-primary/5"
        onClick={toggleDropdown}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-primary">
          <Image
            src={user.avatar || "/images/profileImage.png"}
            alt="Profile"
            width={40}
            height={40}
           className="relative z-10 object-cover w-full h-full"
          />
        </div>
        
        <motion.div 
          animate={isOpen ? "open" : "closed"}
          variants={arrowVariants}
          transition={{ duration: 0.3 }}
          className="text-primary hidden md:block"
        >
          <FiChevronDown size={16} />
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute right-0 mt-2 w-64 bg-white rounded-lg shadow-xl border border-gray-100 z-50 overflow-hidden"
            variants={dropdownVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Header */}
            <motion.div 
              className="bg-gradient-to-r from-primary/10 to-primary/5 px-4 py-3 border-b border-gray-100"
              variants={itemVariants}
            >
              <p className="font-medium text-gray-800">{user.name}</p>
              <p className="text-sm text-gray-500 truncate">{user.email}</p>
            </motion.div>

            {/* Menu Items */}
            <div className="py-2">
              <motion.div 
                className="px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  router.push('/account-setting');
                }}
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <FiSettings className="text-primary" />
                <span>Account Settings</span>
              </motion.div>

              <motion.div 
                className="px-4 py-2 hover:bg-gray-50 flex items-center space-x-3 cursor-pointer"
                onClick={() => {
                  setIsOpen(false);
                  router.push('/orders');
                }}
                variants={itemVariants}
                whileHover={{ x: 5 }}
              >
                <FiShoppingBag className="text-primary" />
                <span>My Orders</span>
              </motion.div>
            </div>

            {/* Footer/Logout */}
            <motion.div 
              className="border-t border-gray-100 px-4 py-3"
              variants={itemVariants}
            >
              <motion.button
                className="w-full flex items-center justify-center space-x-2 text-red-600 py-2 px-4 rounded-lg hover:bg-red-50 transition-colors"
                onClick={() => {
                  setIsOpen(false);
                  onLogout?.();
                }}
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FiLogOut />
                <span>Logout</span>
              </motion.button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ProfileDropdown;