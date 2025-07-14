'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Layout from '@/components/admin/layout/Layout';
import Breadcrumbs from '@/components/admin/BreadCrumbs';
import StatusUpdateDropdown from '@/components/admin/StatusUpdateDropdown';
import { format } from 'date-fns';
import toast from 'react-hot-toast';
import { Order, OrderHistory } from '@/types/orderTypes';
import { useOrder } from '@/hooks/order.hooks';
import { useAppDispatch } from '@/redux/store/store';
import { updateOrderStatus, updateOrderPaymentStatus } from '@/redux/thunk/order.thunk';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return `Rs ${amount.toLocaleString()}`;
};

const OrderDetail = () => {
  const router = useRouter();
  const { orderId } = router.query;
  const dispatch = useAppDispatch();
  
  // State for the order
  const [order, setOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Order hooks
  const { getOrderById } = useOrder();

  // Breadcrumbs configuration
  const breadcrumbItems: BreadcrumbItem[] = [
    { label: 'Dashboard', href: '/admin' },
    { label: 'Orders', href: '/admin/orders' },
    { label: (orderId as string) || 'Order Details', href: '#', active: true }
  ];

  // Fetch order details
  useEffect(() => {
    const fetchOrderDetails = async () => {
      if (!orderId) return;
      
      setIsLoading(true);
      try {
        const orderData = await getOrderById(orderId as string);
        setOrder(orderData);
      } catch (err) {
        console.error('Error fetching order:', err);
        setError('Failed to load order details');
        toast.error('Failed to load order details');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrderDetails();
  }, [orderId, getOrderById]);

  // Handle order status update
  const handleOrderStatusUpdate = async (orderId: string, status: string) => {
    setIsUpdating(true);
    try {
      // Add a comment with reason for the update
      const comment = `Status updated to ${status} by admin`;
      
      // Dispatch the update action
      const result = await dispatch(updateOrderStatus({ 
        orderId, 
        status, 
        comment 
      })).unwrap();
      
      // Update local state with the new order data
      setOrder(result);
      toast.success(`Order status updated to ${status}`);
      return true;
    } catch (error) {
      console.error('Failed to update order status:', error);
      toast.error('Failed to update order status');
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle payment status update
  const handlePaymentStatusUpdate = async (orderId: string, status: string) => {
    setIsUpdating(true);
    try {
      // Dispatch the update action
      const result = await dispatch(updateOrderPaymentStatus({ 
        orderId, 
        paymentStatus: status as 'pending' | 'paid' | 'failed' | 'refunded'
      })).unwrap();
      
      // Update local state with the new order data
      setOrder(result);
      toast.success(`Payment status updated to ${status}`);
      return true;
    } catch (error) {
      console.error('Failed to update payment status:', error);
      toast.error('Failed to update payment status');
      return false;
    } finally {
      setIsUpdating(false);
    }
  };

  // Handle status update for both order and payment statuses
  const handleStatusUpdate = async (orderId: string, status: string, type: 'orderStatus' | 'paymentStatus') => {
    if (type === 'orderStatus') {
      return handleOrderStatusUpdate(orderId, status);
    } else {
      return handlePaymentStatusUpdate(orderId, status);
    }
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="p-6">
          <div className="flex justify-center items-center h-64">
            <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !order) {
    return (
      <Layout>
        <div className="p-6">
          <div className="bg-red-50 p-4 rounded-md">
            <p className="text-red-700">{error || 'Order not found'}</p>
            <button
              className="mt-4 bg-primary text-white px-4 py-2 rounded-md"
              onClick={() => router.push('/admin/orders')}
            >
              Back to Orders
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="p-6 bg-gray-50">
        <Breadcrumbs items={breadcrumbItems} />
        
        <div className="flex justify-between items-center my-6">
          <h1 className="text-2xl font-bold">Order #{order.orderNumber}</h1>
          <div className="flex space-x-4">
            <button
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
              onClick={() => router.push('/admin/orders')}
            >
              Back to Orders
            </button>
          </div>
        </div>
        
        {/* Order Status Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Order Status</h2>
            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-500 mb-1">Current Status</p>
                <StatusUpdateDropdown
                  currentStatus={order.status}
                  type="orderStatus"
                  orderId={order.id}
                  onUpdate={handleStatusUpdate as any}
                  disabled={isUpdating}
                />
              </div>
              <div>
                <p className="text-gray-500 mb-1">Payment Status</p>
                <StatusUpdateDropdown
                  currentStatus={order.paymentStatus}
                  type="paymentStatus"
                  orderId={order.id}
                  onUpdate={handleStatusUpdate as any}
                  disabled={isUpdating}
                />
              </div>
              <div>
                <p className="text-gray-500 mb-1">Order Date</p>
                <p className="font-medium">{format(new Date(order.createdAt), 'MMM dd, yyyy')}</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-gray-500 mb-1">Payment Method</p>
                <p className="font-medium capitalize">{order.paymentMethod}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Transaction ID</p>
                <p className="font-medium">{order.paymentTransactionId || 'N/A'}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Subtotal</p>
                <p className="font-medium">{formatCurrency(order.subtotalAmount)}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Shipping</p>
                <p className="font-medium">{formatCurrency(order.shippingAmount)}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Discount</p>
                <p className="font-medium">{formatCurrency(order.discountAmount)}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Total</p>
                <p className="font-medium text-primary text-lg">{formatCurrency(order.totalAmount)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Customer Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
            <div>
              <p className="text-gray-500 mb-1">Name</p>
              <p className="font-medium">
                {order.user 
                  ? `${order.user.firstName || ''} ${order.user.lastName || ''}`.trim() 
                  : 'Guest User'}
              </p>
              
              {order.checkoutSession?.contactInformation && (
                <>
                  <p className="text-gray-500 mb-1 mt-3">Email</p>
                  <p className="font-medium">{order.checkoutSession.contactInformation.email}</p>
                  
                  <p className="text-gray-500 mb-1 mt-3">Phone</p>
                  <p className="font-medium">{order.checkoutSession.contactInformation.mobileNumber}</p>
                </>
              )}
            </div>
          </div>
          
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold mb-4">Delivery Information</h2>
            {order.checkoutSession?.deliveryInformation ? (
              <div>
                <p className="text-gray-500 mb-1">Delivery Address</p>
                <p className="font-medium">{order.checkoutSession.deliveryInformation.name}</p>
                <p className="font-medium">{order.checkoutSession.deliveryInformation.address}</p>
                <p className="font-medium">
                  {order.checkoutSession.deliveryInformation.city}, 
                  {order.checkoutSession.deliveryInformation.postalCode &&
                    ` ${order.checkoutSession.deliveryInformation.postalCode},`} 
                  {order.checkoutSession.deliveryInformation.country}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">No delivery information available</p>
            )}
          </div>
        </div>
        
        {/* Order Items */}
        <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <h2 className="text-lg font-semibold mb-4">Order Items</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {order.items.map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-10 w-10 flex-shrink-0">
                          <img className="h-10 w-10 rounded-full object-cover" src={item.productImage || '/images/placeholder.png'} alt={item.productName} />
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">{item.productName}</div>
                          {item.product && (
                            <div className="text-sm text-gray-500">{item.product.brand || ''}</div>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(item.price)}
                      {item.originalPrice && item.originalPrice > item.price && (
                        <span className="line-through ml-2 text-gray-400">
                          {formatCurrency(item.originalPrice)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {item.quantity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {formatCurrency(item.totalPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Order History */}
        {order.history && order.history.length > 0 && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Order History</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead>
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Comment</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">By</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {order.history.map((historyItem: OrderHistory) => (
                    <tr key={historyItem.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {format(new Date(historyItem.createdAt), 'MMM dd, yyyy HH:mm')}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                          ${historyItem.status.includes('cancelled') || historyItem.status.includes('failed') 
                            ? 'bg-red-100 text-red-800' 
                            : historyItem.status.includes('delivered') || historyItem.status.includes('paid') 
                              ? 'bg-green-100 text-green-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                          {historyItem.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {historyItem.comment}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {historyItem.createdBy || 'System'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {/* Notes */}
        {order.notes && (
          <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
            <h2 className="text-lg font-semibold mb-4">Order Notes</h2>
            <p className="text-gray-700">{order.notes}</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderDetail;