"use client"

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FaBars,
  FaTimes,
  FaLink,
  FaUserCircle,
  FaChartLine,
} from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed w-full z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white shadow-md py-2"
          : "bg-white/90 backdrop-blur-sm py-4"
      }`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <Link href="/" className="flex items-center">
              <FaLink className="h-6 w-6 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                TinyURL
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 items-center">
            <Link
              href="#tool-info"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Features
            </Link>
            <Link
              href="/analytics"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors flex items-center"
            >
              <FaChartLine className="mr-1" /> Analytics
            </Link>
            <Link
              href="/pricing"
              className="text-gray-700 hover:text-indigo-600 px-3 py-2 text-sm font-medium transition-colors"
            >
              Pricing
            </Link>
            <div className="flex space-x-4 ml-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-indigo-600 px-4 py-2 text-sm font-medium transition-colors flex items-center"
              >
                <FaUserCircle className="mr-1" /> Log In
              </Link>
              <Link
                href="/signup"
                className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors flex items-center"
              >
                Sign Up <FiExternalLink className="ml-1" />
              </Link>
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-indigo-600 focus:outline-none"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? (
                <FaTimes className="block h-6 w-6" />
              ) : (
                <FaBars className="block h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isOpen && isClient && (
        <div className="md:hidden bg-white shadow-lg rounded-b-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            <Link
              href="/features"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Features
            </Link>
            <Link
              href="/analytics"
              className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 flex items-center"
              onClick={() => setIsOpen(false)}
            >
              <FaChartLine className="mr-2" /> Analytics
            </Link>
            <Link
              href="/pricing"
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50"
              onClick={() => setIsOpen(false)}
            >
              Pricing
            </Link>
            <div className="pt-4 pb-2 border-t border-gray-200">
              <Link
                href="/login"
                className="px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-indigo-600 hover:bg-gray-50 flex items-center"
                onClick={() => setIsOpen(false)}
              >
                <FaUserCircle className="mr-2" /> Log In
              </Link>
              <Link
                href="/signup"
                className="mt-2 block w-full px-3 py-2 rounded-md text-base font-medium text-center text-white bg-indigo-600 hover:bg-indigo-700"
                onClick={() => setIsOpen(false)}
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
