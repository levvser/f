"use client";

import React, { useEffect, useState } from "react";
import { FiSearch, FiUser, FiShoppingCart, FiMenu, FiX } from "react-icons/fi";
import { medusaClient } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import SideMenu from "@modules/layout/components/side-menu";
import { Region as MedusaRegion } from "@medusajs/medusa";

const ItalianFlagIcon = () => (
  <svg width="20" height="20" viewBox="0 0 3 2">
    <rect width="1" height="2" fill="#009246" />
    <rect x="1" width="1" height="2" fill="#fff" />
    <rect x="2" width="1" height="2" fill="#ce2b37" />
  </svg>
);

interface Region extends MedusaRegion {}

interface NavProps {
  regions: Region[];
}

const Nav: React.FC<NavProps> = ({ regions }) => {
  const [navClass, setNavClass] = useState("fixed top-0 bg-white z-50 pt-6");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [showMobileSearchBar, setShowMobileSearchBar] = useState(true);
  const [scrollTimeout, setScrollTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Smooth scroll animations for search icon and search bar
  useEffect(() => {
    let lastScroll = window.scrollY;

    const handleScroll = () => {
      if (isMobile) {
        if (window.scrollY > 50) {
          // Show animation after 50px scroll
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
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, [isMobile, scrollTimeout]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isMobileMenuOpen && !(event.target as HTMLElement).closest(".mobile-menu")) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileMenuOpen]);

  // Hamburger menu styling fix
  const mobileMenuClass = isMobileMenuOpen
    ? "fixed inset-0 z-50 bg-black bg-opacity-30 flex flex-col items-center justify-start pt-16 mobile-menu"
    : "hidden";

  return (
    <>
      <header className={`${navClass} w-full`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-10 lg:px-16">
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-semibold tracking-tight text-gray-800"
              data-testid="nav-store-link"
            >
              Artecucire
            </LocalizedClientLink>
          </div>

          {/* Mobile Search Icon with smooth appearance and double flag animation */}
          <div
            className={`flex items-center transition-all duration-500 ${
              showMobileSearchBar ? "hidden" : "block"
            } md:hidden relative`}
          >
            <button
              onClick={() => setShowSearchModal(true)}
              className="flex items-center relative group"
            >
              <FiSearch size={24} className="text-gray-700" />
              <div className="absolute inset-0 z-[-1] transform translate-y-4 scale-0 group-hover:scale-150 group-hover:translate-y-0 bg-gray-100 rounded-full transition duration-300"></div>
              <div className="absolute top-0 left-0 transform translate-x-[-20px] translate-y-[-20px] opacity-0 group-hover:opacity-100 transition duration-500">
                <ItalianFlagIcon />
              </div>
              <div className="absolute top-0 right-0 transform translate-x-[20px] translate-y-[-20px] opacity-0 group-hover:opacity-100 transition duration-500">
                <ItalianFlagIcon />
              </div>
            </button>
          </div>

          {/* Mobile Search Bar Disappearance behind the navbar */}
          {isMobile && showMobileSearchBar && (
            <div className="md:hidden bg-white w-full px-4 py-2 border-t border-gray-200 text-gray-600 transition-opacity duration-500 ease-in-out">
              <button
                onClick={() => setShowSearchModal(true)}
                className="flex items-center justify-center w-full bg-gray-100 py-2 rounded-lg"
              >
                <FiSearch className="mr-2" />
                <span>Cosa stai cercando?</span>
              </button>
            </div>
          )}

          {/* Hamburger Menu Trigger */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              className="flex items-center z-50"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FiX size={24} className="text-gray-700" />
              ) : (
                <FiMenu size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Hamburger Menu */}
        <div className={mobileMenuClass}>
          <div className="w-full bg-white shadow-lg">
            <LocalizedClientLink
              href="/account"
              className="block py-4 text-center border-b border-gray-200 w-full text-gray-900 font-medium"
            >
              Accedi
            </LocalizedClientLink>
            {collectionLinks.map((link) => (
              <LocalizedClientLink
                key={link.href}
                href={link.href}
                className="block py-4 text-center border-b border-gray-200 w-full text-gray-900 font-medium"
              >
                {link.label}
              </LocalizedClientLink>
            ))}
          </div>
        </div>
      </header>

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
    </>
  );
};

export default Nav;
