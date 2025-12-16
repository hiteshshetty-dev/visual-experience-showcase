'use client';
import React, { useState, useRef, useEffect } from 'react';
import { type Cslptag } from '@contentstack/studio-react';
import { usePathname } from 'next/navigation';

interface ProfileOption {
  title: string;
  $title?: Cslptag;
  link: string;
}

interface ProfileDropdownProps {
  homepageIconSrc: string;
  defaultIconSrc: string;
  iconAlt?: string;
  profileOptions: ProfileOption[];
}

const ProfileDropdown = (props: ProfileDropdownProps) => {
  const { 
    homepageIconSrc, 
    defaultIconSrc, 
    iconAlt = 'Profile', 
    profileOptions = [] 
  } = props;
  
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  // Check if current path is homepage (base URL)
  const isHomepage = pathname === '/en-us' || pathname === '';

  // Determine which icon src to use based on current page
  const currentIconSrc = isHomepage ? homepageIconSrc : defaultIconSrc;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div 
      ref={dropdownRef}
      className="relative inline-block"
    >
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Profile menu"
      >
        <img
          src={currentIconSrc}
          alt={iconAlt}
          className="w-8 h-8 object-contain"
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 min-w-[180px] bg-white shadow-lg rounded-md border border-gray-200 z-50">
          <ul className="py-1">
            {profileOptions.map((option, index) => (
              <li key={index}>
                <a
                  href={option.link}
                  className="block px-4 py-2 text-sm font-['Poppins',sans-serif] text-[rgba(64,64,64,1)] hover:bg-gray-100 transition-colors"
                  {...(option.$title || {})}
                >
                  {option.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;

