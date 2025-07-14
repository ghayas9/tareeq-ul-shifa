// components/ResetPassword.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from './common/Input';
import Button from './common/Button';
import { useAuth } from '@/hooks/auth.hook';
import toast from 'react-hot-toast';
import Spinner from './Spinner';

// Define schema for form validation with password match
const schema = z.object({
  newPassword: z.string().min(6, 'Password must be at least 6 characters'),
  confirmPassword: z.string().min(6, 'Confirm Password is required'),
}).refine((data) => data.newPassword === data.confirmPassword, {
  message: "Passwords don't match",
  path: ['confirmPassword'],
});

type ResetPasswordFormData = z.infer<typeof schema>;

interface ResetPasswordProps {
  resetToken: string;
  onSuccess: () => void;
}

const ResetPassword: React.FC<ResetPasswordProps> = ({
  resetToken,
  onSuccess
}) => {
  const { resetPassword, isLoading, error, clearError } = useAuth();
  const [passwordReset, setPasswordReset] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ResetPasswordFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: ResetPasswordFormData) => {
    try {
      if (error) clearError();

      await resetPassword({
        resetToken,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword
      });

      toast.success('Password reset successfully');
      setPasswordReset(true);

      // Redirect to login after success
      setTimeout(() => {
        if (onSuccess) onSuccess();
      }, 3000);
    } catch (err) {
      toast.error('Failed to reset password');
      console.error('Password reset failed:', err);
    }
  };

  return (
    <div className="w-full px-6 flex flex-col justify-center items-center">
      <div className="relative py-1 w-60 my-4">
        <div className="absolute inset-0 bg-[#128E7C] blur-[35px] opacity-65 scale-120"></div>
        <h1 className="text-lg text-center font-semibold">Reset Password</h1>
        <p className="text-sm text-center">Create a new password</p>
      </div>

      {passwordReset ? (
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
            <h2 className="text-xl font-semibold mt-4">Password Reset Complete</h2>
            <p className="text-gray-600 mt-2">
              Your password has been changed successfully.
              You'll be redirected to login in a moment.
            </p>
          </div>
          <Button
            label="Back to Login"
            className="!w-full !py-[7px]"
            onClick={onSuccess}
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
              Please enter a new password for your account.
            </p>
          </div>

          <Input
            label="New Password"
            required={true}
            type="password"
            name="newPassword"
            register={register('newPassword')}
            errors={errors}
          />

          <Input
            label="Confirm Password"
            required={true}
            type="password"
            name="confirmPassword"
            register={register('confirmPassword')}
            errors={errors}
          />

          <div className="w-full flex flex-col items-center justify-center my-4">
            <Button
              type='submit'
              label={isLoading ? <Spinner/> : 'Reset Password'}
              className="!w-full !py-[7px]"
              disabled={isLoading}
            />
          </div>
        </form>
      )}
    </div>
  );
};

export default ResetPassword;