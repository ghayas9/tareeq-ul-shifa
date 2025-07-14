'use client';
import AgeSegmentation from '@/components/admin/AgeSegmentation';
import Breadcrumbs from '@/components/admin/BreadCrumbs';
import CustomerGrowth from '@/components/admin/CustomerGrowth';
import ExportPdf from '@/components/admin/ExpordPdf';
import GenderSegmentation from '@/components/admin/GenderSegmentation';
import Layout from '@/components/admin/layout/Layout';
import RetentionRate from '@/components/admin/RetentationRate';
import StatsCards from '@/components/admin/StatusCards';
import React from 'react';
import { IoMdPerson, IoIosPersonAdd } from 'react-icons/io';
import { FaUserGroup } from 'react-icons/fa6';

const stats = [
  {
    id: 1,
    title: 'Total Customers',
    value: '2,345',
    icon: <IoMdPerson className="w-6 h-6 text-white" />,
    bgColor: 'bg-primary',
  },
  {
    id: 2,
    title: 'Active Customers',
    value: '4,445',
    icon: <IoIosPersonAdd className="w-6 h-6 text-white" />,
    bgColor: 'bg-primary',
  },
  {
    id: 3,
    title: 'Customer Growth',
    value: '5,345',
    icon: <FaUserGroup className="w-6 h-6 text-white" />,
    bgColor: 'bg-primary',
  },
];

interface BreadcrumbItem {
  label: string;
  href: string;
  active?: boolean;
}

const breadcrumbItems: BreadcrumbItem[] = [
  { label: 'All Pages', href: '/' },
  { label: 'Customers', href: '/admin/customers', active: true },
];

const Customers = () => {
  return (
    <Layout>
      <div className="p-6 bg-gray-50">
        <div className="py-2">
          <Breadcrumbs items={breadcrumbItems} />
        </div>
        <div className="flex justify-between mt-3 mb-6">
          <h1 className="sm:text-2xl text-lg font-bold">Customers</h1>
          <div className="pt-5">
            <ExportPdf />
          </div>
        </div>

        {/* Stats Cards */}
        <div className="my-4">
          <StatsCards stats={stats} />
        </div>
        <RetentionRate />
        <CustomerGrowth />
        {/* Demographic segmentation by Age */}
        <AgeSegmentation />

        {/* Segmentation by Gender */}
        <GenderSegmentation />
      </div>
    </Layout>
  );
};

export default Customers;
