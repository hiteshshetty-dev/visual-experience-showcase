'use client';

import { usePathname } from 'next/navigation';
import Image from 'next/image';

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
    <Image
      className="logo-image"
      alt={alt}
      src={currentSrc}
      width={160}
      height={24}
    />
  );
};

export default ImageIcon;
