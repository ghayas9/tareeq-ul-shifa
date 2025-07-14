import Cart from '@/components/Cart';
import Breadcrumb from '@/components/common/BreadCrumb';
import Layout from '@/components/layout/Layout';
import OrderSummary from '@/components/OrderSummary';
import React from 'react';

const Carts = () => {
  return (
    <Layout>
      <div className="py-5 px-4">
        <Breadcrumb />

        <div className="flex lg:flex-row flex-col w-full items-center  gap-4 ">
          <div className="w-full mt-6">
            <Cart />
          </div>

          {/* <OrderSummary /> */}
        </div>
      </div>
    </Layout>
  );
};

export default Carts;
