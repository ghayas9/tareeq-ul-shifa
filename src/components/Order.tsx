import React, { useState } from 'react';
import Input from './common/Input';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const schema = z.object({
  phoneNumber: z.string().min(10, 'Phone Number must be at least 10 digits'),
});

function Order() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  return (
    <div className="py-4 px-10">
      <h1 className="text-3xl font-robotoSlab font-medium">
        Get Your Medicines Fast!
      </h1>
      <p className="text-base text-textColor font-robotoSlab">
        We'll call you to confirm the medicines on your prescription
      </p>
      <div className="mt-4">
        <h1 className="text-sm font-robotoSlab py-1">Upload Prescription</h1>
        <label
          htmlFor="file-upload"
          className="flex items-center border border-CloudGray rounded-[10px] overflow-hidden"
        >
          <div className="px-3 w-full outline-none">
            <p className="text-base font-robotoSlab text-textColor">
              No choose file
            </p>
          </div>
          <label
            htmlFor="file-upload"
            className="text-nowrap bg-primary text-white text-base font-robotoSlab font-medium px-4 py-2  cursor-pointer"
          >
            Upload File
          </label>
          <input id="file-upload" type="file" className="hidden" />
        </label>
      </div>
      <div className="mt-6">
        <h1 className="text-base font-semibold">Enter Details</h1>
        <p className="text-sm font-robotoSlab mb-1">
          Enter Delivery Address{' '}
          <span className="text-sm font-robotoSlab text-red-700">*</span>
        </p>
        <textarea
          name=""
          id=""
          placeholder="Enter your Address here"
          className="px-3 py-1 w-full outline-none resize-none border border-CloudGray rounded-[10px] "
        ></textarea>
      </div>
      <div className="flex flex-col ">
        <Input
          label="Enter Mobile Number"
          placeholder="+92"
          name="phoneNumber"
          required={true}
          errors={errors}
          register={register('phoneNumber')}
        />
      </div>
      <div className="mt-6 flex gap-4 sm:justify-end justify-between">
        <button className="text-DimGray border border-normalGreen rounded-[10px] px-6 py-1">
          Cancel
        </button>
        <button className="text-white bg-primary rounded-[10px] px-6 py-1 ">
          Upload
        </button>
      </div>
    </div>
  );
}

export default Order;
