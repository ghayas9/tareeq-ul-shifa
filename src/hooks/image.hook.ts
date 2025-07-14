// src/hooks/image.hook.ts
import { useState } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

export const useImage = () => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  /**
   * Upload an image file to the server
   * @param file The image file to upload
   * @param entityType Optional entity type (category, product, etc.)
   * @returns The uploaded image URL and ID
   */
  const uploadImage = async (file: File, entityType: string = '') => {
    setIsUploading(true);
    setUploadError(null);

    try {
      // Create FormData
      const formData = new FormData();
      formData.append('image', file);

      // Only add entityType if it's provided
      if (entityType) {
        formData.append('entityType', entityType);
      }

      const response = await axios.post(
        'https://tareeq-ul-shifa-server-three.vercel.app/api/v1/upload',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      setIsUploading(false);
      toast.success(response?.data?.message);
      if (response.data && response.data.data) {
        return {
          url: response.data.data.url,
          id: response.data.data.id,
        };
      } else if (response.data) {
        return {
          url: response.data.url || response.data,
          id: response.data.id || '',
        };
      }

      throw new Error('Invalid response format from server');
    } catch (error: any) {
      toast.error(error);
      setIsUploading(false);
      const errorMessage =
        error.response?.data?.message || 'Failed to upload image';
      setUploadError(errorMessage);
      throw new Error(errorMessage);
    }
  };

  // Delete an uploaded image
  const deleteImage = async (imageId: string) => {
    try {
      await axios.delete(
        `https://tareeq-ul-shifa-server-three.vercel.app/api/v1/images/${imageId}`
      );
      return true;
    } catch (error) {
      console.error('Error deleting image:', error);
      return false;
    }
  };

  return {
    uploadImage,
    deleteImage,
    isUploading,
    uploadError,
  };
};
