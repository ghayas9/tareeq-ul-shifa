// src/redux/slices/cartSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CartState, Cart } from '../../types/cartTypes';
import { fetchCart, addToCart, updateCartItem, removeFromCart, clearCart, applyCoupon, removeCoupon, transferCart } from '../thunk/cart.thunk';


interface ExtendedCartState extends CartState {
  isSidebarOpen: boolean;
}

const initialState: ExtendedCartState = {
  cart: null,
  isLoading: false,
  error: null,
  isSidebarOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    clearCartState: (state) => {
      state.cart = null;
      state.isLoading = false;
      state.error = null;
    },
    clearCartError: (state) => {
      state.error = null;
    },
    setCartLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    toggleCartSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
  },
  extraReducers: (builder) => {
    // Fetch cart
    builder.addCase(fetchCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCart.fulfilled, (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to fetch cart';
    });

    // Add to cart
    builder.addCase(addToCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(addToCart.fulfilled, (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
      state.isLoading = false;
    });
    builder.addCase(addToCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to add item to cart';
    });

    // Update cart item
    builder.addCase(updateCartItem.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateCartItem.fulfilled, (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
      state.isLoading = false;
    });
    builder.addCase(updateCartItem.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to update cart item';
    });

    // Remove from cart
    builder.addCase(removeFromCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeFromCart.fulfilled, (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
      state.isLoading = false;
    });
    builder.addCase(removeFromCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to remove item from cart';
    });

    // Clear cart
    builder.addCase(clearCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(clearCart.fulfilled, (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
      state.isLoading = false;
    });
    builder.addCase(clearCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to clear cart';
    });

    // Apply coupon
    builder.addCase(applyCoupon.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(applyCoupon.fulfilled, (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
      state.isLoading = false;
    });
    builder.addCase(applyCoupon.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to apply coupon';
    });

    // Remove coupon
    builder.addCase(removeCoupon.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(removeCoupon.fulfilled, (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
      state.isLoading = false;
    });
    builder.addCase(removeCoupon.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to remove coupon';
    });

    // Transfer cart
    builder.addCase(transferCart.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(transferCart.fulfilled, (state, action: PayloadAction<Cart>) => {
      state.cart = action.payload;
      state.isLoading = false;
    });
    builder.addCase(transferCart.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || 'Failed to transfer cart';
    });
  },
});

export const { clearCartState, clearCartError, setCartLoading, toggleCartSidebar } = cartSlice.actions;

export default cartSlice.reducer;