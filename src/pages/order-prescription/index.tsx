import Breadcrumb from '@/components/common/BreadCrumb';
import Layout from '@/components/layout/Layout';
import Order from '@/components/Order';
import React from 'react';

const OrderPrescription = () => {
  return (
    <Layout>
      <div className="px-4 py-5">
        <Breadcrumb />
        <div className="mt-3">
          <Order />
        </div>
      </div>
    </Layout>
  );
};

export default OrderPrescription;
