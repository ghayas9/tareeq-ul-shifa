import Breadcrumb from '@/components/common/BreadCrumb';
import Layout from '@/components/layout/Layout';
import OrderStatus from '@/components/OrderStatus';
import Image from 'next/image';
import React from 'react';

const OrderStatuses = () => {
  return (
    <Layout>
      <div className="px-4 py-4">
        <Breadcrumb />
        <div className="relative mb-6">
          <OrderStatus />
          <div className="">
            <Image
              src="/images/bggradient.png"
              alt="bggradient"
              width={150}
              height={100}
              className="absolute -bottom-16 -left-[75px]"
            />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderStatuses;
