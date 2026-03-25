'use client';
import React, { useState } from 'react';
import { type Cslptag } from '@contentstack/studio-react';
import { usePathname, useParams } from 'next/navigation';

interface RoomOption {
  title: string;
  $title: Cslptag;
  link: string;
}

interface RoomDropdownProps {
  roomsLabel: string;
  $roomsLabel?: Cslptag;
  roomOptions: RoomOption[];
}

const RoomDropdown = (props: RoomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const locale = (params.locale as string) || 'en-us';

  const isHomepage = pathname === `/${locale}` || pathname === '';

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block w-[127px]">
      <div className="flex items-center justify-center h-6 px-5">
        <button
          type="button"
          onClick={toggleDropdown}
          className="flex items-center justify-center w-full"
          aria-expanded={isOpen}
          aria-haspopup="true"
          aria-label={props.roomsLabel}
        >
          <div className="flex items-center justify-center w-[59px] h-6">
            <span 
              className={`inline-block w-[59px] h-6 font-normal text-base leading-normal text-[rgba(64,64,64,1)] md:text-[15px] sm:text-sm nav-text ${isHomepage ? 'nav-text' : ''}`}
            >
              <span {...props.$roomsLabel}>{props.roomsLabel}</span>
            </span>
          </div>
          <div 
            className="flex items-start justify-start w-6 h-6 bg-white ml-1 p-2 px-[5px]"
            style={{
              background: 'transparent'
            }}
          >
            <svg 
              width="14" 
              height="8" 
              viewBox="0 0 14 8" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`w-[14px] h-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
            >
              <path 
                d="M1 1L7 7L13 1" 
                stroke={isHomepage ? 'white' : 'rgba(64, 64, 64, 1)'} 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </button>
      </div>

      {isOpen && (
        <div
          className="absolute top-full left-0 mt-1 w-full min-w-[150px] bg-white shadow-lg rounded-md border border-gray-200 z-50"
        >
          <ul className="py-1">
            {props.roomOptions.map((option, index) => (
              <li key={index}>
                <a
                  href={`/${locale}${option.link}`}
                  className="block px-4 py-2 text-sm text-[rgba(64,64,64,1)] hover:bg-gray-100 transition-colors"
                  {...option.$title}
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

export default RoomDropdown;