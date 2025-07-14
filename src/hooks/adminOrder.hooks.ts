// src/hooks/useAdminOrders.ts
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import {
  fetchAdminOrders,
  updateOrderStatus,
  updateOrderPaymentStatus,
  OrderQueryParams,
} from '../redux/thunk/order.thunk';
import { clearOrderError, resetAdminOrders } from '../redux/slices/orderSlice';

export const useAdminOrders = () => {
  const dispatch = useAppDispatch();
  ` `;

  const { adminOrders, orderSummary, isLoading, error } = useAppSelector(
    (state) => state.order
  );
  const { data: orders, pagination } = adminOrders;

  const [filters, setFilters] = useState<OrderQueryParams>({
    page: 1,
    pageSize: 10,
    sortBy: 'createdAt',
    sortOrder: 'desc',
  });

  // Load orders based on current filters
  const loadOrders = async (params?: OrderQueryParams) => {
    try {
      const queryParams = params || filters;
      await dispatch(fetchAdminOrders(queryParams)).unwrap();
    } catch (error) {
      console.error('Error loading admin orders:', error);
    }
  };

  // Change page
  const handlePageChange = (page: number) => {
    const newFilters = { ...filters, page };
    setFilters(newFilters);
    loadOrders(newFilters);
  };

  // Change items per page
  const handleItemsPerPageChange = (pageSize: number) => {
    const newFilters = { ...filters, pageSize, page: 1 };
    setFilters(newFilters);
    loadOrders(newFilters);
  };

  const applyFilters = (newFilters: Partial<OrderQueryParams>) => {
    const updatedFilters = { ...filters, ...newFilters, page: 1 };
    setFilters(updatedFilters);
    loadOrders(updatedFilters);
  };

  // Reset filters
  const resetFilters = () => {
    const defaultFilters = {
      page: 1,
      pageSize: 10,
      sortBy: 'createdAt',
      sortOrder: 'desc' as const,
    };
    setFilters(defaultFilters);
    loadOrders(defaultFilters);
  };

  // Handle order status update
  const handleUpdateStatus = async (
    orderId: string,
    status: string,
    comment?: string
  ) => {
    try {
      await dispatch(updateOrderStatus({ orderId, status, comment })).unwrap();
      return true;
    } catch (error) {
      console.error('Error updating order status:', error);
      return false;
    }
  };

  // Handle payment status update
  const handleUpdatePayment = async (
    orderId: string,
    paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded',
    transactionId?: string
  ) => {
    try {
      await dispatch(
        updateOrderPaymentStatus({
          orderId,
          paymentStatus,
          transactionId,
        })
      ).unwrap();
      return true;
    } catch (error) {
      console.error('Error updating payment status:', error);
      return false;
    }
  };

  // Clear errors
  const clearErrors = () => {
    dispatch(clearOrderError());
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      dispatch(resetAdminOrders());
      clearErrors();
    };
  }, [dispatch]);

  return {
    orders,
    pagination,
    isLoading,
    orderSummary,
    error,
    filters,
    loadOrders,
    applyFilters,
    resetFilters,
    handlePageChange,
    handleItemsPerPageChange,
    handleUpdateStatus,
    handleUpdatePayment,
    clearErrors,
  };
};

export default useAdminOrders;
