import React, { useState } from 'react';
import { PasswordIcon } from '../icons/Icons';
import { UseFormRegisterReturn, FieldErrors } from 'react-hook-form';

interface InputProps {
  label?: string;
  placeholder?: string;
  name: string;
  className?: string;
  type?: string;
  isError?: boolean;
  errors?: FieldErrors;
  required?: boolean;
  errorClass?: string;
  register: UseFormRegisterReturn;
  disabled?:boolean
}

const Input: React.FC<InputProps> = ({
  label = 'Enter Tracking Number',
  placeholder = 'Enter Tracking Number',
  name,
  type = 'text',
  isError = false,
  errors,
  errorClass = '',
  required = false,
  register,
  className = '',
  disabled=false
}) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === 'password';
  const inputType = isPassword && !showPassword ? 'password' : 'text';

  return (
    <div className="w-full relative">
      {label && (
        <label className="text-sm font-robotoSlab">
          {label} {required ? <span className="text-red-600">*</span> : ''}
        </label>
      )}
      <div className="relative">
        <input
          type={inputType}
          placeholder={placeholder}
          disabled={disabled}
          className={`mt-1 w-full border border-CloudGray rounded-[10px] px-3 py-2 text-base font-robotoSlab placeholder:text-CoolGray text-gray-700 outline-none ${className} ${
            isError || (errors && errors[name]) ? 'border-red-500' : ''
            
          } ${disabled ? "bg-gray-300 opacity-50":""}`}
          {...register}
        />
        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-3 flex items-center text-gray-500"
          >
            <PasswordIcon />
          </button>
        )}
      </div>
      {(isError || (errors && errors[name])) && (
        <span
          className={`absolute animate-slide-up -bottom-5 left-0 text-red-500 text-sm ${errorClass}`}
        >
          {typeof errors?.[name]?.message === 'string'
            ? errors[name].message
            : `${label} is required`}
        </span>
      )}
    </div>
  );
};

export default Input;
