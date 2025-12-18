"use client";
import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { type Cslptag } from '@contentstack/studio-react';

interface CategoryItem {
  text: string;
  $text: Cslptag;
  uid: string;
}

interface CategoryGridProps {
  categories: CategoryItem[];
}

const CategoryGrid = (props: CategoryGridProps) => {
  const params = useParams();
  const locale = (params.locale as string) || 'en-us';

  return (
    <section className="w-full flex justify-center items-start px-20 py-10 box-border tablet:px-6 mobile:px-4">
      <div className="w-full max-w-[1280px] flex flex-col gap-8 tablet:gap-10 mobile:gap-8">
        <div className="grid grid-cols-4 gap-8 w-full tablet:grid-cols-2 tablet:gap-6 mobile:grid-cols-1 mobile:gap-4">
          {props.categories.map((category, index) => {
            const slug = category.text.toLowerCase().replace(/\s+/g, '-');
            return (
              <Link
                key={category.uid || index}
                href={`/${locale}/faq/${slug}`}
                className="bg-[rgba(232,228,218,1)] flex items-center justify-center p-4 min-h-[115px] box-border cursor-pointer transition-all duration-300 ease-in-out hover:bg-[rgba(8,145,178,1)] tablet:min-h-[100px] mobile:min-h-[80px] group no-underline"
                composable-node-id={category.uid}
              >
                <p
                  {...category.$text}
                  className="font-['Poppins',sans-serif] text-lg font-bold leading-8 tracking-[0.03em] uppercase text-center text-[rgba(64,64,64,1)] m-0 transition-colors duration-300 ease-in-out group-hover:text-white tablet:text-lg mobile:text-base mobile:leading-7"
                >
                  {category.text}
                </p>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;