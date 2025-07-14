// components/PasswordRecovery.tsx
import React, { useState } from 'react';
import { useRouter } from 'next/router';
import ForgotPassword from './ForgotPassword';
import VerifyOtp from './VerifyOtp';
import ResetPassword from './ResetPassword';
import { useDispatch } from 'react-redux';

// Steps in the password recovery flow
enum RecoveryStep {
  FORGOT_PASSWORD,
  VERIFY_OTP,
  RESET_PASSWORD,
  COMPLETE,
}

const PasswordRecovery: React.FC = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [currentStep, setCurrentStep] = useState<RecoveryStep>(
    RecoveryStep.FORGOT_PASSWORD
  );
  const [email, setEmail] = useState<string>('');
  const [resetToken, setResetToken] = useState<string>('');

  // Handle successful email submission
  const handleForgotPasswordSuccess = () => {
    setCurrentStep(RecoveryStep.VERIFY_OTP);
  };

  const handleBackToLogin = () => {
    router.push('/login');
  };
  // Handle successful OTP verification
  const handleOtpSuccess = (token: string) => {
    setResetToken(token);
    setCurrentStep(RecoveryStep.RESET_PASSWORD);
  };

  // Handle back to forgot password
  const handleBackToEmail = () => {
    setCurrentStep(RecoveryStep.FORGOT_PASSWORD);
  };

  // Handle successful password reset
  const handleResetSuccess = () => {
    setCurrentStep(RecoveryStep.COMPLETE);
    // Redirect to login page
    setTimeout(() => {
      router.push('/login');
    }, 2000);
  };

  // Capture email for OTP verification
  const handleEmailCapture = (email: string) => {
    setEmail(email);
  };

  // Render the current step
  const renderStep = () => {
    switch (currentStep) {
      case RecoveryStep.FORGOT_PASSWORD:
        return (
          <ForgotPassword
            onSuccess={handleForgotPasswordSuccess}
            onBackToLogin={handleBackToLogin}
            onEmailCapture={handleEmailCapture}
          />
        );
      case RecoveryStep.VERIFY_OTP:
        return (
          <VerifyOtp
            email={email}
            onSuccess={handleOtpSuccess}
            onBackToEmail={handleBackToEmail}
          />
        );
      case RecoveryStep.RESET_PASSWORD:
        return (
          <ResetPassword
            resetToken={resetToken}
            onSuccess={handleResetSuccess}
          />
        );
      case RecoveryStep.COMPLETE:
        return (
          <div className="w-full px-6 flex flex-col justify-center items-center">
            <div className="relative py-1 w-60 my-4">
              <div className="absolute inset-0 bg-[#128E7C] blur-[35px] opacity-65 scale-120"></div>
              <h1 className="text-lg text-center font-semibold">Success!</h1>
              <p className="text-sm text-center">Redirecting to login...</p>
            </div>
            <div className="w-full text-center mt-4">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary mx-auto"></div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full">
      {renderStep()}
    </div>
  );
};

export default PasswordRecovery;
