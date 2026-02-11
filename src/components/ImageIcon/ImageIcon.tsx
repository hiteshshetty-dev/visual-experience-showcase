'use client';

import Image from 'next/image';
import { usePathname, useParams } from 'next/navigation';

interface ImageIconProps {
  iconType: string;
  homepageSrc: string;
  defaultSrc: string;
  homepageProfileSrc: string;
  defaultProfileSrc: string;
  alt?: string;
}

const ImageIcon = (props: ImageIconProps) => {
  const { iconType, homepageSrc, defaultSrc, homepageProfileSrc, defaultProfileSrc, alt = 'Logo'} = props;
  const pathname = usePathname();
  const params = useParams();
  const locale = (params.locale as string) || 'en-us';

  // Check if current path is homepage (base URL)
  const isHomepage = pathname === `/${locale}` || pathname === '';

  let currentSrc = '';
  if (iconType === 'logo') {
    currentSrc = isHomepage ? homepageSrc : defaultSrc;
  } else if (iconType === 'profile') {
    currentSrc = isHomepage ? homepageProfileSrc : defaultProfileSrc;
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
