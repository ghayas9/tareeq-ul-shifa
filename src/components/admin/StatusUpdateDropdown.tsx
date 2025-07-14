'use client';
import React, { useState } from 'react';
import { HiChevronDown } from 'react-icons/hi2';

interface StatusUpdateDropdownProps {
  currentStatus: string;
  type: 'orderStatus' | 'paymentStatus';
  orderId: string;
  onUpdate: (
    orderId: string,
    status: string,
    type: 'orderStatus' | 'paymentStatus'
  ) => Promise<void>;
  disabled?: boolean;
}

const StatusUpdateDropdown: React.FC<StatusUpdateDropdownProps> = ({
  currentStatus,
  type,
  orderId,
  onUpdate,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState(currentStatus);

  // Define status options based on type
  const orderStatusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'processing', label: 'Processing' },
    { value: 'shipped', label: 'Shipped' },
    { value: 'delivered', label: 'Delivered' },
    { value: 'cancelled', label: 'Cancelled' },
  ];

  const paymentStatusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'paid', label: 'Paid' },
    { value: 'failed', label: 'Failed' },
    { value: 'refunded', label: 'Refunded' },
  ];

  const options =
    type === 'orderStatus' ? orderStatusOptions : paymentStatusOptions;

  // Get color based on status
  const getStatusColor = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'delivered':
      case 'paid':
        return 'bg-[#38C95C]/20 text-secondary';
      case 'processing':
      case 'shipped':
      case 'pending':
        return 'bg-[#128E7C]/20 text-primary';
      case 'cancelled':
      case 'failed':
      case 'refunded':
        return 'bg-[#E22134]/20 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Handle status change
  const handleStatusChange = async (newStatus: string) => {
    if (newStatus !== selectedStatus && !isUpdating) {
      setIsUpdating(true);
      try {
        await onUpdate(orderId, newStatus, type);
        setSelectedStatus(newStatus);
      } catch (error) {
        console.error(`Error updating ${type}:`, error);
      } finally {
        setIsUpdating(false);
        setIsOpen(false);
      }
    } else {
      setIsOpen(false);
    }
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={`${getStatusColor(selectedStatus)} px-2 w-24 justify-between py-1 rounded-md text-sm font-medium flex items-center space-x-1 ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled || isUpdating}
      >
        <span>
          {selectedStatus.charAt(0).toUpperCase() + selectedStatus.slice(1)}
        </span>
        {!disabled && (
          <HiChevronDown
            className={`transition-transform ${isOpen ? 'rotate-180' : ''}`}
          />
        )}
        {isUpdating && (
          <span className="ml-1 inline-block w-4 h-4 border-2 border-t-transparent rounded-full animate-spin" />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-40 bg-white rounded-md shadow-lg py-1 border border-gray-200">
          {options.map((option) => (
            <button
              key={option.value}
              className={`block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${selectedStatus === option.value ? 'font-bold bg-gray-50' : ''}`}
              onClick={() => handleStatusChange(option.value)}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatusUpdateDropdown;
