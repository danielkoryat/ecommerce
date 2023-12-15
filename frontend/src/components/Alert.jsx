import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';

const Alert = ({ message, type }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Define color classes based on the type of alert
  const colorClasses = type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';

  useEffect(() => {
    if (message) {
      // Show the alert
      setIsOpen(true);
      // Set a timeout to hide the alert after 3 seconds
      const timer = setTimeout(() => {
        setIsOpen(false);
      }, 3000);
      // Clear the timeout if the component is unmounted
      return () => clearTimeout(timer);
    }
  }, [message]);

  // If there's no message, don't render the component
  if (!message) {
    return null;
  }

  return (
    <Transition
      show={isOpen}
      enter="transition ease-out duration-300"
      enterFrom="transform -translate-y-full opacity-0"
      enterTo="transform translate-y-0 opacity-100"
      leave="transition ease-in duration-300"
      leaveFrom="transform translate-y-0 opacity-100"
      leaveTo="transform -translate-y-full opacity-0"
    >
      <div
        className={`fixed top-0 inset-x-0 p-4 ${colorClasses} shadow-md`}
        role="alert"
      >
        <div className="flex justify-between items-center">
          <span>{message}</span>
          <button
            onClick={() => setIsOpen(false)}
            className="text-lg font-semibold"
          >
            &times;
          </button>
        </div>
      </div>
    </Transition>
  );
};

alert.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(['success', 'error']).isRequired
};

export default Alert;