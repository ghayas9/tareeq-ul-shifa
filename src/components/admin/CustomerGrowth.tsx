import React from 'react';

const CustomerGrowth = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-6">
      <h2 className="text-lg font-bold mb-4">Customer Growth</h2>
      <div className="mb-4 space-y-4">
        {[
          { city: 'Karachi', width: '83%', value: '900' },
          { city: 'Lahore', width: '62%', value: '900' },
          { city: 'Islamabad', width: '91%', value: '900' },
          { city: 'Peshawar', width: '53%', value: '900' },
          { city: 'Quetta', width: '35%', value: '900' },
        ].map((item, index) => (
          <div key={index}>
            {/* City name and value on the same line */}
            <div className="flex justify-between text-sm font-medium mb-1">
              <span>{item.city}</span>
              <span>{item.value}</span>
            </div>
            {/* Percentage bar below */}
            <div className="bg-gray-100 h-3 rounded-sm">
              <div
                className="bg-emerald-500 h-full rounded-sm"
                style={{ width: item.width }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerGrowth;
