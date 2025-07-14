'use client';
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import Layout from '@/components/layout/Layout';
import { FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { useOrder } from '@/hooks/order.hooks';
import { useCart } from '@/hooks/cart.hook';

const OrderSuccessPage: React.FC = () => {
  const router = useRouter();
  const { getCart } = useCart();
  const { id: orderId } = router.query;
  const { currentOrder, getOrderById, isLoading } = useOrder();
  const [mounted, setMounted] = useState(false);
  const [clientOrderId, setClientOrderId] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
    if (typeof orderId === 'string') {
      setClientOrderId(orderId);
    }
  }, [orderId]);

  useEffect(() => {
    if (clientOrderId) {
      getOrderById(clientOrderId);
      getCart();
    }
  }, [clientOrderId]);

  if (!mounted) return null;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-md p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-green-600 text-3xl" />
          </div>

          <h1 className="text-2xl font-semibold mb-4">
            Order Placed Successfully!
          </h1>

          <p className="text-gray-600 mb-6">
            Thank you for your purchase. We've received your order and will
            begin processing it right away.
          </p>

          {currentOrder && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6 text-left">
              <h2 className="text-lg font-medium mb-3">Order Summary</h2>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order Number:</span>
                  <span className="font-medium">
                    #{currentOrder?.orderNumber}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date:</span>
                  <span>
                    {new Date(currentOrder?.createdAt).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total Amount:</span>
                  <span className="font-medium">
                    Rs {Number(currentOrder.totalAmount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment Method:</span>
                  <span>{currentOrder.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status:</span>
                  <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-xs">
                    {currentOrder.status.charAt(0).toUpperCase() +
                      currentOrder.status.slice(1)}
                  </span>
                </div>
              </div>
            </div>
          )}

          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button
              // href={`/orders/${clientOrderId || ""}`}
              onClick={() => router.push(`/orders/${clientOrderId}`)}
              className="bg-primary text-white py-3 px-6 rounded-lg flex items-center justify-center hover:bg-primary/90"
            >
              View Order Details
            </button>
            <Link
              href="/"
              className="border border-primary text-primary py-3 px-6 rounded-lg flex items-center justify-center hover:bg-primary/5"
            >
              Continue Shopping <FaArrowRight className="ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderSuccessPage;
