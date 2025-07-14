// src/components/ProductCard.tsx
import React from 'react';
import { useRouter } from 'next/router';
import { motion } from 'framer-motion';
import DiscountBadge from './common/DiscountBadge';
import { calculateDiscount } from '../../utils/discountPrice';

interface ProductCardProps {
  product: {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice?: number | null;
    image?: string | null;
    quantity?: number | null;
    category_name?: string; // For top selling products response
    total_sales?: number; // For top selling products response
  };
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const router = useRouter();
  const discount = product.originalPrice ? calculateDiscount(product.originalPrice, product.price) : null;

  return (
    <motion.div
      className="h-full"
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div
        className="bg-white rounded-lg shadow-md p-3 h-full flex flex-col cursor-pointer"
        onClick={() => router.push(`/products/${product.id}`)}
      >
        <div className="relative flex-shrink-0 h-32 flex items-center justify-center mb-2">
          {product.quantity === 0 && (
            <span className="absolute top-0 left-0 bg-red-100 text-red-800 text-xs font-medium px-2 py-0.5 rounded">
              Out of Stock
            </span>
          )}
          {discount && (
            <DiscountBadge discountPercentage={discount} />
          )}
          <img
            src={product.image || '/images/placeholder-product.png'}
            alt={product.name}
            className="h-full w-auto object-contain max-w-full"
          />
        </div>

        <div className="flex-grow">
          <h3 className="text-sm font-medium line-clamp-2 mb-1">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mb-2">
            {product.brand}
          </p>

          {product.category_name && (
            <p className="text-xs text-primary mb-1">
              {product.category_name}
            </p>
          )}

          {product.total_sales !== undefined && (
            <p className="text-xs text-orange-500 mb-1">
              Sales: {product.total_sales}
            </p>
          )}

          <div className="flex items-center">
            {product.originalPrice && (
              <span className="text-gray-400 text-xs line-through mr-2">
                Rs {product.originalPrice}
              </span>
            )}
            <span className="text-green-600 font-semibold">
              Rs {product.price}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;