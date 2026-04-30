/* eslint-disable @next/next/no-img-element */
import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-indigo-700 text-white w-full">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col lg:flex-row justify-between gap-10">
          <div className="flex flex-col gap-5">
            <div className="flex items-center gap-2 text-lg font-semibold">
              <img src="/film (1).svg" alt="" className="h-6 w-6" />
              Movie Z
            </div>
            <p className="text-sm text-gray-200">
              © 2024 Movie Z. All Rights Reserved.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-10 sm:gap-20">
            <div className="flex flex-col gap-4">
              <p className="font-semibold">Contact Information</p>

              <div className="flex gap-3 items-start">
                <svg width="16" height="16" fill="none">
                  <path
                    d="M14.6663 4.6665L8.68634 8.4665C8.48052 8.59545 8.24255 8.66384 7.99967 8.66384C7.7568 8.66384 7.51883 8.59545 7.31301 8.4665L1.33301 4.6665"
                    stroke="#FAFAFA"
                  />
                </svg>
                <div>
                  <p className="text-sm">Email:</p>
                  <p className="text-sm text-gray-200">support@movieZ.com</p>
                </div>
              </div>

              <div className="flex gap-3 items-start">
                <svg width="15" height="15" fill="none">
                  <path d="M13.7587 10.4467V12.4467..." stroke="#FAFAFA" />
                </svg>
                <div>
                  <p className="text-sm">Phone:</p>
                  <p className="text-sm text-gray-200">+976 (11) 123-4567</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <p className="font-semibold">Follow us</p>
              <div className="flex flex-wrap gap-3 text-sm text-gray-200">
                <p className="hover:text-white cursor-pointer">Facebook</p>
                <p className="hover:text-white cursor-pointer">Instagram</p>
                <p className="hover:text-white cursor-pointer">Twitter</p>
                <p className="hover:text-white cursor-pointer">YouTube</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
