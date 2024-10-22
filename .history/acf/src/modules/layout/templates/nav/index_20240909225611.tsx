"use client";

import React, { useEffect, useState } from "react";
import {
  FiSearch, FiUser, FiShoppingCart, FiMenu, FiX
} from "react-icons/fi"; // Add FiX for "X" icon
import { medusaClient } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import SideMenu from "@modules/layout/components/side-menu";
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
  const [navClass, setNavClass] = useState("fixed top-0 bg-white z-50 pt-10");
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Handle screen size to check if it's mobile
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Handle scroll to change nav style only on desktop
  useEffect(() => {
    let lastScroll = window.scrollY;
    const handleScroll = () => {
      if (window.scrollY > 10 && !isMobile) {
        setNavClass("fixed top-0 bg-white z-50 shadow-sm pt-4 transition-all duration-300 ease-in-out");
      } else if (window.scrollY <= 10 && !isMobile) {
        setNavClass("fixed top-0 bg-white z-50 pt-10 transition-all duration-300 ease-in-out");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

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
      {/* First Line: Logo (Text), Search Bar, and Icons */}
      <header className={`${navClass} w-full`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between h-20 px-10 lg:px-16">
          {/* Text Logo: Artecucire on the left */}
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-semibold tracking-tight text-gray-800"
              data-testid="nav-store-link"
            >
              Artecucire
            </LocalizedClientLink>
          </div>

          {/* Search Bar */}
          <div className="flex-1 flex justify-start ml-12">
            <button
              onClick={() => setShowSearchModal(true)}
              className="hidden md:flex items-center py-2 px-5 bg-gray-100 text-gray-600 shadow-none hover:bg-gray-200 transition w-full max-w-lg rounded-lg" // Added rounded-lg
            >
              <FiSearch className="inline-block mr-2" />
              <span>Cosa stai cercando?</span> {/* Updated placeholder */}
            </button>
          </div>

          {/* Icons on the right */}
          <div className="hidden md:flex items-center space-x-8">
            <LocalizedClientLink
              className="hover:text-gray-700 flex items-center relative group"
              href="/account"
              data-testid="nav-account-link"
            >
              <span className="mr-1 font-semibold">Accedi</span> {/* Bolder text */}
              <div className="relative flex items-center">
                <FiUser size={20} />
                <div className="absolute inset-0 transform translate-y-4 scale-0 group-hover:scale-150 group-hover:translate-y-0 bg-gray-300 rounded-full transition duration-300"></div> {/* Hover effect under text */}
              </div>
            </LocalizedClientLink>
            <LocalizedClientLink
              className="hover:text-gray-700 flex items-center relative group"
              href="/cart"
              data-testid="nav-cart-link"
            >
              <div className="relative flex items-center">
                <FiShoppingCart size={20} />
                <div className="absolute inset-0 transform translate-y-4 scale-0 group-hover:scale-150 group-hover:translate-y-0 bg-gray-300 rounded-full transition duration-300"></div> {/* Hover effect under text */}
              </div>
            </LocalizedClientLink>
            <div className="hover:text-gray-700 flex items-center relative group">
              <div className="relative flex items-center">
                <ItalianFlagIcon /> {/* Flag icon */}
              </div>
            </div>
          </div>

          {/* Mobile Menu and Search Icon */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={() => setShowSearchModal(true)}
              className="flex items-center"
            >
              <FiSearch size={24} className="text-gray-700" />
            </button>
            <button
              className="flex items-center"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <FiX size={24} className="text-gray-700" /> : <FiMenu size={24} className="text-gray-700" />} {/* "X" icon when menu is open */}
            </button>
          </div>
        </div>

        {/* Second Line: Links Below Search Bar */}
        <div className="hidden md:flex justify-center bg-transparent py-3 border-t border-gray-200 text-sm font-medium space-x-6 relative z-10 max-w-7xl mx-auto text-gray-400">
          {collectionLinks.map((link) => (
            <LocalizedClientLink
              key={link.href}
              href={link.href}
              className="relative hover:text-gray-900 transition-colors duration-300"
            >
              <span>{link.label}</span>
              <span className="absolute inset-0 transform translate-y-4 scale-0 group-hover:scale-150 group-hover:translate-y-0 bg-gray-200 rounded-full transition duration-300"></span> {/* Hover effect bigger and under text */}
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
              className="border border-gray-300 p-3 rounded-lg w-full" // Added rounded-lg
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
      <div className="pt-24"></div> {/* Adjusted spacer to ensure more blank space above the hero section */}
      {/* Hero section */}
      <div className="hero-bg">
        {/* Your hero background content */}
      </div>
    </div>
  );
};

export default SomePage;