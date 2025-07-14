import React, { useState } from 'react';
import Input from './common/Input';
import Button from './common/Button';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';

const schema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email format'),
  password: z.string().min(1, 'Password is required'),
});
function TrackOrder() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };
  return (
    <div className="w-full">
      <h1 className="text-3xl font-robotoSlabt font-medium mb-2">
        Track your order
      </h1>
      <Input
        type="text"
        label="Type Tracking Number"
        required={false}
        name="firstName"
        register={register('firstName')}
        errors={errors}
      />
      <div className="my-10">
        <Button className="w-1/2 mx-auto" label="Track Order"></Button>
      </div>
    </div>
  );
}

export default TrackOrder;
