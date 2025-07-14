'use client';
import React, { useState } from 'react';
import { Cross, Edit } from '../icons/Icons';
import Pagination from '../common/Pagination';
import PageLoader from '../common/PageLoader';
import StatusUpdateDropdown from '../admin/StatusUpdateDropdown';

interface Column {
  header: string;
  key: string;
  type?:
    | 'text'
    | 'image'
    | 'stock'
    | 'payment'
    | 'orderStatus'
    | 'productStatus'
    | 'editableOrderStatus'
    | 'editablePaymentStatus';
  prefix?: string;
  suffix?: string;
}

interface StockStatusProps {
  status: string;
  count?: number;
}

interface PaymentStatusProps {
  status: string;
}

interface OrderStatusProps {
  status: string;
}

interface DynamicTableProps {
  data: any[];
  columns: Column[];
  itemsPerPage?: number;
  onEdit?: (item: any) => void;
  onDelete?: (item: any) => void;
  onUpdateOrderStatus?: (orderId: string, status: string) => Promise<void>;
  onUpdatePaymentStatus?: (orderId: string, status: string) => Promise<void>;
  showCheckbox?: boolean;
  isRowLoading?: string;
  isLoading?: boolean;
  emptyMessage?: string;
  totalItems?: number;
  totalPages?: number;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  onItemsPerPageChange?: (itemsPerPage: number) => void;
}

const DynamicTable: React.FC<DynamicTableProps> = ({
  data,
  columns,
  itemsPerPage = 10,
  onEdit = null,
  onDelete = null,
  onUpdateOrderStatus,
  onUpdatePaymentStatus,
  showCheckbox = false,
  isRowLoading,
  isLoading = false,
  emptyMessage = 'No data found',
  totalItems,
  totalPages: externalTotalPages,
  currentPage: externalCurrentPage,
  onPageChange: externalOnPageChange,
  onItemsPerPageChange,
}) => {
  const [internalCurrentPage, setInternalCurrentPage] = useState<number>(1);
  const [selectedRows, setSelectedRows] = useState<{ [key: number]: boolean }>(
    {}
  );

  // Determine if using internal or external pagination
  const useExternalPagination =
    externalTotalPages !== undefined && externalOnPageChange !== undefined;
  const currentPage = useExternalPagination
    ? externalCurrentPage || 1
    : internalCurrentPage;

  // Calculate pagination values for internal pagination
  const internalTotalPages = Math.ceil(data.length / itemsPerPage);
  const totalPagesValue = useExternalPagination
    ? externalTotalPages
    : internalTotalPages;

  // Data for display when using internal pagination
  const startIndex = useExternalPagination
    ? 0
    : (currentPage - 1) * itemsPerPage;
  const endIndex = useExternalPagination
    ? data.length
    : startIndex + itemsPerPage;
  const currentData = useExternalPagination
    ? data
    : data.slice(startIndex, endIndex);

  // Total items count for pagination display
  const totalItemsCount = totalItems || data.length;

  const handleCheckboxChange = (rowIndex: number) => {
    setSelectedRows((prev) => ({
      ...prev,
      [rowIndex]: !prev[rowIndex],
    }));
  };

  // Handle page change (internal or external)
  const handlePageChange = (page: number) => {
    if (useExternalPagination && externalOnPageChange) {
      externalOnPageChange(page);
    } else {
      setInternalCurrentPage(page);
    }
  };

  // Handler for status updates
  const handleStatusUpdate = async (
    orderId: string,
    status: string,
    type: 'orderStatus' | 'paymentStatus'
  ) => {
    if (type === 'orderStatus' && onUpdateOrderStatus) {
      await onUpdateOrderStatus(orderId, status);
    } else if (type === 'paymentStatus' && onUpdatePaymentStatus) {
      await onUpdatePaymentStatus(orderId, status);
    }
  };

  const StockStatus: React.FC<StockStatusProps> = ({ status, count }) => {
    const getStatusColor = (status: string): string => {
      switch (status?.toLowerCase()) {
        case 'in stock':
          return 'text-green-600';
        case 'low inventory':
          return 'text-yellow-600';
        case 'out of stock':
          return 'text-red-600';
        default:
          return 'text-gray-600';
      }
    };
    return (
      <span className={`${getStatusColor(status)} font-medium`}>
        {status}
        <span className="text-gray-400 ml-[3px]">{count && `(${count})`}</span>
      </span>
    );
  };

  // Payment Status Component
  const PaymentStatus: React.FC<PaymentStatusProps> = ({ status }) => {
    const getStatusColor = (status: string): string => {
      switch (status?.toLowerCase()) {
        case 'paid':
          return 'text-green-600';
        case 'unpaid':
          return 'text-red-600';
        default:
          return 'text-gray-600';
      }
    };

    return (
      <span className={`${getStatusColor(status)} font-medium`}>{status}</span>
    );
  };

  // Order Status Component
  const OrderStatus: React.FC<OrderStatusProps> = ({ status }) => {
    const getStatusStyles = (status: string): string => {
      switch (status?.toLowerCase()) {
        case 'completed':
        case 'delivered':
          return 'bg-[#128E7C]/20 text-primary px-3 py-1 rounded-md';
        case 'confirmed':
        case 'processing':
        case 'shipped':
          return 'bg-[#38C95C]/20 text-secondary px-3 py-1 rounded-md';
        case 'cancelled':
          return 'bg-[#E22134]/20 text-red-700 px-3 py-1 rounded-md';
        default:
          return 'bg-gray-100 text-gray-600 px-3 py-1 rounded-md';
      }
    };

    return (
      <span className={`${getStatusStyles(status)} text-sm font-medium`}>
        {status}
      </span>
    );
  };

  const ProductStatus: React.FC<any> = ({ status }) => {
    const getStatusStyles = (status: string): string => {
      switch (status?.toLowerCase()) {
        case 'inactive':
          return 'bg-[#E22134]/20 text-red-700 px-3 py-1 rounded-md';
        case 'active':
          return 'bg-[#38C95C]/20 text-secondary px-3 py-1 rounded-md';
        case 'pending':
          return 'bg-[#128E7C]/20 text-primary px-3 py-1 rounded-md';
        default:
          return 'bg-gray-100 text-gray-600 px-3 py-1 rounded-md';
      }
    };

    return (
      <span className={`${getStatusStyles(status)} text-sm font-medium`}>
        {status}
      </span>
    );
  };

  // Calculate the number of columns including action column
  const totalColumns =
    columns.length + (onEdit || onDelete ? 1 : 0) + (showCheckbox ? 1 : 0);

  return (
    <div className="w-full">
      <div className="overflow-x-auto shadow-sm rounded-lg">
        <table className="min-w-full divide-y">
          <thead>
            <tr>
              {showCheckbox && (
                <th className="px-4 py-3 text-left">
                  <input type="checkbox" className="form-checkbox" />
                </th>
              )}
              {columns.map((column, index) => (
                <th
                  key={index}
                  className="px-6 py-7 text-left text-[17px] font-medium text-black font-robotoSlab tracking-wider"
                >
                  {column.header}
                </th>
              ))}
              {/* Show Actions column only if at least one action exists */}
              {onEdit || onDelete ? (
                <th className="pr-10 py-3 text-right text-[17px] font-medium font-robotoSlab tracking-wider">
                  Actions
                </th>
              ) : null}
            </tr>
          </thead>
          <tbody className="divide-y">
            {isLoading ? (
              // Loading state for entire table body
              <tr>
                <td colSpan={totalColumns} className="px-6 py-10">
                  <PageLoader />
                </td>
              </tr>
            ) : currentData?.length === 0 ? (
              // Empty state
              <tr>
                <td colSpan={totalColumns} className="px-6 py-10 text-center">
                  <p className="text-gray-500">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              // Actual data rows
              currentData.map((item, rowIndex) => {
                const isThisRowLoading = isRowLoading === item.id?.toString();

                return (
                  <tr
                    key={rowIndex}
                    className={`hover:bg-gray-50 ${isThisRowLoading ? 'opacity-50' : ''}`}
                  >
                    {showCheckbox && (
                      <td className="px-4 py-4">
                        <input
                          type="checkbox"
                          className="form-checkbox"
                          checked={selectedRows[rowIndex] || false}
                          onChange={() => handleCheckboxChange(rowIndex)}
                          disabled={isThisRowLoading}
                        />
                      </td>
                    )}
                    {columns.map((column, colIndex) => (
                      <td
                        key={colIndex}
                        className="px-6 py-4 whitespace-nowrap align-top"
                      >
                        {isThisRowLoading ? (
                          <div className="flex items-center justify-center h-6">
                            <div className="w-5 h-5 border-2 border-gray-300 border-t-emerald-500 rounded-full animate-spin"></div>
                          </div>
                        ) : (
                          <div className="flex items-start">
                            {column.type === 'image' && item[column.key] && (
                              <>
                                <img
                                  src={item[column.key]}
                                  alt={item.name || 'Product'}
                                  className="h-10 w-10 mr-3 rounded-full object-cover object-center"
                                />
                                <div className="flex flex-col">
                                  <span className="text-sm text-tableColor font-robotoSlab">
                                    {item.name}
                                  </span>
                                  {item.subText && (
                                    <span className="text-xs text-gray-500">
                                      {item.subText}
                                    </span>
                                  )}
                                </div>
                              </>
                            )}
                            {column.type === 'stock' && (
                              <StockStatus
                                status={item[column.key]}
                                count={item.stockCount}
                              />
                            )}
                            {column.type === 'payment' && (
                              <div className="flex flex-col">
                                {/* <span className="text-sm text-tableColor font-robotoSlab">
                                  {item[column.key]}
                                </span> */}
                                {item.paymentStatus &&
                                  (column.type === 'payment' &&
                                  onUpdatePaymentStatus ? (
                                    <StatusUpdateDropdown
                                      currentStatus={item.paymentStatus}
                                      type="paymentStatus"
                                      orderId={item.id}
                                      onUpdate={handleStatusUpdate}
                                      disabled={isThisRowLoading}
                                    />
                                  ) : (
                                    <PaymentStatus
                                      status={item.paymentStatus}
                                    />
                                  ))}
                              </div>
                            )}
                            {column.type === 'orderStatus' &&
                              (onUpdateOrderStatus ? (
                                <StatusUpdateDropdown
                                  currentStatus={item[column.key]}
                                  type="orderStatus"
                                  orderId={item.id}
                                  onUpdate={handleStatusUpdate}
                                  disabled={isThisRowLoading}
                                />
                              ) : (
                                <OrderStatus status={item[column.key]} />
                              ))}
                            {column.type === 'editableOrderStatus' && (
                              <StatusUpdateDropdown
                                currentStatus={item[column.key]}
                                type="orderStatus"
                                orderId={item.id}
                                onUpdate={handleStatusUpdate}
                                disabled={isThisRowLoading}
                              />
                            )}
                            {column.type === 'editablePaymentStatus' && (
                              <StatusUpdateDropdown
                                currentStatus={item[column.key]}
                                type="paymentStatus"
                                orderId={item.id}
                                onUpdate={handleStatusUpdate}
                                disabled={isThisRowLoading}
                              />
                            )}
                            {column.type === 'productStatus' && (
                              <ProductStatus status={item[column.key]} />
                            )}
                            {!column.type && (
                              <span className="text-sm text-tableColor font-robotoSlab">
                                {column.prefix || ''}
                                {item[column.key]}
                                {column.suffix || ''}
                              </span>
                            )}
                          </div>
                        )}
                      </td>
                    ))}
                    {/* Conditionally show actions column only when needed */}
                    {onEdit || onDelete ? (
                      <td className="pr-10 py-4 whitespace-nowrap text-right text-sm font-medium align-top">
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="text-blue-600 hover:text-blue-900 mr-3"
                            disabled={isThisRowLoading}
                          >
                            <Edit />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="text-red-600 hover:text-red-900"
                            disabled={isThisRowLoading}
                          >
                            {isThisRowLoading ? (
                              <div className="w-5 h-5 rounded-full border-2 border-t-transparent border-red-600 animate-spin"></div>
                            ) : (
                              <Cross />
                            )}
                          </button>
                        )}
                      </td>
                    ) : null}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Only show pagination when not in loading state and we have data */}
      {!isLoading && data.length > 0 && (
        <Pagination
          totalPages={totalPagesValue}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          totalItems={totalItemsCount}
          itemsPerPage={itemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          itemsPerPageOptions={[10, 20, 50, 100]}
          showItemsPerPage={true}
        />
      )}
    </div>
  );
};

export default DynamicTable;
