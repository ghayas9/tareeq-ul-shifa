// // // src/components/common/ImageViewer.tsx
// // import React, { useState, useRef, useEffect } from 'react';
// // import { IoClose, IoAdd, IoRemove } from 'react-icons/io5';
// // import { MdDownload } from 'react-icons/md';

// // interface ImageViewerProps {
// //   imageUrl: string;
// //   alt?: string;
// //   isOpen: boolean;
// //   onClose: () => void;
// // }

// // const ImageViewer: React.FC<ImageViewerProps> = ({
// //   imageUrl,
// //   alt = 'Image',
// //   isOpen,
// //   onClose,
// // }) => {
// //   const [scale, setScale] = useState(1);
// //   const [position, setPosition] = useState({ x: 0, y: 0 });
// //   const [isDragging, setIsDragging] = useState(false);
// //   const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
// //   const imageRef = useRef<HTMLDivElement>(null);

// //   // Reset zoom and position when the image changes or viewer opens
// //   useEffect(() => {
// //     if (isOpen) {
// //       setScale(1);
// //       setPosition({ x: 0, y: 0 });
// //     }
// //   }, [imageUrl, isOpen]);

// //   // Handle keyboard events (Escape to close, +/- to zoom)
// //   useEffect(() => {
// //     if (!isOpen) return;

// //     const handleKeyDown = (e: KeyboardEvent) => {
// //       if (e.key === 'Escape') {
// //         onClose();
// //       } else if (e.key === '+' || e.key === '=') {
// //         handleZoomIn();
// //       } else if (e.key === '-' || e.key === '_') {
// //         handleZoomOut();
// //       }
// //     };

// //     window.addEventListener('keydown', handleKeyDown);
// //     return () => {
// //       window.removeEventListener('keydown', handleKeyDown);
// //     };
// //   }, [isOpen, onClose]);

// //   // Prevent scrolling while the viewer is open
// //   useEffect(() => {
// //     if (isOpen) {
// //       document.body.style.overflow = 'hidden';
// //     } else {
// //       document.body.style.overflow = '';
// //     }
// //     return () => {
// //       document.body.style.overflow = '';
// //     };
// //   }, [isOpen]);

// //   if (!isOpen) return null;

// //   const handleZoomIn = () => {
// //     setScale(prev => Math.min(prev + 0.25, 3)); // Limit max zoom to 3x
// //   };

// //   const handleZoomOut = () => {
// //     setScale(prev => Math.max(prev - 0.25, 0.5)); // Limit min zoom to 0.5x
// //   };

// //   const handleMouseDown = (e: React.MouseEvent) => {
// //     setIsDragging(true);
// //     setDragStart({
// //       x: e.clientX - position.x,
// //       y: e.clientY - position.y,
// //     });
// //   };

// //   const handleMouseMove = (e: React.MouseEvent) => {
// //     if (isDragging) {
// //       setPosition({
// //         x: e.clientX - dragStart.x,
// //         y: e.clientY - dragStart.y,
// //       });
// //     }
// //   };

// //   const handleMouseUp = () => {
// //     setIsDragging(false);
// //   };

// //   const handleDownload = () => {
// //     // Create a download link
// //     const link = document.createElement('a');
// //     link.href = imageUrl;
// //     link.download = 'prescription-image';
// //     document.body.appendChild(link);
// //     link.click();
// //     document.body.removeChild(link);
// //   };

// //   return (
// //     <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center">
// //       {/* Controls */}
// //       <div className="absolute top-4 right-4 z-50 flex gap-3">
// //         <button
// //           className="bg-white rounded-full p-2 text-gray-800 hover:bg-gray-200 transition"
// //           onClick={handleZoomIn}
// //           aria-label="Zoom in"
// //         >
// //           <IoAdd size={20} />
// //         </button>
// //         <button
// //           className="bg-white rounded-full p-2 text-gray-800 hover:bg-gray-200 transition"
// //           onClick={handleZoomOut}
// //           aria-label="Zoom out"
// //         >
// //           <IoRemove size={20} />
// //         </button>
// //         <button
// //           className="bg-white rounded-full p-2 text-gray-800 hover:bg-gray-200 transition"
// //           onClick={handleDownload}
// //           aria-label="Download image"
// //         >
// //           <MdDownload size={20} />
// //         </button>
// //         <button
// //           className="bg-white rounded-full p-2 text-gray-800 hover:bg-gray-200 transition"
// //           onClick={onClose}
// //           aria-label="Close"
// //         >
// //           <IoClose size={20} />
// //         </button>
// //       </div>

// //       {/* Image container */}
// //       <div
// //         ref={imageRef}
// //         className="relative w-full h-full overflow-hidden cursor-move"
// //         onMouseDown={handleMouseDown}
// //         onMouseMove={handleMouseMove}
// //         onMouseUp={handleMouseUp}
// //         onMouseLeave={handleMouseUp}
// //       >
// //         <div
// //           className="absolute transform-origin-center transition-transform duration-100"
// //           style={{
// //             transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
// //             transformOrigin: 'center',
// //             maxWidth: '100%',
// //             maxHeight: '100%',
// //             display: 'flex',
// //             justifyContent: 'center',
// //             alignItems: 'center',
// //             left: '50%',
// //             top: '50%',
// //             marginLeft: '-50%',
// //             marginTop: '-50%',
// //           }}
// //         >
// //           <img
// //             src={imageUrl}
// //             alt={alt}
// //             className="max-w-[90vw] max-h-[90vh] object-contain"
// //             style={{ pointerEvents: 'none' }}
// //             draggable={false}
// //           />
// //         </div>
// //       </div>

// //       {/* Instructions */}
// //       <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-sm bg-black bg-opacity-50 px-4 py-2 rounded-full">
// //         Use mouse to drag, buttons or +/- keys to zoom, ESC to close
// //       </div>
// //     </div>
// //   );
// // };

// // export default ImageViewer;

// // src/components/common/SimpleImageViewer.tsx
// import React from 'react';
// import { IoClose } from 'react-icons/io5';

// interface SimpleImageViewerProps {
//   imageUrl: string;
//   isOpen: boolean;
//   onClose: () => void;
// }

// const ImageViewer: React.FC<SimpleImageViewerProps> = ({
//   imageUrl,
//   isOpen,
//   onClose,
// }) => {
//   if (!isOpen) return null;

//   console.log('SimpleImageViewer rendering with URL:', imageUrl);

//   return (
//     <div className="fixed inset-0 z-50 bg-black bg-opacity-75 flex items-center justify-center p-4">
//       <div className="relative bg-white rounded-lg p-2 max-w-3xl max-h-[90vh] overflow-auto">
//         <button
//           className="absolute top-2 right-2 bg-gray-200 rounded-full p-1 text-gray-800 hover:bg-gray-300"
//           onClick={onClose}
//           aria-label="Close"
//         >
//           <IoClose size={24} />
//         </button>
        
//         <div className="flex justify-center items-center p-4">
//           <img 
//             src={imageUrl} 
//             alt="Prescription" 
//             className="max-w-full max-h-[80vh] object-contain"
//             onError={(e) => {
//               console.error('Image failed to load:', imageUrl);
//               alert(`Failed to load image: ${imageUrl}`);
//               (e.target as HTMLImageElement).src = '/images/placeholder.jpg';
//             }}
//           />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ImageViewer;

// src/components/common/LightboxViewer.tsx
import React from 'react';
import Lightbox from 'yet-another-react-lightbox';
import Zoom from 'yet-another-react-lightbox/plugins/zoom';
import Thumbnails from 'yet-another-react-lightbox/plugins/thumbnails';
import 'yet-another-react-lightbox/styles.css';
import 'yet-another-react-lightbox/plugins/thumbnails.css';

interface LightboxViewerProps {
  imageUrl: string;
  isOpen: boolean;
  onClose: () => void;
}

const ImageViewer: React.FC<LightboxViewerProps> = ({
  imageUrl,
  isOpen,
  onClose,
}) => {
  // Return null if not open or no image URL
  if (!isOpen || !imageUrl) {
    return null;
  }

  // Log the image URL for debugging
  console.log('Opening LightboxViewer with URL:', imageUrl);

  return (
    <Lightbox
      open={isOpen}
      close={onClose}
      slides={[{ src: imageUrl }]}
      plugins={[Zoom, Thumbnails]}
      zoom={{
        maxZoomPixelRatio: 5,
        zoomInMultiplier: 2,
      }}
      carousel={{
        finite: true, // Only one image, so make carousel finite
      }}
      render={{
        buttonPrev: () => null, // Hide prev button since we have only one image
        buttonNext: () => null, // Hide next button since we have only one image
      }}
    />
  );
};

export default ImageViewer;
