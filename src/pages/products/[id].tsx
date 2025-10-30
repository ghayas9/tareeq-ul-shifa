"use client"
import Button from '@/components/common/Button';
import Layout from '@/components/layout/Layout';
import ProductInformation from '@/components/ProductInformation';
import { useProduct } from '@/hooks/product.hook';
import { fetchProduct } from '@/redux/thunk/product.thunk';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { calculateDiscount } from '../../../utils/discountPrice';
import Skeleton from 'react-loading-skeleton';
import Breadcrumb from '@/components/common/BreadCrumb';
import { useCart } from '@/hooks/cart.hook';
import toast from 'react-hot-toast';
import { toggleCartSidebar } from '@/redux/slices/cartSlice';
import Spinner from '@/components/Spinner';
import ZoomableImage from '@/components/common/ZoomableImage';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { id } = router.query;
  const { product, isLoading } = useProduct();
  const { addItemToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  const discount = calculateDiscount(
    product?.originalPrice as number,
    product?.price as number
  );

  useEffect(() => {
    if (id) {
      dispatch(fetchProduct(id as string) as any);
    }
  }, [dispatch, id]);

  const isInStock = product?.quantity != null && product.quantity > 0;

  // Handle quantity change
  const handleQuantityChange = (newQuantity: number) => {
    // Make sure quantity is within limits
    if (newQuantity >= 1 && (!product?.quantity || newQuantity <= product.quantity)) {
      setQuantity(newQuantity);
    }
  };

  const handleAddToCart = async () => {
    if (!product) {
      toast.error('Product not available');
      return;
    }

    if (!isInStock) {
      toast.error('This product is out of stock');
      return;
    }

    try {
      setIsAddingToCart(true);
      console.log(`Adding product ${product.id} to cart, quantity: ${quantity}`);

      await addItemToCart({
        productId: product.id,
        quantity: quantity
      });
      dispatch(toggleCartSidebar());
    } catch (error: any) {
      console.error('Failed to add item to cart:', error);
      // toast.error(error.message || 'Failed to add item to cart lll');
    } finally {
      setIsAddingToCart(false);
    }
  };

  return (
    <Layout>
      <div className="min-h-screen bg-gray-50">
        {/* Breadcrumb */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Breadcrumb />
          </div>
        </div>

        {/* Main Product Content */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex w-11/12 md:justify-between flex-col md:flex-row !gap-20 !lg:gap-24">

            {/* Product Image Section - Left Side */}
            <div className="md:w-1/2 w-[90%] space-y-4">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
                {isLoading ? (
                  <Skeleton width={500} height={500} className="rounded-lg" />
                ) : (
                  <ZoomableImage
                    src={product?.image || ''}
                    alt={product?.name || ''}
                    className="rounded-lg w-full h-auto max-h-[600px] object-contain"
                    zoomLevel={3}
                    unoptimized
                  />
                )}
              </div>
            </div>

            {/* Product Details <S></S>ection - Right Side */}
            <div className="md:w-[40%] w-11/12 space-y-6">
              {/* Product Title */}
              <div>
                {isLoading ? (
                  <Skeleton width={300} height={36} className="mb-4" />
                ) : (
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">
                    {product?.name}
                  </h1>
                )}
              </div>

              {/* Pricing Section */}
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  {isLoading ? (
                    <Skeleton width={120} height={32} />
                  ) : (
                    <div className="flex items-center space-x-3">
                      {product?.originalPrice && (
                        <span className="text-2xl text-gray-400 line-through">
                          Rs {product.originalPrice}
                        </span>
                      )}
                      <span className="text-3xl font-bold text-secondary">
                        Rs {product?.price}
                      </span>
                    </div>
                  )}
                </div>

                {/* Discount Badge */}
                {discount && !isLoading && (
                  <div className="inline-flex items-center">
                    <span className="bg-red-100 text-red-800 text-sm font-semibold px-3 py-1 rounded-full">
                      Save {discount}%
                    </span>
                  </div>
                )}

                {/* Stock Status */}
                <div className="flex items-center space-x-2">
                  {isLoading ? (
                    <Skeleton width={100} height={24} />
                  ) : (
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${isInStock
                      ? 'bg-green-100 text-green-800'
                      : 'bg-red-100 text-red-800'
                      }`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${isInStock ? 'bg-green-500' : 'bg-red-500'
                        }`} />
                      {isInStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  )}
                </div>
              </div>

              {/* Quantity and Add to Cart */}
              <div className="space-y-4 pt-4 border-t border-gray-200">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Quantity
                  </label>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded-lg">
                      <button
                        className="px-4 py-2 text-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleQuantityChange(quantity - 1)}
                        disabled={quantity <= 1 || isLoading}
                      >
                        −
                      </button>
                      <div className="px-4 py-2 min-w-[60px] text-center border-x border-gray-300">
                        {quantity}
                      </div>
                      <button
                        className="px-4 py-2 text-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                        onClick={() => handleQuantityChange(quantity + 1)}
                        disabled={isLoading || (product?.quantity !== null && quantity >= (product?.quantity || 0))}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>

                <Button
                  label={isAddingToCart ? <Spinner /> : "Add to Cart"}
                  className="w-full py-3 text-lg font-medium"
                  onClick={handleAddToCart}
                  disabled={isLoading || isAddingToCart || !isInStock}
                />
              </div>

              {/* Product Features */}
              <div className="space-y-3">
                <h3 className="text-lg font-semibold text-gray-900">Product Highlights</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>High quality pharmaceutical product</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Authentic and genuine products</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                    <span>Fast and secure delivery</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Product Information Section */}
          <div className="mt-12">
            <ProductInformation product={product} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;