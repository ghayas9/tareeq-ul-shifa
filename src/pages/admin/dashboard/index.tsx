'use client';

import { useEffect, useState } from 'react';
import DynamicTable from '@/components/admin/Table';
import DashboardCards from '@/components/admin/dashboardCards';
import { Calender } from '@/components/icons/Icons';
import { SalesByCategoryChart } from '@/components/admin/chart/SalesByCategoryChart';
import TotalSalesChart from '@/components/admin/chart/LineChart';
import Layout from '@/components/admin/layout/Layout';
import Breadcrumb from '@/components/common/BreadCrumb';
import { FaChartBar, FaDollarSign, FaUsers } from 'react-icons/fa';
import { useDashboard } from '@/hooks/dashboard.hooks';
import PageLoader from '@/components/common/PageLoader';
import { useDateRange } from '@/hooks/dashboardDateRangeHooks';
import { EarningsRevenueChart } from '@/components/admin/chart/EarningsRevenueChart';
import Breadcrumbs from '@/components/admin/BreadCrumbs';

// Column configuration for top products table
const columns = [
  {
    header: 'Products',
    key: 'image',
    type: 'image',
  },
  {
    header: 'Category',
    key: 'categoryName',
  },
  {
    header: 'Total Sales',
    key: 'totalSales',
  },
  {
    header: 'Revenue',
    key: 'totalRevenue',
    prefix: 'Rs ',
  },
  {
    header: 'Stock',
    key: 'stockStatus',
    type: 'stock',
  },
];

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

const BreadcrumbItems: BreadcrumbItem[] = [
  { label: 'Admin', href: '/admin/dashboard' },
  { label: 'Dashboard', href: '/admin/dashboard', active: true },
];

export default function Dashboard() {
  // Get dashboard data and actions from custom hook
  const {
    dashboardData,
    summary,
    topProducts,
    isLoading,
    error,
    graphData,
    fetchDashboardData,
    fetchGraphData,
  } = useDashboard();
  console.log(
    graphData?.revenueChart?.datasets?.revenue,
    'total sales',
    graphData?.revenueChart?.labels,
    'labels'
  );
  let dateRange;
  try {
    [dateRange] = useDateRange();
  } catch (error) {
    console.error('Error in useDateRange hook:', error);
    // Provide a fallback if the hook fails
    dateRange = {
      startDate: new Date(new Date().setDate(new Date().getDate() - 30)),
      endDate: new Date(),
    };
  }

  // Load dashboard data on initial render
  useEffect(() => {
    fetchDashboardData();
    fetchGraphData();
  }, []);

  // Format top products data for the table
  const formatTopProductsForTable = () => {
    if (!topProducts?.length) return [];

    return topProducts.map((product) => ({
      id: product.id,
      name: product.name,
      image: product.image || '/product-placeholder.jpg',
      categoryName: product.categoryName,
      totalSales: product.totalSales,
      totalRevenue: product.totalRevenue.toFixed(2),
      stockStatus:
        product.stock > 10
          ? 'In Stock'
          : product.stock > 0
            ? 'Low Inventory'
            : 'Out of Stock',
      stockCount: product.stock,
    }));
  };

  // Create cards data from summary
  const createCardData = () => {
    if (!summary) return [];

    return [
      {
        title: 'Total Revenue',
        amount: `Rs ${summary.totalRevenue.toLocaleString()}`,
        icon: <FaDollarSign size={24} />,
        bgColor: 'bg-green-600',
        textColor: 'text-green-500',
        change: ' 1.56%',
      },
      {
        title: 'Total Orders',
        amount: summary.totalOrders.toLocaleString(),
        icon: <FaChartBar size={24} />,
        bgColor: 'bg-blue-600',
        textColor: 'text-blue-500',
        change: ' 0.8%',
      },
      {
        title: 'Active Products',
        amount: summary.totalProducts.toLocaleString(),
        icon: <FaUsers size={24} />,
        bgColor: 'bg-purple-600',
        textColor: 'text-purple-500',
        change: ' 2.1%',
      },
    ];
  };

  if (isLoading && !dashboardData) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <PageLoader />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-screen">
          <div className="bg-red-100 p-4 rounded-lg border border-red-300 text-red-700">
            <h3 className="text-lg font-medium mb-2">
              Error Loading Dashboard
            </h3>
            <p>{error}</p>
            <button
              onClick={() => fetchDashboardData()}
              className="mt-3 bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
            >
              Retry
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="bg-gray-50 p-2">
        <Breadcrumbs items={BreadcrumbItems} />
        <div className="w-full px-2 mt-2">
          <DashboardCards cardData={createCardData()} />

          <div className="w-full px-2 flex flex-col justify-center items-center mx-auto bg-white rounded-lg shadow pt-4 pb-8">
            <div className="flex w-full justify-between py-4 items-center px-4">
              <h1 className="font-robotoSlab md:text-[28px] text-xl font-medium">
                Total Sales
              </h1>
              {/* Period dropdown can be added here */}
            </div>
            <TotalSalesChart
              data={graphData?.revenueChart?.datasets?.revenue || []}
              labels={graphData?.revenueChart?.labels || []}
            />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 my-10">
            {/* Earnings Revenue */}
            <div className="bg-white p-4 rounded-lg shadow col-span-1 lg:col-span-2">
              <div className="flex items-center justify-between py-4">
                <h1 className="font-robotoSlab md:text-[28px] text-xl font-medium">
                  Earnings Revenue
                </h1>
                {/* Period dropdown can be added here */}
              </div>
              <EarningsRevenueChart revenueData={graphData?.revenueChart} />
            </div>

            {/* Sales by Category */}
            <div className="bg-white p-6 rounded-lg shadow col-span-1 flex flex-col justify-center">
              <div className="mb-4">
                <h1 className="font-robotoSlab md:text-[28px] text-xl font-medium">
                  Sales by Category
                </h1>
              </div>
              <div className="space-y-2">
              
                <p className="text-base font-robotoSlab font-medium">
                  Total Rs {summary?.totalRevenue.toLocaleString() || '0'}
                </p>
              </div>
              <SalesByCategoryChart
                data={graphData?.categoryChart?.data || []}
                labels={graphData?.categoryChart?.labels || []}
                colors={graphData?.categoryChart?.colors || []}
                total={graphData?.categoryChart?.total}
              />
            </div>
          </div>
        </div>

        <div className="w-full flex flex-col bg-white shadow-md mb-28">
          <div className="flex items-center justify-between p-4">
            <h2 className="md:text-[28px] text-xl font-medium font-robotoSlab">
              Top Selling Products
            </h2>
            <p className="text-primary text-base font-robotoSlab font-medium border-b-primary border-b inline-block">
              View All
            </p>
          </div>
          <DynamicTable
            data={formatTopProductsForTable()}
            columns={columns as any}
            itemsPerPage={5}
            showCheckbox={false}
            isLoading={isLoading}
            emptyMessage="No products data available"
          />
        </div>
      </div>
    </Layout>
  );
}
