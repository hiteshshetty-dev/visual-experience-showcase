'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { type Cslptag } from '@contentstack/studio-react';
import { usePathname, useParams } from 'next/navigation';

interface LanguageOption {
  label: string;
  code: string;
  $label: Cslptag;
}

interface LanguageSelectorProps {
  languageOptions: LanguageOption[];
}

const LanguageSelector = (props: LanguageSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const params = useParams();
  const locale = (params.locale as string) || 'en-us';

  // Check if current path is homepage (base URL)
  const isHomepage = pathname === `/${locale}` || pathname === '';

  // Get the label for the selected language (case-insensitive comparison)
  const selectedLabel = props.languageOptions.find(
    (option) => option.code.toLowerCase() === locale.toLowerCase()
  )?.label || locale;

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Get the new pathname for a given locale
  const getLocalePath = (newLocale: string) => {
    return pathname.replace(`/${locale}`, `/${newLocale}`);
  };

  return (
    <div className="relative inline-block" composable-node-id="87a54185-2e3d-4b2a-8d66-7acacb7cc84c">
      <div 
        className="flex items-center justify-center cursor-pointer pr-5 relative"
        onClick={toggleDropdown}
        style={{
          width: '76px',
          height: '24px',
          minWidth: '10rem'
        }}
      >
        <span 
          className={`font-['Poppins'] text-base font-normal text-[rgba(64,64,64,1)] inline-block nav-text ${isHomepage ? 'nav-text' : ''}`}
          composable-node-id="cacc61b3-ed10-49d9-a077-bd8a689105ec"
        >
          {selectedLabel}
        </span>
        <div 
          className="flex items-start justify-start w-6 h-6 bg-white rounded-none relative ml-1"
          composable-node-id="b655e96f-0157-4c73-a***REDACTED***39769f697"
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
            className="absolute left-[5px] top-2"
            composable-node-id="9ff05b54-4f94-44bb-b74a-15651c301d36"
          >
            <path
              d="M1 1L7 7L13 1"
              stroke={isHomepage ? 'white' : 'rgba(64, 64, 64, 1)'}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className='nav-icon'
            />
          </svg>
        </div>
      </div>

      {isOpen && (
        <div 
          className="absolute top-full left-0 mt-1 bg-white border border-gray-200 rounded shadow-lg z-10 min-w-[120px]"
        >
          {props.languageOptions
            .filter((option) => option.code.toLowerCase() !== locale.toLowerCase())
            .map((option, index) => (
              <Link
                key={index}
                href={getLocalePath(option.code)}
                className="block px-4 py-2 hover:bg-gray-100 cursor-pointer font-['Poppins'] text-base text-[rgba(64,64,64,1)] no-underline"
                onClick={() => setIsOpen(false)}
                {...option.$label}
              >
                {option.label}
              </Link>
            ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;