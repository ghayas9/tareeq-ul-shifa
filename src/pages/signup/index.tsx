import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Image from 'next/image';

import { useAuth } from '@/hooks/auth.hook';
import toast from 'react-hot-toast';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import { useRouter } from 'next/router';
import Spinner from '@/components/Spinner';

const schema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(8, 'Password must be at least 8 characters'),
});

type SignUpFormData = z.infer<typeof schema>;

const SignUp = () => {
  const router = useRouter();
  const { register: registerUser, isLoading, error, clearError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<SignUpFormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: SignUpFormData) => {
    try {
      if (error) clearError();
      const res = await registerUser(data);
      toast.success('Registration successful!');
      reset();
      router.push('/login');
    } catch (err: any) {
      console.log(err?.response?.message, 'error');
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Left side with form */}
      <div className="flex flex-col w-full md:w-1/2 p-8">
        <div className="flex items-center mb-8 md:hidden">
          <Image
            src="/images/pharmacy.png"
            alt="Tareeq-Ul-Shifa Logo"
            width={40}
            height={40}
            className="mr-2"
          />
          <h1 className="text-xl font-bold text-teal-700">
            Tareeq-Ul-Shifa Pharmacy
          </h1>
        </div>

        <div className="flex-grow flex flex-col justify-center items-center max-w-md mx-auto w-full">
          <div className="relative w-full mb-8 text-center">
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-500 blur-xl opacity-20 h-20 w-40 rounded-full"></div>
            <h2 className="text-2xl font-bold text-gray-800 relative">
              Welcome
            </h2>
            <p className="text-gray-600 mt-2 relative">
              Create your account to get started
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <Input
                label="First Name"
                required={true}
                name="firstName"
                placeholder="Enter first name"
                register={register('firstName')}
                errors={errors}
              />
              <Input
                label="Last Name"
                required={true}
                name="lastName"
                placeholder="Enter last name"
                register={register('lastName')}
                errors={errors}
              />
            </div>

            <Input
              label="Email"
              required={true}
              type="email"
              name="email"
              placeholder="Enter email"
              register={register('email')}
              errors={errors}
            />

            <Input
              label="Password"
              type="password"
              required={true}
              placeholder="Enter password"
              name="password"
              register={register('password')}
              errors={errors}
            />

            <div className="pt-4">
              <Button
                type="submit"
                label={isLoading ? <Spinner /> : 'Create Account'}
                className="w-full py-3 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 text-white font-medium rounded-lg transition-all duration-200 shadow-md hover:shadow-lg"
                disabled={isLoading}
              />
            </div>
            <p
              onClick={() => router.push('/login')}
              className="text-center text-gray-600 mt-6"
            >
              Already have an account?{' '}
              <span className="text-teal-600 font-medium cursor-pointer hover:underline">
                Sign In
              </span>
            </p>
          </form>
        </div>
      </div>

      {/* Right side with logo and branding */}
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
              <p className="text-teal-100">Your health, our priority</p>
            </div>
          </div>

          <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl shadow-lg">
            <h2 className="text-xl font-semibold mb-4">
              Benefits of joining us:
            </h2>
            <ul className="space-y-3">
              <li className="flex items-start">
                <div className="bg-teal-200 rounded-full p-1 mr-3 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-teal-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Quick access to prescription refills</span>
              </li>
              <li className="flex items-start">
                <div className="bg-teal-200 rounded-full p-1 mr-3 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-teal-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Medication reminders and tracking</span>
              </li>
              <li className="flex items-start">
                <div className="bg-teal-200 rounded-full p-1 mr-3 mt-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 text-teal-700"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <span>Special discounts for registered users</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
