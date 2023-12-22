import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Transition } from '@headlessui/react';

const EditProductComponent = ({ product, isOpen }) => {
  const { register, handleSubmit, setValue, formState: { errors }, reset } = useForm();

  useEffect(() => {
    reset(product);
  }, [product, reset]);

  const onSubmit = (data) => {
    console.log('Form submitted', data);
    //TODO implamnent edit functionality and categorys
  };

  const categories = [
    'Electronics',
    'Clothing',
    'Shoes',
    'Accessories',
    'Sports',
    'Books',
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="pl-4 py-2">
      <div className="w-full max-w-2xl mx-auto">
        <Transition
          show={isOpen}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-y-0"
          enterTo="transform opacity-100 scale-y-100"
          leave="transition ease-in duration-300"
          leaveFrom="transform opacity-100 scale-y-100"
          leaveTo="transform opacity-0 scale-y-0"
        >
          <div className="border border-gray-200 p-6 rounded-md shadow-md">
            <div className="grid grid-cols-1 gap-6">
              <input
                {...register('name')}
                placeholder="Product Name"
                className="border-2 border-gray-200 p-2 rounded-md focus:border-blue-300 focus:ring-blue-200 transition"
              />
              <textarea
                {...register('description')}
                placeholder="Product Description"
                className="border-2 border-gray-200 p-2 rounded-md focus:border-blue-300 focus:ring-blue-200 transition"
              />
              <input
                {...register('price', { valueAsNumber: true })}
                type="number"
                placeholder="Price"
                className="border-2 border-gray-200 p-2 rounded-md focus:border-blue-300 focus:ring-blue-200 transition"
              />
              <input
                {...register('amount', { valueAsNumber: true })}
                type="number"
                placeholder="Amount"
                className="border-2 border-gray-200 p-2 rounded-md focus:border-blue-300 focus:ring-blue-200 transition"
              />
              <button
                type="submit"
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-shadow shadow-lg focus:outline-none"
              >
                Save Changes
              </button>
            </div>
          </div>
        </Transition>
      </div>
    </form>
  );
};

export default EditProductComponent;
