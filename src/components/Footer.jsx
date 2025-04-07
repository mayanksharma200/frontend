import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-r from-purple-500 via-blue-500 to-purple-500 text-white py-8 flex flex-col md:flex-row items-center justify-center gap-2 md:gap-4 text-center text-sm md:text-base font-semibold shadow-inner backdrop-blur-md">
      <span className="drop-shadow-md">Designed & Developed by</span>
      <a
        href="https://your-portfolio-link.com"
        target="_blank"
        rel="noopener noreferrer"
        className="text-white hover:text-yellow-300 transition duration-300 underline underline-offset-8 decoration-2"
      >
        Mayank Sharma
      </a>
    </footer>
  );
};

export default Footer;
