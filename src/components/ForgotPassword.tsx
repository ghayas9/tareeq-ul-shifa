// components/ForgotPassword.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from './common/Input';
import Button from './common/Button';
import { useAuth } from '@/hooks/auth.hook';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

// Define schema for form validation
const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
});

type ForgotPasswordFormData = z.infer<typeof schema>;

interface ForgotPasswordProps {
  onSuccess?: () => void;
  onBackToLogin?: () => void;
  onEmailCapture?: (email: string) => void;
}

const ForgotPassword: React.FC<ForgotPasswordProps> = ({
  onSuccess,
  onBackToLogin,
  onEmailCapture,
}) => {
  const { forgotPassword, isLoading, error, clearError } = useAuth();
  const [emailSent, setEmailSent] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(schema),
  });

  const emailValue = watch('email');

  const onSubmit = async (data: ForgotPasswordFormData) => {
    try {
      if (error) clearError();

      if (onEmailCapture) {
        onEmailCapture(data.email);
      }
      await forgotPassword(data.email);
      toast.success('Reset instructions sent to your email');
      setEmailSent(true);

      if (onSuccess) {
        onSuccess();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full px-6 flex flex-col justify-center items-center">
      <div className="relative py-1 w-60 my-4">
        <div className="absolute inset-0 bg-[#128E7C] blur-[35px] opacity-65 scale-120"></div>
        <h1 className="text-lg text-center font-semibold">Forgot Password</h1>
        <p className="text-sm text-center">Reset your account password</p>
      </div>

      {emailSent ? (
        <div className="w-full text-center">
          <div className="mb-6 mt-2">
            <svg
              className="w-16 h-16 mx-auto text-green-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
            <h2 className="text-xl font-semibold mt-4">Check Your Email</h2>
            <p className="text-gray-600 mt-2">
              We've sent password reset instructions to your email address.
              Please check your inbox.
            </p>
          </div>
          <Button
            label="Back to Login"
            className="!w-full !py-[7px]"
            onClick={onBackToLogin}
          />
        </div>
      ) : (
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
            <p className="text-sm text-gray-600 mb-4">
              Enter your email address and we'll send you instructions to reset
              your password.
            </p>
          </div>

          <Input
            label="Email"
            required={true}
            type="email"
            name="email"
            placeholder="Enter Email"
            register={register('email')}
            errors={errors}
          />

          <div className="w-full flex flex-col items-center justify-center my-4">
            <Button
              type="submit"
              label={isLoading ? <Spinner /> : 'Send Reset Instructions'}
              className="!w-full !py-[7px]"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={onBackToLogin}
              className="mt-4 text-sm text-primary hover:underline"
            >
              Back to Sign In
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ForgotPassword;
