// pages/reset-password.tsx
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import ResetPassword from '@/components/ResetPassword';
import AuthLayout from '@/components/layout/AuthLayout';

const ResetPasswordPage: React.FC = () => {
  const router = useRouter();
  const { token } = router.query;
  const [isTokenReady, setIsTokenReady] = useState(false);

  useEffect(() => {
    // Wait for router to be ready
    if (router.isReady) {
      setIsTokenReady(true);
    }
  }, [router.isReady]);

  if (!isTokenReady) {
    return (
      <AuthLayout title="Reset Password">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      </AuthLayout>
    );
  }

  if (!token) {
    return (
      <AuthLayout title="Reset Password">
        <div className="text-center py-8">
          <h2 className="text-xl font-semibold mb-4">Invalid Reset Link</h2>
          <p className="mb-6">
            The password reset link is invalid or has expired.
          </p>
          <button
            onClick={() => router.push('/forgot-password')}
            className="px-4 py-2 bg-primary text-white rounded-md"
          >
            Request New Reset Link
          </button>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout title="Reset Password">
      <ResetPassword
        resetToken={token as string}
        onSuccess={() => router.push('/login')}
      />
    </AuthLayout>
  );
};

export default ResetPasswordPage;
