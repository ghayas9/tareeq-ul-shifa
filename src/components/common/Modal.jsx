import React, { useEffect } from 'react';
import { animated, useTransition } from '@react-spring/web';

const Modal = ({
  show = false,
  onClose = () => {},
  style = {},
  modalContainer = '',
  children,
  className = '',
  closeClassName = '',
}) => {
  useEffect(() => {
    if (show) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  const transitions = useTransition(show, {
    from: { opacity: 0, transform: 'translateY(-40px)' },
    enter: { opacity: 1, transform: 'translateY(0px)' },
    leave: { opacity: 0, transform: 'translateY(-40px)' },
  });

  return transitions(
    (styles, item) =>
      item && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 z-20 flex justify-center items-center p-4"
          onClick={onClose}
        >
          <animated.div
            style={{ ...style, ...styles }}
            className={`${className} w-full relative max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-md shadow-lg z-30 flex flex-col scrollbar-hide`}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className={`absolute right-3 top-3  ${closeClassName}`}
              onClick={onClose}
            >
              X
            </button>
            <div className={`p-3 ${modalContainer}`}>{children}</div>
          </animated.div>
        </div>
      )
  );
};

export default Modal;
