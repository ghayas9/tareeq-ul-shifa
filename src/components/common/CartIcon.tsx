// src/components/common/CartIcon.tsx
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCart } from '@/hooks/cart.hook';

interface CartIconProps {
  className?: string;
}

const CartIcon: React.FC<CartIconProps> = ({ className = '' }) => {
  const { cart, getCart } = useCart();
  
  useEffect(() => {
    getCart().catch(error => console.error('Failed to fetch cart:', error));
  }, []);
  
  const totalItems = cart?.totalItems || 0;
  
  return (
    <div 
      className={`relative cursor-pointer ${className}`} 
      // onClick={navigateToCart}
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
        />
      </svg>
      {totalItems > 0 && (
        <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
          {totalItems}
        </span>
      )}
    </div>
  );
};

export default CartIcon;