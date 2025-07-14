import Layout from '@/components/layout/Layout';
import OrderHistory from '@/components/OrderHsitory';
import React from 'react';

function index() {
  return (
    <Layout>
      <div className="w-full overflow-x-auto md:h-[400px] md:overflow-y-auto">
        <div className="min-w-[800px] flex flex-col gap-y-3">
          <OrderHistory
            image="/images/bottle.png"
            name="CaC-1000 Plus (Orange)"
            description="100 Tablets"
            originalPrice={500}
            discountedPrice={500}
            quantity={2}
            deliveryDate="Sunday, 30 Feb 2024"
          />
          <OrderHistory
            image="/images/bottle.png"
            name="Vitamin C Tablets"
            description="50 Tablets"
            originalPrice={300}
            discountedPrice={250}
            quantity={1}
            deliveryDate="Saturday, 28 Jan 2024"
          />
          <OrderHistory
            image="/images/bottle.png"
            name="Omega 3 Capsules"
            description="60 Softgels"
            originalPrice={700}
            discountedPrice={650}
            quantity={3}
            deliveryDate="Monday, 5 Mar 2024"
          />
        </div>
      </div>
    </Layout>
  );
}

export default index;
