import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useCart } from '@/hooks/cart.hook';
import toast from 'react-hot-toast';
import Button from '@/components/common/Button';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { calculateDiscount } from '../../utils/discountPrice';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

const parsePrice = (price: any): number => {
  if (typeof price === 'number') {
    return price;
  }
  if (typeof price === 'string') {
    return parseFloat(price) || 0;
  }
  return 0;
};

// Skeleton components for loading states
const CartSkeleton = () => {
  return (
    <div className="w-full">
      <div className="flex items-center mb-2">
        <Skeleton width={180} height={32} />
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Table Skeleton */}
        <div className="w-full lg:w-2/3">
          <div className="w-full rounded-[10px] bg-white shadow-md">
            <div className="rounded-[10px] overflow-x-auto">
              <table className="w-full table-auto min-w-[600px]">
                <thead className="bg-primary">
                  <tr>
                    <th className="text-white text-xl font-robotoSlab font-medium px-4 py-2 text-left">
                      Product
                    </th>
                    <th className="text-white text-xl font-robotoSlab font-medium px-4 py-2 text-left">
                      Quantity
                    </th>
                    <th className="text-white text-xl font-robotoSlab font-medium px-4 py-2 text-left">
                      Total
                    </th>
                    <th className="text-white text-xl font-robotoSlab font-medium px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {Array(3)
                    .fill(0)
                    .map((_, index) => (
                      <tr key={index} className="border border-b-1">
                        <td className="py-2">
                          <div className="flex items-center py-2">
                            <div className="w-20 h-20 flex-shrink-0 mr-3">
                              <Skeleton width={80} height={80} />
                            </div>
                            <div>
                              <Skeleton
                                width={150}
                                height={20}
                                className="mb-1"
                              />
                              <Skeleton
                                width={100}
                                height={16}
                                className="mb-2"
                              />
                              <div className="flex gap-8 items-center mt-2">
                                <Skeleton
                                  width={60}
                                  height={16}
                                  className="mr-2"
                                />
                                <div className="flex items-center gap-4">
                                  <Skeleton width={80} height={16} />
                                  <Skeleton width={60} height={16} />
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <Skeleton width={120} height={36} />
                        </td>
                        <td className="px-4 py-2">
                          <Skeleton width={80} height={24} />
                        </td>
                        <td className="px-4 py-2 text-center">
                          <Skeleton width={24} height={24} circle />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Order Summary Skeleton */}
        <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
          <div className="border rounded-[10px] px-2 py-2">
            <div className="p-4 w-full shadow-md rounded-[10px] bg-white">
              <Skeleton width={120} height={20} className="mb-4" />
              <div className="space-y-2">
                <div className="flex justify-between mb-2">
                  <Skeleton width={100} height={16} />
                  <Skeleton width={60} height={16} />
                </div>
                <div className="flex justify-between mb-2">
                  <Skeleton width={80} height={16} />
                  <Skeleton width={60} height={16} />
                </div>
                <div className="flex justify-between mb-2">
                  <Skeleton width={80} height={16} />
                  <Skeleton width={60} height={16} />
                </div>
              </div>
              <div className="my-2">
                <Skeleton height={1} />
              </div>
              <div className="flex justify-between">
                <Skeleton width={60} height={18} />
                <Skeleton width={80} height={18} />
              </div>
            </div>
            <Skeleton height={40} className="mt-4 rounded-[10px]" />
            <Skeleton height={40} className="mt-2 rounded-[10px]" />
          </div>
        </div>
      </div>
    </div>
  );
};

// Create a dynamic OrderSummary component that uses actual cart data
const DynamicOrderSummary = ({ cart }: { cart: any }) => {
  const router = useRouter();

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    router.push('/');
  };

  return (
    <div className="border rounded-[10px] px-2 py-2">
      <div className="p-4 w-full shadow-md rounded-[10px] bg-white">
        <h2 className="text-base font-semibold mb-4">ORDER SUMMARY</h2>
        <div className="space-y-2">
          <div className="flex justify-between">
            <span className="text-sm font-robotoSlab text-textColor">
              Price incl. tax
            </span>
            <span className="text-sm font-robotoSlab">
              Rs {parsePrice(cart.subtotalAmount).toFixed(2)}
            </span>
          </div>
          {parsePrice(cart.discountAmount) > 0 && (
            <div className="flex justify-between">
              <span className="text-textColor text-sm font-robotoSlab">
                Discount
              </span>
              <span className="text-sm font-robotoSlab">
                -Rs {parsePrice(cart.discountAmount).toFixed(2)}
              </span>
            </div>
          )}
          <div className="flex justify-between">
            <span className="text-sm font-robotoSlab text-textColor">
              Sales Tax
            </span>
            <span className="text-sm font-robotoSlab">Rs 0.00</span>
          </div>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between">
          <span className="text-sm font-semibold">Total</span>
          <span className="text-primary text-base">
            Rs {parsePrice(cart.totalAmount).toFixed(2)}
          </span>
        </div>
      </div>
      <button
        className="w-full mt-4 bg-primary text-white py-2 rounded-[10px] text-[17px] font-robotoSlab font-medium"
        onClick={handleCheckout}
      >
        Proceed to Check Out
      </button>
      <button
        className="w-full mt-2 border border-secondary text-[17px] font-robotoSlab py-1 rounded-[10px] font-medium"
        onClick={handleContinueShopping}
      >
        Continue Shopping
      </button>
    </div>
  );
};

function Cart() {
  const { cart, isLoading, getCart, removeItemFromCart, updateItemQuantity } =
    useCart();
  // const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchCart = async () => {
      try {
        await getCart();
      } catch (error) {
        console.error('Failed to fetch cart:', error);
        toast.error('Failed to load your cart');
      }
    };

    fetchCart();
  }, []);

  const handleQuantityChange = async (itemId: string, newQuantity: number) => {
    if (newQuantity < 1) return;

    try {
      await updateItemQuantity(itemId, newQuantity);
    } catch (error) {
      console.error('Failed to update quantity:', error);
      toast.error('Failed to update quantity');
    }
  };

  const handleRemoveItem = async (itemId: string) => {
    try {
      await removeItemFromCart(itemId);
      // toast.success('Item removed from cart');
    } catch (error) {
      console.error('Failed to remove item:', error);
      toast.error('Failed to remove item from cart');
    }
  };

  if (isLoading) {
    return <CartSkeleton />;
  }

  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <div className="w-full min-h-[400px] flex flex-col justify-center items-center">
        <h3 className="text-2xl font-medium mb-4">Your Cart is Empty</h3>
        <p className="text-gray-500 mb-6">
          Add items to your cart to see them here.
        </p>
        <Button
          label="Continue Shopping"
          onClick={() => router.push('/')}
          className="!w-1/2"
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <h3 className="text-[28px] font-robotoSlab font-medium mb-2">
        Your Cart ({cart.totalItems})
      </h3>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Cart Table */}
        <div className="w-full lg:w-2/3">
          <div className="w-full rounded-[10px] bg-white shadow-md">
            <div className="rounded-[10px] overflow-x-auto">
              <table className="w-full table-auto min-w-[600px]">
                <thead className="bg-primary">
                  <tr>
                    <th className="text-white text-xl font-robotoSlab font-medium px-4 py-2 text-left">
                      Product
                    </th>
                    <th className="text-white text-xl font-robotoSlab font-medium px-4 py-2 text-left">
                      Quantity
                    </th>
                    <th className="text-white text-xl font-robotoSlab font-medium px-4 py-2 text-left">
                      Total
                    </th>
                    <th className="text-white text-xl font-robotoSlab font-medium px-4 py-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {cart.items.map((item: any) => {
                    // Parse prices to ensure they're numbers
                    const itemPrice = parsePrice(item.price);
                    const originalPrice = item.Product?.originalPrice
                      ? parsePrice(item.Product.originalPrice)
                      : null;
                    const totalPrice = parsePrice(item.totalPrice);

                    // Calculate discount percentage
                    const discountPercentage =
                      originalPrice && originalPrice > itemPrice
                        ? calculateDiscount(originalPrice, itemPrice)
                        : null;

                    return (
                      <tr key={item.id} className="border border-b-1">
                        <td className="py-2">
                          <div className="flex items-center py-2">
                            {item.Product?.image && (
                              <div className="relative w-20 h-20 flex-shrink-0 mr-3">
                                <Image
                                  src={item.Product.image}
                                  alt={item.Product.name}
                                  layout="fill"
                                  className="object-contain"
                                />
                              </div>
                            )}

                            <div>
                              <Link
                                href={`/product/${item.Product?.id}`}
                                className="hover:text-primary transition-colors"
                              >
                                <h1 className="text-base font-robotoSlab">
                                  {item.Product?.name}
                                </h1>
                              </Link>
                              {item.Product?.brand && (
                                <p className="text-sm font-robotoSlab text-textColor">
                                  {item.Product.brand}
                                </p>
                              )}
                              <div className="flex gap-8 items-center mt-2">
                                {originalPrice && (
                                  <p className="text-CoolGray text-base font-robotoSlab line-through">
                                    Rs {originalPrice.toFixed(2)}
                                  </p>
                                )}
                                <div className="flex items-center gap-4">
                                  <p className="text-base font-robotoSlab text-secondary">
                                    Rs {itemPrice.toFixed(2)}
                                  </p>
                                  {discountPercentage && (
                                    <div className="relative">
                                      <Image
                                        src="/images/productdetailbg.png"
                                        alt=""
                                        width={60}
                                        height={60}
                                      />
                                      <h3 className="text-white text-xs font-robotoSlab font-semibold absolute top-1 px-1 rounded">
                                        {discountPercentage}% Off
                                      </h3>
                                    </div>
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex items-center border border-CloudGray rounded-md w-[120px]">
                            <button
                              className="px-3 py-1 text-lg"
                              onClick={() =>
                                handleQuantityChange(
                                  item.id,
                                  Math.max(1, item.quantity - 1)
                                )
                              }
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <div className="w-12 text-center border-x border-CloudGray py-1">
                              {item.quantity}
                            </div>
                            <button
                              className="px-3 py-1 text-lg"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                              disabled={
                                item.Product?.quantity !== null &&
                                item.quantity >= (item.Product?.quantity || 0)
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td className="px-4 py-2">
                          <h2 className="text-xl font-robotoSlab font-medium">
                            Rs {totalPrice.toFixed(2)}
                          </h2>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <button onClick={() => handleRemoveItem(item.id)}>
                            <RiDeleteBin6Line className="text-3xl text-FieryRed cursor-pointer" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/3 mt-6 lg:mt-0">
          <DynamicOrderSummary cart={cart} />
        </div>
      </div>
    </div>
  );
}

export default Cart;
