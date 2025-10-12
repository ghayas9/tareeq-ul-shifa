"use client";
import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';

interface ZoomableImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  zoomLevel?: number;
  unoptimized?: boolean;
}

const ZoomableImage: React.FC<ZoomableImageProps> = ({
  src,
  alt,
  width = 300,
  height = 300,
  className = "",
  zoomLevel = 3,
  unoptimized = false,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [zoomPreviewPosition, setZoomPreviewPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);
  const zoomPreviewRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;

    const rect = imageRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    setMousePosition({ x, y });

    // Calculate zoom preview position (Amazon-style: show to the right)
    const previewX = rect.right + 20; // 20px to the right of the image
    const previewY = Math.min(
      Math.max(rect.top, 20), // Don't go above 20px from top
      window.innerHeight - 400 - 20 // Don't go below viewport (400px preview height + 20px margin)
    );

    setZoomPreviewPosition({ x: previewX, y: previewY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  // Calculate the zoomed image position based on mouse position
  const getZoomedImagePosition = () => {
    if (!isHovered) return { x: 0, y: 0 };
    
    // Calculate the offset to show the correct part of the zoomed image
    const offsetX = (mousePosition.x / 100) * (width * zoomLevel - width);
    const offsetY = (mousePosition.y / 100) * (height * zoomLevel - height);
    
    return {
      x: -offsetX,
      y: -offsetY,
    };
  };

  const zoomedPosition = getZoomedImagePosition();

  return (
    <>
      <div
        ref={imageRef}
        className={`relative overflow-hidden cursor-crosshair group ${className}`}
        onMouseMove={handleMouseMove}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        // style={{
        //   width: width,
        //   height: height,
        // }}
      >
        <img
          src={src}
          alt={alt}
          // width={width}
          // height={height}
          className="w-full h-full object-contain"
          // unoptimized={unoptimized}
        />
        
        {/* Hover overlay with crosshair */}
        {isHovered && (
          <>
            {/* Crosshair lines */}
            <div
              className="absolute pointer-events-none w-full h-0.5 bg-red-500 opacity-50"
              style={{ top: `${mousePosition.y}%` }}
            />
            <div
              className="absolute pointer-events-none h-full w-0.5 bg-red-500 opacity-50"
              style={{ left: `${mousePosition.x}%` }}
            />
            
            {/* Crosshair center dot */}
            <div
              className="absolute pointer-events-none w-3 h-3 border-2 border-red-500 rounded-full bg-red-500 bg-opacity-30"
              style={{
                left: `${mousePosition.x}%`,
                top: `${mousePosition.y}%`,
                transform: 'translate(-50%, -50%)',
              }}
            />
          </>
        )}
      </div>

      {/* Amazon-style Zoom Preview Panel */}
      {isHovered && (
        <div
          ref={zoomPreviewRef}
          className="fixed z-50 bg-white border border-gray-300 rounded-lg shadow-2xl overflow-hidden"
          style={{
            left: zoomPreviewPosition.x,
            top: zoomPreviewPosition.y,
            width: 400,
            height: 400,
          }}
        >
          <div className="relative w-full h-full overflow-hidden">
            <div
              className="absolute transition-transform duration-100 ease-out"
              style={{
                transform: `translate(${zoomedPosition.x}px, ${zoomedPosition.y}px)`,
                width: width * zoomLevel,
                height: height * zoomLevel,
              }}
            >
              <Image
                src={src}
                alt={alt}
                width={width * zoomLevel}
                height={height * zoomLevel}
                className="w-full h-full object-contain"
                unoptimized={unoptimized}
              />
            </div>
            
            {/* Zoom level indicator */}
            <div className="absolute top-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded-full">
              🔍 {zoomLevel}x Zoom
            </div>
            
            {/* Instructions */}
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
              Hover to zoom
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ZoomableImage;
