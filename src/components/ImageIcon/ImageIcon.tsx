'use client';

import { usePathname } from 'next/navigation';
import { type Cslptag } from '@contentstack/studio-react';

interface ImageIconProps {
  iconType: string;
  homepageSrc: string;
  defaultSrc: string;
  hompageProfileSrc: string;
  defaultProfileSrc: string;
  alt?: string;
}

const ImageIcon = (props: ImageIconProps) => {
  const { iconType, homepageSrc, defaultSrc, hompageProfileSrc, defaultProfileSrc, alt = 'Logo'} = props;
  const pathname = usePathname();

  // Check if current path is homepage (base URL)
  const isHomepage = pathname === '/en-us' || pathname === '';

  let currentSrc = '';
  if (iconType === 'logo') {
    currentSrc = isHomepage ? homepageSrc : defaultSrc;
  } else if (iconType === 'profile') {
    currentSrc = isHomepage ? hompageProfileSrc : defaultProfileSrc;
  }

  return (
    <img
      className="logo-image"
      alt={alt}
      src={currentSrc}
    />
  );
};

export default ImageIcon;
