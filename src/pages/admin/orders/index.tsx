'use client';
import { useEffect, useState } from 'react';
import Breadcrumbs from '@/components/admin/BreadCrumbs';
import ExportPdf from '@/components/admin/ExpordPdf';
import Layout from '@/components/admin/layout/Layout';
import StatsCards from '@/components/admin/StatusCards';
import DynamicTable from '@/components/admin/Table';
import DateRangePicker from '@/components/admin/DateRangePicker';
import { TiTick } from 'react-icons/ti';
import { RxCrossCircled } from 'react-icons/rx';
import { HiArrowUturnRight } from 'react-icons/hi2';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { OrderItem } from '@/types/orderTypes';
import useAdminOrders from '@/hooks/adminOrder.hooks';
import { useDateRange } from '@/hooks/dateRange';
import ExportData from '@/components/admin/ExpordPdf';

interface HookDateRange {
  from: Date | null;
  to: Date | null;
}
interface FormattedOrder {
  id: string;
  name: string;
  image: string;
  subText: string;
  orderNumber: string;
  customer: string;
  date: string;
  payment: string;
  paymentStatus: string;
  status: string;
  orderStatus: string;
  items: OrderItem[];
}
interface TableColumn {
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

const columns: TableColumn[] = [
  {
    header: 'Product',
    key: 'image',
    type: 'image',
  },
  {
    header: '#Order',
    key: 'orderNumber',
  },
  {
    header: 'Customer',
    key: 'customer',
  },
  {
    header: 'Date',
    key: 'date',
  },
  {
    header: 'Payment',
    key: 'payment',
    // type: 'payment',
  },
  {
    header: 'Payment Status',
    key: 'paymentStatus',
    type: 'payment',
  },
  {
    header: 'Order Status',
    key: 'orderStatus',
    type: 'orderStatus',
  },
];

function adaptDateRange(hookRange: HookDateRange): {
  startDate: Date;
  endDate: Date;
} {
  return {
    startDate: hookRange.from || new Date(),
    endDate: hookRange.to || new Date(),
  };
}
interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

const BreadcrumbItems: BreadcrumbItem[] = [
  { label: 'All Pages', href: '/admin/dashboard' },
  { label: 'Orders', href: '/admin/orders', active: true },
];

function adaptOnDateRangeChange(
  onRangeChange: (range: HookDateRange) => void
): (startDate: Date, endDate: Date) => void {
  return (startDate: Date, endDate: Date) => {
    onRangeChange({
      from: startDate,
      to: endDate,
    });
  };
}

const Orders = () => {
  const [search, setSearch] = useState('');
  const [hookDateRange, setHookDateRange] = useDateRange(
    new Date(new Date().setDate(new Date().getDate() - 30)),
    new Date()
  );
  const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

  const {
    orders,
    orderSummary,
    pagination,
    isLoading,
    filters,
    loadOrders,
    applyFilters,
    handlePageChange,
    handleItemsPerPageChange,
    handleUpdateStatus,
    handleUpdatePayment,
  } = useAdminOrders();
  console.log(orders, 'orders');
  const formattedOrders: FormattedOrder[] = orders.map((order) => {
    const firstItem = order.items[0];
    console.log(firstItem, 'first');
    const image = firstItem?.productImage || '/images/placeholder.png';

    const userName = order.user
      ? `${order.user.firstName || ''} ${order.user.lastName || ''}`.trim()
      : 'Guest User';

    return {
      id: order.id,
      name: firstItem?.productName || 'Order Item',
      image: image,
      subText: `${order.items.length} item${order.items.length !== 1 ? 's' : ''}`,
      orderNumber: order.orderNumber,
      customer: userName,
      date: format(new Date(order.createdAt), 'MMM dd, yyyy'),
      payment: `Rs ${order.totalAmount}`,
      paymentStatus: order.paymentStatus,
      status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
      orderStatus: order.status,
      items: order.items,
    };
  });

  const totalOrders = pagination.totalItems;
  const totalRevenue = orders
    .filter((order) => order.paymentStatus === 'paid')
    .reduce((sum, order) => sum + Number(order.totalAmount), 0);

  const pendingOrders = orders.filter(
    (order) => order.status === 'pending'
  ).length;
  const completedOrders = orders.filter(
    (order) => order.status === 'delivered'
  ).length;
  const cancelledOrders = orders.filter(
    (order) => order.status === 'cancelled'
  ).length;

  // Set loading message if needed
  const displayRevenue = isLoading
    ? 'Loading...'
    : `Rs ${totalRevenue.toLocaleString()}`;
  const displayCompleted = isLoading
    ? 'Loading...'
    : completedOrders.toString();
  const displayPending = isLoading ? 'Loading...' : pendingOrders.toString();
  const displayCancelled = isLoading
    ? 'Loading...'
    : cancelledOrders.toString();
  const stats = [
    {
      id: 1,
      title: 'Total Revenue',
      value: `${displayRevenue}`,
      icon: <TiTick className="w-6 h-6 text-white" />,
      bgColor: 'bg-primary',
    },
    {
      id: 2,
      title: 'Completed Orders',
      value: displayCompleted,
      icon: <TiTick className="w-6 h-6 text-white" />,
      bgColor: 'bg-primary',
    },
    {
      id: 3,
      title: 'Pending Orders',
      value: displayPending,
      icon: <RxCrossCircled className="w-6 h-6 text-white" />,
      bgColor: 'bg-primary',
    },
    {
      id: 4,
      title: 'Cancelled Orders',
      value: displayCancelled,
      icon: <HiArrowUturnRight className="w-6 h-6 text-white" />,
      bgColor: 'bg-primary',
    },
  ];
  // Handle date range change
  useEffect(() => {
    if (hookDateRange.from && hookDateRange.to) {
      applyFilters({
        startDate: hookDateRange.from,
        endDate: hookDateRange.to,
      });
    }
  }, []);

  // Initial load
  useEffect(() => {
    loadOrders();
  }, []);

  // Handle order view/edit
  const handleViewOrder = (order: FormattedOrder) => {
    // Navigate to order detail page
    window.location.href = `/admin/orders/${order.id}`;
  };

  // Handle order deletion (cancellation)
  const handleCancelOrder = async (order: FormattedOrder) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this order?'
    );

    if (confirmed) {
      setUpdatingOrderId(order.id);
      const success = await handleUpdateStatus(
        order.id,
        'cancelled',
        'Cancelled by admin'
      );
      setUpdatingOrderId(null);

      if (success) {
        toast.success('Order cancelled successfully');
        loadOrders(); // Refresh the list
      }
    }
  };

  // Handle order status update
  const handleOrderStatusUpdate = async (orderId: string, status: string) => {
    setUpdatingOrderId(orderId);
    try {
      await handleUpdateStatus(
        orderId,
        status,
        `Status updated to ${status} by admin`
      );
    } catch (error) {
      toast.error('An error occurred while updating order status');
      console.error('Order status update error:', error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Handle payment status update
  const handlePaymentStatusUpdate = async (orderId: string, status: string) => {
    setUpdatingOrderId(orderId);
    try {
      const success = await handleUpdatePayment(
        orderId,
        status as 'pending' | 'paid' | 'failed' | 'refunded'
      );
    } catch (error) {
      toast.error('An error occurred while updating payment status');
      console.error('Payment status update error:', error);
    } finally {
      setUpdatingOrderId(null);
    }
  };

  // Handle search
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters({ search });
  };

  // Adapt the date range for the DateRangePicker component
  const pickerDateRange = adaptDateRange(hookDateRange);
  const handleDateRangeChange = adaptOnDateRangeChange(setHookDateRange);

  const prepareOrderExport = () => {
    return formattedOrders.map((order) => ({
      orderNumber: order.orderNumber,
      customer: order.customer,
      date: order.date,
      amount: order.payment.replace('Rs ', ''), // Clean the currency symbol
      status: order.status,
      paymentStatus: order.paymentStatus,
    }));
  };
  const orderColumnMapping: Record<string, string> = {
    orderNumber: 'Order #',
    customer: 'Customer',
    date: 'Order Date',
    amount: 'Amount (Rs)',
    status: 'Order Status',
    paymentStatus: 'Payment Status',
  };

  return (
    <Layout>
      <div className="p-6 bg-gray-50 max-h-screen">
        <div className="py-2">
          <Breadcrumbs items={BreadcrumbItems} />
        </div>
        <div className="flex mt-3 mb-6">
          <h1 className="sm:text-2xl text-lg font-bold">Orders</h1>
        </div>

        {/* Search and Filters */}
        <div className="mb-4">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              placeholder="Search by order number"
              value={search}
              onChange={handleSearch}
              className="border p-2 rounded-md max-w-[70%] flex-grow focus:outline-none"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-md"
            >
              Search
            </button>
          </form>
        </div>

        <div className="flex justify-between sm:flex-row flex-col sm:items-center items-start">
          <div className="py-3">
            <DateRangePicker
              dateRange={pickerDateRange}
              onDateRangeChange={handleDateRangeChange}
              className=""
              buttonClassName="!py-2"
            />
          </div>
          <div>
            <ExportData
              data={prepareOrderExport()}
              filename="orders-report"
              pdfTitle="Orders Report"
              pdfSubtitle={`Date Range: ${format(hookDateRange.from || new Date(), 'MMM dd, yyyy')} - ${format(hookDateRange.to || new Date(), 'MMM dd, yyyy')}`}
              columnMapping={orderColumnMapping}
            />
          </div>
        </div>

        <div className="my-4">
          <StatsCards stats={stats} className="md:grid-cols-4" />
        </div>

        <div className="pb-20">
          <div className="bg-white rounded-lg shadow-sm p-3">
            <h2 className="text-lg font-bold mb-4">Orders</h2>
            <DynamicTable
              data={formattedOrders}
              columns={columns}
              isLoading={isLoading}
              isRowLoading={updatingOrderId || undefined}
              itemsPerPage={pagination.pageSize}
              totalItems={pagination.totalItems}
              totalPages={pagination.totalPages}
              currentPage={pagination.currentPage}
              onPageChange={handlePageChange}
              onItemsPerPageChange={handleItemsPerPageChange}
              onEdit={handleViewOrder}
              onDelete={handleCancelOrder}
              onUpdateOrderStatus={handleOrderStatusUpdate}
              onUpdatePaymentStatus={handlePaymentStatusUpdate}
              showCheckbox={false}
              emptyMessage="No orders found. Adjust your filters or try again later."
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Orders;

// 'use client';
// import { useEffect, useState } from 'react';
// import Breadcrumbs from '@/components/admin/BreadCrumbs';
// import ExportPdf from '@/components/admin/ExpordPdf';
// import Layout from '@/components/admin/layout/Layout';
// import StatsCards from '@/components/admin/StatusCards';
// import DynamicTable from '@/components/admin/Table';
// import DateRangePicker from '@/components/admin/DateRangePicker';
// import { TiTick } from 'react-icons/ti';
// import { RxCrossCircled } from 'react-icons/rx';
// import { HiArrowUturnRight } from 'react-icons/hi2';
// import { format } from 'date-fns';
// import toast from 'react-hot-toast';
// import { OrderItem } from '@/types/orderTypes';
// import useAdminOrders from '@/hooks/adminOrder.hooks';
// import { useDateRange } from '@/hooks/dateRange';

// interface HookDateRange {
//   from: Date | null;
//   to: Date | null;
// }
// interface FormattedOrder {
//   id: string;
//   name: string;
//   image: string;
//   subText: string;
//   orderNumber: string;
//   customer: string;
//   date: string;
//   payment: string;
//   paymentStatus: string;
//   status: string;
//   orderStatus: string;
//   items: OrderItem[];
// }
// interface TableColumn {
//   header: string;
//   key: string;
//   type?:
//     | 'text'
//     | 'image'
//     | 'stock'
//     | 'payment'
//     | 'orderStatus'
//     | 'productStatus'
//     | 'editableOrderStatus'
//     | 'editablePaymentStatus';
//   prefix?: string;
//   suffix?: string;
// }

// const columns: TableColumn[] = [
//   {
//     header: 'Product',
//     key: 'image',
//     type: 'image',
//   },
//   {
//     header: '#Order',
//     key: 'orderNumber',
//   },
//   {
//     header: 'Customer',
//     key: 'customer',
//   },
//   {
//     header: 'Date',
//     key: 'date',
//   },
//   {
//     header: 'Payment',
//     key: 'payment',
//     // type: 'payment',
//   },
//   {
//     header: 'Payment Status',
//     key: 'paymentStatus',
//     type: 'payment',
//   },
//   {
//     header: 'Order Status',
//     key: 'orderStatus',
//     type: 'orderStatus',
//   },
// ];

// function adaptDateRange(hookRange: HookDateRange): {
//   startDate: Date;
//   endDate: Date;
// } {
//   return {
//     startDate: hookRange.from || new Date(),
//     endDate: hookRange.to || new Date(),
//   };
// }
// interface BreadcrumbItem {
//   label: string;
//   href: string;
//   active?: boolean;
// }

// const BreadcrumbItems: BreadcrumbItem[] = [
//   { label: 'All Pages', href: '/' },
//   { label: 'Orders', href: '/admin/orders', active: true },
// ];

// function adaptOnDateRangeChange(
//   onRangeChange: (range: HookDateRange) => void
// ): (startDate: Date, endDate: Date) => void {
//   return (startDate: Date, endDate: Date) => {
//     onRangeChange({
//       from: startDate,
//       to: endDate,
//     });
//   };
// }

// const Orders = () => {
//   const [search, setSearch] = useState('');
//   const [hookDateRange, setHookDateRange] = useDateRange(
//     new Date(new Date().setDate(new Date().getDate() - 30)),
//     new Date()
//   );
//   const [updatingOrderId, setUpdatingOrderId] = useState<string | null>(null);

//   const {
//     orders,
//     orderSummary,
//     pagination,
//     isLoading,
//     filters,
//     loadOrders,
//     loadOrderSummary,
//     applyFilters,
//     handlePageChange,
//     handleItemsPerPageChange,
//     handleUpdateStatus,
//     handleUpdatePayment,
//   } = useAdminOrders();

//   const formattedOrders: FormattedOrder[] = orders.map((order) => {
//     const firstItem = order.items[0];
//     const image = firstItem?.productImage || '/images/placeholder.png';

//     const userName = order.user
//       ? `${order.user.firstName || ''} ${order.user.lastName || ''}`.trim()
//       : 'Guest User';

//     return {
//       id: order.id,
//       name: firstItem?.productName || 'Order Item',
//       image: image,
//       subText: `${order.items.length} item${order.items.length !== 1 ? 's' : ''}`,
//       orderNumber: order.orderNumber,
//       customer: userName,
//       date: format(new Date(order.createdAt), 'MMM dd, yyyy'),
//       payment: `Rs ${order.totalAmount}`,
//       paymentStatus: order.paymentStatus,
//       status: order.status.charAt(0).toUpperCase() + order.status.slice(1),
//       orderStatus: order.status,
//       items: order.items,
//     };
//   });

//   // Use the orderSummary data from Redux state for stats
//   // instead of calculating from current page data
//   const stats = [
//     {
//       id: 1,
//       title: 'Total Revenue',
//       value: isLoading ? 'Loading...' : `Rs ${orderSummary?.totalRevenue?.toLocaleString() || 0}`,
//       icon: <TiTick className="w-6 h-6 text-white" />,
//       bgColor: 'bg-primary',
//     },
//     {
//       id: 2,
//       title: 'Completed Orders',
//       value: isLoading ? 'Loading...' : `${orderSummary?.deliveredOrders || 0}`,
//       icon: <TiTick className="w-6 h-6 text-white" />,
//       bgColor: 'bg-primary',
//     },
//     {
//       id: 3,
//       title: 'Pending Orders',
//       value: isLoading ? 'Loading...' : `${orderSummary?.pendingOrders || 0}`,
//       icon: <RxCrossCircled className="w-6 h-6 text-white" />,
//       bgColor: 'bg-primary',
//     },
//     {
//       id: 4,
//       title: 'Cancelled Orders',
//       value: isLoading ? 'Loading...' : `${orderSummary?.cancelledOrders || 0}`,
//       icon: <HiArrowUturnRight className="w-6 h-6 text-white" />,
//       bgColor: 'bg-primary',
//     },
//   ];

//   // Handle date range change
//   useEffect(() => {
//     if (hookDateRange.from && hookDateRange.to) {
//       applyFilters({
//         startDate: hookDateRange.from,
//         endDate: hookDateRange.to,
//       });
//     }
//   }, [hookDateRange.from, hookDateRange.to]);

//   // Initial load
//   useEffect(() => {
//     loadOrders();
//     loadOrderSummary(); // Ensure summary is loaded initially
//   }, []);

//   // Handle order view/edit
//   const handleViewOrder = (order: FormattedOrder) => {
//     // Navigate to order detail page
//     window.location.href = `/admin/orders/${order.id}`;
//   };

//   // Handle order deletion (cancellation)
//   const handleCancelOrder = async (order: FormattedOrder) => {
//     const confirmed = window.confirm(
//       'Are you sure you want to cancel this order?'
//     );

//     if (confirmed) {
//       setUpdatingOrderId(order.id);
//       const success = await handleUpdateStatus(
//         order.id,
//         'cancelled',
//         'Cancelled by admin'
//       );
//       setUpdatingOrderId(null);

//       if (success) {
//         toast.success('Order cancelled successfully');
//         loadOrders(); // Refresh the list
//       }
//     }
//   };

//   // Handle order status update
//   const handleOrderStatusUpdate = async (orderId: string, status: string) => {
//     setUpdatingOrderId(orderId);
//     try {
//       await handleUpdateStatus(
//         orderId,
//         status,
//         `Status updated to ${status} by admin`
//       );
//     } catch (error) {
//       toast.error('An error occurred while updating order status');
//       console.error('Order status update error:', error);
//     } finally {
//       setUpdatingOrderId(null);
//     }
//   };

//   // Handle payment status update
//   const handlePaymentStatusUpdate = async (orderId: string, status: string) => {
//     setUpdatingOrderId(orderId);
//     try {
//       const success = await handleUpdatePayment(
//         orderId,
//         status as 'pending' | 'paid' | 'failed' | 'refunded'
//       );
//     } catch (error) {
//       toast.error('An error occurred while updating payment status');
//       console.error('Payment status update error:', error);
//     } finally {
//       setUpdatingOrderId(null);
//     }
//   };

//   // Handle search
//   const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setSearch(e.target.value);
//   };

//   const handleSearchSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
//     applyFilters({ search });
//   };

//   // Adapt the date range for the DateRangePicker component
//   const pickerDateRange = adaptDateRange(hookDateRange);
//   const handleDateRangeChange = adaptOnDateRangeChange(setHookDateRange);

//   return (
//     <Layout>
//       <div className="p-6 bg-gray-50 max-h-screen">
//         <div className="py-2">
//           <Breadcrumbs items={BreadcrumbItems} />
//         </div>
//         <div className="flex mt-3 mb-6">
//           <h1 className="sm:text-2xl text-lg font-bold">Orders</h1>
//         </div>

//         {/* Search and Filters */}
//         <div className="mb-4">
//           <form
//             onSubmit={handleSearchSubmit}
//             className="flex items-center gap-2"
//           >
//             <input
//               type="text"
//               placeholder="Search by order number"
//               value={search}
//               onChange={handleSearch}
//               className="border p-2 rounded-md flex-grow focus:outline-none"
//             />
//             <button
//               type="submit"
//               className="bg-primary text-white px-4 py-2 rounded-md"
//             >
//               Search
//             </button>
//           </form>
//         </div>

//         <div className="flex justify-between sm:flex-row flex-col sm:items-center items-start">
//           <div className="py-3">
//             <DateRangePicker
//               dateRange={pickerDateRange}
//               onDateRangeChange={handleDateRangeChange}
//               className=""
//               buttonClassName="!py-2"
//             />
//           </div>
//           <div>
//             <ExportPdf />
//           </div>
//         </div>

//         <div className="my-4">
//           <StatsCards stats={stats} className="md:grid-cols-4" />
//         </div>

//         <div className="pb-20">
//           <div className="bg-white rounded-lg shadow-sm p-3">
//             <h2 className="text-lg font-bold mb-4">Orders</h2>
//             <DynamicTable
//               data={formattedOrders}
//               columns={columns}
//               isLoading={isLoading}
//               isRowLoading={updatingOrderId || undefined}
//               itemsPerPage={pagination.pageSize}
//               totalItems={pagination.totalItems}
//               totalPages={pagination.totalPages}
//               currentPage={pagination.currentPage}
//               onPageChange={handlePageChange}
//               onItemsPerPageChange={handleItemsPerPageChange}
//               onEdit={handleViewOrder}
//               onDelete={handleCancelOrder}
//               onUpdateOrderStatus={handleOrderStatusUpdate}
//               onUpdatePaymentStatus={handlePaymentStatusUpdate}
//               showCheckbox={false}
//               emptyMessage="No orders found. Adjust your filters or try again later."
//             />
//           </div>
//         </div>
//       </div>
//     </Layout>
//   );
// };

// export default Orders;
