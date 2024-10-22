"use client";

import React, { useEffect, useState } from "react";
import {
  FiSearch, FiUser, FiHeart, FiShoppingCart, FiMenu
} from "react-icons/fi";
import { medusaClient } from "@lib/config"; // Importing medusaClient
import medusaError from "@lib/util/medusa-error";
import LocalizedClientLink from "@modules/common/components/localized-client-link";
import SideMenu from "@modules/layout/components/side-menu";
import { Region as MedusaRegion } from "@medusajs/medusa";

interface Region extends MedusaRegion {}

interface NavProps {
  regions: Region[];
}

const Nav: React.FC<NavProps> = ({ regions }) => {
  const [navClass, setNavClass] = useState("fixed top-0 bg-white z-50");
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
  const [showSearchModal, setShowSearchModal] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Handle scroll to change nav style
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setNavClass("fixed top-0 bg-white z-50 shadow-sm");
      } else {
        setNavClass("fixed top-0 bg-white z-50");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

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
      {/* Blank White Space Above Navigation */}
      <div className="w-full h-10 bg-white"></div>

      {/* First Line: Logo, Search Bar, and Icons */}
      <header className={`${navClass} w-full`}>
        <div className="content-container flex items-center justify-between h-16 px-4 md:px-12">
          {/* Logo on the left */}
          <div className="flex items-center">
            <LocalizedClientLink
              href="/"
              className="text-2xl font-semibold tracking-tight"
              data-testid="nav-store-link"
            >
              <img src="/path-to-logo.png" alt="ArteCucire" className="w-16 h-8 object-contain" />
            </LocalizedClientLink>
          </div>

          {/* Search Bar in the center */}
          <div className="flex-1 flex justify-center">
            <button
              onClick={() => setShowSearchModal(true)}
              className="w-full max-w-lg border rounded-full py-2 px-4 bg-gray-100 text-gray-600 text-left shadow-sm hover:bg-gray-200 transition"
            >
              <FiSearch className="inline-block mr-2" />
              <span>Cosa stai cercando?</span>
            </button>
          </div>

          {/* Icons on the right */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="hover:text-gray-700">
              <FiHeart size={24} />
            </button>
            <LocalizedClientLink
              className="hover:text-gray-700 flex items-center"
              href="/account"
              data-testid="nav-account-link"
            >
              <FiUser size={24} className="mr-1" />
              <span>Accedi</span>
            </LocalizedClientLink>
            <LocalizedClientLink
              className="hover:text-gray-700"
              href="/cart"
              data-testid="nav-cart-link"
            >
              <FiShoppingCart size={24} />
            </LocalizedClientLink>
          </div>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden flex items-center"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <FiMenu size={24} className="text-gray-700" />
          </button>
        </div>

        {/* Second Line: Links Below Search Bar */}
        <div className="hidden md:flex justify-center bg-transparent py-2 border-t border-gray-200 text-sm font-medium space-x-6 relative z-10">
          {collectionLinks.map((link) => (
            <LocalizedClientLink
              key={link.href}
              href={link.href}
              className="hover:text-violet-900"
            >
              {link.label}
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
      <div className="pt-16"></div> {/* Adjusted spacer to ensure content is visible */}
      {/* Hero section */}
      <div className="hero-bg">
        {/* Your hero background content */}
      </div>
    </div>
  );
};

export default SomePage;
