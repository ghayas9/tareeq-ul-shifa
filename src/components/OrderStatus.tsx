import React from 'react';

import StatusBar from './StatusBar';

function OrderStatus() {
  return (
    <div className="md:w-3/4 mx-auto px-6">
      <h1 className="text-3xl font-robotoSlab font-medium text-center">
        Order Status
      </h1>
      <div className="border rounded-[10px] mt-2 overflow-hidden">
        <div className="">
          <h4 className="text-lg  px-6 py-1 text-white font-robotoSlab bg-primary font-semibold">
            Order Number: GB567AXE{' '}
          </h4>
        </div>
        <div className="bg-Aqua w-full">
          <div className="md:w-3/4 flex sm:flex-row flex-col justify-between px-6 py-2 ">
            <div className="">
              <h5 className="text-sm font-robotoSlab">Shipped Via </h5>
              <p className="text-base font-robotoSlab font-semibold">TCS</p>
            </div>
            <div className="sm:mt-0 mt-2">
              <h5 className="text-sm font-robotoSlab">Status </h5>
              <p className="text-base font-robotoSlab font-semibold">
                In Transit
              </p>
            </div>
            <div className="sm:mt-0 mt-2">
              <h5 className="text-sm font-robotoSlab">Expected Delivery </h5>
              <p className="text-base font-robotoSlab font-semibold">
                Friday, 25 Feb 2025
              </p>
            </div>
          </div>
        </div>
        <StatusBar />
      </div>
    </div>
  );
}

export default OrderStatus;
