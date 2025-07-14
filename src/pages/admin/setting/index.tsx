
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { motion } from 'framer-motion';
import Input from '@/components/common/Input';
import {
  FiUser,
  FiMail,
  FiPhone,
  FiLock,
  FiEdit2,
  FiSave,
  FiX,
  FiImage,
} from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useUser } from '@/hooks/user.hook';
import { useAuth } from '@/hooks/auth.hook';
import { useAppSelector } from '@/redux/store/store';
import Spinner from '@/components/Spinner';
import ImageUploader from '@/components/admin/ImageUploader';
import Layout from '@/components/admin/layout/Layout';

// Define the form data types
type AccountFormData = {
  firstName: string;
  lastName: string;
  email: string;
  displayName: string;
  profile?: string;
};

type PasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

const AccountPage = () => {
  // States
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [activeTab, setActiveTab] = useState('profile');
  const [isLoading, setIsLoading] = useState(true);
  const [profileImage, setProfileImage] = useState<string | null>(null);

  // Hooks for user data
  const {
    getUserProfile,
    updateProfile,
    profile,
    isLoading: profileLoading,
    error,
    changePassword,
  } = useUser();
  const { user } = useAppSelector((state) => state.auth);

  console.log('Auth User:', user);
  console.log('User Profile:', profile);

  // RHF for profile form
  const {
    register: registerProfile,
    handleSubmit: handleProfileSubmit,
    formState: { errors: profileErrors },
    reset: resetProfileForm,
    setValue,
  } = useForm<AccountFormData>();

  // RHF for password form
  const {
    register: registerPassword,
    handleSubmit: handlePasswordSubmit,
    formState: { errors: passwordErrors },
    reset: resetPassword,
  } = useForm<PasswordFormData>();

  // Fetch user profile on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        console.log('Fetching user data...');
        await getUserProfile();
        console.log('User data fetched');
        setIsLoading(false);
      } catch (error) {
        console.error('Failed to load user profile:', error);
        toast.error('Failed to load user profile');
        setIsLoading(false);
      }
    };

    if (user && user.id) {
      console.log('User is authenticated, fetching profile');
      fetchUserData();
    } else {
      console.log('User is not authenticated');
      setIsLoading(false);
    }
  }, [getUserProfile, user?.id]);

  // Update form values when profile data is loaded
  useEffect(() => {
    if (profile) {
      console.log('Updating form with profile data:', profile);
      resetProfileForm({
        firstName: profile.firstName || '',
        lastName: profile.lastName || '',
        email: profile.email || '',
        displayName: profile.displayName || '',
      });

      // Set profile image if it exists
      if (profile.profile) {
        setProfileImage(profile.profile);
      }
    } else if (user) {
      // Fallback to using auth user data
      console.log('Using auth user data for form:', user);
      resetProfileForm({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        displayName: user.displayName || '',
      });

      // Set profile image if it exists in user data
      if (user.profile) {
        setProfileImage(user.profile);
      }
    }
  }, [profile, user, resetProfileForm]);

  // Handle image update
  const handleImageUpdate = (imageUrl: string | null) => {
    console.log('Image updated:', imageUrl);
    setProfileImage(imageUrl);
    setValue('profile', imageUrl || '');
  };

  // Handle profile save
  const onProfileSave = async (data: AccountFormData) => {
    try {
      // Add the profile image to the data if it exists
      if (profileImage) {
        data.profile = profileImage;
      }

      console.log('Saving profile with data:', data);
      await updateProfile(data);
      getUserProfile();
      toast.success('Profile updated successfully!');
      setIsEditingProfile(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error('Failed to update profile');
    }
  };

  // Handle password change
  const onPasswordChange = async (data: PasswordFormData) => {
    // Validation is now handled by react-hook-form and zod on the backend
    try {
      console.log('Changing password...');
      await changePassword({
        currentPassword: data.currentPassword,
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
      });

      setIsChangingPassword(false);
      resetPassword();
    } catch (error) {
      console.error('Error changing password:', error);
      // Toast error is handled in the thunk
    }
  };
  // Animation variants
  const pageVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        stiffness: 100,
        damping: 15,
        staggerChildren: 0.05,
        delayChildren: 0.1,
      },
    },
  };

  const buttonVariants = {
    hover: { scale: 1.05, backgroundColor: 'rgba(18, 142, 124, 0.9)' },
    tap: { scale: 0.98 },
  };

  if (isLoading || profileLoading) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <p className="text-xl">Loading account information...</p>
        </div>
      </Layout>
    );
  }

  // If not authenticated, show login message
  if (!user && !profile) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <p className="text-xl">
            Please log in to view your account information
          </p>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container mx-auto py-20 text-center">
          <p className="text-xl text-red-500">
            Error loading account information
          </p>
          <p className="mt-2">{error}</p>
          <button
            onClick={() => getUserProfile()}
            className="mt-4 bg-primary text-white px-4 py-2 rounded"
          >
            Try Again
          </button>
        </div>
      </Layout>
    );
  }

  // Use profile data if available, otherwise fallback to user data from auth
  const userData = profile || user;

  return (
    <Layout>
      <motion.div
        className="container mx-auto py-8 px-4 max-w-5xl"
        variants={pageVariants}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          className="text-3xl font-bold mb-6 text-gray-800"
          variants={itemVariants}
        >
          My Account
        </motion.h1>

        {/* Tab Navigation */}
        <motion.div
          className="mb-8 border-b border-gray-200"
          variants={itemVariants}
        >
          <div className="flex space-x-6">
            <button
              className={`pb-4 px-2 font-medium text-lg relative ${
                activeTab === 'profile'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('profile')}
            >
              Profile
              {activeTab === 'profile' && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeTab"
                />
              )}
            </button>
            <button
              className={`pb-4 px-2 font-medium text-lg relative ${
                activeTab === 'security'
                  ? 'text-primary border-b-2 border-primary'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('security')}
            >
              Security
              {activeTab === 'security' && (
                <motion.div
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                  layoutId="activeTab"
                />
              )}
            </button>
          </div>
        </motion.div>

        {/* Profile Section */}
        {activeTab === 'profile' && (
          <motion.div
            className="bg-white rounded-xl shadow-sm p-6 mb-8"
            variants={cardVariants}
          >
            <div className="flex justify-between items-center mb-6">
              <motion.h2
                className="text-xl font-semibold text-gray-800 flex items-center"
                variants={itemVariants}
              >
                <FiUser className="mr-2 text-primary" /> Personal Information
              </motion.h2>

              {!isEditingProfile ? (
                <motion.button
                  className="flex items-center text-primary hover:text-primary-dark transition-colors"
                  onClick={() => setIsEditingProfile(true)}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FiEdit2 className="mr-1" /> Edit
                </motion.button>
              ) : (
                <motion.button
                  className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={() => setIsEditingProfile(false)}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FiX className="mr-1" /> Cancel
                </motion.button>
              )}
            </div>

            {userData && (
              <form onSubmit={handleProfileSubmit(onProfileSave)}>
                {/* Profile Image Section */}
                <motion.div variants={itemVariants} className="mb-6">
                  <h3 className="text-lg font-semibold mb-4 flex items-center">
                    <FiImage className="mr-2 text-primary" /> Profile Picture
                  </h3>

                  {isEditingProfile ? (
                    <ImageUploader
                      onImageChange={handleImageUpdate}
                      initialImage={profileImage}
                      entityType="profile"
                    />
                  ) : (
                    <div className="w-full flex justify-center">
                      <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200 relative">
                        {profileImage ? (
                          <img
                            src={profileImage}
                            alt="Profile"
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <FiUser className="text-4xl text-gray-400" />
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div variants={itemVariants}>
                    <Input
                      label="First Name"
                      placeholder="Enter your first name"
                      name="firstName"
                      register={registerProfile('firstName', {
                        required: 'First name is required',
                      })}
                      errors={profileErrors}
                      required
                      disabled={!isEditingProfile}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Input
                      label="Last Name"
                      placeholder="Enter your last name"
                      name="lastName"
                      register={registerProfile('lastName', {
                        required: 'Last name is required',
                      })}
                      errors={profileErrors}
                      required
                      disabled={!isEditingProfile}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Input
                      label="Display Name"
                      placeholder="Enter your display name"
                      name="displayName"
                      register={registerProfile('displayName', {
                        required: 'Display name is required',
                      })}
                      errors={profileErrors}
                      required
                      disabled={!isEditingProfile}
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Input
                      label="Email Address"
                      placeholder="Enter your email"
                      name="email"
                      register={registerProfile('email', {
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address',
                        },
                      })}
                      errors={profileErrors}
                      required
                      disabled={true}
                    />
                  </motion.div>
                </div>
                {isEditingProfile && (
                  <motion.button
                    type="submit"
                    className="bg-primary mt-4 text-white px-6 py-2 rounded-lg flex items-center shadow-sm hover:shadow-md"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    disabled={isLoading}
                  >
                    <FiSave className="mr-2" />
                    {profileLoading ? <Spinner /> : 'Save Changes'}
                  </motion.button>
                )}
              </form>
            )}
          </motion.div>
        )}

        {/* Security Section */}
        {activeTab === 'security' && (
          <motion.div
            className="bg-white rounded-xl shadow-sm p-6"
            variants={cardVariants}
          >
            <div className="flex justify-between items-center mb-6">
              <motion.h2
                className="text-xl font-semibold text-gray-800 flex items-center"
                variants={itemVariants}
              >
                <FiLock className="mr-2 text-primary" /> Password & Security
              </motion.h2>

              {!isChangingPassword ? (
                <motion.button
                  className="flex items-center text-primary hover:text-primary-dark transition-colors"
                  onClick={() => setIsChangingPassword(true)}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FiEdit2 className="mr-1" /> Change Password
                </motion.button>
              ) : (
                <motion.button
                  className="flex items-center text-gray-500 hover:text-gray-700 transition-colors"
                  onClick={() => {
                    setIsChangingPassword(false);
                    resetPassword();
                  }}
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FiX className="mr-1" /> Cancel
                </motion.button>
              )}
            </div>

            {isChangingPassword ? (
              <form onSubmit={handlePasswordSubmit(onPasswordChange)}>
                <div className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Input
                      label="Current Password"
                      placeholder="Enter your current password"
                      name="currentPassword"
                      type="password"
                      register={registerPassword('currentPassword', {
                        required: 'Current password is required',
                      })}
                      errors={passwordErrors}
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Input
                      label="New Password"
                      placeholder="Enter your new password"
                      name="newPassword"
                      type="password"
                      register={registerPassword('newPassword', {
                        required: 'New password is required',
                        minLength: {
                          value: 8,
                          message: 'Password must be at least 8 characters',
                        },
                        pattern: {
                          value:
                            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                          message:
                            'Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character',
                        },
                        validate: (value, formValues) =>
                          value !== formValues.currentPassword ||
                          'New password must be different from current password',
                      })}
                      errors={passwordErrors}
                      required
                    />
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Input
                      label="Confirm New Password"
                      placeholder="Confirm your new password"
                      name="confirmPassword"
                      type="password"
                      register={registerPassword('confirmPassword', {
                        required: 'Please confirm your password',
                        validate: (value, formValues) =>
                          value === formValues.newPassword ||
                          "Passwords don't match",
                      })}
                      errors={passwordErrors}
                      required
                    />
                  </motion.div>
                </div>

                <motion.div
                  className="mt-6 flex justify-end"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <motion.button
                    type="submit"
                    className="bg-primary text-white px-6 py-2 rounded-lg flex items-center shadow-sm hover:shadow-md"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                  >
                    <FiSave className="mr-2" />
                    {profileLoading ? <Spinner /> : 'Update Password'}
                  </motion.button>
                </motion.div>
              </form>
            ) : (
              <motion.div
                className="p-6 border border-gray-200 rounded-lg bg-gray-50"
                variants={itemVariants}
              >
                <p className="text-gray-600">Your account security settings</p>
                <div className="mt-4 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Email Verification</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        userData?.emailVerified
                          ? 'bg-green-100 text-green-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {userData?.emailVerified ? 'Verified' : 'Not Verified'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Account Status</span>
                    <span
                      className={`px-2 py-1 rounded text-xs ${
                        userData?.status === 'active'
                          ? 'bg-green-100 text-green-800'
                          : userData?.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {userData?.status
                        ? userData.status.charAt(0).toUpperCase() +
                          userData.status.slice(1)
                        : 'Unknown'}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-700">Account Role</span>
                    <span className="px-2 py-1 rounded text-xs bg-blue-100 text-blue-800">
                      {userData?.role
                        ? userData.role.charAt(0).toUpperCase() +
                          userData.role.slice(1)
                        : 'User'}
                    </span>
                  </div>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </motion.div>
    </Layout>
  );
};

export default AccountPage;
