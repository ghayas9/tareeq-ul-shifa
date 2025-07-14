// import React, { useState } from 'react';
// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import * as z from 'zod';
// import Modal from '@/components/common/Modal';
// import Input from '@/components/common/Input';
// import Button from '@/components/common/Button';
// import ImageUploader from '@/components/admin/ImageUploader';
// import Spinner from '@/components/Spinner';
// import toast from 'react-hot-toast';

// const schema = z.object({
//   name: z.string().min(1, 'Full name is required'),
//   email: z.string().email('Invalid email address'),
//   phone: z.string().min(10, 'Valid phone number is required'),
// });

// type PrescriptionFormData = z.infer<typeof schema>;

// interface PrescriptionUploadModalProps {
//   show: boolean;
//   onClose: () => void;
// }

// const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
//   show,
//   onClose,
// }) => {
//   const [prescriptionImage, setPrescriptionImage] = useState<string | null>(
//     null
//   );
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const {
//     register,
//     handleSubmit,
//     reset,
//     formState: { errors },
//   } = useForm<PrescriptionFormData>({
//     resolver: zodResolver(schema),
//   });

//   const handleImageUpdate = (imageUrl: string | null) => {
//     setPrescriptionImage(imageUrl);
//   };

//   const onSubmit = async (data: PrescriptionFormData) => {
//     if (!prescriptionImage) {
//       toast.error('Please upload your prescription');
//       return;
//     }
//     console.log(data, 'datass');
//     setIsSubmitting(true);

//     try {
//       // const response = await submitPrescription({
//       //   ...data,
//       //   prescriptionImage,
//       // });
//       toast.success('Prescription uploaded successfully');
//       reset();
//       setPrescriptionImage(null);
//       onClose();
//     } catch (error) {
//       toast.error('Failed to upload prescription');
//       console.error('Prescription upload error:', error);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handleCancel = () => {
//     reset();
//     setPrescriptionImage(null);
//     onClose();
//   };

//   return (
//     <Modal show={show} onClose={onClose}>
//       <div className="w-full">
//         <h1 className="text-lg text-center font-semibold pt-5">
//           Order with Prescription
//         </h1>

//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="w-full px-6 py-3 flex flex-col"
//         >
//           <Input
//             label="Full Name"
//             placeholder="Enter your full name"
//             required={true}
//             name="name"
//             register={register('name')}
//             errors={errors}
//           />

//           <Input
//             label="Email Address"
//             placeholder="Enter your email address"
//             required={true}
//             name="email"
//             register={register('email')}
//             errors={errors}
//           />

//           <Input
//             label="Phone Number"
//             placeholder="Enter your phone number"
//             required={true}
//             name="phone"
//             register={register('phone')}
//             errors={errors}
//           />

//           <div className="mt-4">
//             <label className="text-sm font-robotoSlab py-1 block">
//               Upload Prescription <span className="text-red-500">*</span>
//             </label>
//             <ImageUploader
//               onImageChange={handleImageUpdate}
//               initialImage={prescriptionImage}
//               entityType="prescription"
//             />
//             {!prescriptionImage && (
//               <p className="text-xs text-gray-500 mt-1">
//                 Please upload a clear image of your prescription
//               </p>
//             )}
//           </div>

//           <div className="w-full flex items-center justify-between gap-4 my-6">
//             <Button
//               type="submit"
//               label={isSubmitting ? <Spinner /> : 'Submit'}
//               className="!w-[183px]"
//               disabled={isSubmitting}
//             />
//             <button
//               type="button"
//               className="border border-secondary rounded-xl py-[5px] w-[183px]"
//               onClick={handleCancel}
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//           </div>
//         </form>
//       </div>
//     </Modal>
//   );
// };

// export default PrescriptionUploadModal;


// src/components/prescription/PrescriptionUploadModal.tsx
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Modal from '@/components/common/Modal';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import ImageUploader from '@/components/admin/ImageUploader';
import Spinner from '@/components/Spinner';
import toast from 'react-hot-toast';
import { usePrescription } from '@/hooks/prescription.hooks';
import { useAuth } from '@/hooks/auth.hook';

// Define the validation schema
const schema = z.object({
  fullName: z.string().min(1, 'Full name is required'),
  email: z.string().email('Invalid email address').optional(),
  phone: z.string().min(10, 'Valid phone number is required').optional(),
  preferredContactMethod: z.enum(['email', 'phone', 'sms']).optional(),
  address: z.string().min(1, 'Address is required'),
  city: z.string().min(1, 'City is required'),
  state: z.string().optional(),
  postalCode: z.string().optional(),
  country: z.string().optional(),
  addressNotes: z.string().optional(),
  notes: z.string().optional(),
}).refine(data => data.email || data.phone, {
  message: "Either email or phone is required",
  path: ["email", "phone"],
});

type PrescriptionFormData = z.infer<typeof schema>;

interface PrescriptionUploadModalProps {
  show: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

const PrescriptionUploadModal: React.FC<PrescriptionUploadModalProps> = ({
  show,
  onClose,
  onSuccess,
}) => {
  const [prescriptionImage, setPrescriptionImage] = useState<string | null>(null);
  const { createPrescription, isLoading } = usePrescription();
  const { isAuthenticated, user } = useAuth();
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PrescriptionFormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      // Pre-fill with user data if authenticated
      fullName: user ? `${user.firstName} ${user.lastName}` : '',
      email: user?.email || '',
      phone: user?.phoneNumber || '',
      preferredContactMethod: 'email',
      country: 'Pakistan',
    }
  });

  const handleImageUpdate = (imageUrl: string | null) => {
    setPrescriptionImage(imageUrl);
  };

  const onSubmit = async (data: PrescriptionFormData) => {
    if (!prescriptionImage) {
      toast.error('Please upload your prescription');
      return;
    }

    try {
      // Get the session ID if not authenticated
      const sessionId = !isAuthenticated ? localStorage.getItem('sessionId') || undefined : undefined;
      
      await createPrescription({
        ...data,
        url: prescriptionImage,
        sessionId
      });
      
      // Show success message
      toast.success('Prescription uploaded successfully');
      
      // Reset form and close modal
      reset();
      setPrescriptionImage(null);
      onClose();
      
      // Call onSuccess callback if provided
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Prescription upload error:', error);
    }
  };

  const handleCancel = () => {
    reset();
    setPrescriptionImage(null);
    onClose();
  };

  return (
    <Modal show={show} onClose={onClose}>
      <div className="w-full">
        <h1 className="text-lg text-center font-semibold pt-5">
          Order with Prescription
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full px-6 py-3 flex flex-col"
        >
          <Input
            label="Full Name"
            placeholder="Enter your full name"
            required={true}
            name="fullName"
            register={register('fullName')}
            errors={errors}
          />

          <Input
            label="Email Address"
            placeholder="Enter your email address"
            name="email"
            register={register('email')}
            errors={errors}
          />

          <Input
            label="Phone Number"
            placeholder="Enter your phone number"
            name="phone"
            register={register('phone')}
            errors={errors}
          />
          
          <Input
            label="Address"
            placeholder="Enter your address"
            required={true}
            name="address"
            register={register('address')}
            errors={errors}
          />
          
          <Input
            label="City"
            placeholder="Enter your city"
            required={true}
            name="city"
            register={register('city')}
            errors={errors}
          />
          
          <div className="flex space-x-4">
            <div className="w-1/2">
              <Input
                label="State/Province"
                placeholder="Enter state/province"
                name="state"
                register={register('state')}
                errors={errors}
              />
            </div>
            <div className="w-1/2">
              <Input
                label="Postal Code"
                placeholder="Enter postal code"
                name="postalCode"
                register={register('postalCode')}
                errors={errors}
              />
            </div>
          </div>
          
          <Input
            label="Notes (Optional)"
            placeholder="Add any additional notes"
            name="notes"
            register={register('notes')}
            errors={errors}
            // textarea={true}
          />

          <div className="mt-4">
            <label className="text-sm font-robotoSlab py-1 block">
              Upload Prescription <span className="text-red-500">*</span>
            </label>
            <ImageUploader
              onImageChange={handleImageUpdate}
              initialImage={prescriptionImage}
              entityType="prescription"
            />
            {!prescriptionImage && (
              <p className="text-xs text-gray-500 mt-1">
                Please upload a clear image of your prescription
              </p>
            )}
          </div>

          <div className="w-full flex items-center justify-between gap-4 my-6">
            <Button
              type="submit"
              label={isLoading ? <Spinner /> : 'Submit'}
              className="!w-[183px]"
              disabled={isLoading}
            />
            <button
              type="button"
              className="border border-secondary rounded-xl py-[5px] w-[183px]"
              onClick={handleCancel}
              disabled={isLoading}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default PrescriptionUploadModal;