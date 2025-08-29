import React, { useState } from "react";
import { Bell, Menu, X } from "lucide-react"; // Added Menu + X icons
import {Link} from 'react-router-dom';
import "../../App.css";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-white shadow-sm">
      <div className="flex items-center justify-between px-6 py-3">
        {/* Left - Logo */}
        <div className="flex items-center gap-2 text-teal-500 font-bold text-xl">
          <span className="text-2xl">*</span> Logo
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/" className="hover:text-teal-500 font-manrope">
            Home
          </Link>
          <Link to="/events" className="hover:text-teal-500 transition font-manrope">
            Events
          </Link>
          <Link to="/expenses" className="hover:text-teal-500 transition font-manrope">
            Expenses
          </Link>
          <Link to="/sports" className="hover:text-teal-500 transition font-manrope">
            Sports
          </Link>
          <Link to="/reports" className="hover:text-teal-500 transition font-manrope">
            Reports
          </Link>
          
        </nav>

        {/* Right - Notification + User (Desktop) */}
        <div className="hidden md:flex items-center gap-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-teal-100"></div>
            <span className="text-sm text-gray-700 font-medium font-manrope">
              Venkateshchamarthi413@gmail.com
            </span>
           
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 rounded-lg hover:bg-gray-100"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? (
            <X className="w-6 h-6 text-gray-700" />
          ) : (
            <Menu className="w-6 h-6 text-gray-700" />
          )}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-md border-t">
          <nav className="flex flex-col px-6 py-4 space-y-4 text-gray-700 font-medium">
            <Link to="/dashboard" className="text-teal-500 font-manrope">
              Dashboard
            </Link>
            <Link to="/events" className="hover:text-teal-500 transition font-manrope">
              Events
            </Link>
            <Link to="/expenses" className="hover:text-teal-500 transition font-manrope">
              Expenses
            </Link>
            <Link to="/reports" className="hover:text-teal-500 transition font-manrope">
              Reports
            </Link>
            <Link to="/sports" className="hover:text-teal-500 transition font-manrope">
              Sports
            </Link>

            {/* Mobile User Section */}
            <div className="flex items-center gap-2 pt-4 border-t">
              <div className="w-8 h-8 rounded-full bg-teal-100"></div>
              <span className="text-sm text-gray-700 font-medium font-manrope">
                Venkateshchamarthi413@gmail.com
              </span>
              <button className="ml-auto p-2 rounded-full hover:bg-gray-100">
                <Bell className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
