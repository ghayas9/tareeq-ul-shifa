'use client';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { motion } from 'framer-motion';
import { useRouter } from 'next/router';
import Layout from '@/components/layout/Layout';
import Input from '@/components/common/Input';
import Button from '@/components/common/Button';
import ImageUploader from '@/components/admin/ImageUploader';
import Spinner from '@/components/Spinner';
import toast from 'react-hot-toast';
import { usePrescription } from '@/hooks/prescription.hooks';
import { useAuth } from '@/hooks/auth.hook';
import {
  MdUpload,
  MdDescription,
  MdSecurity,
  MdLocalPharmacy,
  MdCheckCircle,
} from 'react-icons/md';

// Define the validation schema
const schema = z
  .object({
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
  })
  .refine((data) => data.email || data.phone, {
    message: 'Either email or phone is required',
    path: ['email', 'phone'],
  });

type PrescriptionFormData = z.infer<typeof schema>;

const Prescription = () => {
  const router = useRouter();
  const [prescriptionImage, setPrescriptionImage] = useState<string | null>(
    null
  );
  const [showForm, setShowForm] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

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
    },
  });

  const handleImageUpdate = (imageUrl: string | null) => {
    setPrescriptionImage(imageUrl);
  };

  const handleStartUpload = () => {
    setShowForm(true);
  };

  const onSubmit = async (data: PrescriptionFormData) => {
    if (!prescriptionImage) {
      toast.error('Please upload your prescription');
      return;
    }

    try {
      // Get the session ID if not authenticated
      const sessionId = !isAuthenticated
        ? localStorage.getItem('sessionId') || undefined
        : undefined;

      await createPrescription({
        ...data,
        url: prescriptionImage,
        sessionId,
      });

      setIsSubmitted(true);
      toast.success('Prescription uploaded successfully!');
    } catch (error) {
      console.error('Prescription upload error:', error);
    }
  };

  const handleReset = () => {
    reset();
    setPrescriptionImage(null);
    setShowForm(false);
    setIsSubmitted(false);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 12,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
    hover: {
      y: -5,
      boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
      transition: { duration: 0.3 },
    },
  };

  const features = [
    {
      icon: <MdSecurity className="w-8 h-8" />,
      title: 'Secure Upload',
      description: 'Your prescription data is encrypted and stored securely',
    },
    {
      icon: <MdDescription className="w-8 h-8" />,
      title: 'Easy Process',
      description: 'Simple 3-step process to upload and order your medicines',
    },
    {
      icon: <MdLocalPharmacy className="w-8 h-8" />,
      title: 'Licensed Pharmacy',
      description: 'All medicines dispensed by qualified pharmacists',
    },
  ];

  const steps = [
    {
      step: '1',
      title: 'Upload Prescription',
      description: 'Take a clear photo or scan your prescription',
    },
    {
      step: '2',
      title: 'Verification',
      description: 'Our pharmacists will verify your prescription',
    },
    {
      step: '3',
      title: 'Order & Delivery',
      description: 'Place your order and get medicines delivered to your door',
    },
  ];

  // Success View
  const renderSuccessView = () => (
    <motion.div
      className="text-center max-w-2xl mx-auto"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="bg-white rounded-2xl p-8 shadow-lg">
        <MdCheckCircle className="w-20 h-20 text-green-500 mx-auto mb-6" />
        <h2 className="text-3xl font-bold text-gray-800 mb-4">
          Prescription Uploaded Successfully!
        </h2>
        <p className="text-gray-600 mb-6">
          Thank you for uploading your prescription. Our pharmacists will review
          it and contact you shortly to confirm your order.
        </p>
        <div className="flex gap-4 justify-center">
          <motion.button
            className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg font-medium"
            onClick={handleReset}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Upload Another
          </motion.button>
          <motion.button
            className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg font-medium"
            onClick={() => router.push('/')}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back to Home
          </motion.button>
        </div>
      </div>
    </motion.div>
  );

  // Form View
  const renderForm = () => (
    <motion.div
      className="max-w-3xl mx-auto bg-white rounded-2xl shadow-lg p-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Complete Your Prescription Order
        </h2>
        <p className="text-gray-600">
          Please fill in your details and upload your prescription
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
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
            label="City"
            placeholder="Enter your city"
            required={true}
            name="city"
            register={register('city')}
            errors={errors}
          />
        </div>

        <Input
          label="Address"
          placeholder="Enter your complete address"
          required={true}
          name="address"
          register={register('address')}
          errors={errors}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="State/Province"
            placeholder="Enter state/province"
            name="state"
            register={register('state')}
            errors={errors}
          />

          <Input
            label="Postal Code"
            placeholder="Enter postal code"
            name="postalCode"
            register={register('postalCode')}
            errors={errors}
          />
        </div>

        <Input
          label="Additional Notes (Optional)"
          placeholder="Add any special instructions or notes"
          name="notes"
          register={register('notes')}
          errors={errors}
        />

        <div>
          <label className="text-sm font-medium text-gray-700 block mb-2">
            Upload Prescription <span className="text-red-500">*</span>
          </label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6">
            <ImageUploader
              onImageChange={handleImageUpdate}
              initialImage={prescriptionImage}
              entityType="prescription"
            />
            {!prescriptionImage && (
              <p className="text-sm text-gray-500 mt-2 text-center">
                Please upload a clear image of your prescription
              </p>
            )}
          </div>
        </div>

        <div className="flex gap-4 pt-6">
          <Button
            type="submit"
            label={isLoading ? <Spinner /> : 'Submit Prescription'}
            className="flex-1"
            disabled={isLoading}
          />
          <motion.button
            type="button"
            className="flex-1 border border-gray-300 hover:bg-gray-50 text-gray-700 py-3 rounded-lg font-medium"
            onClick={() => setShowForm(false)}
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Back
          </motion.button>
        </div>
      </form>
    </motion.div>
  );

  return (
    <Layout>
      <motion.div
        className="min-h-screen bg-gray-50 py-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="max-w-6xl mx-auto px-4">
          {isSubmitted ? (
            renderSuccessView()
          ) : showForm ? (
            renderForm()
          ) : (
            <>
              {/* Header Section */}
              <motion.div className="text-center mb-12" variants={itemVariants}>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                  Upload Your Prescription
                </h1>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Get your prescribed medicines delivered to your doorstep.
                  Upload your prescription and let our qualified pharmacists
                  handle the rest.
                </p>
              </motion.div>

              {/* Upload Button Section */}
              <motion.div className="text-center mb-16" variants={itemVariants}>
                <motion.button
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-medium text-lg flex items-center gap-3 mx-auto shadow-lg"
                  onClick={handleStartUpload}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <MdUpload className="w-6 h-6" />
                  Upload Prescription Now
                </motion.button>
              </motion.div>

              {/* Features Section */}
              <motion.div className="mb-16" variants={itemVariants}>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                  Why Choose Our Prescription Service?
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="bg-white p-6 rounded-xl shadow-md text-center"
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <div className="text-primary mb-4 flex justify-center">
                        {feature.icon}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {feature.title}
                      </h3>
                      <p className="text-gray-600">{feature.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* How It Works Section */}
              <motion.div className="mb-16" variants={itemVariants}>
                <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
                  How It Works
                </h2>
                <div className="grid md:grid-cols-3 gap-8">
                  {steps.map((step, index) => (
                    <motion.div
                      key={index}
                      className="text-center relative"
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <div className="bg-primary text-white w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-4">
                        {step.step}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">
                        {step.title}
                      </h3>
                      <p className="text-gray-600">{step.description}</p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              {/* Important Information */}
              <motion.div
                className="bg-blue-50 p-8 rounded-xl mb-8"
                variants={itemVariants}
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Important Information
                </h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    Ensure your prescription is clearly readable and not expired
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    Include doctor's signature and stamp for validity
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    Upload multiple images if prescription has multiple pages
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    Our pharmacists will contact you if any clarification is
                    needed
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-primary">•</span>
                    Delivery time may vary based on medicine availability
                  </li>
                </ul>
              </motion.div>

              {/* Call to Action */}
              <motion.div
                className="text-center bg-white p-8 rounded-xl shadow-md"
                variants={itemVariants}
              >
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">
                  Ready to Upload Your Prescription?
                </h3>
                <p className="text-gray-600 mb-6">
                  Start your prescription order now and get your medicines
                  delivered safely to your home.
                </p>
                <motion.button
                  className="bg-primary hover:bg-primary/90 text-white px-8 py-3 rounded-lg font-medium mr-4"
                  onClick={handleStartUpload}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Upload Now
                </motion.button>
                <motion.button
                  className="border border-gray-300 hover:bg-gray-50 text-gray-700 px-8 py-3 rounded-lg font-medium"
                  onClick={() => router.push('/')}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Browse Products
                </motion.button>
              </motion.div>
            </>
          )}
        </div>
      </motion.div>
    </Layout>
  );
};

export default Prescription;
