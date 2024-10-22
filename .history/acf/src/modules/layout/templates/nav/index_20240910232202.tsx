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
} from "react-icons/fi";
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
  const [activeContent, setActiveContent] = useState(secondRowData.secondRow[0].items);
  const [activeIndex, setActiveIndex] = useState(0);
  const [showArrows, setShowArrows] = useState(false);

  const thirdRowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (isMobile && window.scrollY > 10) {
        if (!scrollTimeout) {
          const timeout = setTimeout(() => {
            setShowMobileSearchBar(false);
            setScrollTimeout(null);
          }, 300);
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

  const handleSecondRowClick = (items: any, index: number) => {
    setActiveContent(items);
    setActiveIndex(index);
  };

  const scrollThirdRow = (direction: "left" | "right") => {
    if (thirdRowRef.current) {
      const scrollAmount = direction === "left" ? -300 : 300;
      thirdRowRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <header className="w-full bg-white">
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-24 lg:px-40 py-4">
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-semibold tracking-tight text-gray-800"
            >
              Artecucire
            </LocalizedClientLink>
          </div>

          <div className="flex items-center md:hidden space-x-4">
            <button onClick={() => setShowSearchModal(true)}>
              <FiSearch size={24} className="text-gray-700" />
            </button>
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
            </button>
          </div>

          <div className="hidden md:flex flex-1 justify-start ml-12">
            <button
              onClick={() => setShowSearchModal(true)}
              className="flex items-center py-2 px-5 bg-gray-100 text-gray-600 shadow-none hover:bg-gray-200 transition w-full max-w-lg rounded-lg"
            >
              <FiSearch className="inline-block mr-2" />
              <span>Cosa stai cercando?</span>
            </button>
          </div>

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

        <div className="hidden md:flex justify-start py-2 border-t border-gray-200 text-sm font-medium space-x-6 px-24 lg:px-40">
          {secondRowData.secondRow.map((link, index) => (
            <button
              key={index}
              onClick={() => handleSecondRowClick(link.items, index)}
              className={`relative transition-colors duration-300 flex items-center space-x-2 ${
                activeIndex === index ? 'text-gray-900 font-bold' : 'text-gray-500'
              }`}
            >
              {React.createElement(require("react-icons/fi")[link.icon], { size: 20 })}
              <span>{link.label}</span>
            </button>
          ))}
        </div>

        <div
          className="hidden md:flex items-center justify-between px-24 lg:px-40 py-2 border-t border-gray-200 relative"
          onMouseEnter={() => setShowArrows(true)}
          onMouseLeave={() => setShowArrows(false)}
        >
          {showArrows && (
            <button onClick={() => scrollThirdRow("left")} className="absolute left-0 z-10 p-2">
              <FiChevronLeft size={24} />
            </button>
          )}

          <div
            className="flex space-x-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
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

          {showArrows && (
            <button onClick={() => scrollThirdRow("right")} className="absolute right-0 z-10 p-2">
              <FiChevronRight size={24} />
            </button>
          )}
        </div>

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

      <div className="pt-12 pb-8 px-10 lg:px-16"></div>

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
      <div className="hero-bg"></div>
    </div>
  );
};

export default IndexPage;
