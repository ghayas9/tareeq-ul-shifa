// src/components/prescription/PrescriptionSuccessModal.tsx
import React from 'react';
import Image from 'next/image';
import Modal from '@/components/common/Modal';
import { IoCloseOutline } from 'react-icons/io5';

interface PrescriptionSuccessModalProps {
  show: boolean;
  onClose: () => void;
}

const PrescriptionSuccessModal: React.FC<PrescriptionSuccessModalProps> = ({ 
  show, 
  onClose 
}) => {
  return (
    <Modal show={show} onClose={onClose}>
      <div className="rounded-[10px] w-full p-4">
        <div className="flex items-end justify-end">
          <IoCloseOutline 
            className="text-2xl text-textColor cursor-pointer" 
            onClick={onClose}
          />
        </div>
        <div className="flex flex-col items-center justify-center py-4">
          <div className="mb-3">
            <Image src="/images/modelimage.png" alt="Success" width={60} height={60} />
          </div>
          <p className="text-base font-robotoSlab font-medium text-primary w-2/3 text-center mt-2">
            Your prescription has been uploaded successfully
          </p>
          <p className="text-DarkAsh text-sm font-robotoSlab mt-4 mb-5 text-center">
            Our consultant will call you shortly to confirm.
            <span className="text-DarkAsh text-sm font-robotoSlab block mt-2">
              Thank you for choosing Tareeq Ul Shifa Pharmacy
            </span>
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default PrescriptionSuccessModal;