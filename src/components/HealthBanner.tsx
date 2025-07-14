import Image from 'next/image';
import React from 'react';
import { PlusIcon } from './icons/Icons';
interface Step {
  number: number;
  text: string;
}

const steps: Step[] = [
  { number: 1, text: 'Upload a photo of your prescription' },
  { number: 2, text: 'Add delivery address and place the order' },
  { number: 3, text: 'We will call you to confirm the medicines' },
  {
    number: 4,
    text: 'Now, sit back! Your medicines will get delivered at your doorstep',
  },
];
function HealthBanner() {
  return (
    <div className="mt-2 relative">
      <div
        className="w-full min-h-[150px] bg-no-repeat"
        style={{
          backgroundImage:
            "url('/images/herobg.png'), url('/images/herobgr.png')",
          backgroundSize: '100% 100%, cover',
          backgroundPosition: 'center, center',
          backgroundRepeat: 'no-repeat, no-repeat',
        }}
      >
        <div className="flex flex-wrap relative">
          <div className="w-full md:w-1/2 mt-4">
            <h1 className="text-2xl md:text-4xl font-robotoSlab font-medium text-white md:px-8 px-3">
              Your Health, Our Priority
            </h1>
            <p className="text-lg md:text-[28px] text-white font-robotoSlab font-medium md:px-8 px-3 mt-2">
              Get 20% Off on All Prescription Medicines.
            </p>
            <div className=" bg-primary md:w-3/4 w-full mt-4">
              <h5 className="md:text-[20px] text-sm md:py-1 py-2 font-robotoSlab font-medium text-white px-2 md:px-3">
                Shop Now at www.tareeq-ul-shifa pharmacy.com
              </h5>
            </div>
            <div className=" flex justify-end sm:px-0 px-4 sm:mt-0 mt-2  mb-4">
              {' '}
              <PlusIcon />
            </div>
            <div className="absolute sm:block hidden right-10 bottom-4">
              {' '}
              <PlusIcon />
            </div>
          </div>
          <div className="w-1/2 hidden md:block pl-24 -mb-10">
            <Image
              src="/images/medicines.png"
              alt=""
              width={320}
              height={200}
            />
          </div>
        </div>
      </div>
      <div className="w-full flex flex-col md:flex-row">
        <div className="w-full md:w-1/3">
          <Image
            src="/images/health.png"
            alt=""
            width={0}
            height={0}
            className="md:w-[400px] h-auto w-full"
            unoptimized
          />
        </div>
        <div className="w-full bg-customTeal md:px-10 px-2">
          <h2 className="text-lg md:text-[28px] font-robotoSlab font-medium mt-5">
            Order Medicines Online with Prescription
          </h2>
          <p className="text-customGray text-base md:text-xl font-robotoSlab">
            Upload prescription and we will deliver your medicines
          </p>
          <h2 className="text-primary text-xl  md:text-3xl font-robotoSlab font-medium mt-5">
            How does this work?
          </h2>
          <div className="grid grid-cols-1 pb-4 md:grid-cols-2 gap-4 mt-4 md:mb-0 mb-2">
            {steps.map((step) => (
              <div key={step.number} className="flex items-center space-x-3">
                <span className="min-w-8 h-8 flex items-center justify-center text-primary bg-white font-bold text-lg rounded">
                  {step.number}
                </span>
                <p className="md:text-base text-sm font-robotoSlab ">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HealthBanner;
