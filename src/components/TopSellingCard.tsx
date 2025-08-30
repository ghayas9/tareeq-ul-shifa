import React from 'react';
import { CartIcons } from './icons/Icons';
import { calculateDiscount } from '../../utils/discountPrice';
import DiscountBadge from './common/DiscountBadge';
import { useCart } from '@/hooks/cart.hook';
import { toggleCartSidebar } from '@/redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import Link from 'next/link';

const TopSellingCard = ({ product }: any) => {
  console.log(product, 'pro');
  const dispatch = useDispatch();
  const { addItemToCart } = useCart();
  const discount = calculateDiscount(product.originalPrice, product.price);

  const handleAddToCart = async (e: React.MouseEvent) => {
    e.preventDefault();

    if (product.stock === 0) {
      toast.error('This product is out of stock');
      return;
    }

    try {
      const res = await addItemToCart({
        productId: product.id,
        quantity: 1,
      });
      console.log(res, 'rrr');
      // dispatch(toggleCartSidebar());
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    }
  };

  return (
    <Link
      href={'/products/' + product?.id}
      key={product.id}
      className="px-[6px] w-full"
    >
      <div className="relative group">
        <div className="flex relative p-4 rounded-[10px] hover:shadow-xl shadow-sm h-[218px] justify-center items-center bg-white">
          {product.stock === 0 && (
            <span className="absolute top-2 left-2 bg-red-200 w-[105px] text-center flex justify-center items-center h-[24px] text-red-600 text-sm font-medium rounded">
              Out of Stock
            </span>
          )}
          <img
            src={product.image}
            alt={product.name}
            className="h-32 w-auto object-contain"
          />
          {discount && <DiscountBadge discountPercentage={discount} />}
          <div className="absolute bottom-4 right-2 transform -translate-x-1/2 translate-y-10 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 ease-in-out flex space-x-3">
            <button
              onClick={handleAddToCart}
              disabled={product.stock === 0}
              className={`${product.stock === 0 ? 'bg-gray-400 cursor-not-allowed' : 'bg-primary hover:bg-primary/90'} text-white p-2 rounded-[4px] shadow-md`}
            >
              <CartIcons />
            </button>
          </div>
        </div>

        <h3 className="text-base mt-3">{product.name}</h3>
        <p className="text-textColor text-sm">{product.type}</p>
        <div className="mt-1">
          {product.originalPrice && (
            <span className="text-gray-400 text-sm line-through">
              Rs {product.originalPrice}
            </span>
          )}
          <span className="text-normalGreen font-semibold text-lg ml-2">
            Rs {product.price}
          </span>
        </div>
      </div>
    </Link>
  );
};

export default TopSellingCard;
