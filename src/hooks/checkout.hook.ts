import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/store/store';
import {
  startCheckout,
  getCheckoutSession,
  saveContactInfo,
  saveDeliveryInfo,
  savePaymentInfo,
  placeOrder,
  cancelCheckout,
} from '../redux/thunk/checkout.thunk';
import {
  clearCheckoutError,
  setCheckoutStep,
} from '../redux/slices/checkoutSlice';
import {
  ContactInfoData,
  DeliveryInfoData,
  PaymentInfoData,
} from '../types/checkoutTypes';
import toast from 'react-hot-toast';

export const useCheckout = () => {
  const dispatch = useAppDispatch();
  const [checkoutRetries, setCheckoutRetries] = useState(0);

  // Use type assertion since the store might not be fully typed yet
  const checkoutState = useAppSelector((state) => state.checkout as any);
  const { session, isLoading, error } = checkoutState || {
    session: null,
    isLoading: false,
    error: null,
  };

  // Load saved checkout session on component mount
  useEffect(() => {
    const savedSessionId = localStorage.getItem('checkout_session_id');

    if (savedSessionId && !session) {
      fetchCheckoutSession(savedSessionId);
    }
  }, []);

  // Start a new checkout session
  const initiateCheckout = async (cartId?: string) => {
    try {
      console.log('Hook: Starting checkout for cart ID:', cartId);
      return await dispatch(startCheckout(cartId)).unwrap();
    } catch (error) {
      console.error('Hook: Error starting checkout:', error);
      throw error;
    }
  };

  // Get checkout session by ID or active session
  const fetchCheckoutSession = async (checkoutSessionId?: string) => {
    try {
      console.log('Hook: Fetching checkout session ID:', checkoutSessionId);
      return await dispatch(getCheckoutSession(checkoutSessionId)).unwrap();
    } catch (error) {
      console.error('Hook: Error fetching checkout session:', error);
      // Don't throw this error as it might be called on page load and fail quietly
      return null;
    }
  };

  // Save contact information (Step 1)
  const submitContactInfo = async (data: ContactInfoData) => {
    if (!session?.id) {
      throw new Error('No active checkout session 1');
    }

    try {
      console.log('Hook: Saving contact info:', data);
      const result = await dispatch(
        saveContactInfo({ checkoutSessionId: session.id, data })
      ).unwrap();

      // Update step if successful
      if (result.step < 2) {
        dispatch(setCheckoutStep(2));
      }

      return result;
    } catch (error) {
      console.error('Hook: Error saving contact information:', error);
      throw error;
    }
  };

  // Save delivery information (Step 2)
  const submitDeliveryInfo = async (data: DeliveryInfoData) => {
    if (!session?.id) {
      throw new Error('No active checkout session 2');
    }

    try {
      console.log('Hook: Saving delivery info:', data);
      const result = await dispatch(
        saveDeliveryInfo({ checkoutSessionId: session.id, data })
      ).unwrap();

      // Update step if successful
      if (result.step < 3) {
        dispatch(setCheckoutStep(3));
      }

      return result;
    } catch (error) {
      console.error('Hook: Error saving delivery information:', error);
      throw error;
    }
  };

  // Save payment information (Step 3)
  const submitPaymentInfo = async (data: PaymentInfoData) => {
    if (!session?.id) {
      throw new Error('No active checkout session 3');
    }

    try {
      console.log('Hook: Saving payment info:', data);
      return await dispatch(
        savePaymentInfo({ checkoutSessionId: session.id, data })
      ).unwrap();
    } catch (error) {
      console.error('Hook: Error saving payment information:', error);
      throw error;
    }
  };

  // Place order with robust error handling and retries
  const submitOrder = async (checkoutSessionId: string) => {
    if (!checkoutSessionId) {
      throw new Error('No active checkout session 4');
    }

    try {
      console.log(
        'Hook: Placing order with checkout session ID:',
        checkoutSessionId
      );
      const response = await dispatch(placeOrder(checkoutSessionId)).unwrap();
      console.log('Hook: Order placed successfully:', response);
      // Reset retries count on success
      setCheckoutRetries(0);
      return response;
    } catch (error: any) {
      console.error('Hook: Error placing order:', error);

      // Implement retry logic (maximum 2 retries)
      if (checkoutRetries < 2) {
        setCheckoutRetries((prev) => prev + 1);
        console.log(
          `Hook: Retrying order placement (attempt ${checkoutRetries + 1})...`
        );
        toast.error('Order placement failed. Retrying...');

        // Wait a short time before retrying
        await new Promise((resolve) => setTimeout(resolve, 1000));
        return await submitOrder(checkoutSessionId);
      }

      // If we've reached max retries or there's a specific error we don't want to retry
      const errorMessage = error.message || 'Failed to place order';
      throw new Error(errorMessage);
    }
  };

  // Cancel checkout
  const abandonCheckout = async () => {
    if (!session?.id) {
      return null; // No active session to cancel
    }

    try {
      console.log('Hook: Cancelling checkout session ID:', session.id);
      return await dispatch(cancelCheckout(session.id)).unwrap();
    } catch (error) {
      console.error('Hook: Error cancelling checkout:', error);
      throw error;
    }
  };

  // Set checkout step manually if needed
  const setStep = (step: number) => {
    dispatch(setCheckoutStep(step));
  };

  // Clear any errors
  const handleClearError = () => {
    dispatch(clearCheckoutError());
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      handleClearError();
    };
  }, []);

  return {
    checkoutSession: session,
    activeStep: session?.step || 1,
    isLoading,
    error,
    startCheckout: initiateCheckout,
    getCheckoutSession: fetchCheckoutSession,
    saveContactInfo: submitContactInfo,
    saveDeliveryInfo: submitDeliveryInfo,
    savePaymentInfo: submitPaymentInfo,
    placeOrder: submitOrder,
    cancelCheckout: abandonCheckout,
    setStep,
    clearError: handleClearError,
  };
};
