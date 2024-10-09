// src/app/components/Navbar.jsx

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '@/app/pages/LinkedAiLogo.png'

const Navbar = () => {
  return (
    <nav className="bg-white text-black py-4 shadow">
      <div className="container mx-auto flex justify-between items-center px-4">
        <div className="text-lg font-semibold">
          <Link href="/" className="hover:text-gray-700">
          <Image
              src={logo}// Ensure logo.png is placed in the public directory
              alt="Logo"
              width={125} // Adjust as needed
              height={60} // Adjust as needed
              className="" // Responsive sizing
            />
          </Link>
        </div>
        <div className="space-x-4">
          <Link href="/" className="hover:text-gray-700">
            Home
          </Link>
          <Link href="/about" className="hover:text-gray-700">
            About
          </Link>
          <Link href="/contact" className="hover:text-gray-700">
            Contact
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
