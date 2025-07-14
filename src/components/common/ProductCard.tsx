import Image from 'next/image';
import React from 'react';

interface Products{
  products?:any
}
const ProductCard = ({products}:Products) => {
  return (
    <div className="w-full bg-white flex flex-col border-r border-b justify-center items-center">
      <div className="relative w-full h-32">
        <Image
          src={products?.image}
          alt={products?.name}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>
      <p className="text-base font-robotoSlab py-4">{products?.name}</p>
    </div>
  );
};

export default ProductCard;
