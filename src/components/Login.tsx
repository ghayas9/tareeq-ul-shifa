import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from './common/Input';
import Button from './common/Button';
import { useAuth } from '@/hooks/auth.hook';
import toast from 'react-hot-toast';

const schema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
});

type SignUpFormData = z.infer<typeof schema>;

const Login = () => {
  const { login: loginUser, error, clearError } = useAuth();

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
     await loginUser(data);
      reset();
    } catch (err) {
      toast.error('Registration failed', err as any);
      console.error('Registration failed:', err);
    }
  };

  return (
    <div className="w-full px-6 flex flex-col justify-center items-center">
      <div className="relative py-1 w-32 my-4">
        <div className="absolute inset-0 bg-[#128E7C] blur-[35px] opacity-65 scale-120"></div>
        <h1 className="text-lg text-center font-semibold">Welcome</h1>
        <p className="text-sm w-full whitespace-nowrap">
          Sign into your account
        </p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full gap-4 flex flex-col"
      >
        <Input
          label="Email"
          required={true}
          type="email"
          name="email"
          register={register('email')}
          errors={errors}
        />
        <Input
          label="Password"
          required={true}
          type="password"
          name="password"
          register={register('password')}
          errors={errors}
        />

        <div className="w-full flex flex-col items-center justify-center my-4">
          <Button label="Sign In" className="!w-full !py-[7px]" />
          <p className="my-2 text-sm">
            Don't have an account? <span className="text-primary">Sign Up</span>
          </p>
        </div>
      </form>
    </div>
  );
};

export default Login;
