import React, { useState, useEffect } from 'react';

interface StatusToggleProps {
  onChange?: (value: boolean) => void;
  initialState?: boolean;
}

const StatusToggle: React.FC<StatusToggleProps> = ({ 
  onChange, 
  initialState = true 
}) => {
  const [status, setStatus] = useState(initialState ? 'enable' : 'disable');

  useEffect(() => {
    // Update internal state when initialState prop changes
    setStatus(initialState ? 'enable' : 'disable');
  }, [initialState]);

  const handleStatusChange = (newStatus: 'enable' | 'disable') => {
    setStatus(newStatus);
    if (onChange) {
      onChange(newStatus === 'enable');
    }
  };

  return (
    <div className="flex items-center space-x-4">
      <label className="flex items-center py-3 cursor-pointer">
        <input
          type="radio"
          name="status"
          value="enable"
          checked={status === 'enable'}
          onChange={() => handleStatusChange('enable')}
          className="hidden"
        />
        <span
          className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
            status === 'enable' ? 'border-primary' : 'border-gray-400'
          }`}
        >
          {status === 'enable' && (
            <span className="w-3 h-3 bg-primary rounded-full"></span>
          )}
        </span>
        <span className="text-black text-sm font-robotoSlab px-2">Enable</span>
      </label>

      <label className="flex items-center space-x-2 cursor-pointer">
        <input
          type="radio"
          name="status"
          value="disable"
          checked={status === 'disable'}
          onChange={() => handleStatusChange('disable')}
          className="hidden"
        />
        <span
          className={`w-5 h-5 border-2 rounded-full flex items-center justify-center ${
            status === 'disable' ? 'border-gray-600' : 'border-gray-400'
          }`}
        >
          {status === 'disable' && (
            <span className="w-3 h-3 bg-primary rounded-full"></span>
          )}
        </span>
        <span className="text-sm font-robotoSlab text-black">Disable</span>
      </label>
    </div>
  );
};

export default StatusToggle;