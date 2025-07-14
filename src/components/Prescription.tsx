import Image from 'next/image';
import React from 'react';
import { IoCloseOutline } from 'react-icons/io5';

function Prescription() {
  return (
    <div className="rounded-[10px] shadow-md  w-1/3 mx-auto  ">
      <div className="flex items-end justify-end px-2 py-3">
        <IoCloseOutline className="text-2xl text-textColor" />
      </div>
      <div className="flex flex-col items-center justify-center ">
        <div>
          <Image src="/images/modelimage.png" alt="" width={50} height={50} />
        </div>
        <p className="text-base font-robotoSlab font-medium text-primary w-1/2 text-center mt-2">
          Your prescription has been uploaded successfully
        </p>
        <p className="text-DarkAsh text-sm font-robotoSlab mt-2 mb-5 ">
          Our consultant will call you shortly to confirm.
          <span className="text-DarkAsh text-sm font-robotoSlab">
            <br />
            Thank you for choosing Tareeq Ul Shifa Pharmacy
          </span>
        </p>
      </div>
    </div>
  );
}

export default Prescription;
