"use client";

import React, { useEffect, useState, useRef } from "react";
import {
  FiSearch,
  FiUser,
  FiShoppingCart,
  FiMenu,
  FiX,
  FiChevronLeft,
  FiChevronRight,
  FiHome,  // Import icons from react-icons/fi
} from "react-icons/fi"; // Use Feather icons from react-icons library
import { medusaClient } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { Region as MedusaRegion } from "@medusajs/medusa";

// Import the JSON data
import secondRowData from './secondRowData.json';  // Ensure you have the JSON file in the same directory

// Italian flag square SVG
const ItalianFlagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 3 2">
    <rect width="1" height="2" fill="#009246" />
    <rect x="1" width="1" height="2" fill="#fff" />
    <rect x="2" width="1" height="2" fill="#ce2b37" />
  </svg>
);

interface Region extends MedusaRegion {}

const Nav: React.FC<{ regions: Region[] }> = ({ regions }) => {
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSearchBar, setShowMobileSearchBar] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);
  const [activeContent, setActiveContent] = useState(secondRowData.secondRow[0].items); // Default state for the third row (first section)
  const [showArrows, setShowArrows] = useState(false); // State to show/hide scroll arrows on hover

  const thirdRowRef = useRef<HTMLDivElement>(null); // Reference to third row for scrolling

  // Handle screen size to check if it's mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll behavior with delayed animations
  useEffect(() => {
    const handleScroll = () => {
      if (isMobile && window.scrollY > 10) {
        if (!scrollTimeout) {
          const timeout = setTimeout(() => {
            setShowMobileSearchBar(false);
            setScrollTimeout(null);
          }, 300); // Delay for smooth animation
          setScrollTimeout(timeout);
        }
      } else {
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
          setScrollTimeout(null);
        }
        setShowMobileSearchBar(true);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isMobile, scrollTimeout]);

  // Handle click on second-row items to update the third row
  const handleSecondRowClick = (items: any) => {
    setActiveContent(items); // Trigger content update for the third row based on the clicked link
  };

  // Scroll the third row horizontally
  const scrollThirdRow = (direction: "left" | "right") => {
    if (thirdRowRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300; // Adjust the scroll amount as needed
      thirdRowRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header className="w-full bg-white">
        {/* First Row: Logo, Search, Icons */}
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-12 lg:px-16 py-4">
          {/* Text Logo */}
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-semibold tracking-tight text-gray-800"
            >
              Artecucire
            </LocalizedClientLink>
          </div>

          {/* Mobile Icons (Search and Hamburger) */}
          <div className="flex items-center md:hidden space-x-4">
            <button onClick={() => setShowSearchModal(true)}>
              <FiSearch size={24} className="text-gray-700" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          {/* Search Bar on Desktop */}
          <div className="hidden md:flex flex-1 justify-start ml-12">
            <button
              onClick={() => setShowSearchModal(true)}
              className="flex items-center py-2 px-5 bg-gray-100 text-gray-600 shadow-none hover:bg-gray-200 transition w-full max-w-lg rounded-lg"
            >
              <FiSearch className="inline-block mr-2" />
              <span>Cosa stai cercando?</span>
            </button>
          </div>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-8">
            <LocalizedClientLink
              className="hover:text-gray-700 flex items-center relative group"
              href="/account"
            >
              <span className="mr-1 font-medium">Accedi</span>
              <FiUser size={20} />
            </LocalizedClientLink>
            <LocalizedClientLink href="/cart">
              <FiShoppingCart size={20} />
            </LocalizedClientLink>
            <ItalianFlagIcon />
          </div>
        </div>

        {/* Second Row: Links */}
        <div className="hidden md:flex justify-center py-3 border-t border-gray-200 text-sm font-medium space-x-6" style={{ paddingRight: '3rem', paddingLeft: '3rem' }}>
          {secondRowData.secondRow.map((link, index) => (
            <button
              key={index}
              onClick={() => handleSecondRowClick(link.items)} // Change content in the third row on click
              className="relative hover:text-gray-900 transition-colors duration-300 flex items-center space-x-2"
            >
              {React.createElement(require("react-icons/fi")[link.icon], { size: 20 })}
              <span>{link.label}</span>
            </button>
          ))}
        </div>

        {/* Third Row: Scrollable Subsections */}
        <div
          className="hidden md:flex items-center justify-between px-12 lg:px-16 py-4 border-t border-gray-200 relative"
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
          style={{ paddingRight: '3rem', paddingLeft: '3rem' }}  // Grey lines ending earlier
        >
          {/* Left Scroll Arrow */}
          {showArrows && (
            <button onClick={() => scrollThirdRow("left")} className="absolute left-0 z-10 p-2">
              <FiChevronLeft size={24} />
            </button>
          )}

          {/* Scrollable Content */}
          <div
            className="flex space-x-4 overflow-x-auto no-scrollbar"
            ref={thirdRowRef}
            style={{ scrollBehavior: "smooth" }}
          >
            {activeContent.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="min-w-[200px] flex flex-col items-center"
              >
                <img
                  src={item.img}
                  alt={item.label}
                  className="w-full h-auto object-contain"
                />
                <span className="text-sm text-gray-600 mt-2">{item.label}</span>
              </a>
            ))}
          </div>

          {/* Right Scroll Arrow */}
          {showArrows && (
            <button onClick={() => scrollThirdRow("right")} className="absolute right-0 z-10 p-2">
              <FiChevronRight size={24} />
            </button>
          )}
        </div>

        {/* Mobile Search Bar with Icon - Hide when hamburger is active */}
        {!isMobileMenuOpen && isMobile && showMobileSearchBar && (
          <div className="md:hidden bg-white w-full px-4 py-2 border-t border-gray-200 text-gray-600 transition-opacity duration-500 ease-in-out opacity-100">
            <button
              onClick={() => setShowSearchModal(true)}
              className="flex items-center justify-center w-full bg-gray-100 py-2 rounded-lg"
            >
              <FiSearch className="mr-2" />
              <span>Cosa stai cercando?</span>
            </button>
          </div>
        )}
      </header>

      {/* Adjusted padding for spacing */}
      <div className="pt-8 pb-2 px-12 lg:px-16"></div>

      {/* Search Modal */}
      {showSearchModal && (
        <div className="fixed inset-0 bg-black bg-opacity-40 z-50 flex justify-center items-center">
          <div className="bg-white p-4 w-full max-w-3xl mx-4 md:mx-auto rounded-lg shadow-xl">
            <input
              type="text"
              placeholder="Cosa stai cercando?"
              className="border border-gray-300 p-3 rounded-lg w-full"
            />
            <button
              className="mt-2 px-4 py-2 bg-violet-600 text-white rounded-lg"
              onClick={() => setShowSearchModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-30 flex flex-col items-center justify-start pt-16 mobile-menu">
          <div className="w-full bg-white shadow-lg">
            <LocalizedClientLink
              href="/account"
              className="block py-4 text-center border-b border-gray-200 w-full text-gray-900 font-medium"
            >
              Accedi
            </LocalizedClientLink>
            {secondRowData.secondRow.map((link, index) => (
              <LocalizedClientLink
                key={index}
                href="#"
                className="block py-4 text-center border-b border-gray-200 w-full text-gray-900 font-medium"
              >
                {link.label}
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

const IndexPage: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await medusaClient.regions.list();  // Fetch regions from Medusa
        setRegions(response.regions);
      } catch (error) {
        medusaError(error);  // Handle any errors
      }
    };

    fetchRegions();
  }, []);

  return (
    <div className="relative">
      <Nav regions={regions} />
      {/* The rest of your page content */}
      <div className="hero-bg">
        {/* Your hero background content */}
      </div>
    </div>
  );
};

export default IndexPage;
