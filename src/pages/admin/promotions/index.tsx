'use client';
import Breadcrumbs from '@/components/admin/BreadCrumbs';
import ExportPdf from '@/components/admin/ExpordPdf';
import Layout from '@/components/admin/layout/Layout';
import StatsCards from '@/components/admin/StatusCards';
import React, { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import TrafficTrendsChart from '@/components/admin/chart/TrafficTrendsChart';
import { IoMdPerson, IoIosPersonAdd } from 'react-icons/io';
import { FaUserGroup } from 'react-icons/fa6';
import { FaDollarSign } from 'react-icons/fa6';
import { MdOutlineHighlight } from 'react-icons/md';

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

const BreadcrumbItems: BreadcrumbItem[] = [
  { label: 'All Pages', href: '/' },
  { label: 'Promotions', href: '/admin/promotions', active: true },
  { label: 'Track Promotions', href: '/admin/promotions', active: true },
];

const stats = [
  {
    id: 1,
    title: 'Total Revenue',
    value: '2,345',
    icon: <FaDollarSign className="w-6 h-6 text-white" />,
    bgColor: 'bg-primary',
  },
  {
    id: 2,
    title: 'Active Campaigns',
    value: '4,445',
    icon: <MdOutlineHighlight className="w-6 h-6 rotate-90 text-white" />,
    bgColor: 'bg-primary',
  },
  {
    id: 3,
    title: 'Total Website Visitors',
    value: '5,345',
    icon: <FaUserGroup className="w-6 h-6 text-white" />,
    bgColor: 'bg-primary',
  },
];
const Customers = () => {
  return (
    <Layout>
      <div className="p-6 bg-gray-50">
        <div className="py-2">
          <Breadcrumbs items={BreadcrumbItems} />
        </div>
        <div className="flex justify-between mt-3 mb-6">
          <h1 className="sm:text-2xl text-lg font-bold">Promotions</h1>
          <div className="pt-5">
            <ExportPdf />
          </div>
        </div>
        <div className="my-4">
          <StatsCards stats={stats} />
        </div>
        <div className="pb-20">
          <div className="bg-white rounded-lg shadow-sm p-3">
            <h2 className="text-lg font-bold mb-4">Traffic Trends</h2>
            <TrafficTrendsChart />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Customers;
