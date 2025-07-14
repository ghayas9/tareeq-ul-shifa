// src/redux/slices/orderSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Order, OrderSummary } from '../../types/orderTypes';
import { 
  fetchOrder, 
  fetchUserOrders, 
  cancelUserOrder,
  fetchAdminOrders,
  updateOrderStatus,
  updateOrderPaymentStatus,
  fetchOrderSummary
} from '../thunk/order.thunk';

interface PaginationMetadata {
  currentPage: number;
  totalPages: number;
  pageSize: number;
  totalItems: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface OrderState {
  currentOrder: Order | null;
  orders: Order[];
  adminOrders: {
    data: Order[];
    pagination: PaginationMetadata;
  };
  orderSummary: {
    totalOrders: number;
    totalRevenue: number;
    pendingOrders: number;
    processingOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
    refundedOrders: number;
  };
  isLoading: boolean;
  error: string | null;
}


const initialState: OrderState = {
  currentOrder: null,
  orders: [],
  adminOrders: {
    data: [],
    pagination: {
      currentPage: 1,
      totalPages: 0,
      pageSize: 10,
      totalItems: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  },
  orderSummary: {
    totalOrders: 0,
    totalRevenue: 0,
    pendingOrders: 0,
    processingOrders: 0,
    shippedOrders: 0,
    deliveredOrders: 0,
    cancelledOrders: 0,
    refundedOrders: 0,
  },
  isLoading: false,
  error: null,
};

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrderState: (state) => {
      state.currentOrder = null;
      state.orders = [];
      state.isLoading = false;
      state.error = null;
    },
    clearOrderError: (state) => {
      state.error = null;
    },
    setOrderLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    resetAdminOrders: (state) => {
      state.adminOrders = {
        data: [],
        pagination: {
          currentPage: 1,
          totalPages: 0,
          pageSize: 10,
          totalItems: 0,
          hasNextPage: false,
          hasPreviousPage: false,
        },
      };
    },
  },
  extraReducers: (builder) => {
    // Get order by ID
    builder.addCase(fetchOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchOrder.fulfilled, (state, action: PayloadAction<Order>) => {
      state.isLoading = false;
      state.currentOrder = action.payload;
    });
    builder.addCase(fetchOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch order';
    });

    // Get user orders
    builder.addCase(fetchUserOrders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchUserOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
      state.isLoading = false;
      state.orders = action.payload;
    });
    builder.addCase(fetchUserOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch user orders';
    });

    // Cancel order
    builder.addCase(cancelUserOrder.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(cancelUserOrder.fulfilled, (state, action: PayloadAction<Order>) => {
      state.isLoading = false;
      
      // Update current order if it matches
      if (state.currentOrder && state.currentOrder.id === action.payload.id) {
        state.currentOrder = action.payload;
      }
      
      // Update order in the list
      const index = state.orders.findIndex(order => order.id === action.payload.id);
      if (index !== -1) {
        state.orders[index] = action.payload;
      }
    });
    builder.addCase(cancelUserOrder.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to cancel order';
    });

    // ADMIN ACTIONS

    // Fetch all orders (admin)
    builder.addCase(fetchAdminOrders.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchAdminOrders.fulfilled, (state, action: PayloadAction<{
      data: Order[];
      currentPage: number;
      totalPages: number;
      pageSize: number;
      totalItems: number;
      hasNextPage: boolean;
      hasPreviousPage: boolean;
    }>) => {
      state.isLoading = false;
      state.adminOrders = {
        data: action.payload.data,
        pagination: {
          currentPage: action.payload.currentPage,
          totalPages: action.payload.totalPages,
          pageSize: action.payload.pageSize,
          totalItems: action.payload.totalItems,
          hasNextPage: action.payload.hasNextPage,
          hasPreviousPage: action.payload.hasPreviousPage,
        },
      };
    });
    builder.addCase(fetchAdminOrders.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch admin orders';
    });

    // Update order status (admin)
    builder.addCase(updateOrderStatus.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateOrderStatus.fulfilled, (state, action: PayloadAction<Order>) => {
      state.isLoading = false;
      
      // Update in admin orders list if present
      const adminIndex = state.adminOrders.data.findIndex(order => order.id === action.payload.id);
      if (adminIndex !== -1) {
        state.adminOrders.data[adminIndex] = action.payload;
      }
      
      // Update current order if it matches
      if (state.currentOrder && state.currentOrder.id === action.payload.id) {
        state.currentOrder = action.payload;
      }
    });
    builder.addCase(updateOrderStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to update order status';
    });

    // Update payment status
    builder.addCase(updateOrderPaymentStatus.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateOrderPaymentStatus.fulfilled, (state, action: PayloadAction<Order>) => {
      state.isLoading = false;
      
      // Update in admin orders list if present
      const adminIndex = state.adminOrders.data.findIndex(order => order.id === action.payload.id);
      if (adminIndex !== -1) {
        state.adminOrders.data[adminIndex] = action.payload;
      }
      
      // Update current order if it matches
      if (state.currentOrder && state.currentOrder.id === action.payload.id) {
        state.currentOrder = action.payload;
      }
    });
    builder.addCase(updateOrderPaymentStatus.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to update payment status';
    });
    builder.addCase(fetchOrderSummary.pending, (state) => {
      // No need to set loading state here as we want to keep UI responsive
    });
    builder.addCase(fetchOrderSummary.fulfilled, (state, action: PayloadAction<OrderSummary>) => {
      state.orderSummary = action.payload;
    });
    builder.addCase(fetchOrderSummary.rejected, (state, action) => {
      state.error = action.error.message || 'Failed to fetch order summary';
    });
  },
});

export const { 
  clearOrderState, 
  clearOrderError, 
  setOrderLoading,
  resetAdminOrders
} = orderSlice.actions;

export default orderSlice.reducer;