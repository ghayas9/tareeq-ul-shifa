import React from 'react';
import Modal from './Modal';

interface Props {
  showDeleteConfirmation?: boolean;
  cancelDelete?: () => void;
  confirmDelete?: () => void;
  description?:string
}
const ConfirmModal = ({
  showDeleteConfirmation,
  cancelDelete,
  confirmDelete,
  description
}: Props) => {
  return (
    <div>
      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteConfirmation} onClose={cancelDelete}>
        <div className="p-6">
          <h2 className="text-xl font-medium font-robotoSlab mb-4">
            Confirm Delete
          </h2>
          <p className="mb-6">
          {description}
          </p>

          <div className="flex gap-4">
            <button
              onClick={cancelDelete}
              className="text-gray-700 text-[17px] font-robotoSlab font-medium border border-CloudGray rounded-[10px] w-full py-1"
            >
              Cancel
            </button>
            <button
              onClick={confirmDelete}
              className="bg-red-600 text-white text-[17px] font-robotoSlab font-medium rounded-[10px] w-full py-1 hover:bg-red-700"
            >
              Delete
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
