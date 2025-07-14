import React, { ButtonHTMLAttributes } from 'react';

// Extend the HTML button attributes and add our custom props
interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  className = '',
  type = 'button',
  disabled = false,
  ...restProps // This will capture all other HTML button attributes
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`w-full py-1 rounded-[10px] text-center text-base bg-primary flex justify-center items-center font-robotoSlab font-medium text-white ${disabled ? 'opacity-60 cursor-not-allowed' : ''} ${className}`}
      {...restProps}
    >
      {label}
    </button>
  );
};

export default Button;
