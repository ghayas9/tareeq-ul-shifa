'use client';
import React, { useState } from 'react';
import Input from './common/Input';
import Button from './common/Button';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Modal from './common/Modal';
import AddNewCard from './AddNewCard';
import EditAccountDetails from './EditAccountDetails';

// const schema = z.object({
//   firstName: z.string().min(1, 'First Name is required'),
//   lastName: z.string().min(1, 'Last Name is required'),
//   email: z.string().min(1, 'Email is required').email('Invalid email format'),
//   password: z.string().min(1, 'Password is required'),
// });

const tabs = [
  { name: 'My Account', key: 'myaccount' },
  { name: 'Address Book', key: 'addressbook' },
  { name: 'Payment Details', key: 'paymentdetails' },
];

function MyAccount() {
  const [activeTab, setActiveTab] = useState('myaccount');
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  // const {
  //   register,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm({
  //   resolver: zodResolver(schema),
  // });

  // const onSubmit = (data: any) => {
  //   console.log('Form Data:', data);
  // };
  return (
    <div>
      <div className="flex sm:flex-row flex-wrap mt-4">
        {tabs.map((tab) => (
          <span
            key={tab.key}
            className={`px-4 py-1 text-base font-semibold font-robotoSlab cursor-pointer ${
              activeTab === tab.key
                ? 'text-teal-500 border-b-2 border-teal-500'
                : 'text-textColor'
            }`}
            onClick={() => setActiveTab(tab.key)}
          >
            {tab.name}
          </span>
        ))}
      </div>

      <div className="border rounded-[10px] bg-white shadow-md px-4 py-6 mt-4 ">
        <h2 className="text-base font-robotoSlab font-semibold mb-4">
          Account Details
        </h2>
        {/* <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Input
            type="text"
            label="First Name"
            required={true}
            name="firstName"
            register={register('firstName')}
            errors={errors}
          />
          <Input
            type="text"
            label="First Name"
            required={true}
            name="lastName"
            register={register('lastName')}
            errors={errors}
          />
          <Input
            type="email"
            label="Email "
            required={true}
            name="email"
            register={register('email')}
            errors={errors}
          />
          <Input
            type="password"
            label="Password "
            required={true}
            name="password"
            register={register('password')}
            errors={errors}
          />
        </div> */}
        <div
          // onClick={handleSubmit(onSubmit) as any}
          onClick={handleOpen as any}
          className="w-full flex items-center justify-center  mt-8"
        >
          <Button label="Edit" className="sm:!w-[20%] !w-full" />
        </div>
      </div>
      <Modal show={open} onClose={handleClose}>
        <EditAccountDetails />
      </Modal>
    </div>
  );
}

export default MyAccount;
