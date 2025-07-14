import React from 'react';
import { PencilIcon } from './icons/Icons';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import Image from 'next/image';

type Product = {
  id: number;
  image: string;
  name: string;
  sku: string;
  category: string;
  price: string;
  stock: {
    status: 'In Stock' | 'Low Inventory' | 'Out of Stock';
    quantity: number;
  };
};

const products: Product[] = [
  {
    id: 1,
    image: '/images/bottle.png',
    name: 'CaC-1000 Plus (Orange)',
    sku: '5389607',
    category: 'Must Haves',
    price: 'Rs 400',
    stock: { status: 'In Stock', quantity: 120 },
  },
  {
    id: 2,
    image: '/images/bottle.png',
    name: 'CaC-1000 Plus (Orange)',
    sku: '5389607',
    category: 'Must Haves',
    price: 'Rs 400',
    stock: { status: 'Low Inventory', quantity: 10 },
  },
  {
    id: 3,
    image: '/images/bottle.png',
    name: 'CaC-1000 Plus (Orange)',
    sku: '5389607',
    category: 'Must Haves',
    price: 'Rs 400',
    stock: { status: 'Out of Stock', quantity: 0 },
  },
  {
    id: 4,
    image: '/images/bottle.png',
    name: 'CaC-1000 Plus (Orange)',
    sku: '5389607',
    category: 'Must Haves',
    price: 'Rs 400',
    stock: { status: 'Low Inventory', quantity: 10 },
  },
  {
    id: 5,
    image: '/images/bottle.png',
    name: 'CaC-1000 Plus (Orange)',
    sku: '5389607',
    category: 'Must Haves',
    price: 'Rs 400',
    stock: { status: 'Low Inventory', quantity: 10 },
  },
  {
    id: 6,
    image: '/images/bottle.png',
    name: 'CaC-1000 Plus (Orange)',
    sku: '5389607',
    category: 'Must Haves',
    price: 'Rs 400',
    stock: { status: 'Low Inventory', quantity: 10 },
  },
  {
    id: 7,
    image: '/images/bottle.png',
    name: 'CaC-1000 Plus (Orange)',
    sku: '5389607',
    category: 'Must Haves',
    price: 'Rs 400',
    stock: { status: 'Low Inventory', quantity: 10 },
  },
  {
    id: 8,
    image: '/images/bottle.png',
    name: 'CaC-1000 Plus (Orange)',
    sku: '5389607',
    category: 'Must Haves',
    price: 'Rs 400',
    stock: { status: 'Low Inventory', quantity: 10 },
  },
];

const ProductTable: React.FC = () => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white shadow-md rounded-[10px] overflow-hidden py-2">
        <thead className=" border-b">
          <tr>
            <th className="p-3 text-left"></th>{' '}
            <th className="p-4 text-left text-base font-robotoSlab font-medium">
              Product
            </th>
            <th className="p-4 text-left text-base font-robotoSlab font-medium">
              SKU
            </th>
            <th className="p-4 text-left text-base font-robotoSlab font-medium">
              Category
            </th>
            <th className="p-4 text-left text-base font-robotoSlab font-medium">
              Price
            </th>
            <th className="p-4 text-left text-base font-robotoSlab font-medium">
              Stock
            </th>
            <th className="p-4 text-left text-base font-robotoSlab font-medium">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id} className="border-b   hover:bg-gray-50">
              <td className="p-1  top-3">
                <input type="checkbox" />
              </td>
              <td className="pt-4 pb-4 pr-4">
                <div className="flex items-center">
                  <Image
                    unoptimized
                    width={0}
                    height={0}
                    src={product.image}
                    alt={product.name}
                    className="w-12 h-12 object-contain "
                  />
                  <div>
                    <div className="text-sm -mt-2 font-robotoSlab">
                      {product.name}
                    </div>
                    <div className="text-xs text-textColor font-robotoSlab">
                      100 Tablets
                    </div>
                  </div>
                </div>
              </td>
              <td className="p-4 text-sm font-robotoSlab text-DimGray">
                {product.sku}
              </td>
              <td className="p-4 text-sm font-robotoSlab text-DimGray">
                {product.category}
              </td>
              <td className="p-4 text-sm font-robotoSlab text-DimGray">
                {product.price}
              </td>
              <td className="p-4 font-medium text-sm">
                <span
                  className={
                    product.stock.status === 'In Stock'
                      ? 'text-success'
                      : product.stock.status === 'Low Inventory'
                        ? 'text-success'
                        : 'text-FieryRed'
                  }
                >
                  {product.stock.status} ({product.stock.quantity})
                </span>
              </td>
              <td className="p-4 flex space-x-2">
                <button className="text-blue-500 hover:text-blue-700">
                  <PencilIcon className="w-5 h-5" />
                </button>
                <button className="text-FieryRed hover:text-FieryRed">
                  <IoIosCloseCircleOutline className="w-5 h-5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductTable;
