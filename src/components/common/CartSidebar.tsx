import { useSelector, useDispatch } from 'react-redux';
import { AiOutlineDelete } from 'react-icons/ai';
import { RootState } from '@/redux/store/store';
import { toggleCartSidebar } from '@/redux/slices/cartSlice';
import { motion, AnimatePresence } from 'framer-motion';

import Image from 'next/image';
import { useEffect } from 'react';
import Button from './Button';
import { useCart } from '@/hooks/cart.hook';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';

const CartSidebar = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isSidebarOpen } = useSelector((state: RootState) => state.cart);
  const { cart, removeItemFromCart, updateItemQuantity } = useCart();

  useEffect(() => {
    if (isSidebarOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSidebarOpen]);

  // Calculate subtotal
  const subtotal = cart?.subtotalAmount || 0;
  const totalAmount = cart?.totalAmount || 0;

  const handleRemoveItem = (itemId: string) => {
    removeItemFromCart(itemId);
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    updateItemQuantity(itemId, quantity);
  };

  const handleViewCart = () => {
    dispatch(toggleCartSidebar());
    router.push('/cart');
  };

  // const handleCheckout = () => {
  //   dispatch(toggleCartSidebar());
  //   router.push('/checkout');
  // };
  const handleCheckout = () => {
    const token = localStorage.getItem('token');
    if (!token) {
      dispatch(toggleCartSidebar());
      localStorage.setItem('redirect_after_login', '/checkout');
      router.push('/login');
      toast('Please log in to complete your purchase', {
        icon: 'ℹ️',
        style: {
          border: '1px solid #3b82f6',
          padding: '16px',
          color: '#3b82f6',
        },
      });
    } else {
      dispatch(toggleCartSidebar());
      router.push('/checkout');
    }
  };

  const parsePrice = (price: any): number => {
    if (typeof price === 'number') {
      return price;
    }
    if (typeof price === 'string') {
      return parseFloat(price) || 0;
    }
    return 0;
  };

  const sidebarVariants = {
    hidden: {
      x: '100%',
      transition: {
        type: 'tween',
        duration: 0.3,
      },
    },
    visible: {
      x: 0,
      transition: {
        type: 'tween',
        duration: 0.3,
      },
    },
  };

  const overlayVariants = {
    hidden: {
      opacity: 0,
      transition: {
        duration: 0.3,
      },
    },
    visible: {
      opacity: 0.5,
      transition: {
        duration: 0.3,
      },
    },
  };

  return (
    <AnimatePresence>
      {isSidebarOpen && (
        <>
          {/* Overlay */}
          <motion.div
            key="overlay"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={overlayVariants}
            className="fixed inset-0 bg-black z-40"
            onClick={() => dispatch(toggleCartSidebar())}
          />

          {/* Sidebar */}
          <motion.div
            key="sidebar"
            initial="hidden"
            animate="visible"
            exit="hidden"
            variants={sidebarVariants}
            className="fixed top-0 right-0 h-full md:w-96 w-3/4 bg-white shadow-lg z-50 flex flex-col"
          >
            <div className="flex justify-between items-center w-full sm:px-3 px-10 py-[5px] bg-secondary overflow-auto">
              <h2 className="text-xl font-bold text-white">Shopping Cart</h2>
              <button
                onClick={() => dispatch(toggleCartSidebar())}
                className="absolute text-white right-2"
              >
                X
              </button>
            </div>
            <div className="p-4 overflow-y-auto max-h-[90vh] flex-1">
              {cart && cart?.items && cart?.items?.length > 0 ? (
                <div className="space-y-4">
                  {cart.items.map((item: any) => {
                    const itemPrice = parsePrice(item.price);
                    const originalPrice = item?.Product?.originalPrice
                      ? parsePrice(item?.Product?.originalPrice)
                      : 0;
                    const totalPrice = parsePrice(item.totalPrice);
                    const discountPercentage =
                      originalPrice > itemPrice && originalPrice > 0
                        ? Math.round(
                            ((originalPrice - itemPrice) / originalPrice) * 100
                          )
                        : 0;

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                        className="bg-white rounded-lg shadow-sm p-3 border border-gray-100"
                      >
                        {/* Layout that stacks on xs screens but is horizontal on larger screens */}
                        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                          {/* Product image */}
                          <div className="relative mx-auto sm:mx-0">
                            {item?.Product?.image ? (
                              <img
                                src={item.Product.image}
                                alt={item.Product.name}
                                className="w-20 h-20 object-cover rounded"
                              />
                            ) : (
                              <div className="w-20 h-20 bg-gray-100 rounded flex items-center justify-center">
                                <span className="text-gray-400 text-xs">
                                  No image
                                </span>
                              </div>
                            )}
                          </div>

                          {/* Product details - takes full width on mobile */}
                          <div className="flex-1 w-full">
                            <div className="flex justify-between items-start">
                              <h3 className="text-sm font-medium line-clamp-2 pr-2">
                                {item.Product?.name}
                              </h3>
                            </div>

                            {/* Price information with your original layout */}
                            <div className="flex items-center gap-2 mt-1 flex-wrap">
                              {originalPrice > 0 && (
                                <p className="text-CoolGray text-sm font-medium font-robotoSlab line-through">
                                  Rs{originalPrice.toFixed(2)}
                                </p>
                              )}
                              <p className="text-sm text-gray-500">
                                Rs{itemPrice.toFixed(2)}
                              </p>
                              {discountPercentage > 0 && (
                                <div className="relative mt-2">
                                  <Image
                                    src="/images/productdetailbg.png"
                                    alt=""
                                    width={60}
                                    height={60}
                                    className=""
                                  />
                                  <h3 className="text-white text-xs font-robotoSlab font-semibold absolute bottom-0 top-1 px-2 rounded">
                                    {discountPercentage}% Off
                                  </h3>
                                </div>
                              )}
                            </div>

                            {/* Controls and total - better organized for mobile */}
                            <div className="flex w-full justify-between items-center mt-3">
                              {/* Quantity controls */}
                              <div className="flex items-center border border-CloudGray rounded-md">
                                <button
                                  className="w-8 h-8 flex items-center justify-center text-lg"
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item.id,
                                      Math.max(1, item.quantity - 1)
                                    )
                                  }
                                  disabled={item.quantity <= 1}
                                >
                                  -
                                </button>
                                <div className="w-10 text-center border-x border-CloudGray py-1">
                                  {item.quantity}
                                </div>
                                <button
                                  className="w-8 h-8 flex items-center justify-center text-lg"
                                  onClick={() =>
                                    handleUpdateQuantity(
                                      item.id,
                                      item.quantity + 1
                                    )
                                  }
                                  disabled={
                                    item.Product?.quantity !== null &&
                                    item.quantity >=
                                      (item.Product?.quantity || 0)
                                  }
                                >
                                  +
                                </button>
                              </div>

                              {/* Total price with label on mobile */}
                              <div className="text-right">
                                <span className="text-xs text-gray-500 hidden xs:block">
                                  Total
                                </span>
                                <p className="font-medium">
                                  Rs{totalPrice.toFixed(2)}
                                </p>
                              </div>

                              {/* Delete button */}
                              <button
                                onClick={() => handleRemoveItem(item.id)}
                                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                                aria-label="Remove item"
                              >
                                <AiOutlineDelete className="w-5 h-5 text-red-500" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-[50vh]">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-16 w-16 text-gray-300 mb-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                  <p className="text-center text-lg font-semibold text-gray-500">
                    Your cart is empty
                  </p>
                </div>
              )}
            </div>

            {cart && cart.items && cart.items.length > 0 && (
              <>
                <div className="w-11/12 mx-auto flex flex-col justify-center">
                  <div className="px-4 py-1 flex w-full justify-between items-center border-t">
                    <p className="text-l font-medium">Subtotal:</p>
                    <p className="text-primary text-xl font-medium">
                      Rs {parsePrice(subtotal).toFixed(2)}
                    </p>
                  </div>

                  {parsePrice(cart.discountAmount) > 0 && (
                    <div className="px-4 py-1 flex w-full justify-between items-center text-green-600">
                      <p className="text-l font-medium">Discount:</p>
                      <p className="text-xl font-medium">
                        -Rs {parsePrice(cart.discountAmount).toFixed(2)}
                      </p>
                    </div>
                  )}

                  {cart.couponCode && (
                    <div className="px-4 py-1">
                      <p className="text-sm text-green-600">
                        Coupon applied: {cart.couponCode}
                      </p>
                    </div>
                  )}

                  <div className="px-4 py-1 flex w-full justify-between items-center font-bold">
                    <p className="text-l">Total:</p>
                    <p className="text-primary text-xl">
                      Rs {parsePrice(totalAmount).toFixed(2)}
                    </p>
                  </div>

                  <p className="text-sm text-gray-500 px-4">
                    Shipping calculated at checkout
                  </p>
                </div>

                <div className="p-4 border-t md:w-full w-11/12 mx-auto space-y-4">
                  <button
                    className="w-full text-black border rounded-[10px] text-center text-base border-primary py-2"
                    onClick={handleViewCart}
                  >
                    View Cart
                  </button>
                  <Button
                    label="Check Out"
                    className="!h-10"
                    onClick={handleCheckout}
                  />
                </div>
              </>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartSidebar;
