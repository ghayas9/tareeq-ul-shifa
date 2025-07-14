import React, { useEffect } from 'react';
import { NotificatioIcon } from '../../icons/Icons';
import { HiMenu } from 'react-icons/hi';
import Image from 'next/image';
import { useAppSelector } from '@/redux/store/store';
import { useUser } from '@/hooks/user.hook';

function Header({ toggleMobileSidebar }: any) {
  const { user, isAuthenticated } = useAppSelector((state) => state.auth);
  const { getUserProfile } = useUser();
  console.log(user, 'user');
  useEffect(() => {
    if (isAuthenticated && user?.id) {
      getUserProfile();
    }
  }, [user?.id, isAuthenticated, user?.profile]);

  return (
    <div className="bg-white h-[85px] py-4 shadow-md px-4">
      <div className="flex items-center justify-between">
        {/* Hamburger menu icon for mobile with animation */}
        <button
          onClick={toggleMobileSidebar}
          className="md:hidden text-2xl hover:text-primary transition-colors duration-300 focus:outline-none transform hover:scale-110"
          aria-label="Toggle mobile menu"
        >
          <HiMenu />
        </button>

        {/* User profile pushed to the right */}
        <div className="ml-auto flex gap-2 items-center">
          <div className="bg-LightGray w-14 h-14 rounded-full flex items-center justify-center">
            <NotificatioIcon className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-base font-poppins font-medium">
              {`${user?.firstName || ''} ${user?.lastName || ''}`.trim() || ''}
            </h2>
            <p className="text-sm font-robotoSlab text-textColor">
              {user?.role || 'Guest'}
            </p>
          </div>
          <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
            <Image
              src={user?.profile || '/images/profileImage.png'}
              alt="Profile"
              width={48}
              height={48}
              className="relative z-10 object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Header;
