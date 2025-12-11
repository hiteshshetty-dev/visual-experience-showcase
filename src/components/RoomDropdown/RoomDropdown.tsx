'use client';
import React, { useState } from 'react';
import { type Cslptag } from '@contentstack/studio-react';

interface RoomOption {
  title: string;
  $title: Cslptag;
  link: string;
}

interface RoomDropdownProps {
  roomOptions: RoomOption[];
}

const RoomDropdown = (props: RoomDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block w-[127px]" composable-node-id="1b70b1e8-b785-4da6-b9ab-60c52f5613ef">
      <div className="flex items-center justify-center h-6 px-5" composable-node-id="05ea522f-8d68-405f-8383-68ed475ebbcc">
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-center w-full"
          aria-expanded={isOpen}
          aria-haspopup="true"
        >
          <div className="flex items-center justify-center w-[59px] h-6" composable-node-id="62472d6b-ca21-45b4-a***REDACTED***91531b5e3">
            <span 
              className="inline-block w-[59px] h-6 font-['Poppins',sans-serif] font-normal text-base leading-normal text-[rgba(64,64,64,1)] md:text-[15px] sm:text-sm"
              composable-node-id="bec786ce-26b8-4019-bded-18ed7a43f736"
            >
              <span composable-node-id="f5ee32d6-7a6c-4006-a4e6-b6d52327d1da">ROOMS</span>
            </span>
          </div>
          <div 
            className="flex items-start justify-start w-6 h-6 bg-white ml-1 p-2 px-[5px]"
            composable-node-id="d9e0f566-1124-4e4c-9918-eb7238e6510f"
          >
            <svg 
              width="14" 
              height="8" 
              viewBox="0 0 14 8" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
              className={`w-[14px] h-2 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              composable-node-id="181b3083-08e6-4629-9182-394da670e4ec"
            >
              <path 
                d="M1 1L7 7L13 1" 
                stroke="rgba(64, 64, 64, 1)" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                composable-node-id="d39d3ffc-71e0-4e2e-995e-6b7307eec8e7"
              />
            </svg>
          </div>
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 z-50">
          <ul className="py-1">
            {props.roomOptions.map((option, index) => (
              <li key={index}>
                <a
                  href={option.link}
                  className="block px-4 py-2 text-sm font-['Poppins',sans-serif] text-[rgba(64,64,64,1)] hover:bg-gray-100 transition-colors"
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