import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, TypedUseSelectorHook } from 'react-redux';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { combineReducers } from 'redux';

import authReducer from '../slices/authSlice';
import categoryReducer from '../slices/categorySlice';
import productReducer from '../slices/productSlice';
import couponReducer from '../slices/couponSlice';
import userReducer from '../slices/userSlice';
import cartReducer from '../slices/cartSlice';
import orderReducer from '../slices/orderSlice';
import checkoutReducer from '../slices/checkoutSlice'; 
import paymentReducer from '../slices/paymentSlice'; 
import dashboardReducer from '../slices/dashboardSlice'; 
import brandReducer from '../slices/brandSlice'; 
import prescriptionReducer from '../slices/prescription.slice'; 

// Only persist auth data
const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'user', 'isAuthenticated'],
};

// Apply persist only to auth reducer
const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

// Create root reducer with only auth being persisted
const rootReducer = combineReducers({
  auth: persistedAuthReducer,
  cart: cartReducer,              // No longer persisted
  category: categoryReducer,
  product: productReducer,
  coupon: couponReducer,
  user: userReducer,
  order: orderReducer,            // No longer persisted
  checkout: checkoutReducer,      // No longer persisted
  payment: paymentReducer,
  dashboard: dashboardReducer,
  brand: brandReducer,
  prescription: prescriptionReducer,
});

// Create store
export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
  devTools: process.env.NODE_ENV !== 'production',
});

// Create persistor
export const persistor = persistStore(store);

// Export types for TypeScript
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;