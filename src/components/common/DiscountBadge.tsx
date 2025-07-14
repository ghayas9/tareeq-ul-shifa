import React from 'react';
import { DiscountRibbon } from '../icons/Icons';

interface Props {
  discountPercentage?: number;
}

const DiscountBadge = ({ discountPercentage }: Props) => {
  return (
    <div className="absolute top-0 right-0 z-10">
      <div className="relative w-[65px] h-[90px]">
        <DiscountRibbon />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white -mt-3 pb-6">
          <div className="text-sm font-bold leading-none">
            {discountPercentage}%
          </div>
          <div className="text-sm font-medium">Off</div>
        </div>
      </div>
    </div>
  );
};
export default DiscountBadge;
