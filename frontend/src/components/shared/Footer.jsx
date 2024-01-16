import React from 'react';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-gray-200 text-gray-800 py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-center text-center md:text-left">
          <div className="w-full md:w-1/3 lg:w-1/4 p-4">
            <h5 className="uppercase mb-6 font-bold text-teal-700">Links</h5>
            <ul className="mb-4">
              <li className="mt-2">
                <a href="#" className="hover:underline text-teal-600">Home</a>
              </li>
              <li className="mt-2">
                <a href="#" className="hover:underline text-teal-600">About</a>
              </li>
              <li className="mt-2">
                <a href="#" className="hover:underline text-teal-600">Services</a>
              </li>
              <li className="mt-2">
                <a href="#" className="hover:underline text-teal-600">Contact</a>
              </li>
            </ul>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 p-4">
            <h5 className="uppercase mb-6 font-bold text-teal-700">Follow Us</h5>
            <div className="flex justify-center md:justify-start">
              <a href="#" className="text-teal-600 hover:text-teal-700 mr-6">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="text-teal-600 hover:text-teal-700 mr-6">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="text-teal-600 hover:text-teal-700 mr-6">
                <FaInstagram size={24} />
              </a>
              <a href="#" className="text-teal-600 hover:text-teal-700">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 p-4">
            <h5 className="uppercase mb-6 font-bold text-teal-700">Newsletter</h5>
            <div className="flex flex-wrap items-center justify-center md:justify-start">
              <input
                type="email"
                className="p-2 w-full md:w-auto bg-white text-gray-800 mb-2 md:mb-0 border border-teal-500 placeholder-teal-400"
                placeholder="Email Address"
              />
              <button className="p-2 w-full md:w-auto bg-teal-500 hover:bg-teal-600 text-white">
                Subscribe
              </button>
            </div>
          </div>
        </div>
        <div className="text-center pt-10 sm:pt-12 font-light flex items-center justify-center text-teal-700">
          © 2023 Your Company. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;