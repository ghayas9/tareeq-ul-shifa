import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

import { MdOutlineClose } from 'react-icons/md';
import Input from './common/Input';
import Button from './common/Button';

const schema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  email: z.string().min(1, 'Email is required'),
  password: z.string().min(1, 'Password is required'),
});

const EditAccountDetails = () => {
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
    <div className="px-6 py-5">
      <div className="  rounded-[10px] w-full">
        <div className="px-6 flex flex-col items-center">
          <h1 className="text-lg text-center font-semibold">
            Edit Account Details
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full gap-4 flex flex-col"
          >
            <Input
              label="First Name"
              placeholder="First Name"
              required={false}
              name="firstName"
              register={register('firstName')}
              errors={errors}
            />

            <Input
              label="Last Name"
              required={false}
              placeholder="Last Name"
              name="lastName"
              register={register('lastName')}
              errors={errors}
            />

            <Input
              label="Email"
              placeholder="Enter Email"
              required={false}
              name="email"
              register={register('email')}
              errors={errors}
            />
            <Input
              label="Password"
              placeholder="Enter Password"
              required={false}
              name="password"
              register={register('password')}
              errors={errors}
            />
            <div className="w-full flex items-center justify-center gap-3 my-6">
              <Button label="Save" className="!w-[183px]" />
              <button className="border border-secondary rounded-xl  py-[5px] w-[183px]">
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditAccountDetails;
