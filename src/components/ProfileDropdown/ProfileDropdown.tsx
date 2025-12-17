'use client';
import React, { useState, useRef, useEffect } from 'react';
import { supabase } from '@/src/lib/supabase';
import { usePathname, useRouter } from 'next/navigation';
import Image from 'next/image';
import { User } from '@supabase/supabase-js';

interface ProfileDropdownProps {
  homepageIconSrc: string;
  defaultIconSrc: string;
  iconAlt?: string;
}

const ProfileDropdown = (props: ProfileDropdownProps) => {
  const { homepageIconSrc, defaultIconSrc, iconAlt = 'Profile' } = props;

  const singOut = async () => {
    await supabase.auth.signOut();
    setIsUserLoggedIn(false);
    setUser(null);
  };

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const [isUserLoggedIn, setIsUserLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  const isHomepage = pathname === '/en-us' || pathname === '';

  useEffect(() => {
    const checkUserLoggedIn = async () => {
      const { data } = await supabase.auth.getUser();
      setIsUserLoggedIn(!!data.user);
      setUser(data.user);
    };
    checkUserLoggedIn();
  }, []);

  // Determine which icon src to use based on current page
  const currentIconSrc = isHomepage ? homepageIconSrc : defaultIconSrc;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const profileOptions = [
    {
      title: 'My Profile',
      onClick: () => {
        router.push(`${pathname}/profiles`);
      },
    },
    {
      title: 'Sign Out',
      onClick: async () => {
        await singOut();
        router.push('/');
      },
    },
  ];

  return (
    <div ref={dropdownRef} className="relative inline-block">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300"
        aria-expanded={isOpen}
        aria-haspopup="true"
        aria-label="Profile menu"
      >
        <Image
          width={32}
          height={32}
          src={currentIconSrc}
          alt={iconAlt}
        />
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 min-w-[180px] bg-white shadow-lg rounded-md border border-gray-200 z-50">
          <ul className="py-1">
            {isUserLoggedIn && (
              <li>
                <a className="block px-4 py-2 text-sm font-['Poppins',sans-serif] text-[rgba(64,64,64,1)] hover:bg-gray-100 transition-colors">
                  {user?.email}
                </a>
              </li>
            )}
            {isUserLoggedIn ? (
              profileOptions.map((option, index) => (
                <li key={index}>
                  <a
                    onClick={option.onClick}
                    className="block px-4 py-2 text-sm font-['Poppins',sans-serif] text-[rgba(64,64,64,1)] hover:bg-gray-100 transition-colors"
                  >
                    {option.title}
                  </a>
                </li>
              ))
            ) : (
              <li className="block px-4 py-2 text-sm font-['Poppins',sans-serif] text-[rgba(64,64,64,1)] hover:bg-gray-100 transition-colors">
                <a onClick={() => router.push(`${pathname}/account/login`)}>
                  Login
                </a>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;
