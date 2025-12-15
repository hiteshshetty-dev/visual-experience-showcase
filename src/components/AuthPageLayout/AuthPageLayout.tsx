"use client";

import React, { ReactNode } from "react";

interface AuthPageLayoutProps {
  children: ReactNode;
  error?: string;
  success?: string;
  backgroundImage?: string;
}

const AuthPageLayout = ({ children, error, success, backgroundImage }: AuthPageLayoutProps) => {
  return (
    <section className="h-screen overflow-hidden">
      <div className="flex flex-row items-center h-screen bg-white m-0 p-0 font-['Poppins',sans-serif] md:flex-row sm:flex-col overflow-hidden">
        <div className="flex items-center justify-center w-1/2 p-0 order-1 h-full lg:w-1/2 lg:px-5 lg:py-10 md:w-full md:px-5 md:py-10">
          <div className="flex flex-col items-center w-full max-w-[512px] py-2 px-0 lg:w-full md:w-full">
            {error && (
              <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded w-full">
                {error}
              </div>
            )}
            {success && (
              <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded w-full">
                {success}
              </div>
            )}
            {children}
          </div>
        </div>

        <div 
          className="w-1/2 h-full bg-cover bg-center order-2 lg:w-1/2 lg:h-full md:w-full md:h-[300px]"
          style={{ backgroundImage: `url(${backgroundImage || "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=1000&q=80"})` }}
        ></div>
      </div>
    </section>
  );
};

export default AuthPageLayout;

