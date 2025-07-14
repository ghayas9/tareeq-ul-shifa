// src/components/prescription/PrescriptionUploadButton.tsx
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import PrescriptionUploadModal from './PrescriptionUploadModal';
import PrescriptionSuccessModal from './PrescriptionSuccessModal';

interface PrescriptionUploadButtonProps {
  className?: string;
}

const PrescriptionUploadButton: React.FC<PrescriptionUploadButtonProps> = ({ className }) => {
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleOpenUploadModal = () => {
    setShowUploadModal(true);
  };

  const handleCloseUploadModal = () => {
    setShowUploadModal(false);
  };

  const handleUploadSuccess = () => {
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  return (
    <>
      <motion.div
        className={`flex justify-end gap-3 ${className || 'w-full max-w-xl mx-auto pr-4'}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4 }}
      >
        <p className="sm:text-base text-sm">Order with prescription</p>
        <p 
          className="sm:text-base text-sm text-primary cursor-pointer hover:underline"
          onClick={handleOpenUploadModal}
        >
          Upload Now
        </p>
      </motion.div>

      {/* Upload Modal */}
      <PrescriptionUploadModal 
        show={showUploadModal} 
        onClose={handleCloseUploadModal}
        onSuccess={handleUploadSuccess}
      />

      {/* Success Modal */}
      <PrescriptionSuccessModal
        show={showSuccessModal}
        onClose={handleCloseSuccessModal}
      />
    </>
  );
};

export default PrescriptionUploadButton;