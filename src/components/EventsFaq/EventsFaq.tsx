'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type Cslptag } from '@contentstack/studio-react';

interface FaqItem {
  question: string;
  $question: Cslptag;
  answer: string;
  $answer: Cslptag;
  uid: string;
  _metadata?: {
    uid?: string;
  };
}

interface EventsFaqProps {
  breadcrumbText1: string;
  $breadcrumbText1: Cslptag;
  breadcrumbText2: string;
  $breadcrumbText2: Cslptag;
  title: string;
  $title: Cslptag;
  faqItems: FaqItem[];
}

const EventsFaq = (props: EventsFaqProps) => {
  const router = useRouter();
  const [selectedItemUid, setSelectedItemUid] = useState<string | null>(null);

  const toggleItem = (uid: string) => {
    if (selectedItemUid === uid) {
      setSelectedItemUid(null); // Close if clicking the same item
    } else {
      setSelectedItemUid(uid); // Open the clicked item
    }
  };

  const selectedItem = props.faqItems.find(item => (item.uid || item?._metadata?.uid) === selectedItemUid);
  const otherItems = selectedItemUid 
    ? props.faqItems.filter(item => (item.uid || item?._metadata?.uid) !== selectedItemUid)
    : props.faqItems;

  return (
    <section className="flex items-start justify-center pt-10 pb-10 w-full max-w-[1920px] mx-auto">
      <div className="w-full max-w-[1280px] px-8 flex flex-col gap-8">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2.5 h-6">
          <p 
            className="font-['Poppins'] font-light text-sm leading-6 text-black m-0 cursor-pointer hover:underline"
            onClick={() => router.back()}
            {...props.$breadcrumbText1}
          >
            {props.breadcrumbText1}
          </p>
          <div className="w-6 h-6 flex items-center justify-center bg-white">
            <div className="w-3.5 h-2 bg-[#404040] -rotate-90" style={{ clipPath: 'polygon(50% 100%, 0 0, 100% 0)' }}></div>
          </div>
          <p 
            className="font-['Poppins'] font-light text-sm leading-6 text-black m-0"
            {...props.$breadcrumbText2}
          >
            {props.breadcrumbText2}
          </p>
        </div>

        {/* Content Container */}
        <div className="flex flex-col items-center gap-10">
          {/* Title */}
          <div>
            <h1 
              className="font-['Cinzel'] font-normal text-2xl md:text-[22px] md:leading-[30px] leading-8 text-center uppercase text-[#404040] m-0"
              {...props.$title}
            >
              {props.title}
            </h1>
          </div>

          {/* FAQ Layout - Conditional Rendering */}
          {!selectedItemUid ? (
            /* Default Grid View - 3 columns */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:gap-8 w-full">
              {props.faqItems.map((item) => (
                <div
                  key={item.uid || item?._metadata?.uid}
                  className="flex items-start gap-5 max-w-full lg:max-w-[384px] cursor-pointer"
                  onClick={() => toggleItem(item.uid || item?._metadata?.uid || '')}
                  composable-node-id={item.uid || item?._metadata?.uid || ''}
                >
                  {/* Icon */}
                  <div className="w-6 h-8 flex items-center justify-center bg-white flex-shrink-0">
                    <div 
                      className="w-[12.44px] h-[18.67px] bg-[#404040] transition-transform duration-300"
                      style={{ 
                        clipPath: 'polygon(100% 50%, 0 0, 0 100%)'
                      }}
                    ></div>
                  </div>

                  {/* Question Text */}
                  <p 
                    className="font-['Poppins'] font-light text-lg md:text-base md:leading-7 leading-8 text-[#404040] m-0 flex-1"
                    {...item.$question}
                  >
                    {item.question}
                  </p>
                </div>
              ))}
            </div>
          ) : (
            /* Split View - Selected on Left, Others on Right */
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 w-full">
              {/* Left Side - Selected Question & Answer */}
              <div className="flex-1 lg:max-w-[60%]">
                <div className="flex flex-col gap-6">
                  {/* Selected Question with Close Icon */}
                  <div
                    className="flex items-start gap-5 cursor-pointer"
                    onClick={() => toggleItem(selectedItem!.uid || selectedItem?._metadata?.uid || '')}
                    composable-node-id={selectedItem!.uid || selectedItem?._metadata?.uid || ''}
                  >
                    {/* Down Arrow Icon */}
                    <div className="w-6 h-8 flex items-center justify-center bg-white flex-shrink-0">
                      <div 
                        className="w-[12.44px] h-[18.67px] bg-[#404040] transition-transform duration-300"
                        style={{ 
                          clipPath: 'polygon(100% 50%, 0 0, 0 100%)',
                          transform: 'rotate(90deg)'
                        }}
                      ></div>
                    </div>

                    {/* Question Text */}
                    <h2 
                      className="font-['Poppins'] font-medium text-xl md:text-lg leading-8 text-[#404040] m-0 flex-1"
                      {...selectedItem!.$question}
                    >
                      {selectedItem!.question}
                    </h2>
                  </div>

                  {/* Answer */}
                  <div className="pl-11">
                    <p 
                      className="font-['Poppins'] font-light text-sm leading-6 text-[#404040] m-0"
                      {...selectedItem!.$answer}
                    >
                      {selectedItem!.answer}
                    </p>
                  </div>
                </div>
              </div>

              {/* Right Side - Other Questions List */}
              <div className="flex-1 lg:max-w-[40%]">
                <div className="flex flex-col gap-6">
                  {otherItems.map((item) => (
                    <div
                      key={item.uid || item?._metadata?.uid}
                      className="flex items-start gap-5 cursor-pointer"
                      onClick={() => toggleItem(item.uid || item?._metadata?.uid || '')}
                      composable-node-id={item.uid || item?._metadata?.uid || ''}
                    >
                      {/* Icon */}
                      <div className="w-6 h-8 flex items-center justify-center bg-white flex-shrink-0">
                        <div 
                          className="w-[12.44px] h-[18.67px] bg-[#404040] transition-transform duration-300"
                          style={{ 
                            clipPath: 'polygon(100% 50%, 0 0, 0 100%)'
                          }}
                        ></div>
                      </div>

                      {/* Question Text */}
                      <p 
                        className="font-['Poppins'] font-light text-base leading-7 text-[#404040] m-0 flex-1"
                        {...item.$question}
                      >
                        {item.question}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default EventsFaq;