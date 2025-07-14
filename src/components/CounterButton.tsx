import React, { useState } from 'react';
import { GoPlus } from 'react-icons/go';
import { HiMinusSmall } from 'react-icons/hi2';

interface CounterButtonProps {
  initialValue?: number;
  className: string;
  min?: number;
  max?: number;
  minusclassName?: string;
  plusclassName?: string;
  onChange?: (value: number) => void;
}

const CounterButton: React.FC<CounterButtonProps> = ({
  className,
  initialValue = 1,
  min = 1,
  max = 20,
  onChange,
  minusclassName,
  plusclassName,
}) => {
  const [quantity, setQuantity] = useState(initialValue);

  const handleIncrement = () => {
    if (quantity < max) {
      const newValue = quantity + 1;
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  const handleDecrement = () => {
    if (quantity > min) {
      const newValue = quantity - 1;
      setQuantity(newValue);
      onChange?.(newValue);
    }
  };

  return (
    <div
      className={`w-full flex items-center border rounded-[10px]  justify-between px-2
        h-[40px] mt-2  ${className}`}
    >
      <button
        onClick={handleDecrement}
        className={`text-2xl font-bold min-w-[25px] text-black ${minusclassName}`}
      >
        <HiMinusSmall className="" />
      </button>
      <div className=" h-[40px] border-r text-textColor"></div>

      <span className="text-primary min-w-[30px] text-center font-medium font-robotoSlab ">
        {String(quantity).padStart(2, '0')}
      </span>
      <div className="h-[40px] border-r text-textColor"></div>
      <button
        onClick={handleIncrement}
        className={`${plusclassName} text-lg min-w-[25px] font-bold text-black pl-2`}
      >
        <GoPlus />
      </button>
    </div>
  );
};

export default CounterButton;
