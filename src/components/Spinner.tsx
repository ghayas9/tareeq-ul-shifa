import React from 'react';

interface Props {
  className?: string;
}

const Spinner: React.FC<Props> = ({ className }) => {
  return (
    <div className="flex justify-center items-center">
      <div
        className={`w-6 h-6 border-4 border-t-4 border-white rounded-full animate-spin ${className}`}
      ></div>
    </div>
  );
};

export default Spinner;
