import React from 'react';

interface PageLoaderProps {
  text?: string;
}

const PageLoader: React.FC<PageLoaderProps> = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[100px] w-full bg-white/80 rounded-lg shadow-sm">
      <div className="relative">
        <div className="w-16 h-16 border-4 border-emerald-100 border-t-emerald-500 rounded-full animate-spin"></div>
        <div className="absolute top-2 left-2 w-12 h-12 border-4 border-emerald-50 border-b-emerald-400 rounded-full animate-spin"></div>
        <div className="absolute top-[22px] left-[22px] w-4 h-4 bg-emerald-500 rounded-full animate-pulse"></div>
      </div>
      {/* <div className="mt-6 text-center">
        <div className="flex justify-center space-x-1 mt-1">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div> */}
    </div>
  );
};

export default PageLoader;