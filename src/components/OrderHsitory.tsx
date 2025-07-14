import Image from 'next/image';
import React from 'react';

interface OrderItemProps {
  image: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  quantity: number;
  deliveryDate: string;
}

const OrderHistory: React.FC<OrderItemProps> = ({
  image,
  name,
  description,
  originalPrice,
  discountedPrice,
  quantity,
  deliveryDate,
}) => {
  return (
    <div className="w-full ">
      <div className="flex items-center  justify-between px-4 py-4 bg-white rounded-lg shadow-md">
        <div className="flex items-center gap-4">
          <Image
            src={image}
            alt={name}
            className="w-20 h-20 object-contain"
            width={0}
            height={0}
            unoptimized
          />
          <div>
            <p className="text-sm text-primary font-robotoSlab">
              Delivered: {deliveryDate}
            </p>
            <p className="text-base font-robotoSlab">{name}</p>
            <p className="text-textColor font-robotoSlab text-sm">
              {description}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-8">
          <div className="text-base font-robotoSlab text-CoolGray line-through">
            Rs {originalPrice}
          </div>
          <div className="text-normalGreen font-robotoSlab text-base">
            Rs {discountedPrice}
          </div>
        </div>
        <div className="flex items-center">
          <span className="text-[17px] font-medium font-robotoSlab text-textColor">
            Qty
          </span>
          <span className="ml-2 text-[17px] font-medium font-robotoSlab ">
            {quantity.toString().padStart(2, '0')}
          </span>
        </div>
        <button className="border border-normalGreen text-[17px] font-robotoSlab font-medium  px-4 py-1 rounded-lg hover:bg-green-500 hover:text-white transition">
          Reorder
        </button>
      </div>
    </div>
  );
};

export default OrderHistory;
