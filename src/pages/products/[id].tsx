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
      <div>
        <div className="px-6">
          <Breadcrumb />
        </div>
        <div className="w-full flex flex-wrap lg:flex-nowrap justify-between px-6 py-5">
          <div className="lg:order-1 order-1 w-full md:w-1/2 lg:w-auto flex justify-center">
            <div className="bg-white rounded-[9px] shadow-sm border border-CloudGray py-4 px-4">
              {isLoading ? (
                <Skeleton width={300} height={300} className="rounded-md" />
              ) : (
                <Image
                  src={product?.image || ''}
                  alt={product?.name || ''}
                  width={300}
                  height={100}
                  className=""
                  unoptimized
                />
              )}
            </div>
          </div>

          <div className="lg:order-2 order-2 flex flex-col mx-auto w-full md:w-1/2 lg:w-auto mt-6">
            {isLoading ? (
              <Skeleton width={200} className="text-[28px]" />
            ) : (
              <h2 className="font-robotoSlab text-[28px] font-medium">
                {product?.name}
              </h2>
            )}
            <div className="flex gap-6 items-center mt-2">
              <div>
                {isLoading ? (
                  <Skeleton className="text-3xl" width={100} />
                ) : (
                  product?.originalPrice && (
                    <p className="text-CoolGray text-3xl font-medium font-robotoSlab line-through">
                      Rs {product?.originalPrice}
                    </p>
                  )
                )}

                {isLoading ? (
                  <Skeleton className="text-sm py-1 my-2" width={100} />
                ) : (
                  <p className="text-sm font-robotoSlab text-DimGray mt-2">
                    SKU: {product?.sku}
                  </p>
                )}
              </div>
              <div className="flex gap-4">
                <div className="">
                  {isLoading ? (
                    <Skeleton className="text-3xl my-2" width={150} />
                  ) : (
                    <p className="text-3xl font-medium font-robotoSlab text-secondary mb-2">
                      Rs {product?.price}
                    </p>
                  )}
                  {isLoading ? (
                    <Skeleton width={80} height={24} />
                  ) : (
                    <span className={`text-sm font-robotoSlab font-semibold rounded-[4px] px-3 py-1 ${
                      isInStock 
                        ? 'bg-[#d9ead2] text-success' 
                        : 'bg-red-100 text-red-600'
                    }`}>
                      {isInStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  )}
                </div>
                {discount && (
                  <div className="relative mt-2">
                    <Image
                      src="/images/productdetailbg.png"
                      alt=""
                      width={70}
                      height={70}
                      className=""
                    />
                    <h3 className="text-white text-xs font-robotoSlab font-semibold absolute top-2 px-2 rounded">
                      {discount} %Off
                    </h3>
                  </div>
                )}
              </div>
            </div>
            <div>
              <div className="flex gap-4 items-center mt-7">
                <div>
                  <h1 className="text-sm font-robotoSlab font-medium">
                    Quantity
                  </h1>
                  <div className="flex items-center border border-CloudGray rounded-md w-[113px]">
                    <button
                      className="px-3 py-1 text-lg"
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1 || isLoading}
                    >
                      -
                    </button>
                    <div className="w-10 text-center border-x border-CloudGray py-1">
                      {quantity}
                    </div>
                    <button
                      className="px-3 py-1 text-lg"
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={isLoading || (product?.quantity !== null && quantity >= (product?.quantity || 0))}
                    >
                      +
                    </button>
                  </div>
                </div>
                <Button 
                  label={isAddingToCart ? <Spinner/> : "Add to Cart"} 
                  className="w-1/2 mt-6" 
                  onClick={handleAddToCart}
                  disabled={isLoading || isAddingToCart || !isInStock}
                />
              </div>
              <div className="mt-2">
                <p className="text-sm font-robotoSlab font-semibold text-textColor">
                  Delivery by{' '}
                  <span className="text-sm font-robotoSlab font-semibold text-primary">
                    Tomorrow, 6:00 pm - 10:00 pm
                  </span>
                </p>
              </div>
            </div>
          </div>

          <div className=" w-full lg:order-3  order-1  md:w-1/2 lg:w-auto flex justify-center lg:justify-end mt-6 md:mt-0">
            <div className="px-2">
              <div className="relative border border-dashed border-red-600 rounded-[10px]">
                <div className="absolute -left-4 -top-3">
                  <Image
                    src="/images/productoffer.png"
                    alt="offer"
                    width={30}
                    height={30}
                    unoptimized
                  />
                </div>
                <div className="relative w-full min-w-[250px] min-h-40 ">
                  <Image
                    src="/images/productcare.png"
                    alt=""
                    fill
                    className="object-contain px-2 "
                  />
                </div>
              </div>
              <div className="relative mt-4 border border-dashed border-red-600 rounded-[10px]">
                <div className="absolute -left-4 -top-3">
                  <Image
                    src="/images/productoffer.png"
                    alt="offer"
                    width={30}
                    height={30}
                    unoptimized
                  />
                </div>
                <div className="relative min-w-[250px] min-h-40">
                  <Image
                    src="/images/productcare.png"
                    alt=""
                    fill
                    className="object-contain px-2 "
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <ProductInformation  product={product}/>
      </div>
    </Layout>
  );
};

export default ProductDetails;