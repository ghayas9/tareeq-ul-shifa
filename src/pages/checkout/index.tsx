import React, { useEffect, useState } from 'react';
import { useCart } from '@/hooks/cart.hook';
import { useCheckout } from '@/hooks/checkout.hook';
import { usePayment } from '@/hooks/payment.hooks';
import Image from 'next/image';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import toast from 'react-hot-toast';
import { FaLock } from 'react-icons/fa';
import CheckoutSkeleton from '@/components/CheckoutSkeleton';
import { useAppSelector } from '@/redux/store/store';
import Spinner from '@/components/Spinner';

// Helper function to parse price values
const parsePrice = (price: any): number => {
  if (typeof price === 'number') {
    return price;
  }
  if (typeof price === 'string') {
    return parseFloat(price) || 0;
  }
  return 0;
};

const CheckoutPage: React.FC = () => {
  const {
    cart,
    isLoading: isCartLoading,
    getCart,
    applyCartCoupon,
  } = useCart();
  const {
    checkoutSession,
    isLoading: isCheckoutLoading,
    startCheckout,
    saveContactInfo,
    saveDeliveryInfo,
    savePaymentInfo,
    placeOrder,
  } = useCheckout();

  const { isLoading: isPaymentLoading, payCashOnDelivery } = usePayment();

  const { user } = useAppSelector((state) => state.auth);
  const [couponCode, setCouponCode] = useState('');
  const [isApplyingCoupon, setIsApplyingCoupon] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [checkoutSessionId, setCheckoutSessionId] = useState('');

  useEffect(() => {
    if (checkoutSession) setCheckoutSessionId(checkoutSession?.id);
  }, [checkoutSession]);

  // Form state
  const [contactInfo, setContactInfo] = useState({
    email: '',
    mobileNumber: '',
  });

  const [deliveryInfo, setDeliveryInfo] = useState({
    country: 'Pakistan', // Default value
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    postalCode: '',
    phoneNumber: '',
    shippingMethod: 'Fixed',
    saveInformation: false,
  });

  // Simplified payment info with only Cash on Delivery
  const [paymentInfo, setPaymentInfo] = useState({
    paymentMethod: 'cash',
    saveInformation: false,
  });

  // Load cart data on page load
  useEffect(() => {
    const loadCart = async () => {
      try {
        await getCart();
      } catch (error) {
        console.error('Failed to load cart:', error);
        toast.error('Failed to load cart data');
      }
    };

    loadCart();
  }, []);
  useEffect(() => {
    // Load saved delivery info from localStorage when component mounts
    const loadSavedDeliveryInfo = () => {
      try {
        const savedInfo = localStorage.getItem('savedDeliveryInfo');
        if (savedInfo) {
          const parsedInfo = JSON.parse(savedInfo);
          setDeliveryInfo((prevInfo) => ({
            ...prevInfo,
            ...parsedInfo,
            saveInformation: true, // Set checkbox to checked
          }));
        }
      } catch (error) {
        console.error('Error loading saved delivery info:', error);
      }
    };

    // Only load if user is authenticated
    if (user && user.id) {
      loadSavedDeliveryInfo();
    }
  }, [user]);

  useEffect(() => {
    if (user && user.email) {
      setContactInfo((prev) => ({
        ...prev,
        email: user.email || prev.email,
      }));
    }
  }, [user]);

  // Start or resume checkout session when cart is loaded
  useEffect(() => {
    const initializeCheckout = async () => {
      if (cart?.id && !checkoutSession) {
        try {
          await startCheckout(cart.id);
        } catch (error) {
          console.error('Failed to start checkout:', error);
          toast.error('Failed to initialize checkout');
        }
      }
    };

    if (cart) {
      initializeCheckout();
    }
  }, [cart]);

  // Sync form data with checkout session
  useEffect(() => {
    if (checkoutSession) {
      // Pre-fill contact info from session
      if (checkoutSession.contactInformation) {
        setContactInfo({
          email: checkoutSession.contactInformation.email || '',
          mobileNumber: checkoutSession.contactInformation.mobileNumber || '',
        });
      }

      // Pre-fill delivery info from session
      if (checkoutSession.deliveryInformation) {
        const di = checkoutSession.deliveryInformation;
        setDeliveryInfo({
          country: di.country || 'Pakistan',
          firstName: di.firstName || '',
          lastName: di.lastName || '',
          address: di.address || '',
          apartment: di.apartment || '',
          city: di.city || '',
          postalCode: di.postalCode || '',
          phoneNumber: di.phoneNumber || '',
          shippingMethod: di.shippingMethod || 'Fixed',
          saveInformation: di.saveInformation || false,
        });
      }
    }
  }, [checkoutSession]);

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) {
      toast.error('Please enter a coupon code');
      return;
    }

    try {
      setIsApplyingCoupon(true);
      await applyCartCoupon({ couponCode: couponCode });
    } catch (error) {
      console.error('Failed to apply coupon:', error);
      toast.error('Invalid coupon code');
    } finally {
      setIsApplyingCoupon(false);
    }
  };

  const handleContactChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setContactInfo({
      ...contactInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleDeliveryChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    setDeliveryInfo({
      ...deliveryInfo,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePaymentChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setPaymentInfo({
      ...paymentInfo,
      [name]: checked,
    });
  };

  // Unified function to handle the complete order submission
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!contactInfo.email && !contactInfo.mobileNumber) {
      toast.error('Please enter either an email or mobile number');
      return;
    }

    // Delivery validation
    if (
      !deliveryInfo.firstName ||
      !deliveryInfo.lastName ||
      !deliveryInfo.address ||
      !deliveryInfo.city ||
      !deliveryInfo.phoneNumber
    ) {
      toast.error('Please fill in all required delivery fields');
      return;
    }

    if (deliveryInfo.saveInformation) {
      try {
        const infoToSave = {
          firstName: deliveryInfo.firstName,
          lastName: deliveryInfo.lastName,
          address: deliveryInfo.address,
          apartment: deliveryInfo.apartment,
          city: deliveryInfo.city,
          postalCode: deliveryInfo.postalCode,
          phoneNumber: deliveryInfo.phoneNumber,
          country: deliveryInfo.country,
        };
        localStorage.setItem('savedDeliveryInfo', JSON.stringify(infoToSave));
      } catch (error) {
        console.error('Error saving delivery info:', error);
      }
    } else {
      // If checkbox is unchecked, remove any saved information
      localStorage.removeItem('savedDeliveryInfo');
    }
    try {
      setIsPlacingOrder(true);

      // Save contact info
      await saveContactInfo(contactInfo);

      // Save delivery info
      await saveDeliveryInfo(deliveryInfo);

      // Save payment information - simplified for cash on delivery
      const paymentData = {
        paymentMethod: 'cash',
        saveInformation: paymentInfo.saveInformation,
      };

      console.log('Saving payment info:', paymentData);
      const paymentResult = await savePaymentInfo(paymentData as any);
      console.log('Payment info save result:', paymentResult);

      if (!paymentResult) {
        throw new Error('Payment information saving failed');
      }

      // Place the order
      console.log('Placing order with checkout session ID:', checkoutSessionId);
      const orderResponse = await placeOrder(checkoutSessionId);
      console.log('Order API response:', orderResponse);

      // Get the order ID from the response
      const orderId =
        orderResponse?.id ||
        orderResponse?.orderId ||
        orderResponse?.order?.id ||
        orderResponse?.data?.id ||
        orderResponse?.data?.orderId;

      if (!orderId) {
        console.error('Missing order ID in response:', orderResponse);
        throw new Error('Order ID not available in response');
      }

      // Process cash on delivery payment
      console.log('Setting up Cash on Delivery...');
      const paymentResponse = await payCashOnDelivery(orderId);
      console.log('Cash payment response:', paymentResponse);

      // Redirect to success page
      const queryParams = new URLSearchParams();
      queryParams.append('id', orderId);
      queryParams.append('paymentMethod', 'cash');

      getCart();
      setTimeout(() => {
        window.location.href = `/checkout/success?${queryParams.toString()}`;
      }, 100);
    } catch (error) {
      console.error('Failed to place order with details:', error);
      if (error instanceof Error) {
        toast.error(`Order failed: ${error.message}`);
      } else {
        toast.error('Failed to place order. Please try again.');
      }
    } finally {
      setIsPlacingOrder(false);
    }
  };

  const isLoading = isCartLoading || isCheckoutLoading || isPaymentLoading;

  if (isLoading && !cart) {
    return (
      <Layout>
        <CheckoutSkeleton />
      </Layout>
    );
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-col items-center justify-center h-64">
            <h2 className="text-2xl font-semibold mb-4">Your cart is empty</h2>
            <p className="text-gray-500 mb-4">
              Add some products to your cart to checkout
            </p>
            <Link
              href="/"
              className="bg-primary text-white py-2 px-6 rounded-lg"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const subtotal = parsePrice(cart.subtotalAmount);
  const discount = parsePrice(cart.discountAmount);
  const shippingCost = parsePrice(
    checkoutSession?.deliveryInformation?.shippingCost || 100
  ); // Fixed shipping cost
  console.log(shippingCost,"shipping")
  const total = subtotal - discount + shippingCost;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-6">
        {/* Breadcrumb */}
        <div className="mb-6">
          <div className="flex items-center text-sm text-gray-500">
            <Link href="/" className="hover:text-primary">
              Home
            </Link>
            <span className="mx-2">&gt;</span>
            <Link href="/cart" className="hover:text-primary">
              Cart
            </Link>
            <span className="mx-2">&gt;</span>
            <span className="text-primary">Check Out</span>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column - Checkout Form */}
          <div className="w-full lg:w-2/3">
            <form onSubmit={handlePlaceOrder}>
              {/* Contact Information */}
              <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                    <span>1</span>
                  </div>
                  <h2 className="text-xl font-semibold">Contact</h2>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Email or Mobile Number*
                  </label>
                  <div className="flex">
                    <input
                      type="text"
                      name="email"
                      value={contactInfo.email}
                      onChange={handleContactChange}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      placeholder="Email or mobile number"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Delivery Information */}
              <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                    <span>2</span>
                  </div>
                  <h2 className="text-xl font-semibold">Delivery</h2>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Country/Region*
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={deliveryInfo.country}
                    onChange={handleDeliveryChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    placeholder="Pakistan"
                    required
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-1">
                      First Name*
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={deliveryInfo.firstName}
                      onChange={handleDeliveryChange}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-1">
                      Last Name*
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={deliveryInfo.lastName}
                      onChange={handleDeliveryChange}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Address*
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={deliveryInfo.address}
                    onChange={handleDeliveryChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Apartment, Suite etc (Optional)
                  </label>
                  <input
                    type="text"
                    name="apartment"
                    value={deliveryInfo.apartment}
                    onChange={handleDeliveryChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                </div>

                <div className="flex flex-col md:flex-row gap-4 mb-4">
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-1">
                      City*
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={deliveryInfo.city}
                      onChange={handleDeliveryChange}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                      required
                    />
                  </div>
                  <div className="w-full">
                    <label className="block text-sm font-medium mb-1">
                      Postal Code (Optional)
                    </label>
                    <input
                      type="text"
                      name="postalCode"
                      value={deliveryInfo.postalCode}
                      onChange={handleDeliveryChange}
                      className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    />
                  </div>
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Phone Number*
                  </label>
                  <input
                    type="text"
                    name="phoneNumber"
                    value={deliveryInfo.phoneNumber}
                    onChange={handleDeliveryChange}
                    className="w-full border border-gray-300 rounded-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium mb-1">
                    Shipping Method
                  </label>
                  <div className="flex items-center bg-gray-50 rounded-lg p-3 border border-gray-300">
                    <input
                      type="radio"
                      name="shippingMethod"
                      value="Fixed"
                      checked={deliveryInfo.shippingMethod === 'Fixed'}
                      onChange={handleDeliveryChange}
                      className="mr-2"
                    />
                    <label>Fixed</label>
                    <span className="ml-auto">
                      Rs {shippingCost.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <label className="flex items-center">
                    <input
                      type="checkbox"
                      name="saveInformation"
                      checked={deliveryInfo.saveInformation}
                      onChange={handleDeliveryChange}
                      className="mr-2"
                    />
                    Save this delivery information for next time
                  </label>
                </div>
              </div>

              {/* Payment - Simplified for Cash on Delivery only */}
              <div className="bg-white rounded-lg shadow-sm mb-6 p-6">
                <div className="flex items-center mb-4">
                  <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center mr-3">
                    <span>3</span>
                  </div>
                  <h2 className="text-xl font-semibold">Payment</h2>
                </div>

                <div className="mb-6">
                  <div className="flex items-center p-4 border border-primary rounded-lg mb-3">
                    <input
                      type="radio"
                      name="paymentMethod"
                      checked={true}
                      readOnly
                      className="mr-2"
                    />
                    <label className="flex-1 font-medium">
                      Cash on Delivery
                    </label>
                  </div>

                  <div className="p-3 bg-green-50 border border-green-100 rounded-lg text-sm text-green-700 mb-4">
                    You'll pay when your order is delivered. Our delivery agent
                    will accept cash payment.
                  </div>
                </div>

                <div className="mb-4">
                  <label className="flex items-center md:text-lg sm:text-base text-xs">
                    <input
                      type="checkbox"
                      name="saveInformation"
                      checked={paymentInfo.saveInformation}
                      onChange={handlePaymentChange}
                      className="mr-2"
                    />
                    Save my payment information for faster checkout next time
                  </label>
                </div>

                <div className="flex justify-end mt-6">
                  <button
                    type="submit"
                    disabled={isPlacingOrder || isLoading}
                    className="bg-primary text-white py-3 px-8 rounded-lg hover:bg-primary/90 flex items-center"
                  >
                    <FaLock className="mr-2" />
                    {isPlacingOrder || isLoading
                      ? 'Processing...'
                      : 'Place Order'}
                  </button>
                </div>
              </div>
            </form>
          </div>

          {/* Right Column - Order Summary */}
          <div className="w-full lg:w-1/3">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="max-h-80 overflow-y-auto mb-6">
                {cart.items.map((item: any) => {
                  const itemPrice = parsePrice(item.price);
                  const discountedPrice = item.Product?.originalPrice
                    ? parsePrice(item.Product.originalPrice)
                    : null;

                  return (
                    <div
                      key={item.id}
                      className="flex items-center mb-4 pb-4 border-b"
                    >
                      <div className="relative w-20 h-20 rounded-lg flex-shrink-0">
                        {item.Product?.image && (
                          <Image
                            src={item.Product.image}
                            alt={item.Product.name}
                            layout="fill"
                            objectFit="contain"
                            className="rounded-lg"
                          />
                        )}
                        <div className="absolute -top-[1px] right-0 w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-xs">
                          {item.quantity}
                        </div>
                      </div>

                      <div className="ml-4 flex-1">
                        <h3 className="font-medium">{item.Product?.name}</h3>
                        <p className="text-sm text-gray-500">
                          {item.Product?.brand}
                        </p>
                        <div className="flex items-center mt-1">
                          {discountedPrice && (
                            <span className="text-gray-400 line-through mr-2">
                              Rs {discountedPrice.toFixed(0)}
                            </span>
                          )}
                          <span className="text-green-600 font-medium">
                            Rs {itemPrice.toFixed(0)}
                          </span>
                          {discountedPrice && itemPrice < discountedPrice && (
                            <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded">
                              Sale
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Coupon Code */}
              <div className="mb-6">
                <div className="flex">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    placeholder="Coupon Code"
                    className="flex-1 border border-gray-300 rounded-l-lg p-2.5 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCoupon}
                    disabled={isApplyingCoupon}
                    className="bg-primary text-white py-2 px-4 rounded-r-lg hover:bg-primary/90"
                  >
                    {isApplyingCoupon ? 'Applying...' : 'Apply'}
                  </button>
                </div>
              </div>

              {/* Order Totals */}
              <div className="border-t pt-4">
                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">
                    Subtotal • {cart.totalItems} items
                  </span>
                  <span>Rs {subtotal.toFixed(0)}</span>
                </div>

                {discount > 0 && (
                  <div className="flex justify-between mb-2 text-green-600">
                    <span>Discount</span>
                    <span>-Rs {discount.toFixed(0)}</span>
                  </div>
                )}

                <div className="flex justify-between mb-2">
                  <span className="text-gray-600">Shipping</span>
                  <span>Rs {shippingCost.toFixed(0)}</span>
                </div>

                <div className="flex justify-between font-semibold text-lg mt-2 pt-2 border-t">
                  <span>Total</span>
                  <span className="text-primary">Rs {total.toFixed(0)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CheckoutPage;
