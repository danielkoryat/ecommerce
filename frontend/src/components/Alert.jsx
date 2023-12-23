import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearAlert } from '../app/alertSlice';
import PropTypes from 'prop-types';
import { Transition } from '@headlessui/react';

const Alert = () => {
  const { message, type, isOpen } = useSelector((state) => state.alert);
  const dispatch = useDispatch();

  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        dispatch(clearAlert());
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, dispatch]);

  if (!isOpen) {
    return null;
  }

  const colorClasses = type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700';

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
            onClick={() => dispatch(clearAlert())}
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