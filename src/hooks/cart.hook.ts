
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import {
  fetchCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  applyCoupon,
  removeCoupon,
  transferCart
} from '../redux/thunk/cart.thunk';
import { clearCartError } from '../redux/slices/cartSlice';
import { AddToCartData, ApplyCouponData } from '../types/cartTypes';

export const useCart = () => {
  const dispatch = useAppDispatch();
  
  const cartState = useAppSelector((state) => state.cart as any);
  const { cart, isLoading, error } = cartState;

  const getCart = async () => {
    // const token = localStorage.getItem('token');
    // if (!token) {
    //   return { items: [], totalItems: 0, totalAmount: 0 };
    // }
    
    try {
      return await dispatch(fetchCart()).unwrap();
    } catch (error) {
      console.error('Error fetching cart:', error);
      throw error;
    }
  };
  const addItemToCart = async (data: AddToCartData) => {
    try {
      return await dispatch(addToCart(data)).unwrap();
    } catch (error) {
      console.error('Error adding item to cart:', error);
      throw error;
    }
  };

  // Update cart item quantity
  const updateItemQuantity = async (cartItemId: string, quantity: number) => {
    try {
      return await dispatch(updateCartItem({ cartItemId, quantity })).unwrap();
    } catch (error) {
      console.error('Error updating cart item:', error);
      throw error;
    }
  };

  // Remove item from cart
  const removeItemFromCart = async (cartItemId: string) => {
    try {
      return await dispatch(removeFromCart(cartItemId)).unwrap();
    } catch (error) {
      console.error('Error removing item from cart:', error);
      throw error;
    }
  };

  // Clear cart (remove all items)
  const emptyCart = async () => {
    try {
      return await dispatch(clearCart()).unwrap();
    } catch (error) {
      console.error('Error clearing cart:', error);
      throw error;
    }
  };

  // Apply coupon
  const applyCartCoupon = async (data: ApplyCouponData) => {
    try {
      return await dispatch(applyCoupon(data)).unwrap();
    } catch (error) {
      console.error('Error applying coupon:', error);
      throw error;
    }
  };

  // Remove coupon
  const removeCartCoupon = async () => {
    try {
      return await dispatch(removeCoupon()).unwrap();
    } catch (error) {
      console.error('Error removing coupon:', error);
      throw error;
    }
  };

  // Transfer cart from session to user after login
  const transferCartToUser = async (sessionId: string) => {
    try {
      return await dispatch(transferCart(sessionId)).unwrap();
    } catch (error) {
      console.error('Error transferring cart:', error);
      throw error;
    }
  };

  // Clear any errors
  const handleClearError = () => {
    dispatch(clearCartError());
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      handleClearError();
    };
  }, []);

  return {
    cart,
    isLoading,
    error,
    getCart,
    addItemToCart,
    updateItemQuantity,
    removeItemFromCart,
    emptyCart,
    applyCartCoupon,
    removeCartCoupon,
    transferCartToUser,
    clearError: handleClearError
  };
};