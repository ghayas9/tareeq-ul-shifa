import { useEffect, useState } from 'react';
import {
  FaChevronDown,
  FaChevronUp,
  FaSignOutAlt,
  FaLongArrowAltRight,
} from 'react-icons/fa';
import { MdLocalPharmacy, MdMedicalServices } from 'react-icons/md';
import { LuLayoutDashboard } from 'react-icons/lu';
import { MdBusiness, MdPersonOutline } from 'react-icons/md';
import { PiSealPercent } from 'react-icons/pi';
import { IoSettingsOutline } from 'react-icons/io5';
import { BiSolidCategory } from 'react-icons/bi';
import { ProductIcon, ListIcon } from '../../icons/Icons';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { logout } from '@/redux/slices/authSlice';
import { useDispatch } from 'react-redux';

const Sidebar = ({ isMobileOpen, setIsMobileOpen }: any) => {
  const dispatch = useDispatch();
  const [isOpen, setIsOpen] = useState(true);
  const [productDropdownOpen, setProductDropdownOpen] = useState(false);
  const [promotionsDropdownOpen, setPromotionsDropdownOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsOpen(false);
      } else if (window.innerWidth > 640) {
        setIsOpen(true);
        setIsMobileOpen(false); // Close mobile sidebar on larger screens
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, [setIsMobileOpen]);

  useEffect(() => {
    if (router.pathname.includes('/admin/product')) {
      setProductDropdownOpen(true);
    }
    if (router.pathname.includes('/admin/promotions')) {
      setPromotionsDropdownOpen(true);
    }
  }, [router.pathname]);

  const handleLogout = async () => {
    localStorage.removeItem('token');
    dispatch(logout());
    router.push('/login');
  };

  const isActive = (path: any) => router.pathname === path;

  const closeMobileSidebar = () => {
    if (window.innerWidth < 768) {
      setIsMobileOpen(false);
    }
  };

  // Sidebar content component to avoid duplication
  const SidebarContent = () => (
    <>
      {/* Fixed Header */}
      <div className="flex-shrink-0">
        <div className="flex items-center space-x-2 p-4">
          <Image
            src="/images/pharmacy.png"
            alt="Logo"
            className="w-8 h-8"
            width={0}
            height={0}
            unoptimized
          />
          {isOpen && (
            <div>
              <h2 className="text-xs font-medium">Tareeq-Ul-Shifa Pharmacy</h2>
              <p className="text-[8px]">PATH TO HEALING</p>
            </div>
          )}
        </div>
        <button
          className="absolute right-3 top-12 hidden md:block"
          onClick={() => setIsOpen(!isOpen)}
        >
          <FaLongArrowAltRight />
        </button>
      </div>

      {/* Scrollable Content */}
      <div className="flex-grow overflow-y-auto custom-scrollbar">
        <nav className="space-y-2 p-4">
          <h1 className="text-sm font-semibold">HOME</h1>
          <Link
            href="/admin/dashboard"
            className={`flex items-center space-x-2 p-2 rounded-[10px] ${
              isActive('/admin/dashboard') ? 'bg-Aqua' : 'hover:bg-gray-100'
            }`}
            onClick={closeMobileSidebar}
          >
            <LuLayoutDashboard
              className={`text-xl ${
                isActive('/admin/dashboard') ? 'text-primary' : ''
              }`}
            />
            {(isOpen || isMobileOpen) && (
              <span
                className={`${
                  isActive('/admin/dashboard') ? 'text-primary' : ''
                }`}
              >
                Dashboard
              </span>
            )}
          </Link>

          <div className="space-y-2">
            <h2 className="mt-4 font-semibold">ALL PAGES</h2>

            <div>
              <button
                onClick={() => setProductDropdownOpen(!productDropdownOpen)}
                className="flex items-center justify-between w-full p-2 rounded-lg"
              >
                <div className="flex items-center">
                  <ProductIcon />
                  {(isOpen || isMobileOpen) && (
                    <span
                      className={`ml-2 ${
                        router.pathname.includes('/admin/product')
                          ? 'text-primary'
                          : ''
                      }`}
                    >
                      Products
                    </span>
                  )}
                </div>
                {(isOpen || isMobileOpen) && (
                  <span>
                    {productDropdownOpen ? (
                      <FaChevronUp size={12} />
                    ) : (
                      <FaChevronDown size={12} />
                    )}
                  </span>
                )}
              </button>
              {productDropdownOpen && (
                <div
                  className={`ml-${isOpen || isMobileOpen ? '6' : '2'} mt-1 space-y-1`}
                >
                  <Link
                    href="/admin/product-management"
                    className={`flex items-center p-2 rounded-lg ${
                      isActive('/admin/product-management')
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={closeMobileSidebar}
                  >
                    {isOpen || isMobileOpen ? (
                      <span className="ml-2">Product Management</span>
                    ) : (
                      <span className="text-xs">PM</span>
                    )}
                  </Link>
                  <Link
                    href="/admin/add-products"
                    className={`flex items-center p-2 rounded-lg ${
                      isActive('/admin/add-products')
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={closeMobileSidebar}
                  >
                    {isOpen || isMobileOpen ? (
                      <span className="ml-2">Add Product</span>
                    ) : (
                      <span className="text-xs">+P</span>
                    )}
                  </Link>
                </div>
              )}
            </div>

            <Link
              href="/admin/orders"
              className={`flex items-center p-2 rounded-lg ${
                isActive('/admin/orders') ? 'bg-Aqua' : 'hover:bg-gray-100'
              }`}
              onClick={closeMobileSidebar}
            >
              <ListIcon />
              {(isOpen || isMobileOpen) && (
                <span
                  className={`ml-2 ${
                    isActive('/admin/orders') ? 'text-primary' : ''
                  }`}
                >
                  Orders
                </span>
              )}
            </Link>

            <Link
              href="/admin/brands"
              className={`flex items-center p-2 rounded-lg ${
                isActive('/admin/brands') ? 'bg-Aqua' : 'hover:bg-gray-100'
              }`}
              onClick={closeMobileSidebar}
            >
              <MdBusiness className="text-lg" />
              {(isOpen || isMobileOpen) && (
                <span
                  className={`ml-2 ${
                    isActive('/admin/brands') ? 'text-primary' : ''
                  }`}
                >
                  Brands
                </span>
              )}
            </Link>
            <Link
              href="/admin/category"
              className={`flex items-center p-2 rounded-lg ${
                isActive('/admin/category') ? 'bg-Aqua' : 'hover:bg-gray-100'
              }`}
              onClick={closeMobileSidebar}
            >
              <BiSolidCategory className="text-lg" />
              {(isOpen || isMobileOpen) && (
                <span
                  className={`ml-2 ${
                    isActive('/admin/category') ? 'text-primary' : ''
                  }`}
                >
                  Category
                </span>
              )}
            </Link>

            <Link
              href="/admin/prescription"
              className={`flex items-center p-2 rounded-lg ${
                isActive('/admin/prescription') ? 'bg-Aqua' : 'hover:bg-gray-100'
              }`}
              onClick={closeMobileSidebar}
            >
              <MdLocalPharmacy className="text-2xl" />
              {(isOpen || isMobileOpen) && (
                <span
                  className={`ml-2 ${
                    isActive('/admin/prescription') ? 'text-primary' : ''
                  }`}
                >
                  Prescription
                </span>
              )}
            </Link>
            <div>
              <button
                onClick={() =>
                  setPromotionsDropdownOpen(!promotionsDropdownOpen)
                }
                className="flex items-center justify-between w-full p-2 rounded-lg"
              >
                <div className="flex items-center">
                  <PiSealPercent className="text-2xl" />
                  {(isOpen || isMobileOpen) && (
                    <span
                      className={`ml-2 ${
                        router.pathname.includes('/admin/promotions')
                          ? 'text-primary'
                          : ''
                      }`}
                    >
                      Promotions
                    </span>
                  )}
                </div>
                {(isOpen || isMobileOpen) && (
                  <span>
                    {promotionsDropdownOpen ? (
                      <FaChevronUp size={12} />
                    ) : (
                      <FaChevronDown size={12} />
                    )}
                  </span>
                )}
              </button>
              {promotionsDropdownOpen && (
                <div
                  className={`ml-${isOpen || isMobileOpen ? '6' : '2'} mt-1 space-y-1`}
                >
                  {/* <Link
                    href="/admin/promotions"
                    className={`flex items-center p-2 rounded-lg ${
                      isActive('/admin/promotions')
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={closeMobileSidebar}
                  >
                    <span className="ml-2">Track-promitions</span>
                  </Link> */}
                  <Link
                    href="/admin/create-coupon"
                    className={`flex items-center p-2 rounded-lg ${
                      isActive('/admin/create-coupon')
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={closeMobileSidebar}
                  >
                    <span className="ml-2">Create Coupons</span>
                  </Link>
                  <Link
                    href="/admin/coupons"
                    className={`flex items-center p-2 rounded-lg ${
                      isActive('/admin/coupons')
                        ? 'bg-gray-100'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={closeMobileSidebar}
                  >
                    <span className="ml-2">Coupons</span>
                  </Link>
                </div>
              )}
            </div>
          </div>
        </nav>

        <div className="p-4">
          <h2 className="text-sm font-semibold">SETTINGS</h2>
          <Link
            href="/admin/setting"
            className={`flex items-center p-2 rounded-lg ${
              isActive('/admin/setting') ? 'bg-Aqua' : 'hover:bg-gray-100'
            }`}
            onClick={closeMobileSidebar}
          >
            <IoSettingsOutline />
            {(isOpen || isMobileOpen) && (
              <span
                className={`ml-2 ${
                  isActive('/admin/setting') ? 'text-primary' : ''
                }`}
              >
                Settings
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Fixed Footer */}
      <div className="flex-shrink-0 p-4 border-t">
        <button
          className="flex items-center p-2 rounded-lg text-red-500 hover:bg-red-100"
          onClick={handleLogout}
        >
          <FaSignOutAlt />
          {(isOpen || isMobileOpen) && <span className="ml-2">Logout</span>}
        </button>
      </div>
    </>
  );

  // For desktop view
  const desktopSidebar = (
    <div
      className={`relative h-screen bg-white shadow-lg transition-all duration-300 flex-col hidden md:flex ${
        isOpen ? 'w-64' : 'w-20'
      }`}
    >
      <SidebarContent />
    </div>
  );

  // For mobile view - improved with animation
  const mobileSidebar = (
    <div
      className={`fixed inset-0 z-50 md:hidden ${isMobileOpen ? 'visible' : 'invisible'} transition-all duration-300`}
    >
      {/* Overlay with fade effect */}
      <div
        className={`fixed inset-0 bg-black transition-opacity duration-300 ${
          isMobileOpen ? 'opacity-50' : 'opacity-0'
        }`}
        onClick={() => setIsMobileOpen(false)}
      ></div>

      {/* Sidebar with slide effect */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white shadow-lg flex flex-col transform transition-transform duration-300 ease-in-out ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <SidebarContent />
      </div>
    </div>
  );

  return (
    <>
      {desktopSidebar}
      {mobileSidebar}
    </>
  );
};

export default Sidebar;
