import Breadcrumb from '@/components/common/BreadCrumb';
import Layout from '@/components/layout/Layout';
import TrackOrder from '@/components/TrackOrder';

const TrackOrders = () => {
  return (
    <Layout>
      <div className="px-4 mt-5">
        <Breadcrumb />
        <div className="w-full flex justify-center">
          <div className="w-full max-w-xl">
            <TrackOrder />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default TrackOrders;
