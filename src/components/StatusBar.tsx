import { useEffect, useRef, useState } from 'react';
import { OrderStaticon, OrderTransit } from './icons/Icons';
import { IoCheckmark } from 'react-icons/io5';

const StatusBar = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [childWidth, setChildWidth] = useState(0);

  const updateChildWidth = () => {
    if (containerRef.current) {
      const containerWidth = containerRef.current.clientWidth;
      const numberOfChildren = containerRef.current?.children.length || 1;
      if (numberOfChildren > 1)
        setChildWidth(containerWidth / (numberOfChildren - 1));
      else setChildWidth(containerWidth / numberOfChildren);
    }
  };

  useEffect(() => {
    updateChildWidth();
    window.addEventListener('resize', updateChildWidth);
    return () => window.removeEventListener('resize', updateChildWidth);
  }, []);

  return (
    <div className="w-full flex justify-center items-start py-6 px-2 mx-auto">
      <div
        ref={containerRef}
        className="flex items-start justify-between sm:w-3/4 mx-auto"
      >
        <div className="relative flex flex-col items-center">
          <div
            className="flex relative before:absolute before:left-full before:-z-10 before:block before:h-1 items-center justify-center w-12 h-12 rounded-full border border-primary before:w-[var(--before-width)] before:bg-gradient-to-r before:from-gr1 before:to-gr2"
            style={
              {
                '--before-width': `${childWidth - 48 - 24}px`,
              } as React.CSSProperties
            }
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary">
              <OrderStaticon className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-sm font-robotoSlab"> Order Placed</h1>
          <p className="text-sm font-semibold font-robotoSlab">
            10:00pm Thurs,24 Feb 2025
          </p>
        </div>

        <div className="relative flex flex-col items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full border border-normalGreen">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-normalGreen">
              <OrderTransit className="w-6 h-6 text-white" />
            </div>
          </div>
          <h1 className="text-sm font-robotoSlab"> In Transit</h1>
          <p className="text-sm font-semibold font-robotoSlab">
            10:00pm Thurs,24 Feb 2025
          </p>
        </div>

        <div className="relative flex flex-col items-center">
          <div className="flex items-center justify-center w-12 h-12 rounded-full bg-SoftGray">
            <IoCheckmark className="w-6 h-6 text-CoolGray" />
          </div>
          <h1>hello</h1>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;
