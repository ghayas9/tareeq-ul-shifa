
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import {
  fetchOrder,
  fetchUserOrders,
  cancelUserOrder
} from '../redux/thunk/order.thunk';
import { clearOrderError } from '../redux/slices/orderSlice';

export const useOrder = () => {
  const dispatch = useAppDispatch();
  
  const orderState = useAppSelector((state) => state.order);
  const { currentOrder, orders, isLoading, error } = orderState;

  // Get order by ID
  const getOrderById = async (orderId: string) => {
    try {
      return await dispatch(fetchOrder(orderId)).unwrap();
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  };

  // Get all orders for the current user
  const getOrders = async () => {
    try {
      return await dispatch(fetchUserOrders()).unwrap();
    } catch (error) {
      console.error('Error fetching user orders:', error);
      throw error;
    }
  };

  // Cancel an order
  const cancelOrder = async (orderId: string) => {
    try {
      return await dispatch(cancelUserOrder(orderId)).unwrap();
    } catch (error) {
      console.error('Error cancelling order:', error);
      throw error;
    }
  };

  // Clear any errors
  const handleClearError = () => {
    dispatch(clearOrderError());
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      handleClearError();
    };
  }, []);

  return {
    currentOrder,
    orders,
    isLoading,
    error,
    getOrderById,
    getOrders,
    cancelOrder,
    clearError: handleClearError
  };
};