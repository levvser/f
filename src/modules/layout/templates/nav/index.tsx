"use client";

import React, { useEffect, useState } from "react";
import {
  FaInfoCircle,
  FaCheckCircle,
  FaExclamationTriangle,
  FaWhatsapp,
} from "react-icons/fa";
import { FiSearch, FiUser, FiShoppingCart, FiHeart } from "react-icons/fi";
import { medusaClient } from "@lib/config";
import medusaError from "@lib/util/medusa-error";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import SideMenu from "@modules/layout/components/side-menu";
import { Region as MedusaRegion } from "@medusajs/medusa";

interface Region extends MedusaRegion {}

interface NavProps {
  regions: Region[];
}

const AlertBar: React.FC = () => {
  const [isVisible, setIsVisible] = useState(true);

  // Automatically hide the alert bar after 5 seconds
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsVisible(false);
    }, 5000);
    return () => clearTimeout(timeout);
  }, []);

  if (!isVisible) return null;

  return (
    <div className="bg-gradient-to-r from-purple-100 via-white to-pink-100 border-b border-violet-300 py-2 px-4 text-violet-900 flex justify-center items-center text-xs sm:text-sm z-50 fixed top-0 w-full">
      <div className="flex items-center mx-2">
        <FaInfoCircle size={14} className="mr-2 text-violet-700" />
        <span>Spedizione gratuita da € 100</span>
      </div>
      <div className="flex items-center mx-2">
        <FaCheckCircle size={14} className="mr-2 text-violet-700" />
        <span>Garanzia inclusa</span>
      </div>
      <div className="flex items-center mx-2">
        <FaExclamationTriangle size={14} className="mr-2 text-violet-700" />
        <span>Servizio Assistenza</span>
      </div>
    </div>
  );
};

const Nav: React.FC<NavProps> = ({ regions }) => {
  const [navClass, setNavClass] = useState("fixed top-10"); // Below the alert bar
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setNavClass("fixed top-0 bg-white shadow-md z-50");
      } else {
        setNavClass("fixed top-10 bg-white z-50");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const collectionLinks = [
    { href: "/collections/macchine-per-cucire", label: "Cucire" },
    { href: "/collections/macchine-per-ricamare", label: "Ricamare" },
    { href: "/collections/macchine-per-cucire-e-ricamare", label: "Cucire e Ricamare" },
    { href: "/collections/scannerizza-taglia", label: "Scan e Taglia" },
    { href: "/collections/termopresse", label: "Termopresse" },
    { href: "/collections/stiro", label: "Stiro" },
  ];

  return (
    <>
      <AlertBar />

      <header className={`${navClass} w-full bg-white`}>
        {/* First Line: Logo, Search Bar, and Icons */}
        <div className="content-container relative text-gray-900 flex items-center justify-between h-16 px-4 md:px-12">
          {/* Logo on the left */}
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-semibold hover:text-violet-800 tracking-tight uppercase"
              data-testid="nav-store-link"
            >
              {/* Replace with your logo */}
              <img src="/logo.svg" alt="Brand Logo" className="w-12 h-12" />
            </LocalizedClientLink>
          </div>

          {/* Search Bar in the center */}
          <div className="flex-1 flex justify-center">
            <div className="w-full max-w-3xl">
              <button
                onClick={() => setShowSearchModal(true)}
                className="w-full border rounded-full py-2 px-4 bg-gray-100 text-gray-600 text-left shadow-sm hover:bg-gray-200 transition"
              >
                <FiSearch className="inline-block mr-2" />
                <span>Cosa stai cercando?</span>
              </button>
            </div>
          </div>

          {/* Icons on the right */}
          <div className="flex items-center space-x-4">
            <button className="hover:text-gray-700">
              <FiHeart size={24} />
            </button>
            <LocalizedClientLink
              className="hover:text-gray-700"
              href="/account"
              data-testid="nav-account-link"
            >
              <FiUser size={24} />
            </LocalizedClientLink>
            <LocalizedClientLink
              className="hover:text-gray-700"
              href="/cart"
              data-testid="nav-cart-link"
            >
              <FiShoppingCart size={24} />
            </LocalizedClientLink>
          </div>
        </div>

        {/* Second Line: Links Below Search Bar */}
        <div className="hidden md:flex justify-center bg-transparent py-2 border-t border-gray-200 text-sm font-medium space-x-6 relative z-10">
          {collectionLinks.map((link) => (
            <div
              key={link.href}
              className="relative group"
              onMouseEnter={() => setHoveredCategory(link.label)}
              onMouseLeave={() => setHoveredCategory(null)}
            >
              <LocalizedClientLink
                href={link.href}
                className="hover:text-violet-900"
              >
                {link.label}
              </LocalizedClientLink>

              {/* Hover effect with product preview */}
              {hoveredCategory === link.label && (
                <div className="absolute left-0 top-full w-64 p-4 bg-white shadow-lg border border-gray-200 z-50">
                  <p>Preview for {link.label}</p>
                </div>
              )}
            </div>
          ))}
        </div>

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

        {/* Mobile menu items */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-black bg-opacity-30 flex flex-col items-center justify-start pt-16">
            <div className="w-full bg-white shadow-lg">
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
      </header>
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
      <div className="pt-16"></div> {/* Adjusted spacer to ensure content is visible */}
      {/* Hero section */}
      <div className="hero-bg">
        {/* Your hero background content */}
      </div>
    </div>
  );
};

export default SomePage;
