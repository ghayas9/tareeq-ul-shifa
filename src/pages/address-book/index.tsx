import AddressBook from '@/components/AddressBook';
import AddBookingAddress from '@/components/common/AddBookingAddress';
import Modal from '@/components/common/Modal';
import Layout from '@/components/layout/Layout';
import React, { useState } from 'react';

const AddressBookPage = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => setOpen(false);
  const hanndleOpen = () => setOpen(true);
  return (
    <Layout>
      <div>
        <AddressBook hanndleOpen={hanndleOpen} />
      </div>
      <Modal show={open} onClose={handleClose}>
        <AddBookingAddress />
      </Modal>
    </Layout>
  );
};

export default AddressBookPage;
