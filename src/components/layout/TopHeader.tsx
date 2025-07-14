import { CarbonDeliveryParcel } from '../icons/Icons';

const TopHeader = () => {
  return (
    <div className="bg-primary h-[40px] flex items-center w-full">
      <div className="flex items-center  w-full px-2 sm:px-6 md:px-8">
        <p className="text-white text-[10px] sm:text-sm md:text-base font-robotoSlab mx-auto text-center">
          Free shipping on orders above PKR 2,500.
        </p>
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4">
          <CarbonDeliveryParcel />
          <p className="text-white text-[10px] sm:text-sm md:text-base font-robotoSlab">
            Track Order
          </p>
        </div>
      </div>
    </div>
  );
};

export default TopHeader;
