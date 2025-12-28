import { Cinzel } from 'next/font/google';
import { Poppins } from 'next/font/google';

export const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'], // optional
  variable: '--font-cinzel',
  display: 'swap',
});

export const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-poppins',
});
