"use client";

import React, { useEffect, useState } from "react";
import {
  FiSearch, FiUser, FiShoppingCart, FiMenu, FiX
} from "react-icons/fi";
import { medusaClient } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import { Region as MedusaRegion } from "@medusajs/medusa";

// Italian flag square SVG
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

  // Handle screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll behavior
  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > 10 && !isMobile) {
        setNavClass("fixed top-0 bg-white z-50 pt-4 transition-all duration-500 ease-in-out");
      } else if (window.scrollY <= 10 && !isMobile) {
        setNavClass("fixed top-0 bg-white z-50 pt-10 transition-all duration-500 ease-in-out");
      }

      if (isMobile) {
        if (window.scrollY > 10) {
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

  // Navigation links
  const collectionLinks = [
    { href: "/collections/macchine-per-cucire", label: "Acquista i prodotti" },
    { href: "/collections/macchine-per-ricamare", label: "Esplora gli ambienti" },
    { href: "/collections/macchine-per-cucire-e-ricamare", label: "Offerte" },
    { href: "/collections/scannerizza-taglia", label: "Ispirazione" },
    { href: "/collections/termopresse", label: "IKEA for Business" },
    { href: "/collections/stiro", label: "Servizi e progettazione" },
    { href: "#", label: "Altro" },
  ];

  return (
    <>
      {/* First Line: Logo, Search Bar, and Icons */}
      <header className={`${navClass} w-full`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-16 px-10 lg:px-16">
          {/* Text Logo */}
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-semibold tracking-tight text-gray-800"
            >
              Artecucire
            </LocalizedClientLink>
          </div>

          {/* Search Icon on Mobile */}
          <div className={`transition-transform duration-500 ease-out transform ${showMobileSearchBar ? 'translate-y-0' : '-translate-y-full'} md:hidden`}>
            <button onClick={() => setShowSearchModal(true)} className="flex items-center">
              <FiSearch size={24} className="text-gray-700" />
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

          {/* Icons on the right */}
          <div className="hidden md:flex items-center space-x-8">
            <LocalizedClientLink href="/account" className="hover:text-gray-700 flex items-center relative group">
              <span className="mr-1 font-medium">Accedi</span>
              <FiUser size={20} />
            </LocalizedClientLink>
            <LocalizedClientLink href="/cart" className="hover:text-gray-700 flex items-center relative group">
              <FiShoppingCart size={20} />
            </LocalizedClientLink>
            <ItalianFlagIcon />
          </div>

          {/* Mobile Menu and Search Icon */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              className="relative flex items-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <FiX size={24} className="text-gray-700 animate-spin" />
              ) : (
                <FiMenu size={24} className="text-gray-700 transition-all duration-300 ease-in-out" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar with Smooth Animation */}
        {isMobile && showMobileSearchBar && (
          <div className="md:hidden bg-white w-full px-4 py-2 border-t border-gray-200 text-gray-600 transition-all duration-500 ease-out">
            <button
              onClick={() => setShowSearchModal(true)}
              className="flex items-center justify-center w-full bg-gray-100 py-2 rounded-lg"
            >
              <FiSearch className="mr-2" />
              <span>Cosa stai cercando?</span>
            </button>
          </div>
        )}

        {/* Links Below Search Bar */}
        <div className="hidden md:flex justify-center bg-transparent py-3 border-t border-gray-200 text-sm font-medium space-x-6 relative z-10 max-w-7xl mx-auto text-gray-400">
          {collectionLinks.map((link) => (
            <LocalizedClientLink
              key={link.href}
              href={link.href}
              className="relative hover:text-gray-900 transition-colors duration-300"
            >
              <span>{link.label}</span>
            </LocalizedClientLink>
          ))}
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

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-30 flex flex-col items-center justify-start pt-16 mobile-menu transition-all duration-500 ease-in-out">
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
      )}
    </>
  );
};

const SomePage: React.FC = () => {
  const [regions, setRegions] = useState<Region[]>([]);

  useEffect(() => {
    const fetchRegions = async () => {
      try {
        const response = await medusaClient.regions.list();
        setRegions(response.regions);
      } catch (error) {
        medusaError(error);
      }
    };

    fetchRegions();
  }, []);

  return (
    <div className="relative">
      <Nav regions={regions} />
      <div className="pt-24"></div>
      <div className="hero-bg">
        {/* Hero Background Content */}
      </div>
    </div>
  );
};

export default SomePage;
