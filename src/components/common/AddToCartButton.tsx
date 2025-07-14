// src/components/common/AddToCartButton.tsx
import React, { useState } from 'react';
import Button from './Button';
import { useCart } from '@/hooks/cart.hook';
import { Product } from '@/types/productTypes';
import Spinner from '@/components/Spinner';
import toast from 'react-hot-toast';

interface AddToCartButtonProps {
  product: Product;
  className?: string;
  showQuantity?: boolean;
  buttonLabel?: string;
  onSuccess?: () => void;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({
  product,
  className = '',
  showQuantity = false,
  buttonLabel = 'Add to Cart',
  onSuccess,
}) => {
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const { addItemToCart } = useCart();

  const handleAddToCart = async () => {
    if (!product.id) {
      toast.error('Invalid product');
      return;
    }

    // Check stock availability if quantity is tracked
    if (product.quantity !== null && quantity > product.quantity) {
      toast.error('Not enough stock available');
      return;
    }

    setIsAdding(true);
    try {
      await addItemToCart({
        productId: product.id,
        quantity: quantity
      });
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error adding to cart:', error);
    } finally {
      setIsAdding(false);
    }
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    if (product.quantity === null || quantity < product.quantity) {
      setQuantity(prev => prev + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const isOutOfStock = product.quantity !== null && product.quantity === 0;

  return (
    <div className="flex flex-col">
      {showQuantity && (
        <div className="flex items-center mb-3">
          <span className="text-sm font-robotoSlab mr-3">Quantity:</span>
          <div className="flex items-center border border-CloudGray rounded-md">
            <button
              type="button"
              className="px-3 py-1 text-lg"
              onClick={decrementQuantity}
              disabled={quantity <= 1 || isOutOfStock}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={handleQuantityChange}
              min="1"
              max={product.quantity || undefined}
              className="w-12 text-center border-x border-CloudGray py-1 outline-none"
              disabled={isOutOfStock}
            />
            <button
              type="button"
              className="px-3 py-1 text-lg"
              onClick={incrementQuantity}
              disabled={isOutOfStock || (product.quantity !== null && quantity >= product.quantity)}
            >
              +
            </button>
          </div>
          {product.quantity !== null && (
            <span className="text-xs text-gray-500 ml-2">
              {product.quantity} available
            </span>
          )}
        </div>
      )}
      
      <Button
        type="button"
        onClick={handleAddToCart}
        disabled={isAdding || isOutOfStock}
        label={
          isAdding ? (
            <Spinner />
          ) : isOutOfStock ? (
            'Out of Stock'
          ) : (
            buttonLabel
          )
        }
        className={`!text-white !font-robotoSlab ${className}`}
      />
    </div>
  );
};

export default AddToCartButton;