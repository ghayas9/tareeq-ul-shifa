// components/layouts/AuthLayout.tsx
import React, { ReactNode } from 'react';
import Head from 'next/head';
import Image from 'next/image';

interface AuthLayoutProps {
  children: ReactNode;
  title?: string;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ 
  children, 
  title = 'Authentication' 
}) => {
  return (
    <>
      <Head>
        <title>{title} | Tareeq-Ul-Shifa Pharmacy</title>
        <meta name="description" content="Tareeq-Ul-Shifa Pharmacy authentication" />
      </Head>
      
      <div className="min-h-screen flex flex-col md:flex-row bg-gray-50">
        {/* Left side - Brand/Logo section */}
        <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-teal-500 to-teal-700 p-8 justify-center items-center">
          <div className="max-w-md text-white">
            <div className="flex items-center mb-8">
              <Image
                src="/images/pharmacy.png"
                alt="Logo"
                width={60}
                height={60}
                className="mr-4"
              />
              <div>
                <h1 className="text-2xl font-bold">Tareeq-Ul-Shifa Pharmacy</h1>
                <p className="text-sm">PATH TO HEALING</p>
              </div>
            </div>
            
            <h2 className="text-3xl font-bold mb-4">Welcome to our platform</h2>
            <p className="text-lg mb-6">
              Access your account to manage orders, prescriptions, and more.
            </p>
          </div>
        </div>
        
        {/* Right side - Auth form section */}
        <div className="flex-1 flex justify-center items-center p-6">
          <div className="w-full max-w-md">
            {/* Logo for mobile view */}
            <div className="flex md:hidden justify-center mb-8">
              <Image
                src="/images/pharmacy.png"
                alt="Logo"
                width={50}
                height={50}
              />
            </div>
            
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default AuthLayout;