import React, { useEffect, useRef, useState } from 'react';
import { Logo } from '../icons/Icons';
import { MdClose } from 'react-icons/md';
import { FiMenu, FiSearch } from 'react-icons/fi';
import { BiUserCircle } from 'react-icons/bi';
import { IoMdArrowBack } from 'react-icons/io';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { toggleCartSidebar } from '@/redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import CartIcon from '../common/CartIcon';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '@/hooks/cart.hook';
import toast from 'react-hot-toast';
import { useAppSelector } from '@/redux/store/store';
import ProfileDropdown from '../ProfileDropdown';
import { logout } from '@/redux/slices/authSlice';
import Button from '../common/Button';
import { useUser } from '@/hooks/user.hook';
import GlobalSearch from '../GlobalSearch';
import { useSearch } from '../context/SearchContext';

const Header = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [mobileSearchVisible, setMobileSearchVisible] = useState(false);
  const { cart, getCart } = useCart();
  const { getUserProfile } = useUser();
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    const fetchCart = async () => {
      const token = localStorage.getItem('token');
      if (!token) return;

      try {
        await getCart();
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        toast.error('Failed to load your cart');
      }
    };

    fetchCart();
  }, []);
  
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      getUserProfile?.();
    }
  }, [user?.id, isAuthenticated, user?.profile]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !(event.target as HTMLElement).closest(
          'button[aria-label="Toggle menu"]'
        )
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMobileSearch = () => {
    setMobileSearchVisible(!mobileSearchVisible);
  };

  const handleLogout = async () => {
    // Remove token from localStorage
    localStorage.removeItem('token');

    // Dispatch logout action to update Redux state
    dispatch(logout());

    // Navigate to login page
    router.push('/login');
    toast.success('Logged out successfully');
  };

  // Animation variants
  const menuVariants = {
    closed: {
      x: '-100%',
      opacity: 0,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 40,
      },
    },
    open: {
      x: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 30,
        staggerChildren: 0.07,
        delayChildren: 0.2,
      },
    },
  };

  const menuItemVariants = {
    closed: { opacity: 0, y: 20 },
    open: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 24,
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.1 },
    tap: { scale: 0.95 },
  };

  const mobileSearchVariants = {
    hidden: { y: -20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 300,
        damping: 25,
      },
    },
    exit: {
      y: -20,
      opacity: 0,
      transition: { duration: 0.2 },
    },
  };

  return (
    <>
      <header className="w-full h-auto min-h-[90px] bg-white px-4 py-2 relative shadow-sm">
        <div className="flex items-center justify-between md:justify-between">
          {/* Logo and Brand */}
          <motion.div
            className="flex items-center space-x-2 cursor-pointer"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => router.push('/')}
          >
            <div className="w-12 h-[73px] flex items-center justify-center rounded-full">
              <Logo />
            </div>
            <div className="">
              <span className="font-semibold border-b-2 text-black text-sm">
                Tareeq-Ul-Shifa Pharmacy
              </span>
              <p className="text-[8px]">PATH TO HEALING</p>
            </div>
          </motion.div>

          {/* Desktop Search */}
          {router.pathname !== '/' && (
            <div className="hidden max-w-[339px] md:flex mx-4 md:flex-1">
              <GlobalSearch/>
            </div>
          )}

          {/* Desktop Nav Items */}
          <motion.div
            className="hidden md:flex items-center space-x-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.3 }}
          >
            <motion.div
              className="relative"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              <button
                className="p-2 rounded-full"
                onClick={() => dispatch(toggleCartSidebar())}
              >
                <CartIcon />
              </button>
            </motion.div>
            <div className="text-sm font-semibold font-robotoSlab">
                <span className="text-primary">
                  Rs {parseFloat(cart?.totalAmount || 0).toFixed(0)}
                </span>
            </div>
            
            {isAuthenticated ? (
              <ProfileDropdown
                user={
                  user
                    ? {
                        name:
                          `${user.firstName || ''} ${user.lastName || ''}`.trim() ||
                          'User',
                        email: user.email || '',
                        avatar: user.profile || '/images/profileImage.png',
                      }
                    : undefined
                }
                onLogout={handleLogout}
              />
            ) : (
              <motion.div
                className="cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  label="Login"
                  className="px-4 py-2 text-sm"
                  onClick={() => router.push('/login')}
                />
              </motion.div>
            )}
          </motion.div>

          {/* Mobile Menu Toggle & Search Icons */}
          <div className="md:hidden flex items-center space-x-3">
            {/* Improved mobile search icon */}
            {router.pathname !== '/' && <motion.button
              className="p-2 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center w-10 h-10"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={toggleMobileSearch}
              aria-label="Search"
            >
              <FiSearch size={20} />
            </motion.button>}

            <motion.button
              className="p-2 rounded-full bg-gray-100 text-gray-700 flex items-center justify-center w-10 h-10"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={() => dispatch(toggleCartSidebar())}
              aria-label="Cart"
            >
              <CartIcon />
            </motion.button>

            <motion.button
              className="p-2 rounded-full bg-primary text-white flex items-center justify-center w-10 h-10"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <MdClose size={20} /> : <FiMenu size={20} />}
            </motion.button>
          </div>
        </div>

        {/* Mobile Search Bar - Full Width and Separated */}
        <AnimatePresence>
          {mobileSearchVisible && (
            <motion.div
              className="md:hidden absolute top-[90px] left-0 right-0 z-40 bg-white shadow-md px-4 py-3"
              variants={mobileSearchVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="flex items-center space-x-2">
                <motion.button
                  className="text-primary p-2"
                  onClick={toggleMobileSearch}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <IoMdArrowBack size={20} />
                </motion.button>
                <div className="flex-1">
                  <GlobalSearch 
                    mobileView={true} 
                    showButton={true} 
                    buttonLabel="Search"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Mobile Menu */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              ref={mobileMenuRef}
              className="md:hidden fixed top-0 left-0 h-full w-4/5 bg-white shadow-lg z-50 overflow-y-auto"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="flex flex-col h-full">
                {/* Header */}
                <motion.div
                  className="flex items-center justify-between p-4 border-b"
                  variants={menuItemVariants}
                >
                  <div className="flex items-center space-x-2">
                    <div className="w-10 h-10 flex items-center justify-center">
                      <Logo />
                    </div>
                    <span className="font-semibold text-sm">
                      Tareeq-Ul-Shifa
                    </span>
                  </div>
                  <motion.button
                    className="p-2 text-primary rounded-full"
                    onClick={toggleMenu}
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <MdClose size={24} />
                  </motion.button>
                </motion.div>

                {/* User Info */}
                <motion.div
                  className="flex items-center space-x-3 p-4 bg-gradient-to-r from-primary/10 to-primary/5"
                  variants={menuItemVariants}
                >
                  {isAuthenticated ? (
                    <>
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center overflow-hidden">
                        <Image
                          src={user?.profile || '/images/profileImage.png'}
                          alt="Profile"
                          width={48}
                          height={48}
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium">
                          {`${user?.firstName || ''} ${user?.lastName || ''}`.trim() ||
                            'User'}
                        </h3>
                        <p className="text-xs text-gray-500 truncate">
                          {user?.email}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
                        <BiUserCircle size={30} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">Guest User</h3>
                        <motion.button
                          className="text-primary text-sm font-medium"
                          onClick={() => router.push('/login')}
                          variants={buttonVariants}
                          whileHover="hover"
                          whileTap="tap"
                        >
                          Sign In / Register
                        </motion.button>
                      </div>
                    </>
                  )}
                </motion.div>

                {/* Menu Items */}
                <div className="flex-1 py-4">
                  <motion.div
                    className="px-4 py-3 border-b flex justify-between items-center"
                    variants={menuItemVariants}
                    onClick={() => {
                      router.push('/orders');
                      setIsMenuOpen(false);
                    }}
                  >
                    <span className="text-gray-700">My Orders</span>
                    <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                      View All
                    </span>
                  </motion.div>

                  <motion.div
                    className="px-4 py-3 border-b"
                    variants={menuItemVariants}
                    onClick={() => {
                      dispatch(toggleCartSidebar());
                      setIsMenuOpen(false);
                    }}
                  >
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700">Cart</span>
                      <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                        {cart?.totalItems || 0}
                      </span>
                    </div>
                    <div className="mt-1 text-sm text-gray-500">
                      Total:{' '}
                      <span className="text-primary font-medium">
                        Rs {parseFloat(cart?.totalAmount || 0).toFixed(0)}
                      </span>
                    </div>
                  </motion.div>
                  <motion.div
                    className="px-4 py-3 border-b"
                    variants={menuItemVariants}
                    onClick={() => {
                      router.push('/account-setting');
                      setIsMenuOpen(false);
                    }}
                  >
                    <span className="text-gray-700">Account Settings</span>
                  </motion.div>
                </div>

                {isAuthenticated && (
                  <motion.div
                    className="mt-auto p-4 border-t text-center"
                    variants={menuItemVariants}
                  >
                    <motion.button
                      className="text-red-600 font-medium"
                      variants={buttonVariants}
                      whileHover="hover"
                      whileTap="tap"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Logout
                    </motion.button>
                  </motion.div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Overlay when mobile menu is open */}
        <AnimatePresence>
          {isMenuOpen && (
            <motion.div
              className="fixed inset-0 bg-black/50 z-40 md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={toggleMenu}
            />
          )}
        </AnimatePresence>
      </header>
    </>
  );
};

export default Header;