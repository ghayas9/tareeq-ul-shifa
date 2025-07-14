// import React, { useState, useRef, useEffect } from 'react';
// import { BiChevronDown } from 'react-icons/bi';

// interface PrescriptionStatusDropdownProps {
//   currentStatus: string;
//   prescriptionId: string;
//   onUpdate: (prescriptionId: string, status: string) => Promise<void>;
//   disabled?: boolean;
// }

// const PrescriptionStatusDropdown: React.FC<PrescriptionStatusDropdownProps> = ({
//   currentStatus,
//   prescriptionId,
//   onUpdate,
//   disabled = false,
// }) => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isUpdating, setIsUpdating] = useState(false);
//   const dropdownRef = useRef<HTMLDivElement>(null);

//   const statuses = [
//     { value: 'pending', label: 'Pending' },
//     { value: 'processing', label: 'Processing' },
//     { value: 'completed', label: 'Completed' },
//     { value: 'cancelled', label: 'Cancelled' },
//   ];

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   const handleStatusChange = async (status: string) => {
//     if (status === currentStatus || disabled || isUpdating) {
//       setIsOpen(false);
//       return;
//     }

//     setIsUpdating(true);
//     try {
//       await onUpdate(prescriptionId, status);
//     } catch (error) {
//       console.error('Error updating status:', error);
//     } finally {
//       setIsUpdating(false);
//       setIsOpen(false);
//     }
//   };

//   const getStatusStyles = (status: string): string => {
//     switch (status.toLowerCase()) {
//       case 'completed':
//       case 'delivered':
//         return 'bg-[#128E7C]/20 text-primary';
//       case 'processing':
//       case 'pending':
//         return 'bg-[#38C95C]/20 text-secondary';
//       case 'cancelled':
//         return 'bg-[#E22134]/20 text-red-700';
//       default:
//         return 'bg-gray-100 text-gray-600';
//     }
//   };

//   return (
//     <div className="relative" ref={dropdownRef}>
//       <button
//         onClick={() => !disabled && !isUpdating && setIsOpen(!isOpen)}
//         className={`flex items-center justify-between ${getStatusStyles(
//           currentStatus
//         )} px-3 py-1 rounded-md min-w-[120px] text-sm font-medium ${
//           disabled || isUpdating ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
//         }`}
//         disabled={disabled || isUpdating}
//       >
//         <span className="capitalize">{currentStatus}</span>
//         {isUpdating ? (
//           <div className="w-4 h-4 ml-2 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
//         ) : (
//           <BiChevronDown className="ml-2 w-4 h-4" />
//         )}
//       </button>

//       {isOpen && (
//         <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
//           <ul className="py-1">
//             {statuses.map((status) => (
//               <li
//                 key={status.value}
//                 className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
//                   status.value === currentStatus ? 'bg-gray-50' : ''
//                 }`}
//                 onClick={() => handleStatusChange(status.value)}
//               >
//                 {status.label}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// };

// export default PrescriptionStatusDropdown;


// src/components/admin/PrescriptionStatusDropdown.tsx
import React, { useState, useRef, useEffect } from 'react';
import { BiChevronDown } from 'react-icons/bi';
import { usePrescription } from '@/hooks/prescription.hooks';

interface PrescriptionStatusDropdownProps {
  currentStatus: string;
  prescriptionId: string;
  onUpdate?: (prescriptionId: string, status: string) => Promise<void>;
  disabled?: boolean;
}

const PrescriptionStatusDropdown: React.FC<PrescriptionStatusDropdownProps> = ({
  currentStatus,
  prescriptionId,
  onUpdate,
  disabled = false,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { updatePrescription, isLoading } = usePrescription();

  // Map API status values to display values
  const statusMap: Record<string, string> = {
    'pending': 'Pending',
    'approved': 'Approved',
    'rejected': 'Rejected',
    'in progress': 'Processing',
    'delivered': 'Completed',
  };

  // Reverse map for converting display values back to API values
  const reverseStatusMap: Record<string, string> = {
    'Pending': 'pending',
    'Approved': 'approved',
    'Rejected': 'rejected',
    'Processing': 'in progress',
    'Completed': 'delivered',
  };

  const statuses = [
    { value: 'pending', label: 'Pending' },
    { value: 'in progress', label: 'Processing' },
    { value: 'approved', label: 'Approved' },
    { value: 'delivered', label: 'Completed' },
    { value: 'rejected', label: 'Rejected' },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleStatusChange = async (status: string) => {
    if (status === currentStatus || disabled || isLoading) {
      setIsOpen(false);
      return;
    }

    try {
      if (onUpdate) {
        // Use the provided onUpdate function if available
        await onUpdate(prescriptionId, status);
      } else {
        // Otherwise use the Redux action
        await updatePrescription(prescriptionId, {
          status: status as any,
          notes: `Status changed to ${statusMap[status] || status}`,
        });
      }
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsOpen(false);
    }
  };

  const getStatusStyles = (status: string): string => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'delivered':
        return 'bg-[#128E7C]/20 text-primary';
      case 'processing':
      case 'in progress':
      case 'pending':
      case 'approved':
        return 'bg-[#38C95C]/20 text-secondary';
      case 'cancelled':
      case 'rejected':
        return 'bg-[#E22134]/20 text-red-700';
      default:
        return 'bg-gray-100 text-gray-600';
    }
  };

  // Display appropriate label based on current status
  const displayStatus = statusMap[currentStatus] || currentStatus;

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => !disabled && !isLoading && setIsOpen(!isOpen)}
        className={`flex items-center justify-between ${getStatusStyles(
          currentStatus
        )} px-3 py-1 rounded-md min-w-[120px] text-sm font-medium ${
          disabled || isLoading ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'
        }`}
        disabled={disabled || isLoading}
      >
        <span className="capitalize">{displayStatus}</span>
        {isLoading ? (
          <div className="w-4 h-4 ml-2 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <BiChevronDown className="ml-2 w-4 h-4" />
        )}
      </button>

      {isOpen && (
        <div className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200">
          <ul className="py-1">
            {statuses.map((status) => (
              <li
                key={status.value}
                className={`px-3 py-2 text-sm cursor-pointer hover:bg-gray-50 ${
                  status.value === currentStatus ? 'bg-gray-50' : ''
                }`}
                onClick={() => handleStatusChange(status.value)}
              >
                {status.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default PrescriptionStatusDropdown;