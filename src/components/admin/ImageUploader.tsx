// src/components/PayementImageUplodar.tsx
import { useState, useRef, useEffect } from 'react';
import { PayementDrawicon } from '../icons/Icons';
import { IoCloseCircle } from 'react-icons/io5';
import Image from 'next/image';
import { useImage } from '@/hooks/image.hook';

interface ImageUploaderProps {
  onImageChange?: (imageUrl: string | null) => void;
  initialImage?: string | null;
  entityType?: string;
}

const ImageUploader = ({
  onImageChange,
  initialImage = null,
  entityType = '', // Default to empty string
}: ImageUploaderProps) => {
  const [image, setImage] = useState<string | null>(initialImage);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Use the image hook
  const { uploadImage, isUploading, uploadError } = useImage();

  // Update the image if initialImage changes (for editing)
  useEffect(() => {
    if (initialImage) {
      setImage(initialImage);
    }
  }, [initialImage]);

  // Clean up preview URLs when component unmounts
  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  const handleFileSelect = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      try {
        const tempUrl = URL.createObjectURL(file);
        setPreviewUrl(tempUrl);
        setImage(tempUrl);
        const result = await uploadImage(file, entityType);
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        if (!result.url) {
          throw new Error('No URL returned from server');
        }
        setImage(result.url);
        // Call the callback with the image URL
        if (onImageChange) {
          onImageChange(result.url);
        }
      } catch (error) {
        console.error('Error during upload process:', error);
        // Clear the preview if upload failed
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        setImage(null);

        if (onImageChange) {
          onImageChange(null);
        }
      }
    }
  };

  const handleDrop = async (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (event.dataTransfer.files && event.dataTransfer.files[0]) {
      const file = event.dataTransfer.files[0];

      try {
        // Create temporary URL for preview
        const tempUrl = URL.createObjectURL(file);
        setPreviewUrl(tempUrl);
        setImage(tempUrl);

        // Upload the file with entity type
        const result = await uploadImage(file, entityType);

        // Clean up preview URL
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        // Make sure we have a URL from the result
        if (!result.url) {
          throw new Error('No URL returned from server');
        }
        // Set the actual image URL
        setImage(result.url);

        // Call the callback with the image URL
        if (onImageChange) {
          onImageChange(result.url);
        }
      } catch (error) {
        console.error('Error uploading dropped image:', error);
        // Clear the preview if upload failed
        if (previewUrl) {
          URL.revokeObjectURL(previewUrl);
          setPreviewUrl(null);
        }
        setImage(null);

        if (onImageChange) {
          onImageChange(null);
        }
      }
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveImage = () => {
    // Clean up any preview URL
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
      setPreviewUrl(null);
    }

    setImage(null);

    // Call the callback if provided
    if (onImageChange) {
      onImageChange(null);
    }
  };

  return (
    <div className="bg-white w-full rounded-[10px] shadow-md px-6 py-4 mt-4">
      <h4 className="text-sm font-robotoSlab mb-2">
        Upload Image <span className="text-red-700">*</span>
      </h4>
      {uploadError && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded mb-4">
          {uploadError}
        </div>
      )}
      <div
        className={`w-full h-44 max-h-44 border rounded-[10px] shadow-lg flex flex-col items-center justify-center ${!image && !isUploading ? 'cursor-pointer' : ''} relative`}
        onClick={!image && !isUploading ? handleClick : undefined}
        onDrop={!isUploading ? handleDrop : undefined}
        onDragOver={(e) => e.preventDefault()}
      >
        {isUploading ? (
          <div className="flex flex-col items-center">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
            <p className="mt-2 font-robotoSlab">Uploading...</p>
          </div>
        ) : image ? (
          <div className="relative w-11/12 h-[80%] flex justify-center">
            <Image
              fill
              src={image}
              alt="Uploaded"
              className="max-w-full w-full h-full rounded-md object-cover"
            />

            <button
              type="button"
              className="absolute top-2 right-2 bg-white rounded-full p-1 shadow-md"
              onClick={handleRemoveImage}
            >
              <IoCloseCircle className="text-red-500 text-xl" />
            </button>
          </div>
        ) : (
          <>
            <PayementDrawicon />
            <p className="w-[159px] text-sm font-robotoSlab text-center mt-4">
              Drop your Image here or{' '}
              <span className="text-primary">click to browse</span>
            </p>
          </>
        )}
      </div>
      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />
    </div>
  );
};

export default ImageUploader;
