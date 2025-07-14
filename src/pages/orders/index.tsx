'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { useOrder } from '@/hooks/order.hooks';
import { OrderListSkeleton } from '@/components/orders/OrderSkeleton';

const formatCurrency = (value: any): string => {
  const num =
    typeof value === 'number'
      ? value
      : typeof value === 'string'
        ? parseFloat(value)
        : NaN;
  return isNaN(num) ? '0.00' : num.toFixed(2);
};

const OrdersPage: React.FC = () => {
  const { isLoading, orders, getOrders, cancelOrder } = useOrder();
  const router = useRouter();
  const [mounted, setMounted] = React.useState(false);
  console.log(orders, 'ordersitems');
  useEffect(() => {
    getOrders();
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const getStatusBadgeClass = (status: string = '') => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // const handleCancelOrder = async (order:any) => {
  //   console.log(order,"cancelorder")
  //   if (window.confirm('Are you sure you want to cancel this order?')) {
  //     try {
  //       // Use the checkout session ID stored in the order or fallback to order ID
  //       const response = await cancelOrder(order.checkoutSessionId);
  //       console.log("Cancel Order Response:", response);
  //     } catch (error) {
  //       toast.error('Failed to cancel order');
  //     }
  //   }
  // };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <OrderListSkeleton />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-semibold mb-6">My Orders</h1>

        {!orders || orders.length === 0 ? (
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-medium mb-4">
              You haven't placed any orders yet
            </h2>
            <p className="text-gray-500 mb-6">
              Once you place an order, it will appear here
            </p>
            <Link
              href="/"
              className="bg-primary text-white py-2 px-6 rounded-lg inline-block"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full min-w-[650px]">
                <thead className="bg-primary text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">Order</th>
                    <th className="px-4 py-3 text-left">Date</th>
                    <th className="px-4 py-3 text-left">Status</th>
                    <th className="px-4 py-3 text-left">Total</th>
                    <th className="px-4 py-3 text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr key={order.id} className="border-b">
                      <td className="px-4 py-3 font-medium">
                        #{order.orderNumber || 'N/A'}
                      </td>
                      <td className="px-4 py-3">
                        {order.createdAt
                          ? new Date(order.createdAt).toLocaleDateString()
                          : 'N/A'}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${getStatusBadgeClass(order.status)}`}
                        >
                          {order.status
                            ? order.status.charAt(0).toUpperCase() +
                              order.status.slice(1)
                            : 'N/A'}
                        </span>
                      </td>
                      <td className="px-4 py-3 font-medium">
                        Rs {formatCurrency(order.totalAmount)}
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button
                            onClick={() => router.push(`/orders/${order.id}`)}
                            className="bg-primary text-white py-2 px-4 rounded-lg text-sm hover:bg-primary/90"
                          >
                            View
                          </button>
                          {/* {order.status === 'pending' && (
                            <button
                              onClick={() => handleCancelOrder(order)}
                              className="bg-red-100 text-red-800 py-2 px-4 rounded-lg text-sm hover:bg-red-200"
                            >
                              Cancel
                            </button>
                          )} */}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrdersPage;
