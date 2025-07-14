"use client"
import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { useOrder } from '@/hooks/order.hooks';
import { OrderDetailSkeleton } from '@/components/orders/OrderSkeleton';
import { FaFileDownload, FaPrint } from 'react-icons/fa';
import toast from 'react-hot-toast';

// Import the order components
import OrderStatusBadge from '@/components/orders/OrderStatusBadge';
import OrderTimeline from '@/components/orders/OrderTimeLine';
import OrderSummary from '@/components/orders/OrderSummary';
import OrderItemsTable from '@/components/orders/OrderItemsTable';
import ShippingInfoCard from '@/components/orders/ShippingInfoCard';

const OrderDetailPage: React.FC = () => {
  const { currentOrder, getOrderById, cancelOrder, isLoading } =
    useOrder() as any;
  const [mounted, setMounted] = React.useState(false);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted && id && typeof id === 'string') {
      getOrderById(id);
    }
  }, [id, mounted]);

  useEffect(() => {
    if (currentOrder && currentOrder.items) {
      console.log(currentOrder.items, 'currentOrder items');
    }
  }, [currentOrder]);

  if (!mounted) return null;

  const handleCancelOrder = async () => {
    if (!currentOrder) return;

    if (window.confirm('Are you sure you want to cancel this order?')) {
      try {
        await cancelOrder(currentOrder.id);
        toast.success('Order cancelled successfully');
      } catch (error) {
        toast.error('Failed to cancel order');
      }
    }
  };

  const handlePrintInvoice = () => {
    window.print();
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <OrderDetailSkeleton />
        </div>
      </Layout>
    );
  }

  if (!currentOrder) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-8">
          <div className="bg-white rounded-lg shadow-md p-8 text-center">
            <h2 className="text-xl font-medium mb-4">Order not found</h2>
            <p className="text-gray-500 mb-6">
              The order you're looking for doesn't exist or you don't have
              permission to view it.
            </p>
            <Link
              href="/orders"
              className="bg-primary text-white py-2 px-6 rounded-lg inline-block"
            >
              Back to Orders
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  // Create shipping address object for the components
  const deliveryInfo = currentOrder.checkoutSession?.deliveryInformation || {};
  const contactInfo = currentOrder.checkoutSession?.contactInformation || {};

  // Create shipping address object for the components
  const shippingAddress = {
    name: `${deliveryInfo.firstName || ''} ${deliveryInfo.lastName || ''}`,
    address: deliveryInfo.address || '',
    city: deliveryInfo.city || '',
    postalCode: deliveryInfo.postalCode || '',
    country: deliveryInfo.country || 'Pakistan',
    phone: deliveryInfo.phoneNumber || contactInfo.mobileNumber || '',
  };
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Order Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-semibold">
                Order #{currentOrder.orderNumber}
              </h1>
              <OrderStatusBadge status={currentOrder.status} />
            </div>
            <p className="text-gray-500 mt-1">
              Placed on {new Date(currentOrder.createdAt).toLocaleDateString()}{' '}
              at {new Date(currentOrder.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <div className="flex gap-2 print:hidden">
            {/* {currentOrder.status === 'pending' && (
              <button
                onClick={handleCancelOrder}
                className="border border-red-300 text-red-700 py-2 px-4 rounded-lg text-sm hover:bg-red-50"
              >
                Cancel Order
              </button>
            )} */}
            {/* <button
              onClick={handlePrintInvoice}
              className="bg-gray-100 text-gray-700 py-2 px-4 rounded-lg text-sm hover:bg-gray-200 flex items-center"
            >
              <FaPrint className="mr-2" /> Print Invoice
            </button>
            <button
              onClick={handlePrintInvoice} 
              className="bg-primary text-white py-2 px-4 rounded-lg text-sm hover:bg-primary/90 flex items-center"
            >
              <FaFileDownload className="mr-2" /> Download
            </button> */}
          </div>
        </div>
        <OrderTimeline status={currentOrder.status} className="print:hidden" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <ShippingInfoCard shippingAddress={shippingAddress} />
          <OrderSummary order={currentOrder} />
        </div>
        <OrderItemsTable items={currentOrder.items || []} className="mb-8" />
        <div className="mt-8 flex justify-center print:hidden">
          <Link
            href="/orders"
            className="bg-gray-100 text-gray-700 py-2 px-6 rounded-lg hover:bg-gray-200"
          >
            Back to Orders
          </Link>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetailPage;
