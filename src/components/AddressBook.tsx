import React, { useState } from 'react';
import { FaEdit, FaPlus, FaRegEdit } from 'react-icons/fa';
import { GoPlus } from 'react-icons/go';
import { RiDeleteBin6Line } from 'react-icons/ri';

const addresses = [
  {
    id: 1,
    title: 'Address1',
    name: 'David John',
    street: 'H#12, Street #2, Peshawar',
    zip: '25000',
    phone: '+92 123 456789',
    editIcon: <FaRegEdit className="text-2xl cursor-pointer " />,
    deleteIcon: (
      <RiDeleteBin6Line className="text-2xl cursor-pointer text-red-500" />
    ),
  },
  {
    id: 2,
    title: 'Address2',
    name: 'John Doe',
    street: 'H#45, Avenue #3, Karachi',
    zip: '74000',
    phone: '+92 321 654987',
    editIcon: <FaRegEdit className="text-2xl cursor-pointer" />,
    deleteIcon: (
      <RiDeleteBin6Line className="text-2xl cursor-pointer text-red-500" />
    ),
  },
];
const tabs = [
  { name: 'My Account', key: 'myaccount' },
  { name: 'Address Book', key: 'addressbook' },
  { name: 'Payment Details', key: 'paymentdetails' },
];
function AddressBook({ hanndleOpen }: any) {
  const [activeTab, setActiveTab] = useState('addressbook');
  return (
    <div>
      <div className="flex px-2 sm:flex-row flex-wrap justify-center mt-4">
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
      <div className="flex w-full py-5 md:flex-row flex-col flex-wrap lg:w-3/4 md:mb-36">
        <div className=" flex flex-wrap md:w-[70%] w-full gap-5 px-3  ">
          {addresses.map((address) => (
            <div
              key={address.id}
              className=" rounded-[10px] h-[230px] sm:w-[48%] w-full shadow-md bg-white  px-4"
            >
              <div>
                <h1 className="text-base font-semibold font-robotoSlab mb-1 mt-3">
                  {address.title}
                </h1>
                <h5 className="text-sm font-robotoSlab py-2">{address.name}</h5>
                <p className="text-sm font-robotoSlab py-2">{address.street}</p>
                <p className="text-sm font-robotoSlab py-2">{address.zip}</p>
                <p className="text-sm font-robotoSlab">{address.phone}</p>
              </div>
              <div className="flex gap-2 justify-end mt-4">
                {address.editIcon}
                {address.deleteIcon}
              </div>
            </div>
          ))}
        </div>
        <div
          onClick={hanndleOpen}
          className="border flex  justify-center items-center rounded-[10px] shadow-md bg-LightGray md:my-0 my-4 md:py-0 h-[230px] w-[95%]  px-4 sm:w-[47%] md:w-[30%]  md:ml-0 ml-3 "
        >
          <span>
            <GoPlus className="text-2xl text-primary font-bold" />
          </span>
          <p className="text-[17px] font-robotoSlab font-medium text-textColor ">
            Add New Address
          </p>
        </div>
      </div>
    </div>
  );
}

export default AddressBook;
