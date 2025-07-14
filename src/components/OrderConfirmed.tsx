import Image from 'next/image';
import React from 'react';
import Button from './common/Button';

function OrderConfirmed() {
  return (
    <div className="px-6 py-5">
      <div className="rounded-[10px] bg-white shadow-md w-1/3 flex flex-col items-center justify-center ">
        <div className="mt-6">
          <Image src="/images/confirmorder.png" alt="" width={60} height={60} />
        </div>
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-base font-robotoSlab font-medium text-primary py-4">
            Your Order is confirmed
          </h1>
          <p className="text-sm font-robotoSlab text-DarkAsh w-[85%] text-center">
            Thanks for shopping! Your order hasn’t ship yet, but we will send
            you an email when it done
          </p>
          <h4 className="text-base font-robotoSlab font-semibold  py-4">
            Order Number: GB567AXE{' '}
          </h4>
          <Button
            label="Continue Shopping"
            className="!text-[17px] font-robotoSlab font-medium text-white !w-1/2 !py-2 mb-6"
          />
        </div>
      </div>
    </div>
  );
}

export default OrderConfirmed;
