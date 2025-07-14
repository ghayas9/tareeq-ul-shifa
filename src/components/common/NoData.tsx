import { FaRegCompass } from 'react-icons/fa';

const NoData = ({}) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[250px] p-8 text-center">
      <div className="relative mb-8">
        <div className="absolute inset-0 bg-purple-100 rounded-full opacity-30 animate-pulse"></div>
        <div className="relative p-6 bg-gradient-to-br from-purple-500 to-blue-500 rounded-full shadow-lg">
          <FaRegCompass className="w-16 h-16 text-white animate-float" />
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-3">
        Oops, Nothing Here!
      </h3>
    </div>
  );
};

export default NoData;
