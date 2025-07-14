import React from 'react';

const OrderSummary: React.FC = () => {
  return (
    <div className="border rounded-[10px] px-2 py-2">
      <div className=" p-4 w-full shadow-md rounded-[10px] bg-white">
        <h2 className=" text-base font-semibold mb-4">ORDER SUMMARY</h2>
        <div className="space-y-2">
          <div className="flex justify-between ">
            <span className="text-sm font-robotoSlab text-textColor">
              Price incl. tax
            </span>
            <span className="text-sm font-robotoSlab">Rs 1200</span>
          </div>
          <div className="flex justify-between ">
            <span className="text-textColor text-sm font-robotoSlab">
              Discount
            </span>
            <span className="text-sm font-robotoSlab">-Rs 300</span>
          </div>
          <div className="flex justify-between ">
            <span className="text-sm font-robotoSlab text-textColor">
              Sales Tax
            </span>
            <span className="text-sm font-robotoSlab">Rs 300</span>
          </div>
        </div>
        <hr className="my-2" />
        <div className="flex justify-between ">
          <span className="text-sm font-semibold">Total</span>
          <span className="text-primary text-base">Rs 1800</span>
        </div>
      </div>
      <button className="w-full mt-4 bg-primary text-white py-2 rounded-[10px] text-[17px] font-robotoSlab font-medium ">
        Proceed to Check Out
      </button>
      <button className="w-full mt-2 border border-secondary text-[17px] font-robotoSlab  py-1 rounded-[10px] font-medium">
        Continue Shopping
      </button>
    </div>
  );
};

export default OrderSummary;
