import React from 'react';

const AgeSegmentation = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-bold mb-4">
        Demographic Segmentation by Age
      </h2>
      <div className="mb-4 space-y-4">
        {[
          { age: 'Age 18 - 25', width: '77%', value: '7,000' },
          { age: 'Age 24 - 35', width: '44%', value: '4,000' },
          { age: 'Age 45 - 55', width: '100%', value: '9,000' },
          { age: 'Age over 55', width: '22%', value: '2,000' },
        ].map((item, index) => (
          <div key={index}>
            {/* Age group and value on the same line */}
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>{item.age}</span>
              <span>{item.value}</span>
            </div>
            {/* Percentage bar below */}
            <div className="bg-gray-100 h-3 rounded-sm">
              <div
                className="bg-green-500 h-full rounded-sm"
                style={{ width: item.width }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AgeSegmentation;
