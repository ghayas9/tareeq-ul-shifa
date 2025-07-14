'use client';
import React from 'react';
import { FemaleSegmentation, MaleSegmentation } from '../icons/Icons';

const GenderSegmentation = () => {
  return (
    <div className="bg-white p-6 mb-20 rounded-lg shadow-sm">
      <h2 className="text-lg font-bold mb-4">Segmentation by Gender</h2>
      <div className="flex  gap-8">
        <div className="w-24 text-center">
          <div className="w-full py-2 h-16 bg-teal-600 rounded-md flex items-center flex-col justify-center mb-2">
            <MaleSegmentation />
            <p className="text-lg font-robotoSlab text-white">Males</p>
          </div>
          <p className="text-lg font-bold">60%</p>
        </div>

        <div className="w-24 text-center">
          <div className="w-full py-2 h-16 bg-teal-600 rounded-md flex flex-col items-center justify-center mb-2">
            <FemaleSegmentation />
            <p className="text-lg font-robotoSlab text-white">Females</p>
          </div>

          <p className="text-lg font-bold">40%</p>
        </div>
      </div>
    </div>
  );
};

export default GenderSegmentation;
