import React from 'react';
import Input from './common/Input';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useForm } from 'react-hook-form';
import Button from './common/Button';

const schema = z.object({
  cardnumber: z.string().min(1, 'Card Number is required'),
  expirydate: z.string().min(1, 'Expiration Date (DD/MM) is required'),
  number: z.string().min(1, 'Enter Security code is required'),
  cardName: z.string().min(1, 'Card Name is required'),
});
function AddNewCard() {
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
    <div className="w-full py-3">
      <div className="w-full rounded-[10px] bg-white ">
        {/* <div className="flex px-3 py-3 justify-end">
          <MdOutlineClose className="text-textColor text-2xl" />
        </div> */}
        <h1 className="text-base font-semibold font-robotoSlab text-center">
          Add New Card
        </h1>
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <div className="px-6 py-5">
            <div className="">
              <Input
                type="text"
                label="Card Number"
                required={false}
                placeholder="Enter Card Number"
                name="cardnumber"
                register={register('cardnumber')}
                errors={errors}
                className="!py-1 "
              />
            </div>
            <div className="mt-4">
              <Input
                type="text"
                label="Expiration Date (DD/MM)"
                required={false}
                placeholder="Enter Expiry Date"
                name="expirydate"
                register={register('expirydate')}
                errors={errors}
                className="!py-1"
              />
            </div>
            <div className="mt-4">
              <Input
                type="text"
                label="Enter Security Code"
                required={false}
                placeholder="Enter Security Code"
                name="number"
                register={register('number')}
                errors={errors}
                className="!py-1"
              />
            </div>
            <div className="mt-4">
              <Input
                type="text"
                label="Name on Card"
                required={false}
                placeholder="Enter Name on Card"
                name="cardName"
                register={register('cardName')}
                errors={errors}
                className="!py-1"
              />
            </div>
            <div className="w-full flex items-center justify-center md:justify-between gap-3 mt-6">
              <Button label="Save" className="!w-[183px]" />
              <button className="border border-secondary rounded-xl  py-1 w-[180px]">
                Cancel
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddNewCard;
