import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Input from './Input';
import Button from './Button';
import Dropdown from './Dropdown';

const schema = z.object({
  firstName: z.string().min(1, 'First Name is required'),
  lastName: z.string().min(1, 'Last Name is required'),
  address: z.string().min(1, 'Address is required'),
  phoneNumber: z.string().min(10, 'Phone Number must be at least 10 digits'),
});

const AddBookingAddress = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });
  const options = [
    { label: 'Option 1', value: 'option_1' },
    { label: 'Option 2', value: 'option_2' },
    { label: 'Option 3', value: 'option_3' },
  ];
  const handleSelect = (value: string) => {
    console.log('Selected Option:', value);
  };
  const onSubmit = (data: any) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="px-6 py-5">
      <div className="  rounded-[10px] w-full">
        <div className="px-6 flex flex-col items-center">
          <h1 className="text-lg text-center font-semibold">
            Add Address Details
          </h1>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full gap-4 flex flex-col"
          >
            <Input
              label="First Name"
              placeholder="First Name"
              required={true}
              name="firstName"
              register={register('firstName')}
              errors={errors}
            />
            <Input
              label="Last Name"
              required={true}
              placeholder="Last Name"
              name="lastName"
              register={register('lastName')}
              errors={errors}
            />
            <Input
              label="Address"
              required={true}
              name="address"
              register={register('address')}
              errors={errors}
            />
            <Input
              label="Apartment, Suite (Optional)"
              placeholder="Enter Apartment, Suite"
              required={true}
              name="phoneNumber"
              register={register('phoneNumber')}
              errors={errors}
            />
            <Dropdown
              className="!w-full "
              options={options}
              dropdownClassName="!py-[10px]"
              onSelect={handleSelect}
            />
            <Input
              label="Postal Code"
              placeholder="25000"
              required={true}
              name="phoneNumber"
              register={register('phoneNumber')}
              errors={errors}
            />
            <Input
              label="Phone Number"
              placeholder="+92 123456789"
              required={true}
              name="phoneNumber"
              register={register('phoneNumber')}
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

export default AddBookingAddress;
