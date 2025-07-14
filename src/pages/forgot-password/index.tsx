// pages/forgot-password.tsx
import React from 'react';
import PasswordRecovery from '@/components/PasswordRecovery';
import AuthLayout from '@/components/layout/AuthLayout';

const ForgotPasswordPage: React.FC = () => {
  return (
    <AuthLayout title="Forgot Password">
      <PasswordRecovery />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;