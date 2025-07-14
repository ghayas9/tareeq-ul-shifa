import Image from 'next/image';
import React, { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { FaCheck } from 'react-icons/fa';

function PaymentMethod() {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const paymentMethods = [
    { id: 0, src: '/images/payment1.png', alt: 'Payment 1' },
    { id: 1, src: '/images/payment2.png', alt: 'Payment 2' },
    { id: 2, src: '/images/payment3.png', alt: 'Payment 3' },
  ];

  return (
    <div className="w-full mt-3">
      <h2 className="text-sm font-robotoSlab">
        Payment Method <span className="text-FieryRed">*</span>
      </h2>

      <div className=" flex items-start  space-x-5 ">
        {paymentMethods.map((method) => (
          <div
            key={method.id}
            className="flex flex-col items-center space-y-2 cursor-pointer"
            onClick={() => setSelectedIndex(method.id)}
          >
            <div className="relative w-20 h-auto p-2">
              <Image
                src={method.src}
                alt={method.alt}
                unoptimized
                width={0}
                height={0}
                className="w-16 h-auto"
              />
            </div>

            <div
              className={`flex items-center justify-center w-6 h-6 border rounded-md ${
                selectedIndex === method.id
                  ? 'bg-primary border-primary'
                  : 'border-gray-400'
              }`}
            >
              {selectedIndex === method.id && (
                <FaCheck className="text-white" size={14} />
              )}
            </div>
          </div>
        ))}
        <div className=" bg-white rounded-[10px]  mt-2 shadow-sm border px-7 py-2">
          <BiPlus className="text-2xl text-textColor" />
        </div>
      </div>
    </div>
  );
}

export default PaymentMethod;
