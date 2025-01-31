import React from "react";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="text-sm text-gray-500">
          © {currentYear} GoShopping. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
