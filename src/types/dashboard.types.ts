// src/types/dashboardTypes.ts
export interface DashboardSummary {
    totalRevenue: number;
    pendingRevenue: number;
    totalOrders: number;
    pendingOrders: number;
    processingOrders: number;
    shippedOrders: number;
    deliveredOrders: number;
    cancelledOrders: number;
    refundedOrders: number;
    totalProducts: number;
    lowStockProducts: number;
    outOfStockProducts: number;
    averageOrderValue: number;
  }
  
  export interface SalesStatsByPeriod {
    period: string;
    revenue: number;
    orders: number;
    items: number;
  }
  
  export interface TopSellingProduct {
    id: string;
    name: string;
    brand: string;
    price: number;
    originalPrice: number | null;
    image: string | null;
    categoryId: string;
    categoryName: string;
    totalSales: number;
    totalRevenue: number;
    pendingRevenue: number;
    stock: number;
  }
  
  export interface CategorySales {
    categoryId: string;
    categoryName: string;
    totalSales: number;
    totalRevenue: number;
    productCount: number;
  }
  
  export interface PaymentMethodStats {
    method: string;
    count: number;
    revenue: number;
    percentage: number;
  }
  
  export interface RevenueChartData {
    labels: string[];
    datasets: {
      revenue: number[];
      orders: number[];
    };
    totals: {
      revenue: number;
      orders: number;
    };
  }
  
  export interface CategoryChartData {
    labels: string[];
    data: number[];
    colors: string[];
    total: number;
  }
  
  export interface ProductPerformanceData {
    labels: string[];
    sales: number[];
    revenue: number[];
    inStock: boolean[];
    total: {
      sales: number;
      revenue: number;
    };
  }
  
  export interface OrderStatusData {
    labels: string[];
    data: number[];
    colors: string[];
    total: number;
  }
  
  export interface PaymentMethodData {
    labels: string[];
    data: number[];
    colors: string[];
    total: number;
  }
  
  export interface DashboardGraphData {
    revenueChart: RevenueChartData;
    categoryChart: CategoryChartData;
    productPerformance: ProductPerformanceData;
    orderStatus: OrderStatusData;
    paymentMethods: PaymentMethodData;
  }
  
  export interface DashboardData {
    summary: DashboardSummary;
    monthlySales: SalesStatsByPeriod[];
    topProducts: TopSellingProduct[];
    categorySales: CategorySales[];
    paymentStats: PaymentMethodStats[];
    recentOrders: any[]; // This should be typed according to your Order model
  }
  
  export interface DashboardQueryParams {
    period?: 'daily' | 'weekly' | 'monthly' | 'yearly';
    limit?: number;
    startDate?: string;
    endDate?: string;
  }
  
  export interface DashboardResponse {
    success: boolean;
    data?: any;
    message?: string;
  }
  
  export interface DashboardState {
    dashboardData: DashboardData | null;
    summary: DashboardSummary | null;
    salesStats: SalesStatsByPeriod[];
    topProducts: TopSellingProduct[];
    categorySales: CategorySales[];
    paymentStats: PaymentMethodStats[];
    recentOrders: any[];
    graphData: DashboardGraphData | null;
    revenueChart: RevenueChartData | null;
    categoryChart: CategoryChartData | null;
    productPerformance: ProductPerformanceData | null;
    orderStatus: OrderStatusData | null;
    paymentMethods: PaymentMethodData | null;
    isLoading: boolean;
    error: string | null;
    currentPeriod: 'daily' | 'weekly' | 'monthly' | 'yearly';
    startDate: string | null;
    endDate: string | null;
  }