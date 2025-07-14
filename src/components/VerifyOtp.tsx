// components/VerifyOtp.tsx
import React, { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Button from './common/Button';
import { useAuth } from '@/hooks/auth.hook';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

// Define schema for form validation
const schema = z.object({
  otp: z.string().min(6, 'OTP must be at least 6 characters'),
});

type VerifyOtpFormData = z.infer<typeof schema>;

interface VerifyOtpProps {
  email: string;
  onSuccess: (token: string) => void;
  onBackToEmail: () => void;
}

const VerifyOtp: React.FC<VerifyOtpProps> = ({ 
  email, 
  onSuccess,
  onBackToEmail
}) => {
  const { verifyOtp, isLoading, error, clearError ,forgotPassword} = useAuth();
  const [otpDigits, setOtpDigits] = useState(['', '', '', '', '', '']);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  
  const {
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<VerifyOtpFormData>({
    resolver: zodResolver(schema),
  });

  // Set up input refs
  useEffect(() => {
    inputRefs.current = inputRefs.current.slice(0, 6);
  }, []);

  // Handle digit change in OTP input
  const handleDigitChange = (index: number, value: string) => {
    if (value.length > 1) {
      // If pasting multiple digits, distribute them across fields
      const digits = value.split('').slice(0, 6);
      const newOtpDigits = [...otpDigits];
      
      digits.forEach((digit, i) => {
        if (index + i < 6) {
          newOtpDigits[index + i] = digit;
        }
      });
      
      setOtpDigits(newOtpDigits);
      setValue('otp', newOtpDigits.join(''));
      
      // Focus on the next available input or the last one
      const nextIndex = Math.min(index + digits.length, 5);
      inputRefs.current[nextIndex]?.focus();
    } else {
      // Single digit entry
      const newOtpDigits = [...otpDigits];
      newOtpDigits[index] = value;
      setOtpDigits(newOtpDigits);
      setValue('otp', newOtpDigits.join(''));
      
      // Auto-focus next input if a digit was entered
      if (value && index < 5) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  // Handle backspace key
  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otpDigits[index] && index > 0) {
      // Move focus to previous input when backspace is pressed on an empty input
      inputRefs.current[index - 1]?.focus();
    }
  };

  const onSubmit = async () => {
    const otp = otpDigits.join('');
    if (otp.length !== 6) {
      toast.error('Please enter a complete 6-digit OTP');
      return;
    }

    try {
      if (error) clearError();
      const response = await verifyOtp({ email, otp });
      toast.success('OTP verified successfully');
      
      // Pass token to parent component for reset password page
      if (response.resetToken) {
        onSuccess(response.resetToken);
      }
    } catch (err) {
      toast.error('Failed to verify OTP');
      console.error('OTP verification failed:', err);
    }
  };

  // Handle resend OTP
  const handleResendOtp = async () => {
    try {
      await forgotPassword(email);
      toast.success('New OTP sent to your email');
    } catch (err) {
      toast.error('Failed to resend OTP');
    }
  };

  return (
    <div className="w-full px-6 flex flex-col justify-center items-center">
      <div className="relative py-1 w-60 my-4">
        <div className="absolute inset-0 bg-[#128E7C] blur-[35px] opacity-65 scale-120"></div>
        <h1 className="text-lg text-center font-semibold">Verify OTP</h1>
        <p className="text-sm text-center">Enter the code sent to your email</p>
      </div>
      
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full gap-4 flex flex-col"
      >
        {error && (
          <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-2 rounded-md text-sm">
            {error}
          </div>
        )}
        
        <div className="mb-2">
          <p className="text-sm text-gray-600 mb-2 text-center">
            We've sent a 6-digit code to
          </p>
          <p className="text-sm font-semibold text-center">{email}</p>
        </div>
        
        {/* OTP Input Field */}
        <div className="flex justify-center space-x-2 my-4">
          {otpDigits.map((digit, index) => (
            <input
              key={index}
              ref={(el) => (inputRefs.current[index] = el as any)}
              type="text"
              maxLength={7}
              value={digit}
              onChange={(e) => handleDigitChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-12 h-12 text-center border border-gray-300 rounded-md 
                       shadow-sm focus:border-primary focus:ring-1 focus:ring-primary
                       text-lg font-medium"
            />
          ))}
        </div>
        
        {errors.otp && (
          <p className="text-red-500 text-xs mt-1 text-center">{errors.otp.message}</p>
        )}
        
        <div className="w-full flex flex-col items-center justify-center mt-4">
          <Button
          type='submit'
            label={isLoading ? <Spinner/> : 'Verify OTP'}
            className="!w-full !py-[7px]"
            disabled={isLoading || otpDigits.join('').length !== 6}
          />
          
          <div className="flex justify-between w-full mt-4">
            <button
              type="button"
              onClick={onBackToEmail}
              className="text-sm text-primary hover:underline"
            >
              Change Email
            </button>
            <button
              type="button"
              onClick={handleResendOtp}
              className="text-sm text-primary hover:underline"
            >
              Resend OTP
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default VerifyOtp;